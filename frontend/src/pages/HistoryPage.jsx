import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Clock, Search, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '../services/api';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const data = await paymentService.getHistory();
        setTransactions(data);
      } catch (error) {
        console.error('Failed to fetch history', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status) => {
    if (status === 'success') return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Success</span>;
    if (status === 'pending') return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">Pending</span>;
    return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Failed</span>;
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 min-h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-full bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-900 dark:text-gray-100" />
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Transactions</h1>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-800 overflow-hidden">
        
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search recipient or UPI ID" 
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow disabled:opacity-50"
              disabled={isLoading}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-20 flex justify-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {transactions.map((tx, index) => (
              <motion.div 
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    tx.type === 'sent' 
                      ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' 
                      : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {tx.type === 'sent' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">{tx.recipient}</h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                      <span>{formatDate(tx.date)}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                      {getStatusBadge(tx.status)}
                    </div>
                  </div>
                </div>
                
                <div className="text-right flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <p className={`text-lg sm:text-xl font-bold ${
                      tx.status === 'failed' ? 'text-gray-400 line-through' :
                      tx.type === 'sent' ? 'text-gray-900 dark:text-white' : 'text-green-600 dark:text-green-400'
                    }`}>
                      {tx.type === 'sent' ? '-' : '+'}₹{tx.amount}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">USSD *99#</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-gray-500 transition-colors hidden md:block" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
