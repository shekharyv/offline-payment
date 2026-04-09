import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, CheckCircle, X, Delete } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DemoModePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const ussdSteps = [
    {
      title: 'USSD Code Running...',
      text: '*99#',
      type: 'dialing',
      delay: 2000
    },
    {
      title: 'Welcome to *99#\nSelect Option:',
      options: ['1. Send Money', '2. Request Money', '3. Check Balance', '4. My Profile'],
      type: 'menu'
    },
    {
      title: 'Send Money To:',
      options: ['1. Mobile No', '2. UPI ID', '3. Saved Beneficiary'],
      type: 'menu'
    },
    {
      title: 'Enter Mobile Number',
      options: [],
      type: 'input',
      placeholder: '10 digit number'
    },
    {
      title: 'Paying to: John Doe',
      options: ['Enter Amount:'],
      type: 'input',
      placeholder: 'Amount in ₹'
    },
    {
      title: 'Enter UPI PIN',
      options: ['Paying Rs.500 to John Doe'],
      type: 'password',
      placeholder: '****'
    },
    {
      title: 'Processing securely...',
      text: 'Please wait',
      type: 'dialing',
      delay: 2000
    },
    {
      title: 'Success!',
      type: 'success'
    }
  ];

  useEffect(() => {
    if (ussdSteps[step].type === 'dialing') {
      const timer = setTimeout(() => {
        setStep((s) => s + 1);
      }, ussdSteps[step].delay);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleSend = () => {
    if (inputValue) {
      setInputValue('');
      setStep((s) => s + 1);
    }
  };

  const handleCancel = () => {
    setStep(0);
    setInputValue('');
    if (step === 0) navigate('/');
  };

  const currentStep = ussdSteps[step];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-950">
      
      <div className="w-full max-w-[360px] h-[750px] bg-black rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-3 relative border-[6px] border-gray-800 flex flex-col">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center mt-2 z-50 pointer-events-none">
          <div className="w-24 h-6 bg-black rounded-full"></div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 bg-white dark:bg-gray-950 text-gray-900 dark:text-white rounded-[2.5rem] overflow-hidden relative flex flex-col">
          
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-8 right-5 p-2 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full z-10 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <X size={18} className="text-gray-600 dark:text-gray-300" />
          </button>

          {/* FULL DIALER BACKGROUND */}
          <div className="absolute inset-0 flex flex-col z-0">
            {/* Top Display Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative pb-10">
              <div className="text-4xl sm:text-5xl font-mono tracking-widest text-gray-800 dark:text-gray-100">
                *99#
              </div>
              <div className="text-green-500 font-medium text-sm mt-3 animate-pulse opacity-80">
                Calling...
              </div>
            </div>

            {/* Bottom Keypad Area */}
            <div className="h-[55%] bg-gray-50 dark:bg-gray-900 pb-8 pt-6 px-6 border-t border-gray-200/50 dark:border-gray-800/50 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
              <div className="grid grid-cols-3 gap-y-4 gap-x-6 mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((num) => (
                  <div 
                    key={num}
                    className="w-[65px] h-[65px] rounded-full bg-white dark:bg-gray-800/80 text-2xl font-normal flex justify-center items-center mx-auto shadow-sm text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700/50"
                  >
                    {num}
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <div className="w-[65px] h-[65px] rounded-full bg-red-500 hover:bg-red-600 flex justify-center items-center shadow-lg shadow-red-500/30 transition-colors mx-auto">
                  <Phone size={26} className="text-white fill-white rotate-[135deg]" />
                </div>
              </div>
            </div>
          </div>

          {/* USSD MODAL OVERLAY */}
          <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
            <AnimatePresence mode="wait">
              {currentStep.type !== 'success' ? (
                <motion.div 
                  key={step}
                  initial={{ opacity: 0, scale: 0.9, y: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-3xl rounded-[2rem] shadow-2xl shadow-black/30 border border-white/50 dark:border-gray-700/50 overflow-hidden w-full max-w-[320px]"
                >
                  <div className="p-6 pb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 whitespace-pre-wrap leading-snug">{currentStep.title}</h3>
                    
                    {currentStep.type === 'dialing' && (
                      <div className="flex flex-col items-center justify-center py-6">
                        <div className="relative w-12 h-12 mb-4">
                          <div className="absolute inset-0 border-4 border-gray-100 dark:border-gray-800 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-gray-500 font-medium text-sm">{currentStep.text}</p>
                      </div>
                    )}

                    {(currentStep.type === 'menu' || currentStep.type === 'input' || currentStep.type === 'password') && (
                      <div className="space-y-2.5 mb-6">
                        {currentStep.options.map((opt, i) => (
                          <p key={i} className="text-[15px] text-gray-700 dark:text-gray-300 font-medium">{opt}</p>
                        ))}
                      </div>
                    )}

                    {(currentStep.type === 'menu' || currentStep.type === 'input' || currentStep.type === 'password') && (
                      <div className="border-b-2 border-green-500 focus-within:border-green-600 transition-colors pb-2 mb-2">
                        <input 
                          type={currentStep.type === 'password' ? 'password' : 'text'}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder={currentStep.placeholder}
                          className="w-full bg-transparent outline-none text-xl tracking-wide font-bold focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                          autoFocus
                          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                      </div>
                    )}
                  </div>
                  
                  {(currentStep.type === 'menu' || currentStep.type === 'input' || currentStep.type === 'password') && (
                    <div className="flex border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
                      <button 
                        onClick={handleCancel}
                        className="flex-1 py-4 text-center font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 active:bg-gray-100 dark:active:bg-gray-800 transition"
                      >
                        Cancel
                      </button>
                      <div className="w-px bg-gray-200 dark:bg-gray-800"></div>
                      <button 
                        onClick={handleSend}
                        disabled={!inputValue}
                        className="flex-1 py-4 text-center font-bold text-green-600 active:bg-green-50 dark:active:bg-green-900/20 transition disabled:opacity-40 disabled:active:bg-transparent"
                      >
                        Send
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl p-8 text-center border overflow-hidden relative border-green-500/30 dark:border-green-500/20 w-full max-w-[320px]"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                  
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                    className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle size={40} className="text-green-500" />
                  </motion.div>
                  
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Paid Successfully</div>
                  <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6">₹500</h2>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/80 rounded-2xl p-4 text-left border border-gray-100 dark:border-gray-800 mb-8 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">To</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">John Doe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">Date</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">Just now</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate(-1)}
                    className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-green-500/30 transition shadow-green-500/20 active:scale-[0.98]"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DemoModePage;
