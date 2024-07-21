"use client";
import { Coin } from "@/type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { setNumber } from "@/features/activeCard/activeCardSlice";
import { setCoins } from "@/features/coins/coinsSlice";
import { useRouter } from "next/navigation";
import { addRecentWatchList } from "@/features/recentList/recentListSlice";
import Cookies from "js-cookie";
import axios from "axios";
const CoinsList = () => {
  const CACHE_KEY = "coins_cache";
  const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const number = useSelector((state: RootState) => state.number.value);
  const coins = useSelector((state: RootState) => state.coins.coins) || [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
    const fetchCoins = async () => {
      console.log("Fetching coins from API");
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc",
        // {
        //   headers: {
        //     "x-cg-pro-api-key": `${apiKey}`,
        //   },
        // }
      );

      const repo: Coin[] = await res.json();
      // Cache the fetched data with the current timestamp
      console.log("Setting cookies with fetched data")
      console.log(apiKey)
      Cookies.set(
        "cookies_main",
        JSON.stringify({ timestamp: Date.now(), data: repo }),
        { expires: 1 / 288 }
      ); // 1/288 days = 5 minutes
      dispatch(setCoins(repo));
    };

    const cachedData = Cookies.get("cookies_main");
    console.log("Cached data retrieved:", cachedData);
    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRY_TIME) {
        console.log("Using cached data");
        
        dispatch(setCoins(data));
      } else {
        console.log("Cached data expired, fetching new data");
        fetchCoins();
      }
    } else {
      console.log("No cached data, fetching new data");
      fetchCoins();
    }
  }, []);
 
  if (!coins) {
    return <div>No data available</div>;
  }
  // Calculate the coins to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedCoins = coins.slice(startIndex, startIndex + itemsPerPage);

  // Function to handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(coins.length / itemsPerPage);

  return (
    <div>
      <div className="p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Trending Market</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm border-b">
              <th className="px-4 py-2">Token</th>
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Last Price</th>
              <th className="px-4 py-2">24H Change</th>
              <th className="px-4 py-2">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {selectedCoins.map((token, index) => (
              <tr
                onClick={() => {
                  dispatch(addRecentWatchList(coins[startIndex + index]));
                  router.push(`/coins?id=${token.id}`);
                }}
                key={index}
                className="text-gray-200 text-sm hover:bg-gray-200 dark:hover:bg-slate-900 rounded-sm cursor-grab active:opacity-0.7 border-1 border-solid border-[#1111] dark:border-white"
                draggable
                onDragStart={() => {
                  dispatch(setNumber(startIndex + index));
                }}
                onDragEnd={() => {
                  dispatch(setNumber(-1));
                }}
              >
                <td className="px-4 py-2 flex gap-2">
                  <Image
                    src={token.image}
                    alt={token.name}
                    width={25}
                    height={25}
                  />
                  {token.name}
                </td>
                <td className="px-4 py-2">{token.symbol}</td>
                <td className="px-4 py-2">${token.current_price}</td>
                <td
                  className={`px-4 py-2 ${
                    token.price_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  <div className="flex gap-2 align-middle">
                    {token.price_change_percentage_24h < 0 ? (
                      <FaArrowDown />
                    ) : (
                      <FaArrowUp />
                    )}
                    {token.price_change_percentage_24h}
                  </div>
                </td>
                <td className="px-4 py-2">{token.market_cap}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoinsList;
