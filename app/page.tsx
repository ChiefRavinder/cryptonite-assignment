import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ThemeToggler/ThemeToggler";
import CoinsList from "@/components/CoinsList/CoinsList";
import Graph from "@/components/Graph/Graph";
// import LineChartComponent from "@/components/LineChart/LineChart";
import CoinPriceChart from "@/components/LineChart/LineChart";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import RecentlyViewed from "@/components/RecentlyViewed/RecentlyViewed";
import WatchList from "@/components/WatchList/WatchList";
import Navbar from "@/components/Navbar/Navbar";
import { Providers } from "@/Providers/Providers";
import Link from "next/link";

export default function Home() {
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

  return (
    <>
      {/* <div className="text-black dark:text-white">welcome</div> */}

      <div className="mx-8">
        <div className="flex flex-1 justify-between gap-5">
          <div>
            <div className="w-full">
              <CoinPriceChart coinIds={["bitcoin","ethereum"]} />
            </div>
            <div className="relative">
              <CoinsList />
              <Link href="/explore">
                <span className="absolute top-2 right-2 flex justify-end hover:text-green-500">
                  View More
                </span>
              </Link>
            </div>
          </div>
          <div className="flex-col gap-10">
            <RecentlyViewed />
            <WatchList />
          </div>
        </div>
      </div>
    </>
  );
}
