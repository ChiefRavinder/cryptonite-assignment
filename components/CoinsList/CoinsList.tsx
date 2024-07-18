// Import necessary modules and types
import { Coin } from "@/type";
import dummy from "@/public/statics/dummy.json";
import Image from "next/image";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
// Ensure TypeScript knows the type of 'dummy'
const coins: Coin[] = dummy as Coin[];

const CoinsList = () => {
  if (coins.length === 0) return <div>Loading</div>;

  return (
    <div>
      <div className="p-4  rounded-lg shadow-md">
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
            {coins.map((token, index) => (
              <tr key={index} className="text-sm hover:bg-slate-900 rounded-sm">
                <td className="px-4 py-2 flex gap-2">
                  <Image
                    src={token.image}
                    alt={token.name}
                    width={25}
                    height={25}
                  />
                  {token.name}{" "}
                </td>
                <td className="px-4 py-2"> {token.symbol}</td>
                <td className="px-4 py-2">${token.current_price}</td>
                <td
                  className={`px-4 py-2  ${
                    token.price_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  <div className="flex  gap-2 align-middle">
                    {token.price_change_percentage_24h < 0 ? (
                      <FaArrowDown /> // Or any icon you want for negative change
                    ) : (
                      <FaArrowUp /> // Or any icon you want for positive change
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

export default CoinsList;
