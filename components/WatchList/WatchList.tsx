// src/components/WatchList.tsx
"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setCoins } from '@/features/coins/coinsSlice';
import { Coin } from '@/type';  // Make sure this path is correct

const WatchList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const coins = useSelector((state: RootState) => state.coins.coins);

  const coinsData: Coin[] = [
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      image:
        "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
      current_price: 64756,
      market_cap: 1277461706270,
      market_cap_rank: 1,
      fully_diluted_valuation: 1359877813472,
      total_volume: 29882411037,
      high_24h: 65383,
      low_24h: 63900,
      price_change_24h: 52.52,
      price_change_percentage_24h: 0.08117,
      market_cap_change_24h: -782049009.043457,
      market_cap_change_percentage_24h: -0.06118,
      circulating_supply: 19727284.0,
      total_supply: 21000000.0,
      max_supply: 21000000.0,
      ath: 73738,
      ath_change_percentage: -12.18077,
      ath_date: "2024-03-14T07:10:36.635Z",
      atl: 67.81,
      atl_change_percentage: 95397.77516,
      atl_date: "2013-07-06T00:00:00.000Z",
      roi: null,
      last_updated: "2024-07-18T12:00:16.157Z",
    },
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      image:
        "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
      current_price: 3458.19,
      market_cap: 415753003460,
      market_cap_rank: 2,
      fully_diluted_valuation: 415753003460,
      total_volume: 14721158170,
      high_24h: 3479.73,
      low_24h: 3377.75,
      price_change_24h: 9.76,
      price_change_percentage_24h: 0.28301,
      market_cap_change_24h: 304670059,
      market_cap_change_percentage_24h: 0.07334,
      circulating_supply: 120222728.178312,
      total_supply: 120222728.178312,
      max_supply: null,
      ath: 4878.26,
      ath_change_percentage: -29.11014,
      ath_date: "2021-11-10T14:24:19.604Z",
      atl: 0.432979,
      atl_change_percentage: 798597.61094,
      atl_date: "2015-10-20T00:00:00.000Z",
      roi: {
        times: 70.43340432688413,
        currency: "btc",
        percentage: 7043.340432688414,
      },
      last_updated: "2024-07-18T12:00:18.651Z",
    },
    {
      id: "tether",
      symbol: "usdt",
      name: "Tether",
      image:
        "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
      current_price: 0.999554,
      market_cap: 113581697839,
      market_cap_rank: 3,
      fully_diluted_valuation: 113581697839,
      total_volume: 33106452522,
      high_24h: 1.002,
      low_24h: 0.997016,
      price_change_24h: -0.000361054996255272,
      price_change_percentage_24h: -0.03611,
      market_cap_change_24h: 307866120,
      market_cap_change_percentage_24h: 0.27179,
      circulating_supply: 113632416636.038,
      total_supply: 113632416636.038,
      max_supply: null,
      ath: 1.32,
      ath_change_percentage: -24.45339,
      ath_date: "2018-07-24T00:00:00.000Z",
      atl: 0.572521,
      atl_change_percentage: 74.58812,
      atl_date: "2015-03-02T00:00:00.000Z",
      roi: null,
      last_updated: "2024-07-18T11:55:42.546Z",
    },
    {
      id: "binancecoin",
      symbol: "bnb",
      name: "BNB",
      image:
        "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
      current_price: 574.55,
      market_cap: 88356283653,
      market_cap_rank: 4,
      fully_diluted_valuation: 88356283653,
      total_volume: 728222123,
      high_24h: 580.04,
      low_24h: 564.44,
      price_change_24h: -0.7295094226199126,
      price_change_percentage_24h: -0.12681,
      market_cap_change_24h: -140586071.6415558,
      market_cap_change_percentage_24h: -0.15886,
      circulating_supply: 153856150.0,
      total_supply: 153856150.0,
      max_supply: 200000000.0,
      ath: 717.48,
      ath_change_percentage: -19.95843,
      ath_date: "2024-06-06T14:10:59.816Z",
      atl: 0.0398177,
      atl_change_percentage: 1442169.56995,
      atl_date: "2017-10-19T00:00:00.000Z",
      roi: null,
      last_updated: "2024-07-18T12:01:47.773Z",
    },
    {
      id: "solana",
      symbol: "sol",
      name: "Solana",
      image:
        "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
      current_price: 159.43,
      market_cap: 74018690895,
      market_cap_rank: 5,
      fully_diluted_valuation: 92539281608,
      total_volume: 2504114908,
      high_24h: 161.85,
      low_24h: 155.06,
      price_change_24h: -1.3090625978543926,
      price_change_percentage_24h: -0.81441,
      market_cap_change_24h: -687341897.9882507,
      market_cap_change_percentage_24h: -0.92006,
      circulating_supply: 464276272.129375,
      total_supply: 580445184.472608,
      max_supply: null,
      ath: 259.96,
      ath_change_percentage: -38.67055,
      ath_date: "2021-11-06T21:54:35.825Z",
      atl: 0.500801,
      atl_change_percentage: 31735.30127,
      atl_date: "2020-05-11T19:35:23.449Z",
      roi: null,
      last_updated: "2024-07-18T12:00:40.157Z",
    },
  ];
  useEffect(() => {
    // Example: Fetch coins data and dispatch setCoins
    // fetchCoins().then(data => dispatch(setCoins(data)));
    dispatch(setCoins(coinsData))
  }, [dispatch]);

  return (
    <div>
      <div className="p-4 rounded-lg shadow-md">
        <h2 className="text-l font-semibold mb-4">Watch List</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-sm">
              <th className="px-4 py-2">Token</th>
              <th className="px-4 py-2">Last Price</th>
              <th className="px-4 py-2">24H Change</th>
              <th className="px-4 py-2">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((token: Coin, index: number) => (
              <tr key={index} className="text-sm">
                <td className="px-4 py-2 flex gap-2">
                  <Image
                    src={token.image}
                    alt={token.name}
                    width={25}
                    height={25}
                  />
                  {token.name}
                </td>
                <td className="px-4 py-2">${token.current_price}</td>
                <td
                  className={`px-4 py-2 ${
                    token.price_change_percentage_24h < 0
                      ? 'text-red-500'
                      : 'text-green-500'
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
                <td className="px-4 py-2">
                  {token.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WatchList;
