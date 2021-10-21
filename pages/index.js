import Layout from '../components/Layout';
import TxSearchCard from '../components/TxSearchCard';
import BlnCheckCard from '../components/BlnCheckCard';

const Home = () => (
  <Layout>
    <h1 className="text-3xl md:text-4xl lg:text-6xl text-center mx-4 md:mx-24 lg:mx-72 font-bold mt-24 lg:mt-48">
      Keep Track Of Your Ether Wallet!
    </h1>
    <div className="md:grid lg:grid-cols-2 md:justify-items-center mx-4 md:mx-36 lg:mx-72 mt-12 md:mt-18 lg:mt-24">
      <TxSearchCard />
      <BlnCheckCard />
    </div>
  </Layout>
);

export default Home;
