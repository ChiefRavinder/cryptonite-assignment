// components/StatsCard.tsx
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
    <table className="min-w-full space-x-4 rounded-lg">
      <thead>
        <tr className='  '>
          <th className=" bg-gray-900 rounded-lg py-4 px-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <FaAnchor className='text-gray-500' />
              <span className="font-regular">Market Cap</span>
            </div>
          </th>
          <th className="bg-gray-900 rounded-lg py-4 px-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <FaBolt className='text-gray-500'  />
              <span>Volume (24h)</span>
            </div>
          </th>
          <th className="bg-gray-900 rounded-lg py-4 px-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <FaSync className='text-gray-500' />
              <span>Max Supply</span>
            </div>
          </th>
          <th className="bg-gray-900 rounded-lg py-4 px-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <FaSync className='text-gray-500' />
              <span>Circulating Supply</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-sm py-4 px-6 text-center">{marketCap}</td>
          <td className="text-sm py-4 px-6 text-center">{volume}</td>
          <td className="text-sm py-4 px-6 text-center">{maxSupply}</td>
          <td className="text-sm py-4 px-6 text-center">{circulatingSupply}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default StatsCard;
