/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import Layout from '../components/Layout';

const Balance = ({ balance, prevBalance, date }) => {
  const dateString = new Date(date).toDateString();
  return (
    <Layout>
      <div className="p-4 mx-auto bg-charcoal">
        <h1 className="py-2">
          Balance:
          {' '}
          {balance}
          {' '}
          ETH
        </h1>
        <h1 className="py-2">
          {' '}
          Balance on
          {' '}
          {dateString}
          :
          {' '}
          {prevBalance}
          {' '}
          ETH
        </h1>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { API_KEY } = process.env;
  const { address, date } = context.query;
  const nowStamp = Math.floor(new Date(Date.now()).getTime() / 1000);
  const timeStamp = new Date(date).getTime() / 1000;
  let res = await fetch(
    `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${API_KEY}`,
  );
  let data = await res.json();
  const balance = (data.result / 1000000000000000000);
  res = await fetch(
    `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timeStamp}&closest=before&apikey=${API_KEY}`,
  );
  data = await res.json();
  const startblock = data.result;
  res = await fetch(
    `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${nowStamp}&closest=before&apikey=${API_KEY}`,
  );
  data = await res.json();
  const endblock = data.result;
  let prevBalance = 0;
  let page = 1;
  let status = true;
  for (page; status === true; page++) {
    const rp = await fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${startblock}&endblock=${endblock}&page=${page}&offset=1000&sort=asc&apikey=${API_KEY}`,
    );
    data = await rp.json();
    const txns = data.result;
    // console.log(txns);
    if (data.status === '1') {
      txns.forEach((txn) => {
        if (txn.from === address) {
          console.log('pass');
          prevBalance += (txn.value / 1000000000000000000)
          + (txn.gasPrice / 1000000000000000000) * txn.gasUsed;
        } else if (txn.to === address) {
          prevBalance -= (txn.value / 1000000000000000000)
          - (txn.gasPrice / 1000000000000000000) * txn.gasUsed;
        }
      });
    } else {
      status = false;
    }
  }
  return { props: { balance, prevBalance, date } };
}

export default Balance;
