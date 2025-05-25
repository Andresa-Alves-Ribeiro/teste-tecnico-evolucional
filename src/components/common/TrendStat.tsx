import React from 'react';

interface TrendStatProps {
  title: string;
  value: string | number;
  trend: {
    value: number;
    isPositive: boolean;
  };
  period?: string;
  className?: string;
}

const TrendStat: React.FC<TrendStatProps> = ({
  title,
  value,
  trend,
  period = 'desde o último período',
  className = '',
}) => {
  return (
    <div
      className={`rounded-lg bg-white dark:bg-gray-900 p-6 shadow-md transition-all ${className}`}
    >
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {title}
      </h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
        <p
          className={`ml-2 flex items-baseline text-sm font-semibold ${
            trend.isPositive
              ? 'text-green-700 dark:text-green-300'
              : 'text-red-700 dark:text-red-300'
          }`}
        >
          {trend.isPositive ? '↑' : '↓'}
          {Math.abs(trend.value)}%
        </p>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {period}
      </p>
    </div>
  );
};

export default TrendStat; 