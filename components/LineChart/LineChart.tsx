"use client";
import React, { useState } from "react";
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
} from "chart.js";
import { Line } from "react-chartjs-2";
import { MdAdd, MdRemove } from "react-icons/md";

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

interface CoinPriceChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const CoinPriceChart: React.FC<CoinPriceChartProps> = (props) => {
  const [chartData, setChartData] = useState({
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
    ],
    datasets: [
      {
        data: [22, 45, 23, 41, 18, 11, 32, 31, 63, 54, 45, 49, 54, 36],
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
      {
        data: [30, 25, 35, 21, 28, 21, 22, 31, 53, 64, 35, 29, 44, 26],
        pointRadius: 0,
        pointHoverRadius: 2,
        tension: 0.4,
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 250);
          gradient.addColorStop(0, "rgba(237,56,91,0.45)");
          gradient.addColorStop(1, "rgba(237,56,91,0.0)");
          return gradient;
        },
        borderColor: "rgba(237,56,91,255)",
        fill: true,
      },
    ],
  });

  const additionalLines: { [key: string]: number[] } = {
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

  const options = {
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

  return (
    <div {...props} className="relative">
      <Line id="myChart" data={chartData} options={options} />
      <div className="absolute top-0 right-0 p-2">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className=" p-1 bg-white bg-opacity-30 border border-black dark:border-white border-opacity-20 rounded-lg shadow-lg backdrop-blur-lg text-white transition-transform transform hover:scale-105"
        >
          <MdAdd className="text-gray-600 dark:text-white" size={15} />
        </button>

        {showDropdown && (
          <div className=" absolute mt-2 bg-white border border-gray-300 rounded shadow-lg">
            <select
              value={selectedLine}
              onChange={handleLineChange}
              className="px-4 py-2 border-b border-gray-300 w-48 "
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
        {/* <button
          onClick={removeLine}
          className="mt-2 p-2 bg-red-500 text-white rounded"
        >
          <MdRemove size={10} />
        </button> */}
      </div>
    </div>
  );
};

export default CoinPriceChart;
