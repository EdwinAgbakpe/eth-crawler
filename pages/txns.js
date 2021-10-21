/* eslint-disable no-await-in-loop */
import ReactPaginate from 'react-paginate';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import TxnTable from '../components/TxnTable';
// import { } from 'dotenv/config';

const Txns = ({ txns }) => {
  const router = useRouter();
  const [currPage, setCurrPage] = useState(0);
  const perPage = 10;
  const offset = currPage * perPage;
  const pageCount = Math.ceil(txns.length / perPage);
  const shownData = txns.slice(offset, offset + perPage);

  const paginationHandler = ({ selected: selectedPage }) => {
    setCurrPage(selectedPage);
  };

  // const [txType, setTxType] = useState(router.query.txType);

  const setRoute = (tx) => {
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    currentQuery.txType = tx;
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  const nmTxHandler = async (e) => {
    e.preventDefault();
    // setTxType('txlist');
    setRoute('txlist');
  };

  const inTxHandler = async (e) => {
    e.preventDefault();
    // setTxType('txlistinternal');
    setRoute('txlistinternal');
  };

  const [isLoading, setLoading] = useState(false); // State for loading indicator
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  // Since requests happens after chaning routes url ?page={n} we need to bind loading events
  // on the router change event.
  useEffect(() => { // Setting router event handlers after component is located
    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', stopLoading);

    return () => {
      router.events.off('routeChangeStart', startLoading);
      router.events.off('routeChangeComplete', stopLoading);
    };
  }, []);

  return (
    <Layout>
      <div className="mx-4 md:mx-8 lg:mx-16">
        {isLoading ? <h1>Loading...</h1>
          : (
            <div>
              <div className="mx-auto flex justify-left px-4 pt-16 pb-4 md:py lg:py">
                <button
                  className="text-xl bg-green hover:bg-green-400 focus:shadow-outline focus:outline-none text-linen font-medium py-2 px-4 rounded-full"
                  type="button"
                  onClick={nmTxHandler}
                >
                  Normal
                </button>
                <button
                  className="mx-8 text-xl bg-green hover:bg-green-400 focus:shadow-outline focus:outline-none text-linen font-medium py-2 px-4 rounded-full"
                  type="button"
                  onClick={inTxHandler}
                >
                  Internal
                </button>
              </div>
              <div className="w-full overflow-x-scroll">
                <TxnTable
                  data={shownData}
                />
              </div>
              <div className="grid justify-center">
                <ReactPaginate
                  previousLabel="<"
                  nextLabel=">"
                  breakLabel="..."
                  breakClassName="break-me"
                  activeLinkClassName="active bg-charcoal text-md text-linen font-medium py-2 px-2 rounded-full"
                  previousLinkClassName="text-sm md:text-md bg-green text-linen font-medium py-2 px-4 rounded-full"
                  nextLinkClassName="text-sm md:text-md bg-green text-linen font-medium py-2 px-4 rounded-full"
                  containerClassName="pagination -mx-auto p-8 flex justify-center"
          // subContainerClassName="px-8 mx-4 flex items-center"
                  pageClassName=""
                  pageLinkClassName="text-linen mx-4 text-md text-linen font-medium py-2 px"
                  pageCount={pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={1}
                  onPageChange={paginationHandler}
                />
              </div>
            </div>
          )}
      </div>

    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { API_KEY } = process.env;
  const {
    address, startblock, endblock, txType,
  } = context.query;
  const action = txType;
  const res = await fetch(
    `https://api.etherscan.io/api?module=account&action=${action}&address=${address}&startblock=${startblock}&endblock=${endblock}&page=1&offset=10000&sort=desc&apikey=${API_KEY}`,
  );
  const data = await res.json();
  const txns = data.result;

  return { props: { txns } };
}

export default Txns;
