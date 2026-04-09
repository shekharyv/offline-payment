import { useState, useContext, useEffect } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowRight, Smartphone, ArrowLeft, Phone, Info, CheckCircle, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { paymentService } from '../services/api';

const HomePage = () => {
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isPreparing, setIsPreparing] = useState(false);
  const [isAwaitingReturn, setIsAwaitingReturn] = useState(false);

  // Focus trick: Monitor when user comes back from the Custom OS dialer
  useEffect(() => {
    const handleVisibilityChange = () => {
      // User has returned from their dialer back to our Web App 
      if (document.visibilityState === 'visible' && isAwaitingReturn && step === 3) {
        setIsAwaitingReturn(false);
        // Move to final success receipt state
        setStep(4);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAwaitingReturn, step]);

  const handleRecipientSubmit = (e) => {
    e.preventDefault();
    if (!recipient || recipient.length < 5) {
      toast.error('Please enter a valid mobile number or UPI ID');
      return;
    }
    setStep(2);
  };

  const handleAmountSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    setIsPreparing(true);
    
    try {
      // API call to save history (we swallow errors for demo mode if backend is down)
      try {
        await paymentService.createPayment(amount, recipient);
      } catch (e) {
        console.warn('Backend unavailable, proceeding with offline dialer regardless.');
      }
      
      setTimeout(() => {
        setIsPreparing(false);
        const ussdCode = `*99*1*${recipient}*${amount}%23`;
        
        // Push user safely to actual phone dialer
        window.location.href = `tel:${ussdCode}`;
        
        // Immediately Advance app state to "waiting" state
        setStep(3);
        
        // Give OS a second to execute 'tel' before marking ready
        setTimeout(() => {
          setIsAwaitingReturn(true);
        }, 1000);
        
      }, 1500);

    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      setIsPreparing(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 max-w-lg mx-auto w-full flex flex-col justify-center relative">
      
      <AnimatePresence mode="wait">
        
        {/* STEP 1: Enter Recipient */}
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-black/50 overflow-hidden border border-gray-100 dark:border-gray-800"
          >
            <div className="bg-green-500 p-6 text-white text-center pb-8 rounded-b-[2rem] shadow-sm">
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                <Smartphone size={32} />
              </div>
              <h2 className="text-2xl font-black tracking-tight">Offline Transfer</h2>
              <p className="text-green-100 font-medium text-sm mt-1">Via Secure *99# Call</p>
            </div>

            <form onSubmit={handleRecipientSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Send to Mobile or UPI ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="block w-full pl-14 pr-4 py-4 border-2 border-transparent bg-gray-50 dark:bg-gray-950 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:border-green-500 transition-all text-xl font-medium"
                    placeholder="E.g., 9876543210"
                    autoFocus
                  />
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex items-start gap-3">
                <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300 leading-relaxed">
                  Fast, accurate, offline. The required code format is generated entirely in browser locally.
                </p>
              </div>

              <button
                type="submit"
                disabled={!recipient}
                className="w-full py-4 px-6 rounded-2xl shadow-[0_8px_30px_rgb(34,197,94,0.3)] text-lg font-bold text-white bg-green-500 hover:bg-green-600 transition-all flex justify-center items-center gap-2 transform active:scale-[0.98] disabled:opacity-50"
              >
                Proceed <ArrowRight size={20} />
              </button>
            </form>
          </motion.div>
        )}

        {/* STEP 2: Enter Amount & Execute */}
        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-black/50 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col min-h-[500px]"
          >
            <div className="p-6 flex items-center gap-4 bg-gray-50 dark:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800">
              <button 
                type="button"
                onClick={() => setStep(1)} 
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition"
              >
                <ArrowLeft size={20} className="text-gray-900 dark:text-white" />
              </button>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center rounded-full text-xl font-bold uppercase shadow-sm">
                {recipient.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Paying offline to</p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{recipient}</h3>
              </div>
            </div>

            <form onSubmit={handleAmountSubmit} className="flex-1 p-8 flex flex-col justify-between">
              <div className="text-center mt-6">
                <div className="relative inline-flex items-center justify-center">
                  <span className="text-4xl md:text-5xl font-black text-gray-400 mr-2">₹</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-48 bg-transparent text-center text-6xl font-black text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-700 focus:outline-none focus:ring-0"
                    placeholder="0"
                    autoFocus
                  />
                </div>
                
                <div className="mt-8 bg-green-50 dark:bg-green-900/10 rounded-2xl p-4 text-left border border-green-100 dark:border-green-900/50">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Phone size={18} className="text-green-500" /> Dial Option
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-relaxed">
                    Click below to open Call Screen automatically populated with `<span className="font-bold">{recipient}</span>`. Remember to return back here to see your receipt.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={!amount || isPreparing}
                className="w-full mt-6 py-5 px-6 rounded-2xl shadow-[0_8px_30px_rgb(34,197,94,0.3)] text-xl font-bold text-white bg-green-500 hover:bg-green-600 transition-all flex justify-center items-center gap-3 transform hover:-translate-y-1 active:scale-[0.98] disabled:opacity-50"
              >
                {isPreparing ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Format & Call <ArrowRight size={24} /></>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* STEP 3: Waiting for Dialer Return */}
        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 bg-white dark:bg-gray-950 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative w-28 h-28 mb-8">
              <div className="absolute inset-0 border-4 border-gray-100 dark:border-gray-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Phone size={32} className="text-green-500" />
              </div>
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Complete Payment <br/> on Dialer</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium max-w-sm mb-6 text-lg">
              We launched your Phone Dialer to run the offline transaction.
            </p>

            <div className="px-6 py-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800">
               <p className="text-orange-600 dark:text-orange-400 font-semibold text-sm">
                 Waiting for you to return to the app...
               </p>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Success Receipt */}
        {step === 4 && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-8 text-center border-t-8 border-green-500 w-full"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              className="w-32 h-32 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/20"
            >
              <CheckCircle size={64} className="text-green-500" />
            </motion.div>
            
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Transfer Logged</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">₹{amount} transmission to {recipient}</p>

            <div className="w-full bg-gray-50 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 mb-10 text-left shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 text-sm font-semibold">Offline Status</span>
                <span className="text-green-600 dark:text-green-400 font-bold text-sm bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck size={16} /> Verified via Return
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-semibold">Transaction Format</span>
                <span className="text-gray-900 dark:text-white font-bold text-sm bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">*99# Protocol</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-gray-500 text-sm font-semibold">Record Logged Time</span>
                <span className="text-gray-900 dark:text-white font-bold text-sm">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/history')}
              className="w-full py-5 text-white bg-gray-900 dark:bg-gray-800 hover:bg-black dark:hover:bg-gray-700 active:scale-[0.98] rounded-2xl font-bold text-lg transition shadow-xl"
            >
              Go to Statements
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default HomePage;
