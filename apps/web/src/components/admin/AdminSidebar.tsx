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

interface SidebarProps {
  collapsed?: boolean;
}

export function AdminSidebar({ collapsed = true }: SidebarProps) {
  const { user, logout } = useAuth();
  const role = user?.role ?? 'ADMIN';
  const visible = NAV.filter((n) => n.roles.includes(role));
  const visible2 = NAV2.filter((n) => n.roles.includes(role));

  return (
    <aside
      className={cn(
        'bg-ink-1 border-r border-line flex flex-col items-stretch flex-shrink-0 transition-all',
        collapsed ? 'w-[60px]' : 'w-[220px]',
      )}
    >
      <div className="h-12 flex items-center justify-center border-b border-line">
        <div className="w-8 h-8 rounded-md bg-accent-blue text-white flex items-center justify-center text-[10px] font-semibold tracking-wider">
          SN
        </div>
      </div>

      <nav className="flex-1 py-3 flex flex-col gap-0.5 px-2 admin-scroll overflow-y-auto">
        {visible.map((item) => (
          <SidebarLink key={item.to} item={item} collapsed={collapsed} />
        ))}
        <div className="my-3 mx-3 h-px bg-line" />
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
          className={cn(
            'flex items-center gap-3 px-2 py-2 rounded-md transition-colors text-ink-text-3 hover:bg-ink-3 hover:text-ink-text-1 mt-1',
          )}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0"
            style={{ background: user?.avatarColor ?? '#8B5CF6' }}
          >
            {user?.initials ?? '?'}
          </div>
          {!collapsed && (
            <span className="text-[12px] truncate">
              {user?.name?.split(' ')[0] ?? 'Sair'}
            </span>
          )}
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
          'flex items-center gap-3 px-2 py-2 rounded-md transition-colors',
          collapsed && 'justify-center',
          isActive
            ? 'bg-accent-blue-dim text-accent-blue'
            : 'text-ink-text-3 hover:bg-ink-3 hover:text-ink-text-1',
        )
      }
      title={collapsed ? item.label : undefined}
    >
      <Icon size={16} strokeWidth={1.75} />
      {!collapsed && <span className="text-[12px]">{item.label}</span>}
    </NavLink>
  );
}
