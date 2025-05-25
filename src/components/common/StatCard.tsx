import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  className = '',
}) => {
  return (
    <div
      role="article"
      className={`rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md transition-all ${className}`}
    >
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {value}
        </p>
      </div>
      {description && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
};

export default StatCard; 