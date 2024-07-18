"use client"
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  time: string;
  BTC?: number;
  ETH?: number;
  LTC?: number;
  [key: string]: number | string | undefined;
}

const initialData: DataPoint[] = [
  { time: "10:59PM", BTC: 3000, ETH: 3000, LTC: 3000 },
  { time: "11:59PM", BTC: 3200, ETH: 3100, LTC: 3150 },
  { time: "12:59AM", BTC: 3400, ETH: 3300, LTC: 3250 },
  // Add more data points as needed
];

const LineChartComponent: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>(initialData);
  const [coins, setCoins] = useState<string[]>(["BTC", "ETH", "LTC"]);

  const handleAddCoin = (coin: string) => {
    if (!coins.includes(coin)) {
      setCoins([...coins, coin]);
    }
  };

  return (
    <div>
      <button onClick={() => handleAddCoin("NEWCOIN")}>Add New Coin</button>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          {coins.includes("BTC") && (
            <Line
              type="monotone"
              dataKey="BTC"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          )}
          {coins.includes("ETH") && (
            <Line type="monotone" dataKey="ETH" stroke="#82ca9d" />
          )}
          {coins.includes("LTC") && (
            <Line type="monotone" dataKey="LTC" stroke="#ffc658" />
          )}
          {coins.includes("NEWCOIN") && (
            <Line type="monotone" dataKey="NEWCOIN" stroke="#d84315" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
