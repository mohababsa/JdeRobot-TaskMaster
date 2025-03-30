import { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'icon';
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ variant = 'default', size = 'default', children, onClick, disabled, className = '', type = 'button' }: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500';
  const variantStyles = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
    ghost: 'text-gray-700 hover:bg-gray-100',
  };
  const sizeStyles = size === 'icon' ? 'p-2' : 'px-4 py-2';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles} ${className}`}
    >
      {children}
    </button>
  );
}