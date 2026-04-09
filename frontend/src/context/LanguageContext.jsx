import { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const translations = {
  en: {
    heroTitle: "Pay Without Internet",
    heroSubtitle: "Experience seamless offline payments using USSD tech. Fast, secure, and reliable.",
    getStarted: "Get Started",
    payOffline: "Pay Offline",
    login: "Login",
    amount: "Amount",
    mobileUpi: "Mobile Number / UPI ID",
    sendMoney: "Send Money",
    history: "Transaction History",
    instructions: "Instructions (*99#)",
    demoMode: "Demo Mode"
  },
  hi: {
    heroTitle: "बिना इंटरनेट के भुगतान करें",
    heroSubtitle: "USSD तकनीक का उपयोग करके निर्बाध ऑफ़लाइन भुगतान का अनुभव करें। तेज़, सुरक्षित और विश्वसनीय।",
    getStarted: "शुरू करें",
    payOffline: "ऑफ़लाइन भुगतान करें",
    login: "लॉग इन करें",
    amount: "राशि",
    mobileUpi: "मोबाइल नंबर / UPI आईडी",
    sendMoney: "पैसे भेजें",
    history: "लेनदेन इतिहास",
    instructions: "निर्देश (*99#)",
    demoMode: "डेमो मोड"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
