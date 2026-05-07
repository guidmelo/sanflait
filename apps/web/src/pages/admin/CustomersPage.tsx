import { Plus, Search, FileDown, Phone, Mail } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/admin/Card';
import { customers, vendors } from '@/lib/mock';
import { cn, relativeTime } from '@/lib/utils';

const STATUS_STYLES = {
  LEAD: 'bg-accent-blue-dim text-accent-blue',
  EM_NEGOCIACAO: 'bg-accent-amber-dim text-accent-amber',
  CONVERTIDO: 'bg-accent-green-dim text-accent-green',
  PERDIDO: 'bg-accent-red-dim text-accent-red',
};
const STATUS_LABEL = {
  LEAD: 'Lead',
  EM_NEGOCIACAO: 'Negociando',
  CONVERTIDO: 'Convertido',
  PERDIDO: 'Perdido',
};

export function CustomersPage() {
  return (
    <>
      <AdminTopBar title="Clientes" subtitle={`${customers.length} contatos cadastrados`} showLive={false} />
      <div className="flex-1 overflow-y-auto admin-scroll p-4">
        <div className="grid grid-cols-4 gap-2.5 mb-3">
          {[
            { label: 'Total de clientes', value: '1.240', accent: 'border-accent-blue' },
            { label: 'Convertidos', value: '347', accent: 'border-accent-green' },
            { label: 'Em negociação', value: '54', accent: 'border-accent-amber' },
            { label: 'Taxa de conversão', value: '8,3%', accent: 'border-accent-purple' },
          ].map((k) => (
            <div key={k.label} className={cn('admin-card p-3 border-l-2 rounded-l-none', k.accent)}>
              <p className="text-[10px] uppercase tracking-[0.05em] text-ink-text-3 mb-1">{k.label}</p>
              <p className="text-[18px] font-semibold text-ink-text-1">{k.value}</p>
            </div>
          ))}
        </div>

        <Card
          title="Lista de clientes"
          subtitle="Filtre por bairro, idade ou origem"
          action={
            <>
              <div className="flex items-center gap-1.5 bg-ink-3 border border-line rounded px-2 py-1">
                <Search size={11} className="text-ink-text-3" />
                <input placeholder="Buscar" className="bg-transparent outline-none text-[11px] w-28" />
              </div>
              <button className="admin-button-ghost"><FileDown size={11} /> Excel</button>
              <button className="admin-button-primary"><Plus size={11} /> Novo cliente</button>
            </>
          }
        >
          <div className="overflow-x-auto -mx-4">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-[9px] uppercase tracking-wider text-ink-text-3 border-b border-line">
                  <th className="text-left py-2 px-4">Cliente</th>
                  <th className="text-left py-2">Contato</th>
                  <th className="text-left py-2">Bairro</th>
                  <th className="text-center py-2">Idade</th>
                  <th className="text-left py-2">Origem</th>
                  <th className="text-left py-2">Vendedor</th>
                  <th className="text-center py-2">Status</th>
                  <th className="text-right py-2 px-4">Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => {
                  const v = vendors.find((x) => x.id === c.vendorId);
                  return (
                    <tr key={c.id} className="border-b border-line/50 hover:bg-ink-3 transition-colors">
                      <td className="py-2.5 px-4">
                        <div>
                          <p className="text-ink-text-1 font-medium">{c.name}</p>
                          <p className="text-ink-text-3 text-[10px]">{c.gender}</p>
                        </div>
                      </td>
                      <td className="py-2.5">
                        <div className="space-y-0.5 text-ink-text-2">
                          <div className="flex items-center gap-1"><Phone size={9} /> {c.phone}</div>
                          <div className="flex items-center gap-1 text-[10px]"><Mail size={9} /> {c.email}</div>
                        </div>
                      </td>
                      <td className="py-2.5 text-ink-text-2">{c.neighborhood}</td>
                      <td className="py-2.5 text-center text-ink-text-2">{c.age}</td>
                      <td className="py-2.5 text-ink-text-2">{c.source}</td>
                      <td className="py-2.5">
                        {v && (
                          <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-full text-white text-[7px] font-semibold flex items-center justify-center" style={{ background: v.color }}>
                              {v.initials}
                            </div>
                            <span className="text-ink-text-2 text-[10px]">{v.name.split(' ')[0]}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 text-center">
                        <span className={cn('admin-pill', STATUS_STYLES[c.status])}>
                          {STATUS_LABEL[c.status]}
                        </span>
                      </td>
                      <td className="py-2.5 text-right text-ink-text-3 px-4">{relativeTime(c.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
