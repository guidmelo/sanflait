import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  type Vendor,
  type Customer,
  type Sale,
  type Store,
  type Product,
} from '@/lib/mock';

interface DataState {
  vendors: Vendor[];
  customers: Customer[];
  sales: Sale[];
  stores: Store[];
  products: Product[];

  addVendor: (v: Vendor) => void;
  updateVendor: (id: string, u: Partial<Vendor>) => void;
  removeVendor: (id: string) => void;

  addCustomer: (c: Customer) => void;
  updateCustomer: (id: string, u: Partial<Customer>) => void;
  removeCustomer: (id: string) => void;

  addSale: (s: Sale) => void;
  updateSale: (id: string, u: Partial<Sale>) => void;
  removeSale: (id: string) => void;

  addStore: (s: Store) => void;
  updateStore: (id: string, u: Partial<Store>) => void;

  addProduct: (p: Product) => void;
  updateProduct: (id: string, u: Partial<Product>) => void;
  removeProduct: (id: string) => void;
}

export const useData = create<DataState>()(
  persist(
    (set) => ({
      vendors: [],
      customers: [],
      sales: [],
      stores: [],
      products: [],

      addVendor: (v) => set((s) => ({ vendors: [...s.vendors, v] })),
      updateVendor: (id, u) =>
        set((s) => ({ vendors: s.vendors.map((v) => (v.id === id ? { ...v, ...u } : v)) })),
      removeVendor: (id) =>
        set((s) => ({ vendors: s.vendors.filter((v) => v.id !== id) })),

      addCustomer: (c) => set((s) => ({ customers: [c, ...s.customers] })),
      updateCustomer: (id, u) =>
        set((s) => ({ customers: s.customers.map((c) => (c.id === id ? { ...c, ...u } : c)) })),
      removeCustomer: (id) =>
        set((s) => ({ customers: s.customers.filter((c) => c.id !== id) })),

      addSale: (sale) => set((s) => ({ sales: [sale, ...s.sales] })),
      updateSale: (id, u) =>
        set((s) => ({ sales: s.sales.map((sale) => (sale.id === id ? { ...sale, ...u } : sale)) })),
      removeSale: (id) =>
        set((s) => ({ sales: s.sales.filter((sale) => sale.id !== id) })),

      addStore: (store) => set((s) => ({ stores: [...s.stores, store] })),
      updateStore: (id, u) =>
        set((s) => ({ stores: s.stores.map((store) => (store.id === id ? { ...store, ...u } : store)) })),

      addProduct: (p) => set((s) => ({ products: [...s.products, p] })),
      updateProduct: (id, u) =>
        set((s) => ({ products: s.products.map((p) => (p.id === id ? { ...p, ...u } : p)) })),
      removeProduct: (id) =>
        set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
    }),
    { name: 'sanflait-data-v2' },
  ),
);
