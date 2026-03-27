import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  Fingerprint, 
  Scan, 
  Trash2, 
  History,
  ArrowLeft,
  Key,
  Globe,
  Settings
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '@/src/lib/utils';

export const PrivacyDashboard = ({ onBack }: { onBack: () => void }) => {
  const [isBiometricActive, setIsBiometricActive] = useState(true);
  const [isDataShreddingActive, setIsDataShreddingActive] = useState(true);

  const accessLogs = [
    { id: 1, action: 'IID Authentication', location: 'Jakarta, ID', time: '2m ago', status: 'Success' },
    { id: 2, action: 'Biometric Scan', location: 'Jakarta, ID', time: '15m ago', status: 'Success' },
    { id: 3, action: 'Data Shredding', location: 'System', time: '24h ago', status: 'Completed' },
    { id: 4, action: 'Aura Validation', location: 'Global', time: '2d ago', status: 'Verified' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto"
    >
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Privacy & Security</h2>
          <p className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">IID Control & Data Sovereignty</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <GlassCard className="p-6 flex flex-col gap-4 border-yellow-400/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Fingerprint size={20} className="text-yellow-400" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Biometric Lock</h3>
            </div>
            <button 
              onClick={() => setIsBiometricActive(!isBiometricActive)}
              className={cn(
                "w-12 h-6 rounded-full relative transition-all",
                isBiometricActive ? "bg-yellow-400" : "bg-white/10"
              )}
            >
              <motion.div 
                animate={{ x: isBiometricActive ? 24 : 4 }}
                className="absolute top-1 w-4 h-4 rounded-full bg-black shadow-lg"
              />
            </button>
          </div>
          <p className="text-[11px] opacity-60">
            Secure your IID with fingerprint and face-aura recognition. Data is stored locally on your device (P2P).
          </p>
        </GlassCard>

        <GlassCard className="p-6 flex flex-col gap-4 border-blue-400/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trash2 size={20} className="text-blue-400" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Auto-Shredding</h3>
            </div>
            <button 
              onClick={() => setIsDataShreddingActive(!isDataShreddingActive)}
              className={cn(
                "w-12 h-6 rounded-full relative transition-all",
                isDataShreddingActive ? "bg-blue-400" : "bg-white/10"
              )}
            >
              <motion.div 
                animate={{ x: isDataShreddingActive ? 24 : 4 }}
                className="absolute top-1 w-4 h-4 rounded-full bg-black shadow-lg"
              />
            </button>
          </div>
          <p className="text-[11px] opacity-60">
            Automatically delete all interaction data after 24 hours to maintain a fresh, secure ecosystem.
          </p>
        </GlassCard>

        <GlassCard className="p-6 flex flex-col gap-4 border-green-400/20">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-green-400" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Data Sovereignty</h3>
          </div>
          <p className="text-[11px] opacity-60">
            Your data is encrypted with your private key. NeuroSphere never sees your raw PII.
          </p>
          <button className="mt-2 px-4 py-2 bg-white/5 rounded-xl text-[10px] font-bold uppercase border border-white/10 hover:bg-white/10 transition-all">
            Export Private Key
          </button>
        </GlassCard>
      </div>

      <div className="flex gap-6">
        <GlassCard className="flex-[2] p-6">
          <div className="flex items-center gap-2 mb-6">
            <History size={18} className="text-yellow-400" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Access Logs</h3>
          </div>
          <div className="space-y-4">
            {accessLogs.map(log => (
              <div key={log.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Scan size={18} className="opacity-50" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">{log.action}</p>
                    <p className="text-[10px] opacity-40 uppercase">{log.location} • {log.time}</p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-400">{log.status}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="flex-1 flex flex-col gap-4">
          <GlassCard className="p-6 flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <Key size={16} className="text-yellow-400" /> Security Score
            </h3>
            <div className="flex flex-col items-center py-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full rotate-[-90deg]">
                  <circle cx="64" cy="64" r="58" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="64" cy="64" r="58" fill="transparent" stroke="#FACC15" strokeWidth="8" strokeDasharray="364.4" strokeDashoffset="36.4" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black">90</span>
                  <span className="text-[10px] opacity-50 uppercase font-bold">Secure</span>
                </div>
              </div>
            </div>
            <button className="w-full py-3 bg-yellow-400 text-black font-black rounded-2xl uppercase text-[10px] tracking-widest">
              Run Full Audit
            </button>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
};
