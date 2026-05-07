import { Outlet, Navigate } from 'react-router-dom';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useAuth } from '@/stores/auth';

export function AdminLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-screen w-screen flex bg-ink-0 text-ink-text-1 font-sans overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
