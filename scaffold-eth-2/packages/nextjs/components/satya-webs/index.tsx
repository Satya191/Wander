import { useState } from "react";
import { useRouter } from "next/router";
import { isAddress, isHex } from "viem";
import { usePublicClient } from "wagmi";
import { hardhat } from "wagmi/chains";

export const SearchBar = () => {

  return (
    <form className="flex items-center justify-end mb-5 space-x-3 mx-5">
      <input
        className="border-primary bg-base-100 text-base-content p-2 mr-2 w-full md:w-1/2 lg:w-1/3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-accent"
        type="text"
        placeholder="Search by hash or address"
      />
      <button className="btn btn-sm btn-primary" type="submit">
        Search
      </button>
    </form>
  );
};
