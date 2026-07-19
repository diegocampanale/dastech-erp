import { useState } from "react";
import { Printer, ScanLine, Search } from "lucide-react";
import { articoli } from "../mock/data";
import { AnteprimaBadge, Badge, Card, PageTitle, useToast } from "../components/ui";
import { QRFinto, ScannerQR } from "../components/ScannerQR";

export default function MagazzinoQR() {
  const toast = useToast();
  const [q, setQ] = useState("");
  const lista = articoli.filter((a) => a.categoria !== "Noleggio" && a.nome.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <PageTitle
        title="Magazzino QR"
        badge={<AnteprimaBadge />}
        subtitle="Ogni articolo ha la sua etichetta QR stampata su termica: si inquadra col telefono e si registra il prelievo in tre tocchi, senza tastiera"
        actions={
          <button onClick={() => toast("Invio di 20 etichette alla stampante termica (demo)")}
            className="flex items-center gap-2 rounded-lg bg-petrol-600 px-4 py-2 text-sm font-medium text-white hover:bg-petrol-700">
            <Printer size={16} /> Stampa tutte le etichette
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* colonna etichette */}
        <div>
          <div className="relative mb-3 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cerca articolo…"
              className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-petrol-600 focus:outline-none" />
          </div>
          <div className="space-y-3">
            {lista.slice(0, 6).map((a) => (
              <Card key={a.id} className="flex items-center gap-4 p-4">
                {/* etichetta stile termica 62mm */}
                <div className="flex items-center gap-3 rounded-md border-2 border-dashed border-slate-300 bg-white p-2.5">
                  <QRFinto seed={a.id + a.nome} />
                  <div className="w-36">
                    <div className="font-mono text-[10px] text-slate-400">DASTECH · {a.id}</div>
                    <div className="text-xs font-bold leading-snug text-slate-900">{a.nome}</div>
                    <div className="mt-0.5 text-[10px] text-slate-500">{a.posizione}</div>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <Badge value={a.categoria} />
                  <div className="mt-1 text-sm text-slate-500">Giacenza: {a.giacenza} {a.unita}</div>
                </div>
                <button onClick={() => toast(`Etichetta ${a.id} inviata alla stampante termica (demo)`)}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <Printer size={15} /> Stampa
                </button>
              </Card>
            ))}
            {lista.length > 6 && <p className="text-center text-xs text-slate-400">…e altri {lista.length - 6} articoli</p>}
          </div>
        </div>

        {/* colonna scanner semplificato */}
        <Card className="flex h-fit flex-col p-6">
          <div className="mb-1 flex items-center gap-2 font-semibold text-slate-800">
            <ScanLine size={18} className="text-petrol-600" /> Scansione rapida (vista operaio)
          </div>
          <p className="mb-5 text-sm text-slate-500">
            Interfaccia pensata per tutti: caratteri grandi, tre tocchi, nessun testo da scrivere. La stessa vista è integrata nel Portale dipendente.
          </p>
          <ScannerQR />
        </Card>
      </div>
    </div>
  );
}
