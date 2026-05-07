import { Outlet } from 'react-router-dom';
import { PublicNav } from '@/components/public/PublicNav';
import { PublicFooter } from '@/components/public/PublicFooter';
import { WhatsAppFloat } from '@/components/public/WhatsAppFloat';

export function PublicLayout() {
  return (
    <div className="bg-cream text-charcoal min-h-screen flex flex-col">
      <PublicNav />
      <main className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>
      <PublicFooter />
      <WhatsAppFloat />
    </div>
  );
}
