// import Link from "next/link";
import type { NextPage } from "next";
// import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
// import { MetaHeader } from "~~/components/MetaHeader";
// import { useAccount } from "wagmi";
// import { Address } from '~~/components/scaffold-eth';
import { ethers } from 'ethers';
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import React, { useState, FormEvent } from 'react'; // Import FormEvent

// ...

const paymentPage: NextPage = () => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "Wander",
    functionName: "sendEther",
    args: [field1],
    value: ethers.formatEther(1),
    blockConfirmations: 1,
    onBlockConfirmation: (txnReceipt) => {
      console.log("Transaction block hash ", txnReceipt.blockHash);
    },
  });

  // Define a submit handler function
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent page refresh

    // Your form submission logic here
    // For example, call writeAsync
    await writeAsync();

    // Clear the form fields after submission if needed
    setField1('');
    setField2('');
  };

  return (
    <form className="flex flex-col items-center justify-center gap-3" onSubmit={handleSubmit}>
      <div>
        <label className="text-center font-bold">Vendor Address</label>
        <input
          className="input input-bordered w-full max-w-xs mb-7"
          type="text"
          value={field1}
          onChange={(e) => setField1(e.target.value)}
        />
      </div>
      <div>
        <label className="text-center font-bold">Amount (in ETH)</label>
        <input
          className="input input-bordered w-full max-w-xs mb-7"
          type="number"
          value={field2}
          onChange={(e) => setField2(e.target.value)}
        />
      </div>
      <button className="bg-primary btn btn-primary mt-5 mb-0" type="submit">
        Make Payment
      </button>
    </form>
  );
};


export default paymentPage;