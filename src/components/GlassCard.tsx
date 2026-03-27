import React from 'react';
import { cn } from '@/src/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, onClick, ...props }) => (
  <div 
    className={cn(
      "bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden transition-all hover:border-white/20",
      className
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </div>
);
