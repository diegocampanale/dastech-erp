import { FileText, Mic, Check, Pencil } from "lucide-react";
import { richiesteMateriale, commesse } from "../mock/data";
import { Card, PageTitle, useToast } from "../components/ui";

export default function Richieste() {
  const toast = useToast();
  return (
    <div>
      <PageTitle
        title="Richieste materiale"
        subtitle="Coda di richieste dai cantieri da validare prima dell'ordine"
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {richiesteMateriale.map((r) => {
          const c = commesse.find((x) => x.id === r.commessaId);
          const vocale = r.canale === "Messaggio vocale";
          return (
            <Card key={r.id} className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`rounded-lg p-2 ${vocale ? "bg-violet-100 text-violet-700" : "bg-petrol-100 text-petrol-700"}`}>
                    {vocale ? <Mic size={18} /> : <FileText size={18} />}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{r.richiedente}</div>
                    <div className="text-xs text-slate-500">{r.canale} · {r.data}</div>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  r.affidabilita >= 90 ? "bg-emerald-100 text-emerald-700" : r.affidabilita >= 80 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                }`}>
                  Lettura {r.affidabilita}%
                </span>
              </div>

              <div className="mt-2 text-sm text-slate-500">Commessa: <span className="font-medium text-slate-700">{c?.nome}</span></div>

              {r.trascrizione && (
                <blockquote className="mt-3 rounded-lg border-l-4 border-violet-300 bg-violet-50 px-3 py-2 text-sm italic text-slate-600">
                  {r.trascrizione}
                </blockquote>
              )}

              <ul className="mt-3 flex-1 divide-y divide-slate-100 rounded-lg border border-slate-200 text-sm">
                {r.righe.map((riga, i) => (
                  <li key={i} className="flex justify-between px-3 py-2">
                    <span className="text-slate-800">{riga.articolo}</span>
                    <span className="font-medium text-slate-500">{riga.quantita}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex gap-2">
                <button onClick={() => toast(`Richiesta di ${r.richiedente} confermata (demo)`)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-petrol-600 px-3 py-2 text-sm font-medium text-white hover:bg-petrol-700">
                  <Check size={16} /> Conferma
                </button>
                <button onClick={() => toast("Apertura correzione (demo)")}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <Pencil size={16} /> Correggi
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
