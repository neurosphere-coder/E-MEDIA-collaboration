/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  MessageSquare, 
  ShoppingBag, 
  Clock, 
  Plus, 
  Search, 
  Settings, 
  ArrowUpRight, 
  Heart, 
  Share2, 
  Scan, 
  Wallet, 
  Globe, 
  Trash2, 
  Mic, 
  Lock, 
  BarChart3, 
  Map, 
  History,
  Maximize2, 
  Minimize2,
  Users,
  Terminal,
  Layout,
  Brain,
  Sparkles
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

// --- Extracted Components ---
import { GlassCard } from './components/GlassCard';
import { AuraGraph } from './components/AuraGraph';
import { ToolIcon } from './components/ToolIcon';
import { AIGuardSentinel } from './components/AIGuardSentinel';
import { NavButton } from './components/NavButton';
import { Onboarding } from './components/Onboarding';
import { CollaborativeRoom } from './components/CollaborativeRoom';
import { OIDWallet } from './components/OIDWallet';
import { AuralangCompiler } from './components/AuralangCompiler';
import { NeuroSphereTreasury } from './components/NeuroSphereTreasury';
import { PrivacyDashboard } from './components/PrivacyDashboard';
import { AuraAI } from './components/AuraAI';

// --- Types & Interfaces ---
type ScreenMode = 'day' | 'night';
type ViewState = 'feed' | 'marketplace' | 'chat' | 'tools' | 'profile' | 'room' | 'wallet' | 'compiler' | 'treasury' | 'privacy' | 'aura-ai';

interface ContentItem {
  id: string;
  type: 'video' | 'image';
  url: string;
  title: string;
  author: string;
  aura: number;
  tags: string[];
  partner?: string;
  isVerifying?: boolean;
}

interface ProductItem {
  id: string;
  title: string;
  price: string;
  currency: 'LUV' | 'ENPE' | 'IND-EUR';
  category: string;
  image: string;
  author: string;
}

// --- Constants & Mock Data ---
const PROJECT_POOL: ContentItem[] = [
  { id: '1', type: 'video', url: 'https://picsum.photos/seed/neuro1/1920/1080', title: 'NeuroSphere: The Next Frontier', author: 'Aris_IID', aura: 1250, tags: ['Future', 'Tech'], partner: 'NeuroSphere Core' },
  { id: '2', type: 'image', url: 'https://picsum.photos/seed/solar/1920/1080', title: 'Solar Grid Alpha: AI Energy', author: 'Eco_System', aura: 3200, tags: ['Green', 'Energy'], partner: 'Eco-Sync Global' },
  { id: '3', type: 'video', url: 'https://picsum.photos/seed/bio/1920/1080', title: 'BioSync: Neural Healthcare', author: 'Lumina_Zen', aura: 2100, tags: ['Health', 'AI'], partner: 'Bio-Link Labs' },
  { id: '4', type: 'image', url: 'https://picsum.photos/seed/agri/1920/1080', title: 'AgriBot: Autonomous Harvest', author: 'Green_Node', aura: 1850, tags: ['Agri', 'Tech'], partner: 'Agri-Node' },
  { id: '5', type: 'video', url: 'https://picsum.photos/seed/edu/1920/1080', title: 'EduLink: Global Knowledge', author: 'Scholar_IID', aura: 2900, tags: ['Education', 'Global'], partner: 'Global-Edu' },
  { id: '6', type: 'image', url: 'https://picsum.photos/seed/art/1920/1080', title: 'NeoArt: Generative Culture', author: 'NeoArtist', aura: 1500, tags: ['Art', 'Culture'], partner: 'Neo-Art Guild' },
  { id: '7', type: 'video', url: 'https://picsum.photos/seed/logi/1920/1080', title: 'LogiFlow: Edge Logistics', author: 'Flow_Master', aura: 2400, tags: ['Logistics', 'Edge'], partner: 'Flow-Logistics' },
  { id: '8', type: 'image', url: 'https://picsum.photos/seed/fashion/1920/1080', title: 'EcoFashion: AI Design', author: 'Style_Sync', aura: 1700, tags: ['Fashion', 'Design'], partner: 'Style-AI' },
  { id: '9', type: 'video', url: 'https://picsum.photos/seed/prop/1920/1080', title: 'SmartProp: AI Estate', author: 'Prop_Tech', aura: 3500, tags: ['Property', 'AI'], partner: 'Prop-Tech Alliance' },
  { id: '10', type: 'image', url: 'https://picsum.photos/seed/tour/1920/1080', title: 'AuraTourism: Immersive Travel', author: 'Zen_Travel', aura: 1950, tags: ['Tourism', 'Experience'], partner: 'Zen-Travel Group' },
];

