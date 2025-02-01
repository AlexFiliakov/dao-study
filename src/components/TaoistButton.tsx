'use client';

interface TaoistButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export default function TaoistButton({ 
  children, 
  onClick, 
  variant = 'primary',
  className = ''
}: TaoistButtonProps): JSX.Element {
  const baseStyles = 'flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg';
  
  const variants = {
    primary: 'bg-teal-700 text-neutral-50 hover:bg-teal-800',
    secondary: 'bg-neutral-800 text-neutral-50 hover:bg-neutral-900',
    accent: 'bg-red-800 text-neutral-50 hover:bg-red-900'
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
