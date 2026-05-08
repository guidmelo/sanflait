import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  Shirt,
  Users,
  BarChart3,
  Building2,
  IdCard,
  Settings,
  KanbanSquare,
  Package,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth, type Role } from '@/stores/auth';

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
  roles: Role[];
}

const NAV: NavItem[] = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'GERENTE', 'VENDEDOR', 'SUPORTE'] },
  { to: '/app/sales', label: 'Vendas', icon: Receipt, roles: ['ADMIN', 'GERENTE', 'VENDEDOR'] },
  { to: '/app/products', label: 'Produtos', icon: Shirt, roles: ['ADMIN', 'GERENTE'] },
  { to: '/app/customers', label: 'Clientes', icon: Users, roles: ['ADMIN', 'GERENTE', 'VENDEDOR', 'SUPORTE'] },
  { to: '/app/crm', label: 'CRM', icon: KanbanSquare, roles: ['ADMIN', 'GERENTE', 'VENDEDOR', 'SUPORTE'] },
  { to: '/app/analytics', label: 'Analytics', icon: BarChart3, roles: ['ADMIN', 'GERENTE'] },
];

const NAV2: NavItem[] = [
  { to: '/app/stores', label: 'Lojas', icon: Building2, roles: ['ADMIN', 'GERENTE'] },
  { to: '/app/vendors', label: 'Vendedores', icon: IdCard, roles: ['ADMIN', 'GERENTE'] },
  { to: '/app/inventory', label: 'Estoque', icon: Package, roles: ['ADMIN', 'GERENTE'] },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const { user, logout } = useAuth();
  const role = user?.role ?? 'ADMIN';
  const visible = NAV.filter((n) => n.roles.includes(role));
  const visible2 = NAV2.filter((n) => n.roles.includes(role));

  return (
    <aside
      className={cn(
        'bg-ink-1 border-r border-line flex flex-col items-stretch flex-shrink-0 transition-all duration-200',
        collapsed ? 'w-[60px]' : 'w-[200px]',
      )}
    >
      {/* Logo + toggle */}
      <div className="h-12 flex items-center justify-between px-2 border-b border-line">
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-semibold tracking-wider flex-shrink-0"
          style={{ background: '#0D3829', color: '#C4A040' }}
        >
          SF
        </div>
        {!collapsed && (
          <span className="text-[11px] font-semibold tracking-[0.12em] ml-2 flex-1" style={{ color: '#C4A040' }}>
            SANFLAIT
          </span>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="text-ink-text-3 hover:text-ink-text-1 p-1 rounded transition-colors ml-auto"
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          <ChevronRight
            size={14}
            className={cn('transition-transform duration-200', !collapsed && 'rotate-180')}
          />
        </button>
      </div>

      <nav className="flex-1 py-3 flex flex-col gap-0.5 px-2 admin-scroll overflow-y-auto">
        {visible.map((item) => (
          <SidebarLink key={item.to} item={item} collapsed={collapsed} />
        ))}
        <div className="my-3 mx-1 h-px bg-line" />
        {visible2.map((item) => (
          <SidebarLink key={item.to} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <div className="px-2 pb-3 pt-2 border-t border-line flex flex-col gap-0.5">
        <SidebarLink
          item={{ to: '/app/settings', label: 'Configurações', icon: Settings, roles: ['ADMIN', 'GERENTE', 'VENDEDOR', 'SUPORTE'] }}
          collapsed={collapsed}
        />
        <button
          onClick={logout}
          className="flex items-center gap-2.5 px-2 py-2 rounded-md transition-colors text-ink-text-3 hover:bg-accent-red-dim hover:text-accent-red mt-1 w-full"
          title={collapsed ? 'Sair' : undefined}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-medium text-white flex-shrink-0"
            style={{ background: user?.avatarColor ?? '#8B5CF6' }}
          >
            {user?.initials ?? '?'}
          </div>
          {!collapsed && (
            <span className="text-[11px] truncate flex-1 text-left">{user?.name?.split(' ')[0] ?? 'Usuário'}</span>
          )}
          {!collapsed && <LogOut size={12} className="flex-shrink-0" />}
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.to.endsWith('/dashboard')}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-2.5 px-2 py-2 rounded-md transition-colors',
          collapsed && 'justify-center',
          isActive
            ? 'bg-accent-blue-dim text-accent-blue'
            : 'text-ink-text-3 hover:bg-ink-3 hover:text-ink-text-1',
        )
      }
      title={collapsed ? item.label : undefined}
    >
      <Icon size={15} strokeWidth={1.75} className="flex-shrink-0" />
      {!collapsed && <span className="text-[12px]">{item.label}</span>}
    </NavLink>
  );
}
