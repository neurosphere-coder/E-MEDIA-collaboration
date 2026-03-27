import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

export const NavButton = ({ icon, label, active, onClick }: NavButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center w-16 h-16 rounded-[1.5rem] transition-all relative group",
        active ? "text-yellow-400 bg-white/5" : "text-white/40 hover:text-white hover:bg-white/5"
      )}
    >
      <div className={cn(
        "mb-1 transition-transform group-hover:-translate-y-0.5",
        active && "scale-110"
      )}>
        {React.cloneElement(icon as React.ReactElement, { size: 20 })}
      </div>
      <span className="text-[8px] font-black uppercase tracking-tighter">{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-glow"
          className="absolute inset-0 bg-yellow-400/10 blur-xl rounded-full"
        />
      )}
    </button>
  );
};
