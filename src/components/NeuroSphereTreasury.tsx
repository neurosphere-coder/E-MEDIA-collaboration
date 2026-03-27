import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  PieChart, 
  Activity, 
  ShieldCheck,
  Globe,
  ArrowLeft
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '@/src/lib/utils';

export const NeuroSphereTreasury = ({ onBack }: { onBack: () => void }) => {
  const [stats] = useState({
    totalReserve: '1,250,000,000',
    dailyInflow: '45,200',
    dailyOutflow: '38,100',
    growthRate: '+12.5%',
    stabilityIndex: '98.2%'
  });

  const transactions = [
    { id: 1, type: 'inflow', label: 'Ecosystem Transaction Fee (0.5%)', amount: '+12,400', time: '2m ago' },
    { id: 2, type: 'outflow', label: 'Triple-Win Subsidy (ARCH-2026-001)', amount: '-5,000', time: '15m ago' },
    { id: 3, type: 'inflow', label: 'Aura-LUV Conversion Tax', amount: '+2,100', time: '1h ago' },
    { id: 4, type: 'outflow', label: 'Staging Fund: Green Energy Room', amount: '-12,500', time: '3h ago' },
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
          <h2 className="text-3xl font-bold tracking-tight">Ecosystem Treasury</h2>
          <p className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">NeuroSphere Reserve & Stability Logic</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <GlassCard className="p-4 flex flex-col gap-2">
          <span className="text-[10px] font-bold opacity-50 uppercase">Total Reserve</span>
          <span className="text-xl font-mono font-bold text-yellow-400">{stats.totalReserve} <span className="text-[10px] opacity-50">IND-EUR</span></span>
        </GlassCard>
        <GlassCard className="p-4 flex flex-col gap-2">
          <span className="text-[10px] font-bold opacity-50 uppercase">Daily Inflow</span>
          <span className="text-xl font-mono font-bold text-green-400">{stats.dailyInflow}</span>
        </GlassCard>
        <GlassCard className="p-4 flex flex-col gap-2">
          <span className="text-[10px] font-bold opacity-50 uppercase">Daily Outflow</span>
          <span className="text-xl font-mono font-bold text-red-400">{stats.dailyOutflow}</span>
        </GlassCard>
        <GlassCard className="p-4 flex flex-col gap-2">
          <span className="text-[10px] font-bold opacity-50 uppercase">Stability Index</span>
          <span className="text-xl font-mono font-bold text-blue-400">{stats.stabilityIndex}</span>
        </GlassCard>
      </div>

      <div className="flex gap-6">
        <GlassCard className="flex-[2] p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <Activity size={16} className="text-yellow-400" /> Real-time Flow
            </h3>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-green-400/10 text-green-400 text-[9px] font-bold rounded uppercase">Inflow</span>
              <span className="px-2 py-1 bg-red-400/10 text-red-400 text-[9px] font-bold rounded uppercase">Outflow</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {transactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  {tx.type === 'inflow' ? (
                    <ArrowDownCircle className="text-green-400" size={20} />
                  ) : (
                    <ArrowUpCircle className="text-red-400" size={20} />
                  )}
                  <div>
                    <p className="text-xs font-bold">{tx.label}</p>
                    <p className="text-[9px] opacity-40 uppercase">{tx.time}</p>
                  </div>
                </div>
                <span className={cn(
                  "font-mono font-bold",
                  tx.type === 'inflow' ? "text-green-400" : "text-red-400"
                )}>{tx.amount}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="flex-1 flex flex-col gap-4">
          <GlassCard className="p-6 flex flex-col gap-4 border-yellow-400/20">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={16} className="text-yellow-400" /> Reserve Logic
            </h3>
            <p className="text-[11px] opacity-60 leading-relaxed">
              The NeuroSphere Reserve is funded by a 0.5% transaction fee across all ecosystem activities. This pool ensures the 25/25 Triple-Win subsidy remains sustainable by balancing production incentives with consumption rewards.
            </p>
            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between text-[10px] font-bold mb-2 opacity-50 uppercase">
                <span>Reserve Health</span>
                <span>94%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 w-[94%]" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <Globe size={16} className="text-blue-400" /> Global Impact
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] opacity-50 uppercase">Projects Funded</span>
                <span className="text-xs font-bold">12,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] opacity-50 uppercase">Jobs Created</span>
                <span className="text-xs font-bold">45,200</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] opacity-50 uppercase">Carbon Offset</span>
                <span className="text-xs font-bold">1.2M Tons</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
};
