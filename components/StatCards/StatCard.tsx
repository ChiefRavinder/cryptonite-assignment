import React from 'react';
import { FaAnchor, FaBolt, FaSync } from 'react-icons/fa';

interface StatsCardProps {
  marketCap: number;
  volume: string;
  maxSupply: string;
  circulatingSupply: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ marketCap, volume, maxSupply, circulatingSupply }) => {
  return (
    <div className="min-w-full p-4 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
      <div className="flex-1 bg-gray-200 dark:bg-gray-900 rounded-lg py-4 px-6 text-center">
        <div className="flex items-center justify-center space-x-2">
          <FaAnchor className="text-gray-500" />
          <span className="font-regular">Market Cap</span>
        </div>
        <div className="text-sm py-2">{marketCap}</div>
      </div>
      <div className="flex-1 bg-gray-200 dark:bg-gray-900 rounded-lg py-4 px-6 text-center">
        <div className="flex items-center justify-center space-x-2">
          <FaBolt className="text-gray-500" />
          <span>Volume (24h)</span>
        </div>
        <div className="text-sm py-2">{volume}</div>
      </div>
      <div className="flex-1 bg-gray-200 dark:bg-gray-900 rounded-lg py-4 px-6 text-center">
        <div className="flex items-center justify-center space-x-2">
          <FaSync className="text-gray-500" />
          <span>Max Supply</span>
        </div>
        <div className="text-sm py-2">{maxSupply}</div>
      </div>
      <div className="flex-1 bg-gray-200 dark:bg-gray-900 rounded-lg py-4 px-6 text-center">
        <div className="flex items-center justify-center space-x-2">
          <FaSync className="text-gray-500" />
          <span>Circulating Supply</span>
        </div>
        <div className="text-sm py-2">{circulatingSupply}</div>
      </div>
    </div>
  );
};

export default StatsCard;
