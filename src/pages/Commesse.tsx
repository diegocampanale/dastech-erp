import { Link } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";
import { commesse, euro, totaleCommessa } from "../mock/data";
import { Badge, Card, PageTitle } from "../components/ui";

export default function Commesse() {
  return (
    <div>
      <PageTitle title="Commesse" subtitle="Cantieri e lavori in gestione" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {commesse.map((c) => (
          <Link key={c.id} to={`/app/commesse/${c.id}`}>
            <Card className="h-full p-5 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-slate-900">{c.nome}</div>
                <ChevronRight size={18} className="mt-0.5 shrink-0 text-slate-300" />
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                <MapPin size={14} /> {c.luogo} · {c.cliente}
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <Badge value={c.stato} />
                <span className="text-slate-500">{euro(totaleCommessa(c))} / {euro(c.budget)}</span>
              </div>
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs text-slate-400">
                  <span>Avanzamento</span><span>{c.avanzamento}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-petrol-600" style={{ width: `${c.avanzamento}%` }} />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
