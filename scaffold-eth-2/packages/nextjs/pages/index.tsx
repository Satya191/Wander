// import Link from "next/link";
import type { NextPage } from "next";
// import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { useAccount } from "wagmi";
import { Address } from '~~/components/scaffold-eth';
import React, { useState } from 'react';


const Home: NextPage = () => {

  const [show, setShow] = useState<boolean>(true);
  const [newText, setNewText] = useState<boolean>(true);


  //uploadform
  const Upload = () => {

    return ( 
        <>
          <form className="flex flex-col items-center justify-center gap-3">
            <label className="text-left font-bold">Promotion Name:</label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <label className="text-left font-bold">Tier:</label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-7" />
            <input type="file" className="file-input w-full max-w-xs" />
            <button className="bg-primary btn btn-primary mt-5 mb-0">Upload</button>
          </form>
        </>               
    )    
  }

  //upload form message

  const PrintUploadMessage = () => {

    return (
      <>
        <p className="hover:underline hover:cursor-pointer">upload new promotion</p> 
      </>
    )
  }

  //print my promotion text

  const PrintTextMessage = () => {

    return (
      <>
        <p className="hover:underline hover:cursor-pointer">print my promotions</p> 
      </>
    )
  }

  //print promotion display
  const Print = () => {

    return (
      <>
        <h1>print this stuff</h1>
      </>
    )
  }

  //toggle form
  const toggleForm = () => {
  
    setShow((show) => !show);
  };
  
  //toggle text
  const toggleText = () => {

    setNewText((newText) => !newText);
  };


  return (
    <>
      <MetaHeader />
      <div className="text-center m-10">
          <h1 className="text-5xl mb-8">Merchant Account</h1>
          <div className="container mx-auto place-content-center content-between gap-10">
            { show ? <Upload/> : <Print/> }
            { newText ? <PrintTextMessage  /> : <PrintUploadMessage/>} 
          </div>
        </div>
    </>
  );
};

export default Home;

