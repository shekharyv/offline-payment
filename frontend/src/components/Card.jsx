import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = false, animate = false, delay = 0 }) => {
  const baseClasses = "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-[2.5rem] shadow-xl shadow-gray-200/40 dark:shadow-black/40 border border-gray-100/50 dark:border-gray-800/50 overflow-hidden";
  const hoverClasses = hover ? "hover:-translate-y-1 hover:shadow-2xl transition-all duration-300" : "";
  
  const content = (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-gray-100 dark:border-gray-800 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`p-6 md:p-8 ${className}`}>
    {children}
  </div>
);
