import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Attribution {
  vendorSlug: string | null;
  vendorId: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  firstSeenAt: string | null;
  lastClickAt: string | null;
}

interface TrackingState extends Attribution {
  attributeToVendor: (vendorSlug: string, vendorId: string) => void;
  setUtm: (source: string | null, medium: string | null, campaign: string | null) => void;
  reset: () => void;
}

const empty: Attribution = {
  vendorSlug: null,
  vendorId: null,
  utmSource: null,
  utmMedium: null,
  utmCampaign: null,
  firstSeenAt: null,
  lastClickAt: null,
};

export const useTracking = create<TrackingState>()(
  persist(
    (set, get) => ({
      ...empty,
      attributeToVendor: (vendorSlug, vendorId) => {
        const now = new Date().toISOString();
        const { firstSeenAt } = get();
        set({
          vendorSlug,
          vendorId,
          firstSeenAt: firstSeenAt ?? now,
          lastClickAt: now,
        });
      },
      setUtm: (utmSource, utmMedium, utmCampaign) => set({ utmSource, utmMedium, utmCampaign }),
      reset: () => set(empty),
    }),
    {
      name: 'sanflait-attribution',
      // 30-day persistence handled by Zustand persist; expiry logic could go in a hook
    },
  ),
);
