import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Users, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '@/src/lib/utils';

interface VoteOption {
  id: string;
  label: string;
  votes: number;
  total: number;
  color: string;
}

export const GovernanceVote = ({ onApproved, onRejected }: { onApproved: () => void; onRejected: () => void }) => {
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [options, setOptions] = useState<VoteOption[]>([
    { id: 'approve', label: 'Approve Funding', votes: 124, total: 150, color: 'bg-green-400' },
    { id: 'reject', label: 'Reject (Fraud Risk)', votes: 12, total: 150, color: 'bg-red-400' },
    { id: 'modify', label: 'Request Modification', votes: 14, total: 150, color: 'bg-yellow-400' },
  ]);

  const handleVote = (id: string) => {
    setHasVoted(true);
    setOptions(prev => prev.map(opt => {
      if (opt.id === id) return { ...opt, votes: opt.votes + 1 };
      return opt;
    }));
    
    setTimeout(() => {
      if (id === 'approve') onApproved();
      else onRejected();
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        <Users size={18} className="text-yellow-400" />
        <h3 className="text-sm font-bold uppercase tracking-widest">Community Governance</h3>
      </div>
      
      <p className="text-[11px] opacity-60 leading-relaxed mb-4">
        This project requires community validation before NeuroSphere funds are released. High-Aura users are currently reviewing the blueprint and PoC data.
      </p>

      <div className="space-y-3">
        {options.map(opt => (
          <button 
            key={opt.id}
            disabled={hasVoted}
            onClick={() => handleVote(opt.id)}
            className={cn(
              "w-full p-4 rounded-2xl border transition-all flex flex-col gap-2 text-left group",
              hasVoted && opt.id === 'approve' ? "bg-green-400/10 border-green-400/20" : 
              hasVoted && opt.id === 'reject' ? "bg-red-400/10 border-red-400/20" :
              "bg-white/5 border-white/10 hover:bg-white/10"
            )}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-widest">{opt.label}</span>
              <span className="text-[10px] font-mono opacity-50">{Math.round((opt.votes / opt.total) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className={cn("h-full", opt.color)}
                initial={{ width: 0 }}
                animate={{ width: `${(opt.votes / opt.total) * 100}%` }}
              />
            </div>
          </button>
        ))}
      </div>

      {hasVoted && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-2xl flex items-center gap-3"
        >
          <Zap size={16} className="text-yellow-400 animate-pulse" />
          <p className="text-[10px] font-bold text-yellow-400 uppercase">Recording Vote to Auralang Ledger...</p>
        </motion.div>
      )}
    </div>
  );
};
