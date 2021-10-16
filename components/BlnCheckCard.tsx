export default function BlnCheckCard() {
  return (
    <div className="w-full max-w-md">
      <form className="bg-charcoal shadow-md rounded-3xl px-8 pt-6 pb-8">
        <div className="mb-4">
          <h1 className="text-5xl text-center">View Account Balance</h1>
        </div>
        <div className="mb-6">
          <label className="block text-xl font-medium mb-2" htmlFor="address">
            Wallet Address (required)
          </label>
          <input
            className="shadow-inner bg-linen appearance-none border-2 h-12 border-umber rounded-2xl w-full py-2 px-3 text-fogra leading-tight focus:outline-none"
            id="address"
            type="text"
            placeholder=""
          />
        </div>
        <div className="mb-12">
          <label className="block text-xl font-medium mb-2" htmlFor="date">
            Date (required)
          </label>
          <input
            className="shadow-inner bg-linen appearance-none border-2 h-12 border-umber rounded-2xl w-3/7 py-2 px-3 te text-fogra leading-tight focus:outline-none"
            id="date"
            type="date"
          />
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3" />
          <div className="md:w-2/3">
            <button
              className="shadow h-12 w-36 text-xl bg-green hover:bg-green-400 focus:shadow-outline focus:outline-none text-linen font-medium py-2 px-4 rounded-2xl"
              type="button"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
