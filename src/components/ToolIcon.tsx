import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToolIconProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export const ToolIcon = ({ icon: Icon, label, onClick }: ToolIconProps) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-2 p-4 rounded-3xl hover:bg-white/5 transition-all group active:scale-95"
  >
    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-yellow-400/50 group-hover:text-yellow-400 transition-all">
      <Icon size={20} />
    </div>
    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">{label}</span>
  </button>
);
