
// import Link from "next/link";
import type { NextPage } from "next";
// import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
// import { MetaHeader } from "~~/components/MetaHeader";
// import { useAccount } from "wagmi";
// import { Address } from '~~/components/scaffold-eth';
import type { NextPage } from "next";
import { ethers } from 'ethers';
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import React, { useState, FormEvent } from 'react'; // Import FormEvent

const paymentPage: NextPage = () => {
  // field values for createPromotion
  const [tiers, setTiers] = useState<string[]>([]);
  const [tierAmounts, setTierAmounts] = useState<string[]>([]);
  const [promoDuration, setDuration] = useState('');
  const [promoDonationAddress, promoSetDonationAddress] = useState('');
  const [promoDonationAmount, promoSetDonationAmount] = useState('');
  
  // scaffoldWrite for createPromotion
  const { writeAsync: createPromotionWriteAsync, isLoading } = useScaffoldContractWrite({
    contractName: "Wander", // Update with your contract name
    functionName: "createPromotion",
    args: [
      tiers, // Pass tiers as an array of strings
      tierAmounts.map(value => BigInt(value)), // Convert tierAmounts to wei
      promoDuration,
      promoDonationAddress,
      promoDonationAmount, // Convert donationAmount to wei (assuming 18 decimals)
    ],
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

  // handleSubmit for createPromotion
  const handleSubmitCreatePromotion = async (e: FormEvent) => {
    e.preventDefault(); // Prevent page refresh

    // Your form submission logic here
    // For example, call writeAsync
    await createPromotionWriteAsync();

    // Clear the form fields after submission if needed
    setTiers([]);
    setTierAmounts([]);
    setDuration('');
    promoSetDonationAddress('');
    promoSetDonationAmount('');
  };

  // field values for setDonationAddress
  const [setDonationAddress, setSetDonationAddress] = useState('');

   // scaffoldWrite for setDonationAddress
   const { writeAsync : asyncSetDonationAddress } = useScaffoldContractWrite({
    contractName: "Wander",
    functionName: "setDonationAddress",
    args: [setDonationAddress],
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
  // handleSubmit for setDonationAddress
  const handleSubmitSetDonationAddress = async (e: FormEvent) => {
    e.preventDefault(); // Prevent page refresh

    await asyncSetDonationAddress();

    setSetDonationAddress('');
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
    // Form for createPromotion
    <form className="flex flex-col items-center justify-center gap-3" onSubmit={handleSubmitCreatePromotion}>
      {/* Input field for tiers */}
      <div>
        <label className="text-center font-bold">Tiers (Comma-separated IPFS hashes)</label>
        <input
          className="input input-bordered w-full max-w-xs mb-7"
          type="text"
          value={tiers.join(',')}
          onChange={(e) => setTiers(e.target.value.split(','))}
        />
      </div>

      {/* Input field for tierAmounts */}
      <div>
        <label className="text-center font-bold">Tier Amounts (Comma-separated values)</label>
        <input
          className="input input-bordered w-full max-w-xs mb-7"
          type="text"
          value={tierAmounts.join(',')}
          onChange={(e) => setTierAmounts(e.target.value.split(','))}
        />
      </div>

      {/* Input field for duration */}
      <div>
        <label className="text-center font-bold">Duration (in days)</label>
        <input
          className="input input-bordered w-full max-w-xs mb-7"
          type="number"
          value={promoDuration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      {/* Input field for donationAddress */}
      <div>
        <label className="text-center font-bold">Donation Address</label>
        <input
          className="input input-bordered w-full max-w-xs mb-7"
          type="text"
          value={promoDonationAddress}
          onChange={(e) => promoSetDonationAddress(e.target.value)}
        />
      </div>

      {/* Input field for donationAmount */}
      <div>
        <label className="text-center font-bold">Donation Amount (%)</label>
        <input
          className="input input-bordered w-full max-w-xs mb-7"
          type="number"
          value={promoDonationAmount}
          onChange={(e) => promoSetDonationAmount(e.target.value)}
        />
      </div>

      <button className="bg-primary btn btn-primary mt-5 mb-0" type="submit">
        Create Promotion
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
        <label className="text-center font-bold">Amount (in ETH)</label>
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