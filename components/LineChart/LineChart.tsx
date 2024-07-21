"use client";
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ScriptableContext,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { MdAdd, MdRemove } from "react-icons/md";
import axios from "axios";

ChartJS.register(
  ArcElement,
  Tooltip,
  Filler,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

interface CoinPriceChartProps extends React.HTMLAttributes<HTMLDivElement> {
  coinId: string; // Add coinId to props
}

const timeRanges: Record<string, number> = {
  "1D": 1,
  "5D": 5,
  "1M": 30,
  "3M": 90,
  "6M": 180,
  YTD: (new Date().getFullYear() - 1970) * 365,
  "1Y": 365,
};

const CoinPriceChart: React.FC<CoinPriceChartProps> = ({ coinId, ...props }) => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  const [selectedRange, setSelectedRange] = useState<string>("1M");
  const additionalLines: Record<string, number[]> = {
    "Line A": [18, 28, 39, 49, 38, 27, 36, 45, 55, 43, 32, 21, 19, 10],
    "Line B": [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
  };

  const [selectedLine, setSelectedLine] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleLineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLine(event.target.value);
  };

  const addLine = () => {
    if (!selectedLine) return;
    const randomLine = additionalLines[selectedLine];
    const newDataset = {
      data: randomLine,
      pointRadius: 0,
      pointHoverRadius: 2,
      tension: 0.4,
      backgroundColor: (context: ScriptableContext<"line">) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, "rgba(56,237,91,0.45)");
        gradient.addColorStop(1, "rgba(56,237,91,0.0)");
        return gradient;
      },
      borderColor: "rgba(56,237,91,255)",
      fill: true,
    };
    setChartData((prevData) => ({
      ...prevData,
      datasets: [...prevData.datasets, newDataset],
    }));
    setShowDropdown(false);
  };

  const removeLine = () => {
    setChartData((prevData) => {
      const newDatasets = prevData.datasets.slice(0, -1);
      return {
        ...prevData,
        datasets: newDatasets,
      };
    });
  };

  const options: ChartOptions<"line"> = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const value = tooltipItem.raw;
            return `Value: ${value}`;
          },
        },
      },
    },
  };

  const fetchChartData = async () => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    try {
      const today = new Date();
      const to = Math.floor(today.getTime() / 1000);
      const daysAgo = timeRanges[selectedRange] || 30;
      const from = Math.floor(today.setDate(today.getDate() - daysAgo) / 1000);

      const vsCurrency = "usd";

      const response = await axios.get<{
        prices: [number, number][];
      }>(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range`,
        {
          params: {
            vs_currency: vsCurrency,
            from,
            to,
          },
          headers: {
            "x-cg-pro-api-key": apiKey,
          },
        }
      );

      const { prices } = response.data;

      const labels = prices.map((price) =>
        new Date(price[0]).toLocaleDateString()
      );
      const priceData = prices.map((price) => price[1]);

      setChartData({
        labels,
        datasets: [
          {
            data: priceData,
            pointRadius: 0,
            pointHoverRadius: 2,
            tension: 0.4,
            backgroundColor: (context: ScriptableContext<"line">) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 250);
              gradient.addColorStop(0, "rgba(91,56,237,0.45)");
              gradient.addColorStop(1, "rgba(91,56,237,0.0)");
              return gradient;
            },
            borderColor: "rgba(91,56,237,255)",
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [selectedRange, coinId]); // Add coinId to dependency array

  return (
    <div {...props} className="relative w-full h-auto"> {/* Added height */}
  <div className="absolute bottom-[-3rem] right-0 p-2">
    <select
      value={selectedRange}
      onChange={(e) => setSelectedRange(e.target.value)}
      className="px-4 py-2 border-b border-gray-300"
    >
      {Object.keys(timeRanges).map((range) => (
        <option key={range} value={range}>
          {range}
        </option>
      ))}
    </select>
  </div>
  <Line
    className="w-full"
    id="myChart"
    data={chartData}
    options={options}
    style={{ height: '100%' }} // Ensure full height of parent container
  />
  <div className="absolute top-0 right-0 p-2">
    <button
      onClick={() => setShowDropdown(!showDropdown)}
      className="p-1 bg-white bg-opacity-30 border border-black dark:border-white border-opacity-20 rounded-lg shadow-lg backdrop-blur-lg text-white transition-transform transform hover:scale-105"
    >
      <MdAdd className="text-gray-600 dark:text-white" size={15} />
    </button>

    {showDropdown && (
      <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg">
        <select
          value={selectedLine}
          onChange={handleLineChange}
          className="px-4 py-2 border-b border-gray-300 w-48"
        >
          <option value="" disabled>
            Select a line
          </option>
          {Object.keys(additionalLines).map((lineName) => (
            <option key={lineName} value={lineName}>
              {lineName}
            </option>
          ))}
        </select>
        <button
          onClick={addLine}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-b"
        >
          Add Line
        </button>
      </div>
    )}
  </div>
</div>

  );
};

export default CoinPriceChart;
