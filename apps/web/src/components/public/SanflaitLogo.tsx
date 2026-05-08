interface SanflaitLogoProps {
  className?: string;
  textClassName?: string;
}

export function SanflaitLogo({ className = '', textClassName = '' }: SanflaitLogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {/* Asa esquerda — 3 penas convergindo para o centro */}
      <svg
        viewBox="0 0 48 44"
        className="h-[0.9em] w-auto flex-shrink-0"
        fill="currentColor"
        aria-hidden
      >
        {/* Pena superior: base larga à direita, estreita à esquerda */}
        <polygon points="48,3 48,11 0,10 0,6" />
        {/* Pena central */}
        <polygon points="46,16 46,25 0,23 0,18" />
        {/* Pena inferior */}
        <polygon points="44,29 44,38 0,36 0,31" />
      </svg>

      {/* Nome */}
      <span
        className={textClassName}
        style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 900, letterSpacing: '0.22em', lineHeight: 1 }}
      >
        SANFLAIT
      </span>

      {/* Asa direita — espelho */}
      <svg
        viewBox="0 0 48 44"
        className="h-[0.9em] w-auto flex-shrink-0"
        fill="currentColor"
        aria-hidden
        style={{ transform: 'scaleX(-1)' }}
      >
        <polygon points="48,3 48,11 0,10 0,6" />
        <polygon points="46,16 46,25 0,23 0,18" />
        <polygon points="44,29 44,38 0,36 0,31" />
      </svg>
    </span>
  );
}
