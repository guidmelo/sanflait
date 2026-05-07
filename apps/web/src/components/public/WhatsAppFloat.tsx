import { MessageCircle } from 'lucide-react';
import { useTracking } from '@/stores/tracking';

export function WhatsAppFloat() {
  const { vendorSlug } = useTracking();

  const handleClick = () => {
    const baseMsg = vendorSlug
      ? `Olá! Vim pelo link do(a) vendedor(a) ${vendorSlug}. Gostaria de conhecer as peças.`
      : 'Olá! Gostaria de conhecer as peças da Sanflait.';
    const url = `https://wa.me/5575999000000?text=${encodeURIComponent(baseMsg)}`;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_24px_rgba(37,211,102,0.45)] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
    >
      <MessageCircle size={22} strokeWidth={1.5} fill="white" />
    </button>
  );
}
