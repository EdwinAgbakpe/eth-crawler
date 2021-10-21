export default function TxnTable({ data }) {
  return (
    <div>
      {
      !data ? <h1>No data found</h1>
        : (
          <div>
            <table className="table-fixed">
              <thead className="bg-fogra">
                <tr>
                  <th className="w-2/7 px-6 py-2 text-md md:text-xl font-medium text-center">Txn Hash</th>
                  <th className="w-1/7 px-6 py-2 text-md md:text-xl font-medium text-center">Block</th>
                  <th className="w-1/7 px-6 py-2 text-md md:text-xl font-medium text-center">Date</th>
                  <th className="w-1/7 px-6 py-2 text-md md:text-xl font-medium text-center">From</th>
                  <th className="w-1/7 px-6 py-2 text-md md:text-xl font-medium text-center">To</th>
                  <th className="w-1/7 px-6 py-2 text-md md:text-xl font-medium text-center">ETH</th>
                </tr>
              </thead>
              <tbody className="bg-charcoal">
                {data.map((txn, index) => (
                  <tr key={index} className="font-light">
                    <td className=" px-6 py-4 text-sm text-center">{txn.hash}</td>
                    <td className=" px-6 py-4 text-sm text-center">{txn.blockNumber}</td>
                    <td className=" px-6 py-4 text-sm text-center">{new Date(txn.timeStamp * 1000).toLocaleString()}</td>
                    <td className=" px-6 py-4 text-sm text-center">{txn.from}</td>
                    <td className=" px-6 py-4 text-sm text-center">{txn.to}</td>
                    <td className=" px-6 py-4 text-sm text-center">{txn.value / 1000000000000000000}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
    }

    </div>
  );
}
