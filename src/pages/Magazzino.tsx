import { useState } from "react";
import { Search } from "lucide-react";
import { articoli, movimenti } from "../mock/data";
import { Badge, Card, PageTitle, TableWrap, Th, Td, useToast } from "../components/ui";

const filtri = ["Tutti", "Materiale", "Attrezzo", "Noleggio"] as const;

export default function Magazzino() {
  const toast = useToast();
  const [filtro, setFiltro] = useState<(typeof filtri)[number]>("Tutti");
  const [q, setQ] = useState("");
  const lista = articoli.filter(
    (a) => (filtro === "Tutti" || a.categoria === filtro) && a.nome.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <PageTitle
        title="Magazzino & attrezzi"
        subtitle="Giacenze, localizzazione e movimenti"
        actions={
          <button onClick={() => toast("Funzione dimostrativa")}
            className="rounded-lg bg-petrol-600 px-4 py-2 text-sm font-medium text-white hover:bg-petrol-700">
            + Nuovo movimento
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cerca articolo…"
            className="rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-petrol-600 focus:outline-none" />
        </div>
        {filtri.map((f) => (
          <button key={f} onClick={() => setFiltro(f)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${
              filtro === f ? "bg-petrol-600 text-white" : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-50"
            }`}>
            {f}
          </button>
        ))}
      </div>

      <TableWrap>
        <thead className="bg-slate-50">
          <tr><Th>Articolo</Th><Th>Categoria</Th><Th className="text-right">Giacenza</Th><Th>Dove si trova / chi ce l'ha</Th></tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {lista.map((a) => (
            <tr key={a.id} className="hover:bg-slate-50">
              <Td className="font-medium text-slate-900">{a.nome}</Td>
              <Td><Badge value={a.categoria} /></Td>
              <Td className="text-right">{a.giacenza} {a.unita}</Td>
              <Td>
                {a.posizione}
                {a.assegnatario && <span className="text-slate-400"> — {a.assegnatario}</span>}
                {a.fornitore && <span className="text-slate-400"> — nolo {a.fornitore}</span>}
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrap>

      <Card className="mt-6 overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-4 font-semibold text-slate-800">Ultimi movimenti</div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr><Th>Data</Th><Th>Tipo</Th><Th>Articolo</Th><Th>Quantità</Th><Th>Commessa</Th><Th>Operatore</Th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {movimenti.map((m) => (
                <tr key={m.id}>
                  <Td className="whitespace-nowrap">{m.data}</Td>
                  <Td><Badge value={m.tipo} /></Td>
                  <Td className="font-medium text-slate-900">{m.articolo}</Td>
                  <Td>{m.quantita}</Td>
                  <Td>{m.commessa}</Td>
                  <Td>{m.operatore}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
