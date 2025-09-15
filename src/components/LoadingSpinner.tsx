import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className,
  text 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center p-4', className)}>
      <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
      {text && (
        <p className={cn(
          'text-muted-foreground mt-2',
          size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
        )}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;