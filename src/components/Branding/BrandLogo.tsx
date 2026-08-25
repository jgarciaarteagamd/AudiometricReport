
import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isPremium?: boolean;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', size = 'md', isPremium = false }) => {
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl md:text-4xl'
  };

  return (
    <div className={`flex items-center font-black tracking-tightest ${sizeClasses[size]} ${className}`}>
      <span className="text-slate-900">
        Audiometric
      </span>
      <span className="text-primary italic font-light ml-1">
        Report
      </span>
      <span className="text-[0.5em] align-top text-slate-400 font-bold ml-0.5">TM</span>
    </div>
  );
};

export default BrandLogo;