const MOCK_PRODUCTS: ProductItem[] = [
  { id: 'p1', title: 'Quantum Neural Link', price: '1,200', currency: 'LUV', category: 'Hardware', image: 'https://picsum.photos/seed/p1/400/400', author: 'TechForge' },
  { id: 'p2', title: 'Aura Enhancer v4', price: '450', currency: 'ENPE', category: 'Wellness', image: 'https://picsum.photos/seed/p2/400/400', author: 'BioSync' },
  { id: 'p3', title: 'Digital Soul NFT', price: '89.00', currency: 'IND-EUR', category: 'Art', image: 'https://picsum.photos/seed/p3/400/400', author: 'NeoArtist' },
];

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [view, setView] = useState<ViewState>('room');
  const [mode, setMode] = useState<ScreenMode>('night');
  const [isScanning, setIsScanning] = useState(false);
  const [mainIndex, setMainIndex] = useState(0);
  const [pulseScale, setPulseScale] = useState(1);
  const [glowIntensity, setGlowIntensity] = useState(0.5);
  const [coins, setCoins] = useState({ luv: 125, enpe: 450, eur: 12.50 });
  const [aura, setAura] = useState(2450);
  const [feedItems, setFeedItems] = useState<ContentItem[]>(PROJECT_POOL.slice(0, 3));
  const [isLunar, setIsLunar] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success'>('idle');

  // 15-Minute Project Rotation Logic
  useEffect(() => {
    const updateProjects = () => {
      const now = new Date();
      const totalMinutes = now.getHours() * 60 + now.getMinutes();
      const intervalIndex = Math.floor(totalMinutes / 15);
      
      // Select 3 projects based on the 15-minute interval
      const startIdx = (intervalIndex * 3) % PROJECT_POOL.length;
      const selected = [];
      for (let i = 0; i < 3; i++) {
        selected.push(PROJECT_POOL[(startIdx + i) % PROJECT_POOL.length]);
      }
      
      setFeedItems(selected);
      setMainIndex(0); // Reset to first item of the new set
      console.log(`[Neuro-Sync] Projects rotated for interval: ${intervalIndex}`);
    };

    updateProjects();
    const timer = setInterval(updateProjects, 60000); // Check every minute
    return () => clearInterval(timer);
  }, []);

  // Auto-Alternating Logic for the 3 projects within the set
  useEffect(() => {
    const interval = setInterval(() => {
      setMainIndex(prev => (prev + 1) % feedItems.length);
    }, 8000); // Alternate every 8 seconds
    return () => clearInterval(interval);
  }, [feedItems.length]);

  // Solar/Lunar Theme Logic
  useEffect(() => {
    const hour = new Date().getHours();
    setIsLunar(hour < 6 || hour > 18);
  }, []);

  const triggerSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => setSyncStatus('success'), 2000);
    setTimeout(() => setSyncStatus('idle'), 4000);
  };

  // Circadian Engine (Offline Solar Sync)
  useEffect(() => {
    // Simulated one-time location fetch
    const calculateSolarMode = () => {
      const hour = new Date().getHours();
      setMode(hour >= 6 && hour < 18 ? 'day' : 'night');
    };
    calculateSolarMode();
  }, []);

  // 3-Second Auto-Pulse & Rotation
  useEffect(() => {
    if (!isAuth) return;
    const interval = setInterval(() => {
      setPulseScale(1.02);
      setTimeout(() => setPulseScale(1), 500);
      setMainIndex(prev => (prev + 1) % feedItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAuth, feedItems.length]);

  const handlePost = () => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      type: 'image',
      url: 'https://picsum.photos/seed/newpost/1920/1080',
      title: 'New Visionary Concept',
      author: 'You',
      aura: 0,
      tags: ['Innovation', 'NeuroSphere'],
      isVerifying: true
    };
    // Shadow Posting: Add to local feed immediately with "Verifying" status
    setFeedItems([newItem, ...feedItems]);
    setMainIndex(0);
    setIsScanning(true);
  };

  const handleSupportAura = (id: string) => {
    setFeedItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, aura: item.aura + 1 };
      }
      return item;
    }));
    setCoins(prev => ({ ...prev, luv: Number((prev.luv + 0.1).toFixed(1)) }));
  };

  const onSentinelComplete = (isRejected: boolean) => {
    setIsScanning(false);
    if (isRejected) {
      // Aura Penalty: Significant drop for malicious attempts
      setAura(prev => Math.max(0, prev - 150));
      // Remove the malicious post from feed (it was shadow posted)
      setFeedItems(prev => prev.filter(item => !item.isVerifying));
      setMainIndex(0);
    } else {
      // Success: Finalize post and boost Aura
      setAura(prev => prev + 50);
      setCoins(prev => ({ ...prev, luv: Number((prev.luv + 5).toFixed(1)) }));
      setFeedItems(prev => prev.map(item => ({ ...item, isVerifying: false })));
    }
  };

  if (!isAuth) {
    return <Onboarding onLogin={() => setIsAuth(true)} />;
  }

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-colors duration-1000 overflow-hidden font-sans",
      isLunar ? "bg-[#050505] text-white" : "bg-slate-50 text-slate-900"
    )}>
      {/* Yellow Glow Ambience */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ 
          background: isLunar 
            ? `radial-gradient(circle at 0% 50%, rgba(250,204,21,${glowIntensity * 0.05}) 0%, transparent 50%), 
               radial-gradient(circle at 100% 50%, rgba(250,204,21,${glowIntensity * 0.05}) 0%, transparent 50%)`
            : `radial-gradient(circle at 0% 50%, rgba(59,130,246,${glowIntensity * 0.05}) 0%, transparent 50%), 
               radial-gradient(circle at 100% 50%, rgba(59,130,246,${glowIntensity * 0.05}) 0%, transparent 50%)`
        }}
      />

      {/* Header / TM Bridge / Neuro-Sync Protocol */}
      <header className="p-6 flex items-center justify-between z-50 bg-black/5 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.3)]">
            <Zap className="w-7 h-7 text-black" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">NeuroSphere</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-bold opacity-40 uppercase tracking-widest">AI-Funded Ecosystem v3.0</span>
            </div>
          </div>
        </div>

        {/* TM Liquidity Engine (Money Buttons) */}
        <div className="hidden lg:flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          <button 
            onClick={triggerSync}
            className="px-5 py-2.5 bg-green-500 text-black text-[10px] font-black rounded-xl uppercase hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-green-500/20"
          >
            <ArrowUpRight size={14} strokeWidth={3} /> Send
          </button>
          <button className="px-5 py-2.5 bg-blue-500 text-white text-[10px] font-black rounded-xl uppercase hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
            <Plus size={14} strokeWidth={3} /> Deposit
          </button>
          <button className="px-5 py-2.5 bg-white/10 text-white text-[10px] font-black rounded-xl uppercase hover:bg-white/20 transition-all">
            Receive
          </button>
        </div>

        <div className="flex items-center gap-6">
          {/* Parallel Sync Status */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex gap-1">
              <div className={cn("w-1.5 h-1.5 rounded-full transition-all", syncStatus === 'syncing' ? "bg-yellow-400 animate-ping" : "bg-blue-400")} title="GitHub" />
              <div className={cn("w-1.5 h-1.5 rounded-full transition-all", syncStatus === 'syncing' ? "bg-yellow-400 animate-ping" : "bg-orange-400")} title="GitLab" />
              <div className={cn("w-1.5 h-1.5 rounded-full transition-all", syncStatus === 'syncing' ? "bg-yellow-400 animate-ping" : "bg-green-400")} title="Vercel" />
            </div>
            <span className="text-[9px] font-bold opacity-50 uppercase tracking-widest">Parallel Sync</span>
          </div>

          <div className="flex items-center gap-3">
            <GlassCard className="px-4 py-2 flex items-center gap-3 rounded-2xl">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold opacity-50 uppercase">Aura Rep</span>
                <span className="font-mono font-bold text-yellow-400">{aura.toLocaleString()}</span>
              </div>
              <Zap size={16} className="text-yellow-400" />
            </GlassCard>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 p-0.5">
              <div className="w-full h-full rounded-[0.9rem] overflow-hidden bg-black">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col p-4 max-w-6xl mx-auto w-full gap-4 overflow-hidden">
        
        <AnimatePresence mode="wait">
          {view === 'feed' && (
            <motion.div 
              key="feed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col gap-4"
            >
              {/* Tri-Screen: Main Visual (TV Berundak) */}
              <motion.div 
                animate={{ scale: pulseScale }}
                className="relative flex-[2] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mainIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={feedItems[mainIndex].url} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
                    
                    {feedItems[mainIndex].isVerifying && (
                      <div className="absolute top-10 left-10 px-4 py-2 bg-yellow-400 text-black text-[10px] font-black rounded-full uppercase tracking-widest animate-pulse">
                        Verifying Content...
                      </div>
                    )}
                    
                    <div className="absolute top-10 right-10 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                      AI-Funded Project {mainIndex + 1}/3
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                  <div className="max-w-md">
                    <div className="flex gap-2 mb-4">
                      {feedItems[mainIndex].tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-yellow-400/20 backdrop-blur-md text-yellow-400 text-[10px] font-bold rounded-full border border-yellow-400/30">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-4xl font-bold mb-2 leading-tight">{feedItems[mainIndex].title}</h2>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-yellow-400">@{feedItems[mainIndex].author}</span>
                      <span className="w-1 h-1 bg-white/30 rounded-full" />
                      <span className="text-xs font-bold opacity-70 uppercase tracking-widest">Partner: {feedItems[mainIndex].partner}</span>
                      <span className="w-1 h-1 bg-white/30 rounded-full" />
                      <button 
                        onClick={() => handleSupportAura(feedItems[mainIndex].id)}
                        className="text-sm opacity-60 flex items-center gap-1 hover:text-yellow-400 transition-colors"
                      >
                        <Zap size={14} className="text-yellow-400" /> {feedItems[mainIndex].aura} Support Aura (+0.1 LUV)
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all">
                      <Share2 size={24} />
                    </button>
                    <button className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all">
                      <ArrowUpRight size={24} />
                    </button>
                  </div>
                </div>

                <AIGuardSentinel 
                  isScanning={isScanning} 
                  userAura={aura}
                  onComplete={onSentinelComplete} 
                />
              </motion.div>

              {/* Tri-Screen: Dual Mini-Screens */}
              <div className="flex-1 flex gap-4 min-h-[200px]">
                <GlassCard className="flex-1 p-6 relative group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 size={16} className="text-yellow-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Aura Graph</span>
                    </div>
                    <Maximize2 size={14} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <AuraGraph />
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs font-bold">Daily Progress</span>
                    <span className="text-xs text-yellow-400 font-mono">+12.4%</span>
                  </div>
                </GlassCard>

                <GlassCard className="flex-1 p-6 relative group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={16} className="text-yellow-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Idea Marketplace</span>
                    </div>
                    <Minimize2 size={14} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                      <img src={MOCK_PRODUCTS[0].image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm leading-tight mb-1">{MOCK_PRODUCTS[0].title}</h3>
                      <p className="text-xs text-yellow-400 font-mono">{MOCK_PRODUCTS[0].price} {MOCK_PRODUCTS[0].currency}</p>
                      <button className="mt-2 px-4 py-1.5 bg-yellow-400 text-black text-[10px] font-black rounded-full uppercase">Acquire</button>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          )}

          {view === 'tools' && (
            <motion.div 
              key="tools"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 grid grid-cols-4 gap-4 p-4 overflow-y-auto"
            >
              <ToolIcon icon={Plus} label="Create Post" onClick={handlePost} />
              <ToolIcon icon={Scan} label="Aura Scanner" />
              <ToolIcon icon={Wallet} label="LUV Rain" />
              <ToolIcon icon={Sparkles} label="Idea Minting" />
              <ToolIcon icon={Globe} label="Translator" />
              <ToolIcon icon={Mic} label="Voice-to-Kind" />
              <ToolIcon icon={Lock} label="Privacy" onClick={() => setView('privacy')} />
              <ToolIcon icon={BarChart3} label="Treasury" onClick={() => setView('treasury')} />
              <ToolIcon icon={Search} label="Quantum Search" />
              <ToolIcon icon={Trash2} label="Data Shredder" />
              <ToolIcon icon={Settings} label="Dimmer" />
              <ToolIcon icon={Map} label="Heatmap" />
              <ToolIcon icon={History} label="Auto-Clean" />
            </motion.div>
          )}

          {view === 'marketplace' && (
            <motion.div 
              key="marketplace"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-6 p-4 overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="text-3xl font-bold">Bank of Ideas</h2>
                  <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Triple-Win Commerce Enabled (25/25)</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white/5 rounded-xl text-xs font-bold border border-white/10">All</button>
                  <button className="px-4 py-2 bg-yellow-400 text-black rounded-xl text-xs font-bold">Tech</button>
                  <button className="px-4 py-2 bg-white/5 rounded-xl text-xs font-bold border border-white/10">Art</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {MOCK_PRODUCTS.map(product => (
                  <GlassCard key={product.id} className="p-4 flex gap-4">
                    <div className="w-32 h-32 rounded-3xl overflow-hidden border border-white/10">
                      <img src={product.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div>
                        <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">{product.category}</span>
                        <h3 className="text-xl font-bold leading-tight mt-1">{product.title}</h3>
                        <p className="text-xs opacity-50">by {product.author}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="font-mono font-bold text-lg">{product.price} <span className="text-xs opacity-50">{product.currency}</span></span>
                          <span className="text-[9px] font-bold text-green-400 uppercase">-25% Boost Applied</span>
                        </div>
                        <button className="p-3 bg-yellow-400 text-black rounded-2xl shadow-lg active:scale-95">
                          <ShoppingBag size={18} />
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'room' && (
            <CollaborativeRoom onBack={() => setView('feed')} />
          )}

          {view === 'wallet' && (
            <OIDWallet onBack={() => setView('feed')} />
          )}

          {view === 'compiler' && (
            <AuralangCompiler onBack={() => setView('feed')} />
          )}

          {view === 'treasury' && (
            <NeuroSphereTreasury onBack={() => setView('feed')} />
          )}

          {view === 'privacy' && (
            <PrivacyDashboard onBack={() => setView('feed')} />
          )}

          {view === 'aura-ai' && (
            <AuraAI 
              onBack={() => setView('feed')} 
              onNavigate={(v) => setView(v)} 
            />
          )}
        </AnimatePresence>
      </main>

      {/* Navigation Bar */}
      <nav className="p-8 flex justify-center z-50">
        <GlassCard className="p-2 flex items-center gap-2 rounded-[2.5rem] bg-black/40 border-white/20">
          <NavButton icon={<Zap />} label="Feed" active={view === 'feed'} onClick={() => setView('feed')} />
          <NavButton icon={<Layout />} label="Rooms" active={view === 'room'} onClick={() => setView('room')} />
          
          <button 
            onClick={() => setView('aura-ai')}
            className="w-16 h-16 bg-yellow-400 text-black rounded-[1.5rem] flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:scale-110 transition-all active:scale-90 mx-2 relative group"
          >
            <Brain size={32} strokeWidth={3} className="group-hover:animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-bounce" />
          </button>

          <NavButton icon={<Users />} label="OID" active={view === 'wallet'} onClick={() => setView('wallet')} />
          <NavButton icon={<Terminal />} label="Aura" active={view === 'compiler'} onClick={() => setView('compiler')} />
        </GlassCard>
      </nav>

      {/* Circadian Dimmer Slider (Floating) */}
      <div className="fixed bottom-10 right-10 flex flex-col items-center gap-4 z-[60]">
        <div className="h-32 w-1.5 bg-white/10 rounded-full relative overflow-hidden group">
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-yellow-400"
            style={{ height: `${glowIntensity * 100}%` }}
          />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={glowIntensity}
            onChange={(e) => setGlowIntensity(parseFloat(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-ns-resize"
            style={{ writingMode: 'vertical-lr' as any }}
          />
        </div>
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border transition-all",
          glowIntensity > 0.5 ? "bg-yellow-400 border-yellow-400 text-black" : "bg-white/5 border-white/10 text-white"
        )}>
          <Clock size={16} />
        </div>
      </div>

      {/* Status Bar */}
      <div className="px-8 py-2 flex justify-between items-center opacity-30 text-[9px] font-bold uppercase tracking-[0.3em]">
        <div className="flex gap-4">
          <span>IID: {isAuth ? 'VALIDATED' : 'PENDING'}</span>
          <span>GUARD: ACTIVE</span>
          <span>DATA: {Math.floor(Math.random() * 100)}M / 100M</span>
        </div>
        <div className="flex gap-4">
          <span>{new Date().toLocaleTimeString()}</span>
          <span>{mode === 'day' ? 'SOLAR' : 'LUNAR'} MODE</span>
        </div>
      </div>
    </div>
  );
}
