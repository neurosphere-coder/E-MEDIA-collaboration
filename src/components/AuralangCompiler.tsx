import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Code2, 
  Database, 
  RefreshCw, 
  AlertCircle 
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '@/src/lib/utils';

export const AuralangCompiler = ({ onBack }: { onBack: () => void }) => {
  const [isCompiling, setIsCompiling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const auralangCode = `
// Auralang: Neuro-Sync Protocol v3.0
// Immutable Logic for Parallel Data & Economy

protocol ActiveTransaction {
    input: Action(type: "SEND" | "RECEIVE", amount: IND_EUR, from: IID, to: IID)
    
    validate: {
        require(AIGuard.scan(Action.payload) == SAFE, "Sentinel Blocked Action");
        require(Auth.verifyFingerprint(Action.from) == SUCCESS, "IID Validation Failed");
    }

    execute: {
        // 1. Apply 25/25 Circular Logic if Collaboration
        if (Action.isCollaboration) {
            TripleWin_25_25.apply(Action);
        } else {
            Action.transfer();
        }
        
        // 2. Parallel Data Commit (Neuro-Sync)
        Sync.commit({
            target: ["FIRESTORE", "GITHUB", "EDGE_DEVICE"],
            payload: Action.metadata,
            encryption: "AES-256-GCM"
        });

        emit SyncSuccess(Action.id, "Parallel Commit Complete");
    }
}

protocol TripleWinCommerce {
    input: Transaction(price: IND_EUR, participants: List<IID>)
    
    validate: {
        require(participants.size() >= 3, "Minimum 3 collaborators required");
        require(AIGuard.validateVision(Transaction.vision) == SUCCESS, "Vision rejected");
    }

    execute: {
        // 1. Buyer Discount (25%)
        Buyer.pay(price * 0.75);
        
        // 2. Seller Bonus (25%)
        Seller.receive(price * 1.25);
        
        // 3. Pool Reserve Funding (50%)
        NeuroSphere.PoolReserve.withdraw(price * 0.50);
        
        // 4. Aura Synergy Distribution
        participants.forEach(p => p.aura += 50);
        
        emit TransactionBoosted(Transaction.id, "25/25 Circular Logic Applied");
    }
}
  `.trim();

  const handleCompile = () => {
    setIsCompiling(true);
    setProgress(0);
    setLogs(["Initializing Auralang Compiler...", "Loading NeuroSphere Pool Reserve state...", "Validating IID/OID bindings..."]);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLogs(prevLogs => [...prevLogs, "Optimization complete.", "Logic locked into Immutable State.", "Protocol deployed to ARCH-2026-001."]);
          return 100;
        }
        if (prev === 20) setLogs(prevLogs => [...prevLogs, "Parsing TripleWinCommerce protocol..."]);
        if (prev === 50) setLogs(prevLogs => [...prevLogs, "Injecting 25/25 Circular Logic..."]);
        if (prev === 80) setLogs(prevLogs => [...prevLogs, "Verifying AIGuard Strategic Architect hooks..."]);
        return prev + 5;
      });
    }, 150);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 p-4 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
            <Terminal className="w-8 h-8 text-black" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Auralang Compiler</h2>
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest leading-none">Immutable Logic Engine</p>
          </div>
        </div>
        <button onClick={onBack} className="text-xs opacity-50 hover:opacity-100">Back to Feed</button>
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1">
        {/* Code Editor */}
        <GlassCard className="p-0 flex flex-col border-white/5 overflow-hidden">
          <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-yellow-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">triple_win.aura</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
          </div>
          <div className="flex-1 p-6 font-mono text-sm leading-relaxed overflow-y-auto bg-black/40">
            <pre className="text-yellow-400/80">
              {auralangCode}
            </pre>
          </div>
        </GlassCard>

        {/* Compiler Status */}
        <div className="flex flex-col gap-6">
          <GlassCard className="p-8 flex flex-col gap-6 border-yellow-400/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu size={20} className="text-yellow-400" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Compiler Status</h3>
              </div>
              {progress === 100 && <CheckCircle2 size={20} className="text-green-400" />}
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1 opacity-50 uppercase">
                  <span>Compilation Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-yellow-400"
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="bg-black/60 rounded-2xl p-4 h-48 overflow-y-auto font-mono text-[10px] space-y-1 border border-white/5">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="opacity-30">[{new Date().toLocaleTimeString()}]</span>
                    <span className={cn(log.includes("complete") || log.includes("deployed") ? "text-green-400" : "text-white/70")}>
                      {log}
                    </span>
                  </div>
                ))}
                {isCompiling && progress < 100 && (
                  <div className="flex items-center gap-2 text-yellow-400">
                    <RefreshCw size={10} className="animate-spin" />
                    <span>Compiling...</span>
                  </div>
                )}
              </div>

              <button 
                onClick={handleCompile}
                disabled={isCompiling && progress < 100}
                className={cn(
                  "w-full py-4 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-2 transition-all",
                  progress === 100 ? "bg-green-500 text-white" : "bg-yellow-400 text-black hover:scale-[1.02] active:scale-95"
                )}
              >
                {progress === 100 ? (
                  <><Lock size={16} /> Logic Locked & Deployed</>
                ) : (
                  <><Zap size={16} /> Compile & Lock Protocol</>
                )}
              </button>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle size={18} />
              <h3 className="text-[10px] font-bold uppercase tracking-widest">Security Warning</h3>
            </div>
            <p className="text-xs opacity-60 leading-relaxed">
              Once compiled, Auralang protocols are **Immutable**. The 25/25 distribution logic cannot be modified by any entity, including the NeuroSphere core team.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
