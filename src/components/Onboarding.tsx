import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fingerprint, Zap } from 'lucide-react';

interface OnboardingProps {
  onLogin: () => void;
}

export const Onboarding = ({ onLogin }: OnboardingProps) => {
  const [step, setStep] = useState<'welcome' | 'fingerprint'>('welcome');

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#050505]">
      <AnimatePresence mode="wait">
        {step === 'welcome' ? (
          <motion.div 
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md w-full text-center"
          >
            <div className="w-20 h-20 bg-yellow-400 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.3)]">
              <Zap className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">E-Media Sosial</h1>
            <p className="text-gray-400 mb-10 leading-relaxed">
              Welcome to the elite ecosystem of "Good People". 
              Validated by IID Global and protected by AI Guard.
            </p>
            <button 
              onClick={() => setStep('fingerprint')}
              className="w-full py-4 bg-yellow-400 text-black font-bold rounded-2xl hover:bg-yellow-300 transition-all shadow-lg active:scale-95"
            >
              Connect with IID
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="fingerprint"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="max-w-md w-full text-center bg-[#111] p-10 rounded-[2.5rem] border border-white/5"
          >
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-full h-full bg-[#1a1a1a] rounded-full border border-yellow-400/30 flex items-center justify-center">
                <Fingerprint className="w-16 h-16 text-yellow-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Biometric Enrollment</h2>
            <p className="text-gray-400 mb-8">Place your finger to generate local encryption keys.</p>
            
            <button 
              onClick={onLogin}
              className="group relative w-full py-4 bg-transparent border border-white/10 text-white font-bold rounded-2xl overflow-hidden transition-all hover:border-yellow-400/50"
            >
              <div className="absolute inset-0 bg-yellow-400/10 translate-y-full group-hover:translate-y-0 transition-transform" />
              <span className="relative">Scan Fingerprint</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
