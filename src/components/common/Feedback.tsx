import React from 'react';

interface FeedbackProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ type, message, onClose }) => {
  const styles = {
    success: {
      light: 'bg-green-50 border-green-200 text-green-800',
      dark: 'bg-green-900/30 border-green-800/50 text-green-200'
    },
    error: {
      light: 'bg-red-50 border-red-200 text-red-800',
      dark: 'bg-red-900/30 border-red-800/50 text-red-200'
    },
    info: {
      light: 'bg-blue-50 border-blue-200 text-blue-800',
      dark: 'bg-blue-900/30 border-blue-800/50 text-blue-200'
    }
  };

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg border shadow-lg z-50 transition-all duration-200
      ${styles[type].light} dark:${styles[type].dark}`}>
      <div className="flex items-center">
        <span className="flex-grow">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
            aria-label="Fechar mensagem"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Feedback; 