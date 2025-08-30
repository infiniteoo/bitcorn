"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "00:00", price: 59000 },
  { time: "04:00", price: 59500 },
  { time: "08:00", price: 60000 },
  { time: "12:00", price: 59800 },
  { time: "16:00", price: 60200 },
  { time: "20:00", price: 60500 },
  { time: "24:00", price: 60000 },
];

const PriceChart: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 text-white">
      <h2 className="text-xl font-semibold mb-4">Bitcoin Price Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#f97316"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
