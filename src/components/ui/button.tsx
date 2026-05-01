import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-[0.9375rem] font-semibold tracking-[0.02em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-dark disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:   'bg-cyan text-dark hover:bg-cyan-dark hover:shadow-[0_0_24px_rgba(0,217,255,0.4)] active:scale-[0.96] transition-shadow duration-300',
        secondary: 'border-2 border-pink text-pink hover:bg-pink-light active:scale-[0.96]',
        outline:   'border border-border bg-transparent text-bright hover:bg-surface-medium',
        ghost:     'text-bright hover:bg-surface-medium',
        link:      'h-auto p-0 text-cyan underline-offset-4 hover:underline hover:text-cyan-dark',
      },
      size: {
        default: 'h-12 px-6 py-3',
        sm:      'h-9 rounded-md px-4 text-sm',
        lg:      'h-13 rounded-xl px-8 text-base',
        icon:    'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size:    'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
