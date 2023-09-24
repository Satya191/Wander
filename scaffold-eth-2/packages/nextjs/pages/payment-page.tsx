// import Link from "next/link";
import type { NextPage } from "next";
// import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
// import { MetaHeader } from "~~/components/MetaHeader";
// import { useAccount } from "wagmi";
// import { Address } from '~~/components/scaffold-eth';
import { ethers } from 'ethers';
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import React, { useState, FormEvent } from 'react'; // Import FormEvent

const paymentPage: NextPage = () => {
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
  );
};

export default paymentPage;