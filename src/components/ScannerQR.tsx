import { useMemo, useState } from "react";
import { QrCode, Plus, Minus, Check, X } from "lucide-react";
import { articoli, type Articolo } from "../mock/data";
import { useToast } from "./ui";

// QR fittizio ma deterministico: pattern generato dall'id articolo (solo estetico, per la demo)
export function QRFinto({ seed, size = 84 }: { seed: string; size?: number }) {
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

// Scanner semplificato "vista operaio": caratteri grandi, tre tocchi, nessuna tastiera
export function ScannerQR() {
  const toast = useToast();
  const [scan, setScan] = useState<Articolo | null>(null);
  const [qta, setQta] = useState(1);
  const [fatto, setFatto] = useState<string | null>(null);

  const avviaScansione = () => {
    const a = articoli[Math.floor(Math.random() * 12)];
    setScan(a); setQta(1); setFatto(null);
  };

  const conferma = (tipo: "Prelievo" | "Riconsegna") => {
    setFatto(`${tipo} registrato: ${qta} × ${scan?.nome}`);
    toast("Movimento registrato (demo)");
  };

  if (!scan) {
    return (
      <button onClick={avviaScansione}
        className="flex w-full flex-col items-center gap-3 rounded-2xl border-4 border-dashed border-petrol-300 bg-petrol-50 py-14 text-petrol-700 hover:bg-petrol-100">
        <QrCode size={64} />
        <span className="text-xl font-bold">INQUADRA IL CODICE</span>
        <span className="text-sm text-petrol-500">(demo: tocca per simulare la scansione)</span>
      </button>
    );
  }

  if (fatto) {
    return (
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
    );
  }

  return (
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
  );
}
