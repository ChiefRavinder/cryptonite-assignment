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
            <tr className="border-b">
              <th className="px-4 py-2">Token</th>
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Last Price</th>
              <th className="px-4 py-2">24H Change</th>
              <th className="px-4 py-2">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((token, index) => (
              <tr key={index} className="">
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
                <td className="px-4 py-2">{token.current_price}</td>
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
      {coins.map((coin) => (
        <div key={coin.id} style={{ marginBottom: "20px" }}>
          <Image src={coin.image} alt={coin.name} width={50} height={50} />
          <h3>
            {coin.name} ({coin.symbol.toUpperCase()})
          </h3>
          <p>Current Price: ${coin.current_price}</p>
          <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
          <p>24h High: ${coin.high_24h}</p>
          <p>24h Low: ${coin.low_24h}</p>
          <p>
            Price Change 24h: ${coin.price_change_24h} (
            {coin.price_change_percentage_24h}%)
          </p>
          <p>
            All-Time High: ${coin.ath} ({coin.ath_change_percentage}%) on{" "}
            {new Date(coin.ath_date).toLocaleDateString()}
          </p>
          <p>
            All-Time Low: ${coin.atl} ({coin.atl_change_percentage}%) on{" "}
            {new Date(coin.atl_date).toLocaleDateString()}
          </p>
          <p>Last Updated: {new Date(coin.last_updated).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default CoinsList;
