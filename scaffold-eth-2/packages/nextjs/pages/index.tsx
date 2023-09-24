import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import React, { useState } from 'react';


const Home: NextPage = () => {

  const [show, setShow] = useState<boolean>(true);


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
            <div className="space-x-4">
              <button className="bg-primary btn btn-primary mt-5 mb-0">Upload</button>
              <button onClick={()=> setShow(!show)} className="bg-primary btn btn-primary mt-5 mb-0">Print</button>
            </div>
            
          </form>
        </>               
    )    
  }

  //print promotion display
  const Print = () => {

    return (
      <>
        <h1>print this stuff</h1>
        <div className="space-x-4">
         <button className="bg-primary btn btn-primary mt-5 mb-0">Print</button>
          <button onClick={()=> setShow(!show)} className="bg-primary btn btn-primary mt-5 mb-0">Upload</button>
        </div>
      </>
    )
  }

  return (
    <>
      <MetaHeader />
      <div className="text-center m-10">
          <h1 className="text-5xl mb-8">Merchant Account</h1>
          <div className="container mx-auto place-content-center content-between gap-10">
            { show ? <Upload/> : <Print/> }
          </div>
        </div>
    </>
  );
};

export default Home;

