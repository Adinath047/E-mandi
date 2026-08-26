// Reusable Button component matching e-Mandi design system

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-label-md transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#1b4332] text-white hover:bg-[#012d1d]',
    secondary: 'bg-transparent border border-[#012d1d] text-[#012d1d] hover:bg-[#eef5f7]',
    outline: 'bg-transparent border border-[#c1c8c2] text-[#161d1f] hover:bg-[#e8eff1]',
    danger: 'bg-[#ba1a1a] text-white hover:bg-[#93000a]',
    ghost: 'bg-transparent text-[#012d1d] hover:bg-[#eef5f7]',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs rounded',
    md: 'px-6 py-2 text-sm rounded',
    lg: 'px-8 py-3 text-sm rounded',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      )}
    </button>
  );
}
