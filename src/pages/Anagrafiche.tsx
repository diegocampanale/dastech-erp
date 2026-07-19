import { useState, type ReactNode } from "react";
import { Users, Truck, Building2, Store, Plus, Pencil, X } from "lucide-react";
import { dipendenti, mezzi } from "../mock/data";
import { Badge, PageTitle, TableWrap, Th, Td, useToast } from "../components/ui";

const clienti = [
  { nome: "Logistica Sud Srl", citta: "Modugno (BA)", referente: "Dott. Amoruso", telefono: "080 534 2210" },
  { nome: "Oleificio Ventura SpA", citta: "Bitonto (BA)", referente: "Sig.ra Ventura", telefono: "080 374 1180" },
  { nome: "Frigomar Srl", citta: "Molfetta (BA)", referente: "Ing. Salvemini", telefono: "080 336 4477" },
  { nome: "Comune di Giovinazzo", citta: "Giovinazzo (BA)", referente: "Ufficio Tecnico", telefono: "080 394 2301" },
  { nome: "Retail Park Puglia", citta: "Casamassima (BA)", referente: "Dott. Latorre", telefono: "080 675 8890" },
];

const fornitori = [
  { nome: "Elettroforniture Meridionali Srl", categoria: "Materiale elettrico", citta: "Bari", telefono: "080 531 0071" },
  { nome: "Solartec Distribuzione SpA", categoria: "Fotovoltaico", citta: "Molfetta (BA)", telefono: "080 336 9912" },
  { nome: "Bari Elettrica Ingrosso", categoria: "Materiale elettrico", citta: "Bari", telefono: "080 556 2244" },
  { nome: "Mollo Noleggio", categoria: "Noleggio mezzi", citta: "Bari", telefono: "080 502 7788" },
  { nome: "Venpa", categoria: "Noleggio mezzi", citta: "Molfetta (BA)", telefono: "080 397 1500" },
];

const sezioni = [
  { id: "dipendenti", label: "Dipendenti", icon: Users },
  { id: "mezzi", label: "Mezzi", icon: Truck },
  { id: "clienti", label: "Clienti", icon: Building2 },
  { id: "fornitori", label: "Fornitori", icon: Store },
] as const;

export default function Anagrafiche() {
  const toast = useToast();
  const [sez, setSez] = useState<(typeof sezioni)[number]["id"]>("dipendenti");
  const [modale, setModale] = useState<string | null>(null);

  const apri = (titolo: string) => setModale(titolo);

  const tabella: Record<string, ReactNode> = {
    dipendenti: (
      <TableWrap>
        <thead className="bg-slate-50"><tr><Th>Nome</Th><Th>Ruolo</Th><Th>Tipo</Th><Th>Telefono</Th><Th /></tr></thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {dipendenti.map((d) => (
            <tr key={d.id} className="hover:bg-slate-50">
              <Td className="font-medium text-slate-900">{d.nome}</Td>
              <Td>{d.ruolo}</Td>
              <Td><Badge value={d.tipo} /></Td>
              <Td>{d.telefono}</Td>
              <Td className="text-right">
                <button onClick={() => apri(`Modifica dipendente — ${d.nome}`)} className="text-petrol-600 hover:underline"><Pencil size={15} /></button>
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
    ),
    mezzi: (
      <TableWrap>
        <thead className="bg-slate-50"><tr><Th>Mezzo</Th><Th>Targa</Th><Th>Tipo</Th><Th>Stato</Th><Th /></tr></thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {mezzi.map((m) => (
            <tr key={m.id} className="hover:bg-slate-50">
              <Td className="font-medium text-slate-900">{m.nome}</Td>
              <Td>{m.targa}</Td>
              <Td>{m.tipo}</Td>
              <Td><Badge value={m.stato} /></Td>
              <Td className="text-right">
                <button onClick={() => apri(`Modifica mezzo — ${m.targa}`)} className="text-petrol-600 hover:underline"><Pencil size={15} /></button>
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
    ),
    clienti: (
      <TableWrap>
        <thead className="bg-slate-50"><tr><Th>Ragione sociale</Th><Th>Città</Th><Th>Referente</Th><Th>Telefono</Th><Th /></tr></thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {clienti.map((c) => (
            <tr key={c.nome} className="hover:bg-slate-50">
              <Td className="font-medium text-slate-900">{c.nome}</Td>
              <Td>{c.citta}</Td>
              <Td>{c.referente}</Td>
              <Td>{c.telefono}</Td>
              <Td className="text-right">
                <button onClick={() => apri(`Modifica cliente — ${c.nome}`)} className="text-petrol-600 hover:underline"><Pencil size={15} /></button>
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
    ),
    fornitori: (
      <TableWrap>
        <thead className="bg-slate-50"><tr><Th>Ragione sociale</Th><Th>Categoria</Th><Th>Città</Th><Th>Telefono</Th><Th /></tr></thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {fornitori.map((f) => (
            <tr key={f.nome} className="hover:bg-slate-50">
              <Td className="font-medium text-slate-900">{f.nome}</Td>
              <Td>{f.categoria}</Td>
              <Td>{f.citta}</Td>
              <Td>{f.telefono}</Td>
              <Td className="text-right">
                <button onClick={() => apri(`Modifica fornitore — ${f.nome}`)} className="text-petrol-600 hover:underline"><Pencil size={15} /></button>
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
    ),
  };

  return (
    <div>
      <PageTitle
        title="Anagrafiche"
        subtitle="Dipendenti, mezzi, clienti e fornitori"
        actions={
          <button onClick={() => apri(`Nuovo ${sez.slice(0, -1)}`)}
            className="flex items-center gap-1.5 rounded-lg bg-petrol-600 px-4 py-2 text-sm font-medium text-white hover:bg-petrol-700">
            <Plus size={16} /> Nuovo
          </button>
        }
      />
      <div className="mb-4 flex flex-wrap gap-1 rounded-xl bg-slate-200/70 p-1">
        {sezioni.map((s) => (
          <button key={s.id} onClick={() => setSez(s.id)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${
              sez === s.id ? "bg-white text-petrol-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}>
            <s.icon size={15} /> {s.label}
          </button>
        ))}
      </div>
      {tabella[sez]}

      {/* modale mock */}
      {modale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setModale(null)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <div className="font-semibold text-slate-900">{modale}</div>
              <button onClick={() => setModale(null)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Nome / ragione sociale" className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-petrol-600 focus:outline-none" />
              <input placeholder="Telefono" className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-petrol-600 focus:outline-none" />
              <input placeholder="Note" className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-petrol-600 focus:outline-none" />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setModale(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Annulla</button>
              <button onClick={() => { setModale(null); toast("Salvato (demo)"); }}
                className="rounded-lg bg-petrol-600 px-4 py-2 text-sm font-medium text-white hover:bg-petrol-700">Salva</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
