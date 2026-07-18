import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Package, Clock, Plane, Calculator } from "lucide-react";
import {
  commesse, dipendenti, mezzi, articoli, trasferte, euro, totaleCommessa,
} from "../mock/data";
import { Badge, Card, PageTitle, TableWrap, Th, Td, useToast } from "../components/ui";

const tabs = [
  { id: "risorse", label: "Risorse assegnate", icon: Users },
  { id: "materiali", label: "Materiali", icon: Package },
  { id: "presenze", label: "Presenze / ore", icon: Clock },
  { id: "trasferte", label: "Trasferte", icon: Plane },
] as const;

export default function CommessaDettaglio() {
  const { id } = useParams();
  const toast = useToast();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("risorse");
  const c = commesse.find((x) => x.id === id);
  if (!c) return <div>Commessa non trovata.</div>;

  const persone = dipendenti.filter((d) => d.commessaId === c.id);
  const mezziC = mezzi.filter((m) => m.commessaId === c.id);
  const noleggi = articoli.filter((a) => a.categoria === "Noleggio" && a.posizione.toLowerCase().includes(c.luogo.split(" ")[0].toLowerCase()));
  const materialiC = articoli.filter((a) => a.categoria === "Materiale" && a.posizione.toLowerCase().includes(c.luogo.split(" ")[0].toLowerCase()));
  const trasferteC = trasferte.filter((t) => t.commessaId === c.id);

  const vociConsuntivo: { label: string; val: number }[] = [
    { label: "Manodopera", val: c.costi.manodopera },
    { label: "Materiali", val: c.costi.materiali },
    { label: "Mezzi", val: c.costi.mezzi },
    { label: "Noleggi", val: c.costi.noleggi },
    { label: "Trasferte", val: c.costi.trasferte },
  ];
  const totale = totaleCommessa(c);

  return (
    <div>
      <Link to="/app/commesse" className="mb-4 inline-flex items-center gap-1 text-sm text-petrol-600 hover:underline">
        <ArrowLeft size={16} /> Tutte le commesse
      </Link>
      <PageTitle
        title={c.nome}
        subtitle={`${c.cliente} · ${c.luogo} · dal ${c.inizio} al ${c.fine}`}
        badge={<Badge value={c.stato} />}
        actions={
          <button onClick={() => toast("Funzione dimostrativa — nessuna modifica salvata")}
            className="rounded-lg bg-petrol-600 px-4 py-2 text-sm font-medium text-white hover:bg-petrol-700">
            Modifica commessa
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          {/* tabs */}
          <div className="mb-4 flex flex-wrap gap-1 rounded-xl bg-slate-200/70 p-1">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${
                  tab === t.id ? "bg-white text-petrol-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}>
                <t.icon size={15} /> {t.label}
              </button>
            ))}
          </div>

          {tab === "risorse" && (
            <div className="space-y-4">
              <TableWrap>
                <thead className="bg-slate-50"><tr><Th>Persona</Th><Th>Ruolo</Th><Th>Tipo</Th><Th className="text-right">Ore mese</Th></tr></thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {persone.map((d) => (
                    <tr key={d.id}>
                      <Td className="font-medium text-slate-900">{d.nome}</Td>
                      <Td>{d.ruolo}</Td>
                      <Td><Badge value={d.tipo} />{d.agenzia && <span className="ml-1.5 text-xs text-slate-400">({d.agenzia})</span>}</Td>
                      <Td className="text-right">{d.oreMese}</Td>
                    </tr>
                  ))}
                  {persone.length === 0 && <tr><Td className="text-slate-400">Nessuna persona assegnata</Td></tr>}
                </tbody>
              </TableWrap>
              <TableWrap>
                <thead className="bg-slate-50"><tr><Th>Mezzo / noleggio</Th><Th>Riferimento</Th><Th>Stato</Th></tr></thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {mezziC.map((m) => (
                    <tr key={m.id}>
                      <Td className="font-medium text-slate-900">{m.nome}</Td>
                      <Td>{m.targa} · {m.assegnatario}</Td>
                      <Td><Badge value={m.stato} /></Td>
                    </tr>
                  ))}
                  {noleggi.map((n) => (
                    <tr key={n.id}>
                      <Td className="font-medium text-slate-900">{n.nome}</Td>
                      <Td>{n.fornitore} · {euro(n.costoUnitario)}/giorno</Td>
                      <Td><Badge value="Noleggio" /></Td>
                    </tr>
                  ))}
                  {mezziC.length + noleggi.length === 0 && <tr><Td className="text-slate-400">Nessun mezzo assegnato</Td></tr>}
                </tbody>
              </TableWrap>
            </div>
          )}

          {tab === "materiali" && (
            <TableWrap>
              <thead className="bg-slate-50"><tr><Th>Articolo</Th><Th className="text-right">Q.tà in cantiere</Th><Th className="text-right">Costo unitario</Th></tr></thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {materialiC.map((a) => (
                  <tr key={a.id}>
                    <Td className="font-medium text-slate-900">{a.nome}</Td>
                    <Td className="text-right">{a.giacenza} {a.unita}</Td>
                    <Td className="text-right">{a.costoUnitario.toLocaleString("it-IT", { style: "currency", currency: "EUR" })}</Td>
                  </tr>
                ))}
                {materialiC.length === 0 && <tr><Td className="text-slate-400" colSpan={3}>Materiali gestiti da magazzino centrale</Td></tr>}
              </tbody>
            </TableWrap>
          )}

          {tab === "presenze" && (
            <TableWrap>
              <thead className="bg-slate-50"><tr><Th>Persona</Th><Th className="text-right">Ore luglio</Th><Th className="text-right">Costo orario</Th><Th className="text-right">Costo mese</Th></tr></thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {persone.map((d) => (
                  <tr key={d.id}>
                    <Td className="font-medium text-slate-900">{d.nome}</Td>
                    <Td className="text-right">{d.oreMese}</Td>
                    <Td className="text-right">{euro(d.costoOrario)}</Td>
                    <Td className="text-right font-medium">{euro(d.oreMese * d.costoOrario)}</Td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
          )}

          {tab === "trasferte" && (
            <TableWrap>
              <thead className="bg-slate-50"><tr><Th>Persona</Th><Th>Destinazione</Th><Th>Periodo</Th><Th className="text-right">Costo</Th></tr></thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {trasferteC.map((t) => (
                  <tr key={t.id}>
                    <Td className="font-medium text-slate-900">{t.dipendente}</Td>
                    <Td>{t.destinazione}</Td>
                    <Td>{t.dal} → {t.al}</Td>
                    <Td className="text-right font-medium">{euro(t.costo)}</Td>
                  </tr>
                ))}
                {trasferteC.length === 0 && <tr><Td className="text-slate-400" colSpan={4}>Nessuna trasferta registrata</Td></tr>}
              </tbody>
            </TableWrap>
          )}
        </div>

        {/* Consuntivo */}
        <Card className="h-fit p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
            <Calculator size={18} className="text-petrol-600" /> Consuntivo di commessa
          </div>
          <div className="space-y-2 text-sm">
            {vociConsuntivo.map((v) => (
              <div key={v.label} className="flex justify-between">
                <span className="text-slate-500">{v.label}</span>
                <span className="font-medium text-slate-800">{euro(v.val)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-slate-200 pt-3">
            <div className="flex justify-between text-base font-semibold">
              <span>Totale a oggi</span>
              <span className="text-petrol-700">{euro(totale)}</span>
            </div>
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>Budget commessa</span><span>{euro(c.budget)}</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-100">
              <div className={`h-2 rounded-full ${totale / c.budget > 0.9 ? "bg-red-500" : "bg-petrol-600"}`}
                style={{ width: `${Math.min(100, (totale / c.budget) * 100)}%` }} />
            </div>
            <div className="mt-1 text-right text-xs text-slate-400">{Math.round((totale / c.budget) * 100)}% del budget</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
