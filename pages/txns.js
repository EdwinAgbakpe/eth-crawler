import ReactPaginate from 'react-paginate';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import TxnTable from '../components/TxnTable';
// import { } from 'dotenv/config';

const Txns = ({ data, currPage }) => {
  const { result } = data;
  const router = useRouter();
  const paginationHandler = (page) => {
    const currentPath = router.pathname;
    const currentQuery = { ...router.query }; // Copy current query to avoid its removing
    currentQuery.page = page.selected + 1;
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
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
      <div className="mx-16">
        {isLoading ? <h1>Loading...</h1>
          : (
            <TxnTable
              data={result}
            />
          )}
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          breakClassName="break-me"
          activeClassName="active bg-charcoal text-md text-linen font-medium py-2 px-4 rounded-full"
          previousClassName="text-md bg-green hover:bg-green-400 focus:shadow-outline focus:outline-none text-linen font-medium py-2 px-4 rounded-full"
          nextClassName="text-md bg-green hover:bg-green-400 focus:shadow-outline focus:outline-none text-linen font-medium py-2 px-4 rounded-full"
          containerClassName="pagination -mx-auto p-8 flex justify-center"
          // subContainerClassName="px-8 mx-4 flex items-center"
          pageClassName="mx-4 text-md text-linen font-medium py-2 px-4"
          pageLinkClassName="text-linen"
          initialPage={currPage - 1}
          pageCount={100}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={paginationHandler}
        />
      </div>

    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { API_KEY } = process.env;
  const {
    address, startblock, endblock, page,
  } = context.query;
  const currPage = page || 1;
  const res = await fetch(
    `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${startblock}&endblock=${endblock}&page=${currPage}&offset=10&sort=asc&apikey=${API_KEY}`,
  );
  const data = await res.json();
  console.log(data.message);
  return { props: { data, currPage } };
}

export default Txns;
