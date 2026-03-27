import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  Send, 
  ArrowLeft, 
  Sparkles, 
  Zap, 
  Brain, 
  Target, 
  Compass, 
  Cpu,
  Volume2,
  VolumeX,
  Terminal,
  FileText,
  Users,
  ShoppingBag
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { GlassCard } from './GlassCard';
import { cn } from '@/src/lib/utils';

interface Message {
  role: 'user' | 'ai';
  text: string;
  type?: 'info' | 'action' | 'blueprint' | 'contract';
  actions?: { label: string; view: string }[];
}

interface AuraAIProps {
  onBack: () => void;
  onNavigate: (view: any) => void;
}

const SYSTEM_INSTRUCTION = `
You are "Aura AI", the central intelligence system of NeuroSphere. 
NeuroSphere is a value-based human network, not just social media.

CORE PRINCIPLES:
1. Navigator: Guide users through IID, Aura, Wallet, and Project Rooms.
2. Mentor: Help users improve their Aura and contribution.
3. Strategist: Help users build "Blueprints" for real-world projects.
4. Executor: Convert natural language into "AuraLang" smart contracts or product listings.

ECONOMIC MODEL:
- Triple-Win 25/25: 25% discount for buyers, 25% bonus for sellers, funded by Treasury.
- Aura: Reputation based on contribution.
- LUV/ENPE: Ecosystem currencies.

RESPONSE STYLE:
- Intelligent, friendly, and action-oriented.
- Use multi-level explanations (simple for beginners, technical for experts).
- Always suggest a next step or feature to visit.

INTENT DETECTION:
- If user wants to build: Offer to generate a "Blueprint".
- If user wants to sell: Offer to create a "Listing".
- If user wants to collaborate: Suggest "Project Rooms".
- If user is confused: Offer a "Navigator" tour.

AuraLang:
When a user describes a deal (e.g., "60:40 split"), represent it as a code-like block labeled [AuraLang Contract].
`;

export const AuraAI = ({ onBack, onNavigate }: AuraAIProps) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      text: "Greetings, IID Holder. I am Aura AI. How shall we evolve the ecosystem today?",
      actions: [
        { label: "What is NeuroSphere?", view: "info" },
        { label: "Start a Project", view: "room" },
        { label: "Check Treasury", view: "treasury" }
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })), { role: 'user', parts: [{ text }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const aiText = response.text || "I am processing your request through the neural lattice. Please rephrase.";
      
      // Basic Action Detection (Simulated)
      let actions: { label: string; view: string }[] = [];
      const lowerText = aiText.toLowerCase();
      if (lowerText.includes("marketplace") || lowerText.includes("listing") || lowerText.includes("sell")) {
        actions.push({ label: "Open Marketplace", view: "marketplace" });
      }
      if (lowerText.includes("project") || lowerText.includes("blueprint") || lowerText.includes("collab")) {
        actions.push({ label: "Go to Project Room", view: "room" });
      }
      if (lowerText.includes("wallet") || lowerText.includes("luv") || lowerText.includes("coin")) {
        actions.push({ label: "Open OID Wallet", view: "wallet" });
      }
      if (lowerText.includes("treasury") || lowerText.includes("reserve") || lowerText.includes("economy")) {
        actions.push({ label: "Check Treasury", view: "treasury" });
      }
      if (lowerText.includes("privacy") || lowerText.includes("security") || lowerText.includes("data")) {
        actions.push({ label: "Privacy Settings", view: "privacy" });
      }
      if (lowerText.includes("aura") && !lowerText.includes("ai")) {
        actions.push({ label: "Aura Compiler", view: "compiler" });
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiText, actions }]);
    } catch (error) {
      console.error("Aura AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Connection to Neural Lattice interrupted. Retrying sync..." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex-1 flex flex-col h-full overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.3)]">
              <Brain className="text-black" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Aura AI</h2>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">Neural Sync Active</span>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all"
        >
          {isMuted ? <VolumeX size={20} className="opacity-50" /> : <Volume2 size={20} className="text-yellow-400" />}
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex flex-col gap-2 max-w-[85%]",
              msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            <div className={cn(
              "p-4 rounded-3xl text-sm leading-relaxed",
              msg.role === 'user' 
                ? "bg-yellow-400 text-black font-medium rounded-tr-none" 
                : "bg-white/5 border border-white/10 text-white rounded-tl-none"
            )}>
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className={cn(line.startsWith('[') ? "font-mono text-[11px] bg-black/40 p-2 rounded-lg my-2 border border-yellow-400/20 text-yellow-400" : "")}>
                  {line}
                </p>
              ))}
            </div>
            
            {msg.actions && msg.actions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {msg.actions.map((act, i) => (
                  <button 
                    key={i}
                    onClick={() => onNavigate(act.view)}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-all"
                  >
                    {act.label}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-yellow-400/50">
            <Sparkles size={16} className="animate-spin" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Aura AI is thinking...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="flex gap-4 items-center max-w-4xl mx-auto">
          <button 
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
              isVoiceActive ? "bg-red-500 text-white animate-pulse" : "bg-white/5 text-white hover:bg-white/10"
            )}
          >
            <Mic size={24} />
          </button>
          
          <div className="flex-1 relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder={isVoiceActive ? "Listening to your intent..." : "Ask Aura AI anything..."}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-yellow-400/50 transition-all"
            />
            <button 
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-yellow-400 text-black rounded-xl flex items-center justify-center disabled:opacity-50 disabled:scale-95 transition-all"
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="flex justify-center gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          <SuggestionChip icon={<Target size={12} />} label="Start Business" onClick={() => handleSend("I want to start a business")} />
          <SuggestionChip icon={<Cpu size={12} />} label="Build Blueprint" onClick={() => handleSend("Help me build a project blueprint")} />
          <SuggestionChip icon={<Users size={12} />} label="Find Partners" onClick={() => handleSend("I need partners for a green energy project")} />
          <SuggestionChip icon={<Compass size={12} />} label="Navigator" onClick={() => handleSend("Show me how to use NeuroSphere")} />
        </div>
      </div>
    </motion.div>
  );
};

const SuggestionChip = ({ icon, label, onClick }: { icon: any; label: string; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all whitespace-nowrap"
  >
    {icon}
    {label}
  </button>
);
