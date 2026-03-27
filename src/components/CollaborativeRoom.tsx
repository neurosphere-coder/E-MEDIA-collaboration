import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Leaf, 
  GraduationCap, 
  Cpu, 
  Palette, 
  Sprout, 
  HeartPulse, 
  Truck, 
  Shirt, 
  Globe, 
  Users, 
  Video, 
  Mic, 
  Monitor, 
  Plus, 
  FileText, 
  DollarSign, 
  CheckCircle2, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Scan,
  ArrowLeft,
  TrendingUp,
  AlertTriangle,
  MicOff,
  VideoOff,
  Maximize2,
  Minimize2,
  Edit3
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '@/src/lib/utils';
import { GovernanceVote } from './GovernanceVote';
import { LiveWritingBoard } from './LiveWritingBoard';

interface Industry {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

const INDUSTRIES: Industry[] = [
  { id: 'prop', name: 'Property', icon: Home, color: 'text-blue-400' },
  { id: 'green', name: 'Green Energy', icon: Leaf, color: 'text-green-400' },
  { id: 'edu', name: 'Education', icon: GraduationCap, color: 'text-purple-400' },
  { id: 'tech', name: 'Tech', icon: Cpu, color: 'text-cyan-400' },
  { id: 'arts', name: 'Arts', icon: Palette, color: 'text-pink-400' },
  { id: 'agri', name: 'Agriculture', icon: Sprout, color: 'text-orange-400' },
  { id: 'health', name: 'Healthcare', icon: HeartPulse, color: 'text-red-400' },
  { id: 'trans', name: 'Transport', icon: Truck, color: 'text-indigo-400' },
  { id: 'fash', name: 'Fashion', icon: Shirt, color: 'text-yellow-400' },
  { id: 'social', name: 'Social Impact', icon: Globe, color: 'text-emerald-400' },
];

export const CollaborativeRoom = ({ onBack }: { onBack: () => void }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [entryMode, setEntryMode] = useState<'none' | 'live' | 'create' | 'join'>('none');
  const [isLive, setIsLive] = useState(false);
  const [blueprintProgress, setBlueprintProgress] = useState(0);
  const [aiStatus, setAiStatus] = useState("Waiting for initiation...");
  const [pocTime, setPocTime] = useState(0); // Seconds
  const [projectStep, setProjectStep] = useState<'init' | 'collab' | 'voting' | 'funding' | 'escrow' | 'completed'>('init');
  const [showQR, setShowQR] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [sharedContent, setSharedContent] = useState('');
  const [isAiAssisting, setIsAiAssisting] = useState(false);
  const [roomType, setRoomType] = useState<'quick' | 'focus' | 'execution'>('quick');
  
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([
    { user: 'User A', text: 'Ingin bangun rumah ramah lingkungan di lahan 100m².' },
  ]);

  useEffect(() => {
    if (isLive && projectStep === 'collab') {
      const interval = setInterval(() => {
        setPocTime(prev => prev + 1);
        setBlueprintProgress(prev => {
          if (prev >= 100) {
            setAiStatus("Blueprint 100% Complete. PoC Validated.");
            return 100;
          }
          if (prev > 70) setAiStatus("Drafting Financial Breakdown...");
          else if (prev > 40) setAiStatus("Mapping Resources & Suppliers...");
          else if (prev > 10) setAiStatus("Generating Strategic Blueprint...");
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLive, projectStep]);

  const handleInitiate = () => {
    setAiStatus("AI Guard: Project Manager summoned. Initializing Blueprint v0.1...");
    setProjectStep('collab');
    setIsLive(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { user: 'AI Guard', text: 'Matchmaking: User B (Architect) and User C (Supplier) notified based on high Aura.' },
        { user: 'User B', text: 'Joining room. I can help with the solar integration.' },
        { user: 'User C', text: 'Joining room. I have the sustainable materials ready.' }
      ]);
    }, 2000);
  };

  const handleStartVoting = () => {
    setProjectStep('voting');
    setAiStatus("Community Governance: High-Aura users are reviewing the project...");
  };

  const handleApplyFunding = () => {
    setProjectStep('funding');
    setAiStatus("Validating Blueprint & PoC... Creating OID Wallet ARCH-2026-001...");
    setTimeout(() => {
      setProjectStep('escrow');
      setAiStatus("Escrow Locked: 12,500 IND-EUR secured in OID Wallet. Awaiting physical IID Scan.");
    }, 3000);
  };

  const handleConfirmDelivery = () => {
    setShowQR(true);
    setTimeout(() => {
      setShowQR(false);
      setProjectStep('completed');
      setAiStatus("Transaction Executed: 25/25 Circular Logic Applied. Project Finalized.");
    }, 4000);
  };

  const handleSharedContentChange = (newContent: string) => {
    setSharedContent(newContent);
    if (newContent.length > 50 && !isAiAssisting) {
      setIsAiAssisting(true);
      setAiStatus("AI Live Assist: Analyzing input... Structuring blueprint...");
      setTimeout(() => {
        setIsAiAssisting(false);
        setAiStatus("AI Live Assist: Content structured. Blueprint updated.");
        setBlueprintProgress(prev => Math.min(prev + 15, 100));
      }, 3000);
    }
  };

  if (entryMode === 'none') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6">
        <div className="text-center mb-4">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic mb-2">Open Collab System</h2>
          <p className="text-sm opacity-50 uppercase tracking-widest">No Friction. No Forms. Just Collaboration.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <button 
            onClick={() => setEntryMode('live')}
            className="group relative h-64 bg-yellow-400 rounded-[3rem] overflow-hidden flex flex-col items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(250,204,21,0.2)]"
          >
            <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
              <Video size={40} strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <span className="block text-2xl font-black text-black uppercase leading-none">Start Live</span>
              <span className="text-[10px] font-bold text-black/60 uppercase tracking-widest">Voice + Video + AI</span>
            </div>
            <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </button>

          <button 
            onClick={() => setEntryMode('create')}
            className="group relative h-64 bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden flex flex-col items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 hover:bg-white/10"
          >
            <div className="w-20 h-20 bg-yellow-400/10 rounded-3xl flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
              <Edit3 size={40} strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <span className="block text-2xl font-black uppercase leading-none">Create Idea</span>
              <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Natural Input Mode</span>
            </div>
          </button>

          <button 
            onClick={() => setEntryMode('join')}
            className="group relative h-64 bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden flex flex-col items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 hover:bg-white/10"
          >
            <div className="w-20 h-20 bg-yellow-400/10 rounded-3xl flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
              <Users size={40} strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <span className="block text-2xl font-black uppercase leading-none">Join Collab</span>
              <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Active Rooms (12)</span>
            </div>
          </button>
        </div>

        <button onClick={onBack} className="mt-8 text-xs font-bold uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity flex items-center gap-2">
          <ArrowLeft size={14} /> Back to Feed
        </button>
      </div>
    );
  }

  if (!selectedIndustry) {
    return (
      <div className="flex-1 flex flex-col gap-6 p-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Project Rooms</h2>
          <button onClick={onBack} className="text-xs opacity-50 hover:opacity-100">Back to Feed</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {INDUSTRIES.map(industry => (
            <GlassCard 
              key={industry.id} 
              onClick={() => setSelectedIndustry(industry)}
              className="p-6 flex flex-col items-center justify-center gap-4 hover:scale-105 cursor-pointer border-white/5"
            >
              <div className={cn("p-4 rounded-2xl bg-white/5", industry.color)}>
                <industry.icon size={32} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-center">{industry.name}</span>
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-4 p-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-xl bg-white/5", selectedIndustry.color)}>
            <selectedIndustry.icon size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Room: {selectedIndustry.name}</h2>
            <div className="flex items-center gap-2">
              <p className="text-[10px] opacity-50 uppercase tracking-widest">Live Collaboration (3 Users)</p>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              </div>
              <span className="text-[8px] font-bold opacity-30 uppercase">Parallel Sync Active</span>
            </div>
          </div>
        </div>
        <button onClick={() => setSelectedIndustry(null)} className="text-xs opacity-50 hover:opacity-100">Leave Room</button>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Left: Video/Voice Feed + Chat */}
        <div className="w-80 flex flex-col gap-4">
          {/* Video Grid Simulation */}
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-square bg-slate-800 rounded-2xl overflow-hidden relative border border-white/10 group">
              {isVideoOn ? (
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/40"><VideoOff size={24} className="opacity-30" /></div>
              )}
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[8px] font-bold uppercase">You</div>
              {!isMicOn && <MicOff size={12} className="absolute top-2 right-2 text-red-500" />}
            </div>
            <div className="aspect-square bg-slate-800 rounded-2xl overflow-hidden relative border border-white/10">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Architect" className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[8px] font-bold uppercase">Architect</div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="aspect-square bg-slate-800 rounded-2xl overflow-hidden relative border border-white/10">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Supplier" className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[8px] font-bold uppercase">Supplier</div>
            </div>
            <div className="aspect-square bg-slate-800 rounded-2xl flex items-center justify-center border border-dashed border-white/20 hover:border-yellow-400/50 transition-all cursor-pointer">
              <Plus size={24} className="opacity-30" />
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3 p-2 bg-white/5 rounded-2xl border border-white/10">
            <button onClick={() => setIsMicOn(!isMicOn)} className={cn("p-3 rounded-xl transition-all", isMicOn ? "bg-white/10" : "bg-red-500/20 text-red-500")}><Mic size={18} /></button>
            <button onClick={() => setIsVideoOn(!isVideoOn)} className={cn("p-3 rounded-xl transition-all", isVideoOn ? "bg-white/10" : "bg-red-500/20 text-red-500")}><Video size={18} /></button>
            <button className="p-3 bg-white/10 rounded-xl hover:bg-yellow-400 hover:text-black transition-all"><Maximize2 size={18} /></button>
          </div>

          {/* Chat Feed */}
          <div className="flex-1 bg-black/20 rounded-3xl border border-white/5 p-4 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-50">Live Chat</h3>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[8px] font-bold opacity-50 uppercase">Edge Encrypted</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className="text-[11px] leading-relaxed">
                  <span className={cn("font-bold uppercase tracking-widest mr-2", msg.user === 'AI Guard' ? "text-yellow-400" : "opacity-50")}>{msg.user}:</span>
                  <span className="opacity-80">{msg.text}</span>
                </div>
              ))}
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Message collaborators..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[11px] focus:outline-none focus:border-yellow-400/50"
              />
            </div>
          </div>
        </div>

        {/* Center: Live Writing Board */}
        <div className="flex-1 flex flex-col gap-4">
          <LiveWritingBoard 
            content={sharedContent} 
            onChange={handleSharedContentChange} 
            isAiAssisting={isAiAssisting}
          />
          
          {/* Room Type Selector */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10 w-fit">
            {(['quick', 'focus', 'execution'] as const).map(t => (
              <button 
                key={t}
                onClick={() => setRoomType(t)}
                className={cn(
                  "px-4 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all",
                  roomType === t ? "bg-yellow-400 text-black" : "hover:bg-white/5"
                )}
              >
                {t} Room
              </button>
            ))}
          </div>
        </div>

        {/* Right: AI Panel & Blueprint & OID Wallet */}
        <div className="w-80 flex flex-col gap-4 overflow-y-auto scrollbar-hide">
          <GlassCard className="p-6 flex flex-col gap-6 border-yellow-400/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-yellow-400" />
                <h3 className="text-sm font-bold uppercase tracking-widest">AI Live Assist</h3>
              </div>
              <div className="px-2 py-0.5 bg-yellow-400/10 border border-yellow-400/20 rounded text-[8px] font-bold text-yellow-400 uppercase">v3.0 Sentinel</div>
            </div>
            <p className="text-xs italic opacity-80">"{aiStatus}"</p>
            
            <div className="space-y-4">
              {/* Milestone Tracker */}
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1 opacity-50 uppercase">
                  <span>Milestone Tracker</span>
                  <span>{blueprintProgress}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden flex">
                  <motion.div 
                    className="h-full bg-yellow-400"
                    animate={{ width: `${blueprintProgress}%` }}
                  />
                  <div className="w-px h-full bg-white/20 ml-auto mr-[25%]" />
                  <div className="w-px h-full bg-white/20 mr-[25%]" />
                </div>
                <div className="flex justify-between mt-1 text-[8px] font-bold opacity-30 uppercase">
                  <span>Draft</span>
                  <span>PoC</span>
                  <span>Final</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs opacity-70">
                  <FileText size={14} /> <span>Strategic Blueprint</span>
                  {blueprintProgress > 30 && <CheckCircle2 size={12} className="text-green-400 ml-auto" />}
                </div>
                <div className="flex items-center gap-2 text-xs opacity-70">
                  <DollarSign size={14} /> <span>Financial Breakdown</span>
                  {blueprintProgress > 60 && <CheckCircle2 size={12} className="text-green-400 ml-auto" />}
                </div>
                <div className="flex items-center gap-2 text-xs opacity-70">
                  <Users size={14} /> <span>Resource Mapping</span>
                  {blueprintProgress > 90 && <CheckCircle2 size={12} className="text-green-400 ml-auto" />}
                </div>
              </div>

              {/* Resource Matchmaker */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-3">Resource Matchmaker</h4>
                <div className="space-y-2">
                  <div className="p-2 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between group hover:border-yellow-400/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <Users size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold">Find Architect</p>
                        <p className="text-[8px] opacity-40">3 Available Now</p>
                      </div>
                    </div>
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                  <div className="p-2 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between group hover:border-yellow-400/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                        <Truck size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold">Find Supplier</p>
                        <p className="text-[8px] opacity-40">Local Nodes Active</p>
                      </div>
                    </div>
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </div>
              </div>

              {/* OID Wallet Integration Buttons */}
              {projectStep === 'funding' && (
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <button className="w-full py-3 bg-green-500 text-black font-black rounded-2xl uppercase text-[10px] flex items-center justify-center gap-2">
                    <CheckCircle2 size={14} /> Release Milestone
                  </button>
                  <button className="w-full py-3 bg-white/5 border border-white/10 text-white font-black rounded-2xl uppercase text-[10px] flex items-center justify-center gap-2">
                    <DollarSign size={14} /> Request Funding
                  </button>
                  <button className="w-full py-3 bg-white/5 border border-white/10 text-white font-black rounded-2xl uppercase text-[10px] flex items-center justify-center gap-2">
                    <Users size={14} /> Approve Work
                  </button>
                </div>
              )}

              {blueprintProgress === 100 && projectStep === 'collab' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 border-t border-white/10"
                >
                  <div className="bg-green-400/10 p-4 rounded-2xl border border-green-400/20 mb-4">
                    <p className="text-[10px] font-bold text-green-400 uppercase mb-1">Blueprint Validated</p>
                    <p className="text-lg font-mono font-bold">12,500 IND-EUR</p>
                  </div>
                  <button 
                    onClick={handleStartVoting}
                    className="w-full py-3 bg-yellow-400 text-black font-black rounded-2xl uppercase text-xs flex items-center justify-center gap-2"
                  >
                    Submit to Governance <ArrowRight size={14} />
                  </button>
                </motion.div>
              )}

              {projectStep === 'voting' && (
                <div className="pt-4 border-t border-white/10">
                  <GovernanceVote 
                    onApproved={handleApplyFunding}
                    onRejected={() => setProjectStep('collab')}
                  />
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
