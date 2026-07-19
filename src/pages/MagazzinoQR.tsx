import { useMemo, useState } from "react";
import { QrCode, Printer, ScanLine, Plus, Minus, Check, X, Search } from "lucide-react";
import { articoli, type Articolo } from "../mock/data";
import { AnteprimaBadge, Badge, Card, PageTitle, useToast } from "../components/ui";

// QR fittizio ma deterministico: pattern generato dall'id articolo (solo estetico, per la demo)
function QRFinto({ seed, size = 84 }: { seed: string; size?: number }) {
  const celle = useMemo(() => {
    const n = 21;
    let h = 2166136261;
    for (const c of seed) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
    const out: boolean[] = [];
    for (let i = 0; i < n * n; i++) {
      h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
      out.push((h & 7) < 3);
    }
    return out;
  }, [seed]);
  const n = 21, cs = size / n;
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x * cs} y={y * cs} width={cs * 7} height={cs * 7} fill="black" />
      <rect x={(x + 1) * cs} y={(y + 1) * cs} width={cs * 5} height={cs * 5} fill="white" />
      <rect x={(x + 2) * cs} y={(y + 2) * cs} width={cs * 3} height={cs * 3} fill="black" />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <rect width={size} height={size} fill="white" />
      {celle.map((v, i) => {
        const x = i % n, y = Math.floor(i / n);
        const inFinder = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
        return v && !inFinder ? <rect key={i} x={x * cs} y={y * cs} width={cs} height={cs} fill="black" /> : null;
      })}
      {finder(0, 0)}{finder(14, 0)}{finder(0, 14)}
    </svg>
  );
}

export default function MagazzinoQR() {
  const toast = useToast();
  const [q, setQ] = useState("");
  const [scan, setScan] = useState<Articolo | null>(null);
  const [qta, setQta] = useState(1);
  const [fatto, setFatto] = useState<string | null>(null);

  const lista = articoli.filter((a) => a.categoria !== "Noleggio" && a.nome.toLowerCase().includes(q.toLowerCase()));

  const avviaScansione = () => {
    // simulazione: "inquadra" un articolo a caso
    const a = articoli[Math.floor(Math.random() * 12)];
    setScan(a); setQta(1); setFatto(null);
  };

  const conferma = (tipo: "Prelievo" | "Riconsegna") => {
    setFatto(`${tipo} registrato: ${qta} × ${scan?.nome}`);
    toast("Movimento registrato (demo)");
  };

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
            Interfaccia pensata per tutti: caratteri grandi, tre tocchi, nessun testo da scrivere.
          </p>

          {!scan && (
            <button onClick={avviaScansione}
              className="flex flex-col items-center gap-3 rounded-2xl border-4 border-dashed border-petrol-300 bg-petrol-50 py-14 text-petrol-700 hover:bg-petrol-100">
              <QrCode size={64} />
              <span className="text-xl font-bold">INQUADRA IL CODICE</span>
              <span className="text-sm text-petrol-500">(demo: tocca per simulare la scansione)</span>
            </button>
          )}

          {scan && !fatto && (
            <div className="space-y-5">
              <div className="flex items-center gap-4 rounded-2xl bg-emerald-50 p-4">
                <QRFinto seed={scan.id + scan.nome} size={64} />
                <div>
                  <div className="text-xs font-semibold uppercase text-emerald-600">Articolo riconosciuto ✓</div>
                  <div className="text-xl font-bold leading-snug text-slate-900">{scan.nome}</div>
                  <div className="text-sm text-slate-500">{scan.posizione}</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6">
                <button onClick={() => setQta((v) => Math.max(1, v - 1))}
                  className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-200 text-slate-700 hover:bg-slate-300">
                  <Minus size={36} />
                </button>
                <div className="w-28 text-center">
                  <div className="text-6xl font-bold text-slate-900">{qta}</div>
                  <div className="text-sm text-slate-500">{scan.unita}</div>
                </div>
                <button onClick={() => setQta((v) => v + 1)}
                  className="flex h-20 w-20 items-center justify-center rounded-2xl bg-petrol-600 text-white hover:bg-petrol-700">
                  <Plus size={36} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => conferma("Prelievo")}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-petrol-600 py-5 text-lg font-bold text-white hover:bg-petrol-700">
                  <Check size={24} /> PRENDO
                </button>
                <button onClick={() => conferma("Riconsegna")}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-5 text-lg font-bold text-white hover:bg-emerald-700">
                  <Check size={24} /> RIPORTO
                </button>
              </div>
              <button onClick={() => setScan(null)}
                className="flex w-full items-center justify-center gap-1.5 py-1 text-sm text-slate-400 hover:text-slate-600">
                <X size={14} /> Annulla
              </button>
            </div>
          )}

          {scan && fatto && (
            <div className="space-y-5 text-center">
              <div className="rounded-2xl bg-emerald-50 py-10">
                <Check size={64} className="mx-auto text-emerald-600" />
                <div className="mt-3 text-2xl font-bold text-emerald-700">FATTO!</div>
                <div className="mt-1 px-6 text-sm text-slate-600">{fatto}</div>
              </div>
              <button onClick={() => setScan(null)}
                className="w-full rounded-2xl bg-petrol-600 py-5 text-lg font-bold text-white hover:bg-petrol-700">
                SCANSIONA UN ALTRO
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
