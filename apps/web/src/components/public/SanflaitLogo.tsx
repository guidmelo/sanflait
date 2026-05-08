interface SanflaitLogoProps {
  className?: string;
  textClassName?: string;
}

export function SanflaitLogo({ className = '', textClassName = '' }: SanflaitLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Asa esquerda */}
      <svg
        viewBox="0 0 52 44"
        className="h-[0.85em] w-auto flex-shrink-0"
        fill="currentColor"
        aria-hidden
      >
        <polygon points="50,6 50,14 0,12" />
        <polygon points="50,17 50,27 0,22" />
        <polygon points="50,30 50,38 0,32" />
      </svg>

      {/* Nome */}
      <span
        className={textClassName}
        style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 900, letterSpacing: '0.22em', lineHeight: 1 }}
      >
        SANFLAIT
      </span>

      {/* Asa direita (espelhada) */}
      <svg
        viewBox="0 0 52 44"
        className="h-[0.85em] w-auto flex-shrink-0"
        fill="currentColor"
        aria-hidden
        style={{ transform: 'scaleX(-1)' }}
      >
        <polygon points="50,6 50,14 0,12" />
        <polygon points="50,17 50,27 0,22" />
        <polygon points="50,30 50,38 0,32" />
      </svg>
    </span>
  );
}
