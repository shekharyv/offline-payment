import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';
import { Card, CardBody } from '../components/Card';

const LoginPage = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobile.length >= 10) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(2);
        toast.success(`OTP sent to ${mobile}`);
      }, 1000);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length === 4 || otp.length === 6) {
      setIsLoading(true);
      try {
        const res = await authService.verifyOtp(mobile, otp);
        if (res.success) {
          toast.success('Login Successful!');
          navigate('/home');
        }
      } catch (error) {
        toast.error('Invalid OTP. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card animate delay={0.1}>
          <div className="bg-green-50 dark:bg-green-900/20 py-8 px-6 text-center relative overflow-hidden rounded-t-[2.5rem]">
            <div className="w-16 h-16 mx-auto bg-green-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-green-500/30">
              <Lock size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Secure Login</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Access your offline payments</p>
          </div>

          <CardBody>
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSendOtp} 
                  className="space-y-6"
                >
                  <Input 
                    label="Mobile Number"
                    type="tel"
                    icon={Phone}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10 digit number"
                    maxLength={10}
                    required
                    autoFocus
                  />

                  <Button 
                    type="submit" 
                    disabled={mobile.length < 10 || isLoading} 
                    fullWidth
                    icon={isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> : null}
                  >
                    {!isLoading && <span className="flex items-center gap-2">Get OTP <ArrowRight size={18} /></span>}
                  </Button>
                  
                  <div className="pt-2 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
                    <ShieldCheck size={16} className="text-green-500" /> 100% Secure & Encrypted
                  </div>
                </motion.form>
              ) : (
                <motion.form 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleVerifyOtp} 
                  className="space-y-6"
                >
                  <Input 
                    label={`Enter OTP sent to ${mobile}`}
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="• • • •"
                    className="text-center tracking-[1em] font-mono text-2xl font-bold"
                    maxLength={6}
                    required
                    autoFocus
                  />

                  <Button 
                    type="submit" 
                    disabled={otp.length < 4 || isLoading} 
                    fullWidth
                    icon={isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> : null}
                  >
                    {!isLoading && <span className="flex items-center gap-2">Verify & Proceed <ArrowRight size={18} /></span>}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="ghost" 
                    fullWidth
                    onClick={() => setStep(1)}
                  >
                    Change Mobile Number
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
