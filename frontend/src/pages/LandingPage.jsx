import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, WifiOff, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors">
      
      {/* Premium Background Gradients */}
      <div className="absolute top-[-10%] sm:top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-green-500/20 dark:bg-green-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-500/20 dark:bg-emerald-500/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10 w-full mt-10 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold text-xs sm:text-sm mb-8 backdrop-blur-md border border-green-200/50 dark:border-green-800/50 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Reliable USSD Technology
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-gray-900 dark:text-white leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          Pay Without <br className="hidden sm:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
            Internet.
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Use *99# USSD to send money without data. Fast, minimal, and fully secure offline payment bridging.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold text-lg shadow-[0_8px_30px_rgb(34,197,94,0.3)] hover:shadow-[0_8px_30px_rgb(34,197,94,0.5)] transition-all flex items-center justify-center gap-2 group"
          >
            Get Started
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => navigate('/demo')}
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl font-bold text-lg shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
          >
            Demo Mode
          </button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {[
            {
              icon: <WifiOff className="w-7 h-7 text-green-500" />,
              title: "No Internet Needed",
              desc: "Works entirely offline via cellular network.",
              bg: "bg-green-50 dark:bg-green-900/20"
            },
            {
              icon: <ShieldCheck className="w-7 h-7 text-emerald-500" />,
              title: "Secure Payments",
              desc: "Bank-grade security powered by NPCI.",
              bg: "bg-emerald-50 dark:bg-emerald-900/20"
            },
            {
              icon: <Zap className="w-7 h-7 text-teal-500" />,
              title: "Lightning Fast",
              desc: "Instant transfers directly to bank accounts.",
              bg: "bg-teal-50 dark:bg-teal-900/20"
            }
          ].map((feature, idx) => (
            <div key={idx} className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-100/50 dark:border-gray-700/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left">
              <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
