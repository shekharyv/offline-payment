import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  type = 'text', 
  icon: Icon, 
  error, 
  className = '',
  containerClassName = '',
  ...props 
}, ref) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-green-500">
            <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`block w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-4 border-2 border-transparent bg-gray-50 dark:bg-gray-800/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:border-green-500 focus:shadow-sm transition-all text-lg font-medium outline-none ${error ? 'border-red-500 focus:border-red-500 bg-red-50 dark:bg-red-900/10' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
