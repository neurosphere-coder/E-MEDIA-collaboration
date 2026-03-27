import React from 'react';
import { motion } from 'motion/react';

export const AuraGraph = () => (
  <div className="h-32 w-full flex items-end gap-1 px-2">
    {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85].map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        animate={{ height: `${h}%` }}
        transition={{ delay: i * 0.1, duration: 0.5 }}
        className="flex-1 bg-yellow-400/30 rounded-t-sm relative group"
      >
        <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    ))}
  </div>
);
