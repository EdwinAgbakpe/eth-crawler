import { useState } from 'react';
import Router from 'next/router';

export default function TxSearchCard() {
  const [form, setForm] = useState({
    address: '',
    startblock: '',
    endblock: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const url = `/txns?address=${form.address}&startblock=${form.startblock}&endblock=${form.endblock}&txType=txlist`;
      Router.push(url);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg mb-8">
      <form className="bg-charcoal shadow-md rounded-3xl px-8 pt-6 pb-8">
        <div className="mb-2 md:mb-3 lg:mb-4">
          <h1 className="text-2xl md:text-3xl lg:text-5xl text-center">View Transaction History</h1>
        </div>
        <div className="mb-3 md:mb-6">
          <label className="block text-sm md:text-lg lg:text-xl font-medium mb lg:mb-2" htmlFor="address">
            Wallet Address (required)
          </label>
          <input
            className="shadow-inner bg-linen appearance-none border-2 h-12 border-umber rounded-2xl w-full py-2 px-3 text-fogra leading-tight focus:outline-none"
            id="address"
            name="address"
            onChange={handleChange}
            value={form.address}
            type="text"
            placeholder=""
          />
        </div>
        <div className="flex flex-wrap -mx-3 mb-3 md:mb-4 lg:mb-8">
          <div className="w-full md:w-1/2 px-3 mb md:mb-4 lg:md-6 md:mb-0">
            <label
              className="block tracking-wide text-sm md:text-lg lg:text-xl font-medium mb lg:mb-2"
              htmlFor="startblock"
            >
              Start Block
            </label>
            <input
              className="shadow-inner appearance-none block w-full h-12 bg-linen text-fogra border-2 border-umber rounded-2xl py-3 px-4 mb-3 leading-tight"
              id="startblock"
              name="startblock"
              onChange={handleChange}
              value={form.startblock}
              type="number"
              min="0"
              placeholder=""
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb md:mb-4 lg:md-6 md:mb-0">
            <label
              className="block tracking-wide text-sm md:text-lg lg:text-xl font-medium mb lg:mb-2"
              htmlFor="endblock"
            >
              End Block
            </label>
            <input
              className="shadow-inner appearance-none block w-full h-12 bg-linen text-fogra border-2 border-umber rounded-2xl py-3 px-4 leading-tight"
              id="endblock"
              name="endblock"
              onChange={handleChange}
              value={form.endblock}
              type="number"
              min="0"
              placeholder=""
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1/3" />
          <div className="w-1/3">
            <button
              className="shadow h-12 w-full md:w-36 text-md md:text-xl bg-green text-linen font-medium rounded-2xl"
              type="button"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
