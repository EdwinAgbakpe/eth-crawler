import Layout from '../components/Layout';
// import { } from 'dotenv/config';

const Balance = ({ data }) => {
  const { result } = data;
  return (
    <Layout>
      <h1>
        Balance:
        {' '}
        {result}
      </h1>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { API_KEY } = process.env;
  const { address, date } = context.query;
  const timeStamp = new Date(date).getTime() / 1000;
  const res = await fetch(
    `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${API_KEY}`,
  );
  const res2 = await fetch(
    `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timeStamp}&closest=before&apikey=${API_KEY}`,
  );
  const data2 = await res2.json();
  const data = await res.json();
  console.log(data);
  console.log(data2);
  return { props: { data } };
}

export default Balance;
