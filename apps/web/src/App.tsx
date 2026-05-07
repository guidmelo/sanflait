import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '@/layouts/PublicLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

// Public pages
import { HomePage } from '@/pages/public/HomePage';
import { CollectionPage } from '@/pages/public/CollectionPage';
import { ProductPage } from '@/pages/public/ProductPage';
import { StoresPage } from '@/pages/public/StoresPage';
import { ClubePage } from '@/pages/public/ClubePage';
import { VendorLinkPage } from '@/pages/public/VendorLinkPage';

// Auth
import { LoginPage } from '@/pages/auth/LoginPage';

// Admin pages
import { DashboardPage } from '@/pages/admin/DashboardPage';
import { SalesPage } from '@/pages/admin/SalesPage';
import { CustomersPage } from '@/pages/admin/CustomersPage';
import { CRMPage } from '@/pages/admin/CRMPage';
import { ProductsPage } from '@/pages/admin/ProductsPage';
import { VendorsPage } from '@/pages/admin/VendorsPage';
import { AnalyticsPage } from '@/pages/admin/AnalyticsPage';
import { StoresAdminPage } from '@/pages/admin/StoresAdminPage';
import { InventoryPage } from '@/pages/admin/InventoryPage';
import { SettingsPage } from '@/pages/admin/SettingsPage';

export function App() {
  return (
    <Routes>
      {/* Vendor link — captures attribution then redirects */}
      <Route path="/r/:slug" element={<VendorLinkPage />} />

      {/* Auth (no layout) */}
      <Route path="/login" element={<LoginPage />} />

      {/* Public site (Foxton-style) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/colecoes" element={<CollectionPage />} />
        <Route path="/colecoes/:slug" element={<CollectionPage />} />
        <Route path="/produtos" element={<CollectionPage />} />
        <Route path="/produtos/:slug" element={<ProductPage />} />
        <Route path="/lojas" element={<StoresPage />} />
        <Route path="/clube" element={<ClubePage />} />
      </Route>

      {/* Admin (Power BI dark) */}
      <Route path="/app" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="crm" element={<CRMPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="vendors" element={<VendorsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="stores" element={<StoresAdminPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
