import React from 'react';

interface LoadingProps {
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ fullScreen = false }) => {
  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-black/30 dark:bg-black/60 backdrop-blur-sm z-50 transition-all duration-200'
    : 'flex items-center justify-center p-4';

  return (
    <div className={containerClasses}>
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 dark:border-gray-700 border-t-primary-light dark:border-t-primary-dark"></div>
        <div className="absolute inset-0 animate-pulse rounded-full bg-primary-light/10 dark:bg-primary-dark/10"></div>
      </div>
      <span className="sr-only">Carregando...</span>
    </div>
  );
};

export default Loading; 