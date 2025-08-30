"use client";

import React, { useState } from "react";

const ActionButtons: React.FC = () => {
  const [showBuy, setShowBuy] = useState(false);
  const [showSell, setShowSell] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);

  const handleBuy = () => {
    alert("Buy functionality - integrate with payment gateway");
    setShowBuy(false);
  };

  const handleSell = () => {
    alert("Sell functionality - integrate with exchange");
    setShowSell(false);
  };

  const handleTransfer = () => {
    alert("Transfer functionality - integrate with wallet");
    setShowTransfer(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 text-white">
      <h2 className="text-xl font-semibold mb-4">Actions</h2>
      <div className="flex gap-4">
        <button
          onClick={() => setShowBuy(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Buy Bitcoin
        </button>
        <button
          onClick={() => setShowSell(true)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sell Bitcoin
        </button>
        <button
          onClick={() => setShowTransfer(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Transfer
        </button>
      </div>

      {showBuy && (
        <div className="mt-4 p-4 border border-gray-600 rounded bg-gray-700">
          <h3 className="font-semibold">Buy Bitcoin</h3>
          <input
            type="number"
            placeholder="Amount in USD"
            className="border border-gray-600 p-2 w-full mt-2 bg-gray-700 text-white"
          />
          <button
            onClick={handleBuy}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Confirm Buy
          </button>
          <button
            onClick={() => setShowBuy(false)}
            className="ml-2 px-4 py-2 rounded mt-2 bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}

      {showSell && (
        <div className="mt-4 p-4 border border-gray-600 rounded bg-gray-700">
          <h3 className="font-semibold">Sell Bitcoin</h3>
          <input
            type="number"
            placeholder="Amount in BTC"
            className="border border-gray-600 p-2 w-full mt-2 bg-gray-700 text-white"
          />
          <button
            onClick={handleSell}
            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
          >
            Confirm Sell
          </button>
          <button
            onClick={() => setShowSell(false)}
            className="ml-2 px-4 py-2 rounded mt-2 bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}

      {showTransfer && (
        <div className="mt-4 p-4 border border-gray-600 rounded bg-gray-700">
          <h3 className="font-semibold">Transfer Bitcoin</h3>
          <input
            type="text"
            placeholder="Recipient Address"
            className="border border-gray-600 p-2 w-full mt-2 bg-gray-700 text-white"
          />
          <input
            type="number"
            placeholder="Amount in BTC"
            className="border border-gray-600 p-2 w-full mt-2 bg-gray-700 text-white"
          />
          <button
            onClick={handleTransfer}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Confirm Transfer
          </button>
          <button
            onClick={() => setShowTransfer(false)}
            className="ml-2 px-4 py-2 rounded mt-2 bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
