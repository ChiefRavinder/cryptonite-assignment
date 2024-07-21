"use client";
import CoinPriceChart from "@/components/LineChart/LineChart";
import RecentlyViewed from "@/components/RecentlyViewed/RecentlyViewed";
import WatchList from "@/components/WatchList/WatchList";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import StatsCard from "@/components/StatCards/StatCard";

// Define the structure of the data object
interface MarketData {
  current_price: {
    usd: number;
  };
  price_change_percentage_24h: number;
  price_change_24h: number;
  market_cap: {
    usd: number;
  };
  total_volume: {
    usd: number;
  };
  max_supply: number | null;
  circulating_supply: number;
}

interface Description {
  en: string;
}

interface ImageData {
  large: string;
}

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: ImageData;
  market_data: MarketData;
  description: Description;
}

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getServerSideProps = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const dataGot: CoinData = await res.json();
        console.log(dataGot);
        setData(dataGot);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getServerSideProps();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  function capitalizeFirstLetter(str: string) {
    if (!str) return str; // Check for empty string
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="mt-2">
      <div className="mx-8">
        <div className="flex flex-1 justify-between gap-5">
          <div>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <Image
                  src={data.image.large}
                  alt={data.name}
                  width={35}
                  height={35}
                />
                {capitalizeFirstLetter(data.id)}
                <span className="text-sm text-gray-500">{data.symbol}</span>
              </div>
              <div className="flex items-center gap-2 ">
                ${data.market_data.current_price.usd}
                <div
                  className={`flex items-center p-1 rounded-md bg-gray-900 ${
                    data.market_data.price_change_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {data.market_data.price_change_24h > 0 ? (
                    <>
                      <FaArrowUp className="text-sm mr-1" />
                      {data.market_data.price_change_percentage_24h}%
                    </>
                  ) : (
                    <>
                      <FaArrowDown className="text-xs mr-1" />
                      <span className="text-xs font-bold">
                        {data.market_data.price_change_percentage_24h}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center my-2">
              <StatsCard
                marketCap={data.market_data.market_cap.usd}
                volume={`$ ${data.market_data.total_volume.usd}`}
                maxSupply={`${data.market_data.max_supply} ${data.symbol}`}
                circulatingSupply={`${data.market_data.circulating_supply} ${data.symbol}`}
              />
            </div>
            <div className="h-[55vh]">
              <CoinPriceChart />
            </div>
            {data.description.en}
          </div>
          <div className="flex-col gap-10">
            <RecentlyViewed />
            <WatchList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
