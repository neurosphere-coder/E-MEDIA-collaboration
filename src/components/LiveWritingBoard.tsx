import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Edit3, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LiveWritingBoardProps {
  content: string;
  onChange: (val: string) => void;
  isAiAssisting: boolean;
}

export const LiveWritingBoard = ({ content, onChange, isAiAssisting }: LiveWritingBoardProps) => {
  const [localContent, setLocalContent] = useState(content);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalContent(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="relative flex-1 flex flex-col bg-black/20 rounded-3xl border border-white/5 overflow-hidden group">
      <div className="p-3 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-2">
          <Edit3 size={14} className="text-yellow-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Shared Blueprint Board</span>
        </div>
        {isAiAssisting && (
          <div className="flex items-center gap-2 text-yellow-400">
            <Sparkles size={12} className="animate-spin" />
            <span className="text-[9px] font-bold uppercase tracking-widest">AI Structuring...</span>
          </div>
        )}
      </div>
      
      <textarea 
        value={localContent}
        onChange={handleChange}
        placeholder="Start typing your vision... Aura AI will help structure it into a Blueprint."
        className="flex-1 w-full bg-transparent p-6 text-sm leading-relaxed focus:outline-none resize-none scrollbar-hide font-mono"
      />

      {/* Cursor Simulation (Multiplayer Feel) */}
      <motion.div 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="absolute top-20 left-40 w-0.5 h-5 bg-blue-400 pointer-events-none"
      >
        <div className="absolute -top-4 left-0 px-1.5 py-0.5 bg-blue-400 text-black text-[8px] font-bold rounded uppercase">Architect</div>
      </motion.div>

      <motion.div 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        className="absolute bottom-20 right-40 w-0.5 h-5 bg-purple-400 pointer-events-none"
      >
        <div className="absolute -top-4 left-0 px-1.5 py-0.5 bg-purple-400 text-black text-[8px] font-bold rounded uppercase">Supplier</div>
      </motion.div>
    </div>
  );
};
