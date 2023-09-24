import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/example-ui/ContractData";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";

const New_Page: NextPage = () => {
  return (
    <>
      <MetaHeader>
        {/* We are importing the font this way to lighten the size of SE2. */}
      </MetaHeader>
      <h1>New page</h1>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <ContractInteraction />
        <ContractData />
      </div>
    </>
  );
};

export default New_Page;
