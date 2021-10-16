import type { NextPage } from "next";
import Layout from "../components/Layout";
import TxSearchCard from "../components/TxSearchCard";
import BlnCheckCard from "../components/BlnCheckCard";

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-6xl text-center mx-72 font-bold">
        Some line bi here to make it seem like this whole site has a point!
      </h1>
      <div className="grid grid-cols-2 justify-items-center mx-72 mt-24">
        <TxSearchCard />
        <BlnCheckCard />
      </div>
    </Layout>
  );
};

export default Home;
