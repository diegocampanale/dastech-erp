import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Smartphone, Paintbrush, ExternalLink } from "lucide-react";
import { dipendenti } from "../mock/data";
import { AnteprimaBadge, Card, PageTitle, TableWrap, Th, Td, useToast } from "../components/ui";

// Moduli attivabili per utente: il super admin decide chi vede cosa
const moduli = ["Gestionale", "Portale", "Paghe", "Presenze", "Welfare", "Richieste"] as const;
type Modulo = (typeof moduli)[number];

const profiliRuolo: Record<string, Modulo[]> = {
  "Capo cantiere": ["Gestionale", "Portale", "Paghe", "Presenze", "Welfare", "Richieste"],
  "Capo squadra": ["Gestionale", "Portale", "Paghe", "Presenze", "Welfare", "Richieste"],
  "Impiegata tecnica": ["Gestionale", "Portale", "Paghe", "Presenze", "Welfare", "Richieste"],
  default: ["Portale", "Paghe", "Presenze", "Welfare", "Richieste"],
};

export default function AdminRuoli() {
  const toast = useToast();
  const [grants, setGrants] = useState<Record<string, Set<Modulo>>>(() =>
    Object.fromEntries(
      dipendenti.map((d) => [d.id, new Set(profiliRuolo[d.ruolo] ?? profiliRuolo.default)])
    )
  );

  const toggle = (id: string, m: Modulo) => {
    setGrants((g) => {
      const s = new Set(g[id]);
      s.has(m) ? s.delete(m) : s.add(m);
      return { ...g, [id]: s };
    });
  };

  return (
    <div>
      <PageTitle
        title="Ruoli & permessi"
        badge={<AnteprimaBadge />}
        subtitle="Vista super admin: decide per ogni dipendente quali moduli vede, sul gestionale e sul portale personale"
        actions={
          <button onClick={() => toast("Permessi salvati (demo)")}
            className="rounded-lg bg-petrol-600 px-4 py-2 text-sm font-medium text-white hover:bg-petrol-700">
            Salva modifiche
          </button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5">
          <div className="mb-2 inline-flex rounded-lg bg-petrol-100 p-2 text-petrol-700"><ShieldCheck size={18} /></div>
          <div className="font-semibold text-slate-900">Accessi modulari</div>
          <p className="mt-1 text-sm text-slate-500">Ogni spunta abilita o nasconde un modulo per quell'utente. Gli operai vedono solo il portale personale; i ruoli superiori anche il gestionale.</p>
        </Card>
        <Card className="p-5">
          <div className="mb-2 inline-flex rounded-lg bg-emerald-100 p-2 text-emerald-700"><Smartphone size={18} /></div>
          <div className="font-semibold text-slate-900">Portale dipendente</div>
          <p className="mt-1 text-sm text-slate-500">La vista limitata che vedono gli operai: profilo, ore, buste paga, presenze, welfare.</p>
          <Link to="/dipendente" className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-petrol-600 hover:underline">
            Apri anteprima portale <ExternalLink size={13} />
          </Link>
        </Card>
        <Card className="p-5">
          <div className="mb-2 inline-flex rounded-lg bg-violet-100 p-2 text-violet-700"><Paintbrush size={18} /></div>
          <div className="font-semibold text-slate-900">Aspetto & branding</div>
          <p className="mt-1 text-sm text-slate-500">Logo, colori e testi del portale personalizzabili dall'azienda.</p>
          <div className="mt-2 flex items-center gap-2">
            {["#14688f", "#0f766e", "#7c3aed", "#b91c1c"].map((c, i) => (
              <button key={c} onClick={() => toast("Cambio tema (demo)")}
                className={`h-7 w-7 rounded-full border-2 ${i === 0 ? "border-slate-700" : "border-transparent"}`}
                style={{ backgroundColor: c }} aria-label={`Tema ${c}`} />
            ))}
          </div>
        </Card>
      </div>

      <TableWrap>
        <thead className="bg-slate-50">
          <tr>
            <Th>Dipendente</Th>
            <Th>Ruolo</Th>
            {moduli.map((m) => <Th key={m} className="text-center">{m}</Th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {dipendenti.map((d) => (
            <tr key={d.id} className="hover:bg-slate-50">
              <Td className="font-medium text-slate-900">{d.nome}</Td>
              <Td>{d.ruolo}{d.tipo === "Interinale" && <span className="ml-1.5 text-xs text-amber-600">(interinale)</span>}</Td>
              {moduli.map((m) => (
                <Td key={m} className="text-center">
                  <input
                    type="checkbox"
                    checked={grants[d.id]?.has(m) ?? false}
                    onChange={() => toggle(d.id, m)}
                    className="h-4 w-4 cursor-pointer accent-petrol-600"
                    aria-label={`${m} per ${d.nome}`}
                  />
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </TableWrap>
      <p className="mt-3 text-xs text-slate-400">
        Nel prodotto finale i profili si assegnano anche per gruppo (es. "tutti gli operai") e ogni modifica è tracciata nel registro accessi.
      </p>
    </div>
  );
}
