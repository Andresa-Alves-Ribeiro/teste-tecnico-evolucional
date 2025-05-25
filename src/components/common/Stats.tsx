import React from 'react';

interface StatItem {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

interface StatsProps {
  items: StatItem[];
  className?: string;
}

const Stats: React.FC<StatsProps> = ({ items, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-${items.length} ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-900 px-4 py-5 shadow transition-all"
        >
          <dt>
            {item.icon && (
              <div className="absolute rounded-md bg-primary-light/10 dark:bg-primary-dark/20 p-3">
                {item.icon}
              </div>
            )}
            <p className={`${item.icon ? 'ml-16' : ''} truncate text-sm font-medium text-gray-600 dark:text-gray-300`}>
              {item.label}
            </p>
          </dt>
          <dd className={`${item.icon ? 'ml-16' : ''} flex items-baseline`}>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {item.value}
            </p>
            {item.change && (
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.change.isPositive
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                }`}
              >
                {item.change.isPositive ? '↑' : '↓'}
                {Math.abs(item.change.value)}%
              </p>
            )}
          </dd>
        </div>
      ))}
    </div>
  );
};

export default Stats; 