// components/PerformanceBar.tsx
import React from 'react';

interface PerformanceBarProps {
  todayLow: number;
  todayHigh: number;
}

const PerformanceBar: React.FC<PerformanceBarProps> = ({
  todayLow,
  todayHigh,
}) => {
  // Calculate the average of today's low and high
  const averageToday = (todayLow + todayHigh) / 2;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Performance</h2>

      {/* Today's Performance */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Today&apos;s Low</span>
          <span>Today&apos;s High</span>
        </div>
        <div className="relative w-full h-2 bg-gray-200 rounded">
          <div
            className="absolute h-full bg-green-500 rounded"
            style={{
              left: '0%',
              width: '100%',
            }}
          ></div>
          <div
            className="absolute h-full w-0.5 bg-black"
            style={{
              left: `${((averageToday - todayLow) / (todayHigh - todayLow)) * 100}%`,
            }}
          >
            <span className="absolute -top-4 -ml-2 text-xs">{averageToday.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span>{todayLow}</span>
          <span>{todayHigh}</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceBar;
