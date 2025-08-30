import React from "react";

interface BalanceProps {
  btcBalance: number;
  usdBalance: number;
}

const Balance: React.FC<BalanceProps> = ({ btcBalance, usdBalance }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Your Balance</h2>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold text-orange-500">
            {btcBalance.toFixed(8)} BTC
          </p>
          <p className="text-gray-600">${usdBalance.toFixed(2)} USD</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">1 BTC = $60,000</p>
        </div>
      </div>
    </div>
  );
};

export default Balance;
