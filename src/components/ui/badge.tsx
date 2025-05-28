import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          {
            'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100': variant === 'default',
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300': variant === 'primary',
            'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300': variant === 'secondary',
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': variant === 'success',
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': variant === 'warning',
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': variant === 'danger',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;