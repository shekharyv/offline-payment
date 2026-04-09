import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Keyboard, CheckSquare, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InstructionPage = () => {
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Dial *99#',
      desc: 'Open your phone dialer and call the USSD code *99#',
      icon: <Phone className="text-white" size={24} />,
      color: 'bg-green-500'
    },
    {
      title: 'Press 1 (Send Money)',
      desc: 'Reply with "1" from the menu options',
      icon: <Keyboard className="text-white" size={24} />,
      color: 'bg-emerald-500'
    },
    {
      title: 'Enter Number',
      desc: 'Type the receiver\'s phone number or UPI ID',
      icon: <Phone className="text-white" size={24} />,
      color: 'bg-teal-500'
    },
    {
      title: 'Enter Amount',
      desc: 'Type the exact amount you wish to transfer',
      icon: <IndianRupee className="text-white" size={24} />,
      color: 'bg-cyan-500'
    },
    {
      title: 'Enter UPI PIN',
      desc: 'Authorize the offline payment securely',
      icon: <CheckSquare className="text-white" size={24} />,
      color: 'bg-blue-500'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 min-h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-4 mb-12">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 rounded-full bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-900 dark:text-gray-100" />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">How it works</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Simple 5-step process for USSD payments</p>
        </div>
      </div>

      <div className="relative pl-8 md:pl-0">
        {/* Timeline Line */}
        <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 dark:bg-gray-800 rounded-full md:-translate-x-1/2"></div>
        
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Center Dot */}
              <div className="absolute left-[-40px] md:left-1/2 top-4 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-white dark:bg-gray-950 flex items-center justify-center p-2 shadow-sm border border-gray-50 dark:border-gray-900 z-10">
                <div className={`w-full h-full rounded-full ${step.color} flex items-center justify-center shadow-lg`}>
                  {step.icon}
                </div>
              </div>
              
              {/* Content Card */}
              <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-xl shadow-gray-200/40 dark:shadow-black/20 border border-gray-100/50 dark:border-gray-800/50 hover:-translate-y-1 transition-transform">
                  <span className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 block">Step {index + 1}</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructionPage;
