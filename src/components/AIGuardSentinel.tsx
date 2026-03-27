import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, Globe, History } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface AIGuardSentinelProps {
  isScanning: boolean;
  userAura: number;
  onComplete: (isRejected: boolean) => void;
}

export const AIGuardSentinel = ({ isScanning, userAura, onComplete }: AIGuardSentinelProps) => {
  const [status, setStatus] = useState('Initializing Sentinel...');
  const [isRejected, setIsRejected] = useState(false);
  const [parallelTasks, setParallelTasks] = useState<{ label: string; icon: any; status: 'pending' | 'active' | 'done' | 'failed' }[]>([
    { label: 'Multi-Layer Scan', icon: ShieldCheck, status: 'pending' },
    { label: 'Neurolang Inference', icon: Zap, status: 'pending' },
    { label: 'IID Integrity', icon: History, status: 'pending' }
  ]);
  
  useEffect(() => {
    if (isScanning) {
      setIsRejected(false);
      const isMaliciousAttempt = Math.random() > 0.7; // 30% chance to simulate the audit scenario
      const duration = 4000;
      
      setParallelTasks(prev => prev.map(t => ({ ...t, status: 'active' })));
      
      const stages = [
        'Detik 1: Deconstructing Visual Layers (Steganography Check)...',
        'Detik 2: Analyzing Context & Intent (Sandbox Link Validation)...',
        'Detik 3: Validating IID Fingerprint & Login Patterns...',
        'Detik 4: Executing Ecosystem Protection Protocols.'
      ];
      
      let i = 0;
      const intervalTime = duration / stages.length;
      
      const interval = setInterval(() => {
        if (i < stages.length) {
          setStatus(stages[i]);
          
          // Simulate failures in the malicious scenario
          if (isMaliciousAttempt) {
            if (i === 0) setParallelTasks(prev => prev.map((t, idx) => idx === 0 ? { ...t, status: 'failed' } : t));
            if (i === 1) setParallelTasks(prev => prev.map((t, idx) => idx === 1 ? { ...t, status: 'failed' } : t));
            if (i === 2) setParallelTasks(prev => prev.map((t, idx) => idx === 2 ? { ...t, status: 'failed' } : t));
          } else {
            if (i === 0) setParallelTasks(prev => prev.map((t, idx) => idx === 0 ? { ...t, status: 'done' } : t));
            if (i === 1) setParallelTasks(prev => prev.map((t, idx) => idx === 1 ? { ...t, status: 'done' } : t));
            if (i === 2) setParallelTasks(prev => prev.map((t, idx) => idx === 2 ? { ...t, status: 'done' } : t));
          }
          
          i++;
        } else {
          clearInterval(interval);
          if (isMaliciousAttempt) {
            setIsRejected(true);
            setTimeout(() => onComplete(true), 3000); // Pass true for rejection
          } else {
            setParallelTasks(prev => prev.map(t => ({ ...t, status: 'done' })));
            setTimeout(() => onComplete(false), 500); // Pass false for success
          }
        }
      }, intervalTime);
      
      return () => clearInterval(interval);
    } else {
      setParallelTasks(prev => prev.map(t => ({ ...t, status: 'pending' })));
      setIsRejected(false);
    }
  }, [isScanning, userAura, onComplete]);

  if (!isScanning) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-12 text-center"
    >
      <div className="relative mb-8">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className={cn(
            "w-32 h-32 border-2 border-dashed rounded-full",
            isRejected ? "border-red-500/30" : "border-yellow-400/30"
          )}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {isRejected ? (
            <ShieldCheck className="w-12 h-12 text-red-500" />
          ) : (
            <ShieldCheck className="w-12 h-12 text-yellow-400 animate-pulse" />
          )}
        </div>
      </div>
      
      <h2 className={cn(
        "text-2xl font-bold mb-2 tracking-tight",
        isRejected ? "text-red-500" : "text-white"
      )}>
        {isRejected ? "Threat Neutralized" : "AI Guard Strategic Architect"}
      </h2>
      <p className={cn(
        "font-mono text-[10px] uppercase tracking-[0.2em] mb-8",
        isRejected ? "text-red-400" : "text-yellow-400"
      )}>{status}</p>
      
      {/* Parallel Tasks UI */}
      <div className="grid grid-cols-1 gap-2 mb-8 w-full max-w-xs">
        {parallelTasks.map((task, idx) => (
          <div key={idx} className="flex items-center justify-between bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <div className="flex items-center gap-2">
              <task.icon size={12} className={cn(
                task.status === 'active' ? "text-yellow-400" : 
                task.status === 'failed' ? "text-red-500" : "text-white/20"
              )} />
              <span className="text-[10px] font-bold uppercase opacity-60">{task.label}</span>
            </div>
            <span className={cn(
              "text-[9px] font-black uppercase tracking-widest",
              task.status === 'pending' && "text-white/20",
              task.status === 'active' && "text-yellow-400 animate-pulse",
              task.status === 'done' && "text-green-400",
              task.status === 'failed' && "text-red-500"
            )}>
              {task.status}
            </span>
          </div>
        ))}
      </div>

      {isRejected ? (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl max-w-xs"
        >
          <p className="text-xs text-red-400 font-bold mb-1 uppercase">Mentor AI Feedback</p>
          <p className="text-[11px] text-white/80 italic">"Maaf, elemen visual mengandung tautan eksternal yang tidak tervalidasi. Silakan perbaiki blueprint Anda untuk menjaga keamanan komunitas."</p>
        </motion.div>
      ) : (
        <>
          <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-yellow-400"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "linear" }}
            />
          </div>
          <p className="mt-4 text-[9px] font-bold opacity-30 uppercase tracking-widest">
            Audit Duration: 4s (Ecosystem Protection)
          </p>
        </>
      )}
    </motion.div>
  );
};
