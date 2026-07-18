import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { lavoriPassati, euro } from "../mock/data";
import { AnteprimaBadge, Badge, Card, PageTitle, useToast } from "../components/ui";

export default function Libreria() {
  const toast = useToast();
  const [q, setQ] = useState("");
  const lista = lavoriPassati.filter(
    (l) => l.titolo.toLowerCase().includes(q.toLowerCase()) || l.tag.some((t) => t.includes(q.toLowerCase()))
  );

  return (
    <div>
      <PageTitle
        title="Libreria gare e preventivi"
        badge={<AnteprimaBadge />}
        subtitle="Archivio dei lavori passati per stimare più in fretta i nuovi preventivi (Fase 2)"
      />
      <div className="relative mb-4 max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cerca per titolo o tag (es. fotovoltaico)…"
          className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-petrol-600 focus:outline-none" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {lista.map((l) => (
          <Card key={l.id} className="flex flex-col p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="font-semibold text-slate-900">{l.titolo}</div>
              <Badge value={l.esito} />
            </div>
            <div className="mt-1 text-sm text-slate-500">{l.cliente} · {l.anno}</div>
            <div className="mt-2 text-lg font-semibold text-petrol-700">{euro(l.importo)}</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {l.tag.map((t) => (
                <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">#{t}</span>
              ))}
            </div>
            <button onClick={() => toast("Ricerca lavori simili — disponibile in Fase 2")}
              className="mt-4 flex items-center justify-center gap-1.5 rounded-lg border border-petrol-200 bg-petrol-50 px-3 py-2 text-sm font-medium text-petrol-700 hover:bg-petrol-100">
              <Sparkles size={15} /> Trova lavoro simile
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
