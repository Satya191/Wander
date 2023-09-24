// install dependencies from https://www.youtube.com/watch?v=JwU__ZDcZ7E, 3:10 - 9:10.
require('dotenv').config();
const {PINATA_API_KEY, PINATA_SECRET_KEY} = process.env;

const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_SECRET_KEY);

const fs = require('fs');
const ethers = require('ethers');

// This creates a promotion class which we'll use to store user uploads for creation of a new promotion.

class promotion {
    constructor(_name) {
      this.name = _name;
      this.hashes = [];
      this.tiers = [];
    }
    
    addNewHash(_newHash) {
      this.hashes.push(_newHash);
    }

    addNewTier(_newTier) {
      this.tiers.push(_newTier);
    }

    getHashes() {
      return this.hashes;
    }

    getTiers() {
      return this.tiers;
    }
  }

// list of all `promotion`s.
var allPromotions = [];

/*
@TODO this line stores the image NFT in readableStreamForFile.
*/
const readableStreamForFile = fs.createReadStream('[FILE_THAT_IS_UPLOADED]');

/* @TODO These functions are triggered when a webpage button is clicked.
    The webpage form needs to have the same corresponding Ids in the HTML.
*/
var uploadedFile;

function submitClicked() {
// Following lines build the `uploadedFile` parameter from form intake.
// Have the upload button trigger `submitClicked()` in the HTML
// e.g. <input type="file" id="uploadFileButton" onchange="submitClicked()" />
    var inputElement = document.getElementById('uploadFileButton');
    if(inputElement.files.length == 0) {
        console.log('No file selected!');
        return;
    }
    uploadedFile = inputElement.files[0];

// Following lines build the `options` parameter from form intakes.
    var fileName = document.getElementById('fileName').value;  // Text field ID: fileName
    var promotionName = document.getElementById('promotionName').value;  // Text field ID: promotion
    var tier = document.getElementById('tier').value;  // $$ amount needed to be spent to receive this NFT. Text field ID: tier
   
    const options = {
        pinataMetadata: {
            name: fileName,
            keyvalues: {
                tier: tier,
                promotionName: promotionName
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    addToPromotion(uploadedFile, options);
  }
}

function addToPromotion(readableStreamForFile, options) {
  pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    // Add hash in a corresponding promotion
    // This code searches allPromotions for the first promotion object whose `name` matches the name of the promotion just uploaded in `options`.
    var matchingPromotion = allPromotions.find(promotion => promotion.name === options.pinataMetadata.keyvalues.promotionName);
    // if there is such a promotion, great; we add it.
    if (matchingPromotion) {
      matchingPromotion.addNewHash(result["IpfsHash"]);
    }
    // if not, then okay we create a new promotion and add it.
    else {
      let newPromotion = new promotion(options.pinataMetadata.keyvalues.promotionName);
      newPromotion.addNewHash(result["IpfsHash"]);
      allPromotions.push(newPromotion);
    }
    // Add tier to tiers[]
    matchingPromotion.addNewTier(parseInt(options.pinataMetadata.keyvalues.tier));
  }).catch((err) => {
    console.log(err);    // handle error here
  });
}

// @TODO we need to use Scaffold2 to call a function to pass the array as the IPFS hashes for a NewPromotion.
// We call this function with a button. It is based on the promotionName text input on the website.
function writePromotionToChain() {
  var promotionName = document.getElementById('promotionName').value;  // Text field ID: promotion
    var matchingPromotion = allPromotions.find(promotion => promotion.name === promotionName);
  var duration = document.getElementById('duration'); // duration of promotion in days.
  var donationAmount = document.getElementById('donationAmount'); // percent as a decimal, i.e. 0.5% is 0.005.

  if (ethers.utils.isAddress(document.getElementById('donationAddress'))) {
    var donationAddress = document.getElementById('donationAddress'); // Fetch input from text field
  } else {
    console.log('Input for donationAddress is not a valid Ethereum address.');
    return;
  }

  // NOTE FROM ZACH: This should be ready to go in scaffold.
  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    // From Zach: I'm not sure if contractName includes .sol or not.
    contractName: "Wander.sol",
    // From Zach: We need to check with Henrik & Satya what the functionName will be.
    functionName: "createPromotion",
    // this should be an array of strings with the IPFS hashes
    args: [matchingPromotion.hashes, matchingPromotion.tiers, duration, donationAddress, donationAmount],
    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    blockConfirmations: 1,
    // The callback function to execute when the transaction is confirmed.
    onBlockConfirmation: (txnReceipt) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });
}

function makePayment(_vendorAddress) {
  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName:"Wander.sol",
    functionName:"sendEther",
    args: [_vendorAddress],
    blockConfirmations:1,
    onBlockConfirmation: (txnReceipt) => {
      console.log("Transaction block hash ", txnReceipt.blockHash);
    }
  });
}