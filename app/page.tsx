import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ThemeToggler/ThemeToggler";
import CoinsList from "@/components/CoinsList/CoinsList";
import Graph from "@/components/Graph/Graph";
import LineChartComponent from "@/components/LineChart/LineChart";
import RecentlyViewed from "@/components/RecentlyViewed/RecentlyViewed";
import WatchList from "@/components/WatchList/WatchList";
import Navbar from "@/components/Navbar/Navbar";
export default function Home() {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {/* <div className="text-black dark:text-white">welcome</div> */}
      <Navbar />
      <div className="mx-8">
        <div className="flex flex-1 justify-between gap-5">
          <div>
            <div className="h-[55vh]">
              {/* <Graph /> */}
              <LineChartComponent />
            </div>
            <CoinsList />
          </div>
          <div className="flex-col gap-10">
            <RecentlyViewed />
            <WatchList />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
