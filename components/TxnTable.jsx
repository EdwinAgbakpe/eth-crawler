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
                  <th className="px-6 py-2 text-xl text-center">Txn Hash</th>
                  <th className="px-6 py-2 text-xl text-center">Block</th>
                  <th className="px-6 py-2 text-xl text-center">Date</th>
                  <th className="px-6 py-2 text-xl text-center">From</th>
                  <th className="px-6 py-2 text-xl text-center">To</th>
                  <th className="px-6 py-2 text-xl text-center">Ether</th>
                </tr>
              </thead>
              <tbody className="bg-charcoal">
                {data.map((txn, index) => (
                  <tr key={index} className="font-light">
                    <td className=" px-6 py-4 text-sm text-center">{txn.hash}</td>
                    <td className=" px-6 py-4 text-sm text-center">{txn.blockNumber}</td>
                    <td className=" px-6 py-4 text-sm text-center">{new Date(txn.timeStamp * 1000).toDateString()}</td>
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
