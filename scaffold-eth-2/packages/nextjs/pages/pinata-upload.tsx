import type { NextPage } from "next";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import React, { useState } from 'react';

// We first define the React component's props shape.
interface MyFormProps {
  customButtonText: string;
}

const MyForm: React.FC<MyFormProps> = ({ customButtonText }) => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');

  // Here we call the Hook and set its values directly within `MyForm` component.
  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
  // @TODO
  contractName:"Wander",
  functionName:"sendEther",
  args: [field1],
  value: field2 as `${number}`, // This is IN ETH.
  blockConfirmations:1,
  onBlockConfirmation: (txnReceipt) => {
    console.log("Transaction block hash ", txnReceipt.blockHash);
  },
});

  // React automatically calls onSubmit whenever the form is submitted.
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading && !isMining) {
      writeAsync();  // Call the asynchronous write function provided by `useScaffoldContractWrite`.
    }
  };

  return (
      <form className="flex flex-col items-center justify-center gap-3" >
          <div>
              <label className="text-center font-bold">Vendor Address</label>
              <input className="input input-bordered w-full max-w-xs mb-7" type="text" value={field1} onChange={(e) => setField1(e.target.value)} />
          </div>
          <div>
              <label className="text-center font-bold">Amount (in ETH)</label>
              <input className="input input-bordered w-full max-w-xs mb-7" type="text" value={field2} onChange={(e) => setField2(e.target.value)} />
          </div>
          <button className="bg-primary btn btn-primary mt-5 mb-0" type="submit">{customButtonText}</button>
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
      <MyForm customButtonText = "Make Payment!"/>
    </div>
  )
};

export default ParentComponent;