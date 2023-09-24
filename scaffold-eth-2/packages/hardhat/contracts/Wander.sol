//SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

// Useful for debugging. Remove when deploying to a live network.
//import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

import "forge-std/console2.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract Wander is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _promotionIds;

    struct Promotion {
        uint endTimestamp;
        address owner;
        address[] vendors;
        string[] tiers;
        mapping(address => uint256) customerCurrTier;
        mapping(address => uint256) customerScore;
        uint256[] tierAmountsNecessary; //corrected everything to 'necessary' (got rid of any 'neccessary's)
        uint256 initialized;
        address donationAddress;
        uint256 donationAmount;
    }
    mapping(uint256 => Promotion)public promotions;
    mapping(address => uint256) public vendorToPromotionId;
    mapping(uint256 => uint256) public tokenIdToPromotionId;

    constructor() ERC721("Wander", "WOW") {}

    function getTiers(uint256 promotionId) public view onlyOwner returns (string[] memory) {
        return promotions[promotionId].tiers;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

        // Override the tokenURI function to generate dynamic URIs based on tier
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        Promotion storage promotion = promotions[tokenIdToPromotionId[tokenId]];
        address owner = ownerOf(tokenId);


        //require(promotion.customerCurrTier[owner] != 0,  "Owner does not have a valid tier");

        string memory baseURI = _baseURI();
        string memory tierURI = promotion.tiers[promotion.customerCurrTier[owner]];

        return string(abi.encodePacked(baseURI, tierURI));
    }

    function setDonationAddress(address _charityAddress) public {
        //require(promotions[vendorToPromotionId[msg.sender]], "The sender has no promotion");
        // fromZach: for now, this function allows any merchant who is part of a promotion to call this function.
        // I think that's fine... assuming that merchants who are already cooperating are collegial is not airtight, but it's not critically breaking.
        promotions[vendorToPromotionId[msg.sender]].donationAddress = _charityAddress;
    }

    function setDonationAmount(uint256 _amount) public {
        //require(promotions[vendorToPromotionId[msg.sender]].exists, "The sender has no promotion");
        // This line checks that the donation amount isn't super high.
        // Intention is to avoid user error where donation eclipses merchant savings from taking crypto.
        require(_amount <= 30, "You're attempting to set a very high donation amount. Please input the donation amount as a decimal. For example, if you want to donate 1% of the payment, set the value to 0.01. If you are sure you're inputting correctly, use setDonationAmountBig().");
        promotions[vendorToPromotionId[msg.sender]].donationAmount = _amount;
    }

    function setDonationAmountBig(uint256 _amount) public {
        // This does the same thing as setDonationAmount but doesn't include a check for a reasonable donation amount.
        //require(promotions[vendorToPromotionId[msg.sender]].exists, "The sender has no promotion");
        promotions[vendorToPromotionId[msg.sender]].donationAmount = _amount;
    }

    function sendEther(address vendorAddress) public payable {
        uint256 promotionId = vendorToPromotionId[vendorAddress];
        Promotion storage promotion = promotions[promotionId];
        require(
            promotion.initialized == 1,
            "VENDOR NOT PART OF ANY PROMOTION"
        );
        address buyer = msg.sender;
        // These lines split the ETH received into two streams: one to the merchant and one to the charity.
//        uint256 merchantAmt = msg.value - promotion.donationAmount*msg.value;
        uint256 charityAmt = promotion.donationAmount*msg.value/1000;
        uint256 merchantAmt = msg.value - charityAmt;
        payable(vendorAddress).transfer(merchantAmt);
        payable(promotion.donationAddress).transfer(charityAmt);
        uint256 newItemId = _tokenIds.current();
        if (promotion.customerScore[buyer] == 0) {
            _mint(buyer, newItemId);
            _tokenIds.increment();
        }
        promotion.customerScore[buyer] += Math.log10(msg.value / 1e18) + 1; // the customerScore is equal to log(x)+y where x is money spent and y is number of payments. This formula changes the score from being entirely based on how much money someone has to a composite of money spent and visits. The most gas efficient way to do this is to directly increase it in this way every payment.
        //Not equal 0 check to make sure does not go into infinite loop since later values that are not set I think default to 0 which would be less than

        while (promotion.customerCurrTier[buyer] < promotion.tiers.length-1) {
            if (promotion.customerScore[buyer] > promotion.tierAmountsNecessary[promotion.customerCurrTier[buyer]+1]) {
                promotion.customerCurrTier[buyer]++;
            }
            else {break;}
        }
        

    }

    function createPromotion(
        string[] memory tiers, // array of IPFS hashes representing the token metadata
        uint256[] memory tierAmountsNecessary, // array of $ values needed to be spent to get to the corresponding NFT
        uint duration, // duration in days
        address _donationAddress,
        uint256 _donationAmount // amount to be donated as a fraction of one eth (i.e., 0.5% to be donated would be '0.0005 ether').
    ) external {
        require(block.timestamp > promotions[vendorToPromotionId[msg.sender]].endTimestamp, "ERROR - Promotion is still active!");

        Promotion storage promotion = promotions[_promotionIds.current()];

        if (promotion.initialized == 1) {
            require(
                promotion.endTimestamp < block.timestamp,
                "ERROR - Previous promotion has not expired yet!"
            );
        }
        promotion.endTimestamp = block.timestamp + duration * 1 days;
        promotion.owner = msg.sender;
        promotion.tiers = tiers;
        promotion.tierAmountsNecessary = tierAmountsNecessary;
        _promotionIds.increment();

        promotion.endTimestamp = block.timestamp + duration * 1 days;
        promotion.tiers = tiers;
        promotion.donationAddress = _donationAddress;
        promotion.donationAmount = _donationAmount;
        promotion.tierAmountsNecessary = tierAmountsNecessary;
        promotion.initialized = 1;
    }
    function addVendor (address vendor) external {
        uint256 promotionId = vendorToPromotionId[msg.sender];
        Promotion storage promotion = promotions[promotionId];

        require(msg.sender == promotion.owner, "Only the owner can add addresses to a promotion.");
        promotion.vendors.push(vendor);
    }
    function removeVendor (address vendor) external {
        uint256 promotionId = vendorToPromotionId[msg.sender];
        Promotion storage promotion = promotions[promotionId];

        require(msg.sender == promotion.owner, "Only the owner can remove addresses from a promotion.");
        for (uint i = 0; i < promotion.vendors.length; i++) {
            if (promotion.vendors[i] == vendor) {
                promotion.vendors[i] = promotion.vendors[promotion.vendors.length-1];
                promotion.vendors.pop();
            }
        }
    }
}