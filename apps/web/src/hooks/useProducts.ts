import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import api from '@/lib/api';

export interface ApiProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  collection?: string;
  description?: string;
  basePrice: number;
  oldPrice?: number | null;
  badge?: string | null;
  images: string[];
  active: boolean;
  variants: {
    id: string;
    color: string;
    size: string;
    sku: string;
    price?: number | null;
  }[];
}

const HAS_API = !!(import.meta.env.VITE_API_URL);

function normalise(p: ApiProduct) {
  return {
    ...p,
    price: Number(p.basePrice),
    oldPrice: p.oldPrice ? Number(p.oldPrice) : undefined,
  };
}

export function useProducts(params?: { collection?: string; category?: string }) {
  const qc = useQueryClient();

  useEffect(() => {
    const sb = supabase;
    if (!sb) return;
    const ch = sb
      .channel('products-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Product' }, () => {
        qc.invalidateQueries({ queryKey: ['products'] });
      })
      .subscribe();
    return () => { sb.removeChannel(ch); };
  }, [qc]);

  return useQuery<ReturnType<typeof normalise>[]>({
    queryKey: ['products', params],
    queryFn: async () => {
      const { data } = await api.get('/products', { params });
      return (data as ApiProduct[]).map(normalise);
    },
    enabled: HAS_API,
    staleTime: 30_000,
    retry: 1,
  });
}

export function useProduct(slug?: string) {
  const qc = useQueryClient();

  useEffect(() => {
    const sb = supabase;
    if (!sb || !slug) return;
    const ch = sb
      .channel(`product-${slug}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Product' }, () => {
        qc.invalidateQueries({ queryKey: ['product', slug] });
      })
      .subscribe();
    return () => { sb.removeChannel(ch); };
  }, [slug, qc]);

  return useQuery<ReturnType<typeof normalise>>({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data } = await api.get(`/products/${slug}`);
      return normalise(data as ApiProduct);
    },
    enabled: HAS_API && !!slug,
    staleTime: 30_000,
    retry: 1,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<ApiProduct>) =>
      api.post('/products', body).then((r) => normalise(r.data)),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: string } & Partial<ApiProduct>) =>
      api.patch(`/products/${id}`, body).then((r) => normalise(r.data)),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/products/${id}`).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}
