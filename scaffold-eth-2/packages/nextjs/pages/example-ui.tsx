import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/example-ui/ContractData";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const ExampleUI: NextPage = () => {

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "Wander",
    functionName: "getTiers",
    args:[1],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <h1>GET TIERS FUNCTION CALL</h1>
      <button onClick={() => writeAsync()}>getTiers</button>

      



      
      
    </>
  );
};

export default ExampleUI;
