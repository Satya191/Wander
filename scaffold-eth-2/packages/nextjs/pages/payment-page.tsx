import type { NextPage } from "next";
import { ethers } from 'ethers';
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import React, { useState, FormEvent } from 'react'; // Import FormEvent

const paymentPage: NextPage = () => {
  // field values for setDonationAddress
  const [setDonationAddress, setSetDonationAddress] = useState('');

   // scaffoldWrite for setDonationAddress
   const { writeAsync : asyncSetDonationAddress } = useScaffoldContractWrite({
    contractName: "Wander",
    functionName: "setDonationAddress",
    args: [setDonationAddress],
    blockConfirmations: 1,
    onBlockConfirmation: (txnReceipt) => {
      console.log("Transaction block hash ", txnReceipt.blockHash);
    },
  });

  // handleSubmit for setDonationAddress
  const handleSubmitSetDonationAddress = async (e: FormEvent) => {
    e.preventDefault(); // Prevent page refresh

    await asyncSetDonationAddress();

    setSetDonationAddress('');
  };

  // field values for setDonationAmount
  const [setDonationAmount, setSetDonationAmount] = useState('');

   // scaffoldWrite for setDonationAmount
   const { writeAsync : asyncSetDonationAmount } = useScaffoldContractWrite({
    contractName: "Wander",
    functionName: "setDonationAmount",
    args: [setDonationAmount],
    blockConfirmations: 1,
    onBlockConfirmation: (txnReceipt) => {
      console.log("Transaction block hash ", txnReceipt.blockHash);
    },
  });

  // handleSubmit for setDonationAmount
  const handleSubmitSetDonationAmount = async (e: FormEvent) => {
    e.preventDefault(); // Prevent page refresh

    await asyncSetDonationAmount();

    setSetDonationAmount('');
  };

  // field values for sendEther
  const [sendEtherField1, setSendEtherField1] = useState('');
  const [sendEtherField2, setSendEtherField2] = useState('');

  // scaffoldWrite for sendEther
  const { writeAsync : asyncSendEther } = useScaffoldContractWrite({
    contractName: "Wander",
    functionName: "sendEther",
    args: [sendEtherField1],
    value: ethers.formatEther(1),
    blockConfirmations: 1,
    onBlockConfirmation: (txnReceipt) => {
      console.log("Transaction block hash ", txnReceipt.blockHash);
    },
  });

  // handleSubmit for sendEther
  const handleSubmitSendEther = async (e: FormEvent) => {
    e.preventDefault(); // Prevent page refresh

    await asyncSendEther();

    setSendEtherField1('');
    setSendEtherField2('');
  };

  return (
  <>
    // Form for setDonationAmount
    <form className="flex flex-col items-center justify-center gap-3" onSubmit={handleSubmitSetDonationAmount}>
      <div>
        <label className="text-center font-bold">Donation Amount (in wei)</label>
        <input
          className="input input-bordered w-full max-w-xs mb-7"
          type="text"
          value={setDonationAmount}
          onChange={(e) => setSetDonationAmount(e.target.value)}
        />
      </div>
      <button className="bg-primary btn btn-primary mt-5 mb-0" type="submit">
        Set Donation Amount
      </button>
    </form>

    // Form for setDonationAddress
    <form className="flex flex-col items-center justify-center gap-3" onSubmit={handleSubmitSetDonationAddress}>
      <div>
        <label className="text-center font-bold">Donation Address</label>
        <input
          className="input input-bordered w-full max-w-xs mb-7"
          type="text"
          value={setDonationAddress}
          onChange={(e) => setSetDonationAddress(e.target.value)}
        />
      </div>
      <button className="bg-primary btn btn-primary mt-5 mb-0" type="submit">
        Set Donation Address.
      </button>
    </form>

    // Form for sendEther
    <form className="flex flex-col items-center justify-center gap-3" onSubmit={handleSubmitSendEther}>
      <div>
        <label className="text-center font-bold">Vendor Address</label>
        <input
          className="input input-bordered w-full max-w-xs mb-7"
          type="text"
          value={sendEtherField1}
          onChange={(e) => setSendEtherField1(e.target.value)}
        />
      </div>
      <div>
        <label className="text-center font-bold">Amount (in wei)</label>
        <input
          className="input input-bordered w-full max-w-xs mb-7"
          type="number"
          value={sendEtherField2}
          onChange={(e) => setSendEtherField2(e.target.value)}
        />
      </div>
      <button className="bg-primary btn btn-primary mt-5 mb-0" type="submit">
        Make Payment
      </button>
    </form>
  </>
  );
};

export default paymentPage;