// import Link from "next/link";
import type { NextPage } from "next";
// import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
// import { MetaHeader } from "~~/components/MetaHeader";
// import { useAccount } from "wagmi";
// import { Address } from '~~/components/scaffold-eth';
import React, { useState } from 'react';

// We first define the React component's props shape.
interface MyFormProps {
  onSubmit: (field1: string, field2: string) => void;
}

const MyForm: React.FC<MyFormProps> = ({onSubmit }) => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');

  return (
      <form className="flex flex-col items-center justify-center gap-3" onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          onSubmit(field1, field2);
      }}>
          <div>
              <label className="text-center font-bold">Vendor Address</label>
              <input className="input input-bordered w-full max-w-xs mb-7" type="text" value={field1} onChange={(e) => setField1(e.target.value)} />
          </div>
          <div>
              <label className="text-center font-bold">Amount (in ETH)</label>
              <input className="input input-bordered w-full max-w-xs mb-7" type="text" value={field2} onChange={(e) => setField2(e.target.value)} />
          </div>
          <button className="bg-primary btn btn-primary mt-5 mb-0" type="submit">Make payment!</button>
      </form>
  );
};

// Define your parent component here and call/instantiate MyForm.
const ParentComponent: NextPage = () => {

  const customSubmitFunction = (field1: string, field2: string) => {
    // Here you can handle submitted values from the form's fields.
    console.log(field1, field2);
  };

  return (
    <div>
      <MyForm onSubmit={customSubmitFunction}/>
    </div>
  )
};

export default ParentComponent;