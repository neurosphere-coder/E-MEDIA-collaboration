import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wallet, 
  Users, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  History, 
  Plus, 
  Search, 
  Settings, 
  Trash2, 
  Mic, 
  Lock, 
  BarChart3, 
  Map, 
  Globe 
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '@/src/lib/utils';

interface Transaction {
  id: string;
  type: 'in' | 'out';
  amount: string;
  currency: string;
  label: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'in', amount: '12,500', currency: 'IND-EUR', label: 'Staging Fund: Project Architecture', timestamp: '2026-03-27 10:20', status: 'completed' },
  { id: 't2', type: 'out', amount: '450', currency: 'LUV', label: 'Material Purchase: Bamboo Laminate', timestamp: '2026-03-27 10:25', status: 'pending' },
  { id: 't3', type: 'in', amount: '50', currency: 'Aura', label: 'Collaboration Synergy Reward', timestamp: '2026-03-27 10:26', status: 'completed' },
];

export const OIDWallet = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'balance' | 'history' | 'members'>('balance');

  return (
    <div className="flex-1 flex flex-col gap-6 p-4 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
            <Users className="w-8 h-8 text-black" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">OID Wallet</h2>
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest leading-none">Organization ID: ARCH-2026-001</p>
          </div>
        </div>
        <button onClick={onBack} className="text-xs opacity-50 hover:opacity-100">Back to Feed</button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Balance Card */}
        <GlassCard className="col-span-2 p-8 relative overflow-hidden border-yellow-400/20">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldCheck size={120} />
          </div>
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Total Staging Fund</span>
              <h3 className="text-5xl font-mono font-bold mt-2">12,500 <span className="text-xl opacity-50">IND-EUR</span></h3>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Aura Synergy</span>
              <div className="flex items-center gap-2 mt-2">
                <Zap size={20} className="text-yellow-400" />
                <span className="text-2xl font-bold">2,450</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] font-bold opacity-50 uppercase mb-1">LUV Balance</p>
              <p className="text-xl font-mono font-bold">4,250</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] font-bold opacity-50 uppercase mb-1">ENPE Balance</p>
              <p className="text-xl font-mono font-bold">850</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] font-bold opacity-50 uppercase mb-1">Milestone Progress</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 w-[70%]" />
                </div>
                <span className="text-[10px] font-bold">70%</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Team Members */}
        <GlassCard className="p-6 flex flex-col gap-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-50">Shared Ownership</h3>
          <div className="space-y-4">
            {[
              { name: 'User A', role: 'Founder', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=A' },
              { name: 'User B', role: 'Architect', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=B' },
              { name: 'User C', role: 'Supplier', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=C' },
            ].map((member, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                  <img src={member.avatar} alt={member.name} referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="text-sm font-bold">{member.name}</p>
                  <p className="text-[10px] opacity-50 uppercase">{member.role}</p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-[10px] font-bold text-yellow-400">
                  <CheckCircle2 size={12} /> IID
                </div>
              </div>
            ))}
            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
              <Plus size={14} /> Add Collaborator
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Transaction History */}
      <GlassCard className="flex-1 p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Transparent Funding History</h3>
          <div className="flex gap-2">
            <button className="p-2 bg-white/5 rounded-xl border border-white/10"><Search size={16} /></button>
            <button className="p-2 bg-white/5 rounded-xl border border-white/10"><History size={16} /></button>
          </div>
        </div>

        <div className="space-y-4">
          {MOCK_TRANSACTIONS.map(tx => (
            <div key={tx.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", tx.type === 'in' ? "bg-green-400/20 text-green-400" : "bg-red-400/20 text-red-400")}>
                {tx.type === 'in' ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">{tx.label}</p>
                <p className="text-[10px] opacity-50 uppercase">{tx.timestamp}</p>
              </div>
              <div className="text-right">
                <p className={cn("font-mono font-bold text-lg", tx.type === 'in' ? "text-green-400" : "text-red-400")}>
                  {tx.type === 'in' ? '+' : '-'}{tx.amount} <span className="text-xs opacity-50">{tx.currency}</span>
                </p>
                <p className={cn("text-[10px] font-bold uppercase", tx.status === 'completed' ? "text-green-400" : "text-yellow-400")}>
                  {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
