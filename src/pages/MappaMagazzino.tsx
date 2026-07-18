import { useState } from "react";
import { MapPin, Layers } from "lucide-react";
import { AnteprimaBadge, Badge, Card, PageTitle } from "../components/ui";

// Zone della pianta con articoli per livello (dati dimostrativi coerenti con il magazzino)
type Zona = {
  id: string;
  nome: string;
  x: number; y: number; w: number; h: number;
  colore: string;
  livelli: { livello: string; contenuto: { articolo: string; qta: string }[] }[];
};

const zone: Zona[] = [
  {
    id: "A", nome: "Scaffale A — Quadri e protezioni", x: 30, y: 30, w: 300, h: 60, colore: "#14688f",
    livelli: [
      { livello: "Livello 1 (terra)", contenuto: [{ articolo: "Quadro da parete 54 moduli", qta: "6 pz" }] },
      { livello: "Livello 2", contenuto: [{ articolo: "Interruttore magnetotermico 16A", qta: "64 pz" }, { articolo: "Differenziale 40A 0,03A", qta: "22 pz" }] },
      { livello: "Livello 3", contenuto: [{ articolo: "Contattori e ausiliari", qta: "scorte varie" }] },
    ],
  },
  {
    id: "B", nome: "Scaffale B — Cavi", x: 30, y: 130, w: 300, h: 60, colore: "#3383a9",
    livelli: [
      { livello: "Livello 1 (bobine a terra)", contenuto: [{ articolo: "Cavo FG16OR16 3x2,5 mmq", qta: "1.200 m" }] },
      { livello: "Livello 2", contenuto: [{ articolo: "Cavo FG16OR16 5x6 mmq", qta: "340 m" }] },
      { livello: "Livello 3", contenuto: [{ articolo: "Cavo solare 6 mmq", qta: "1 bobina" }] },
    ],
  },
  {
    id: "C", nome: "Scaffale C — Illuminazione", x: 30, y: 230, w: 300, h: 60, colore: "#589fc3",
    livelli: [
      { livello: "Livello 1", contenuto: [{ articolo: "Faretto LED incasso 12W", qta: "210 pz" }] },
      { livello: "Livello 2", contenuto: [{ articolo: "Plafoniere e proiettori", qta: "scorte varie" }] },
    ],
  },
  {
    id: "S", nome: "Armadio strumenti (chiuso a chiave)", x: 420, y: 30, w: 150, h: 90, colore: "#7c3aed",
    livelli: [
      { livello: "Ripiano unico", contenuto: [{ articolo: "Strumento verifica Fluke 1664", qta: "1 pz" }, { articolo: "Pinza amperometrica Fluke 376", qta: "1 pz (1 in uso)" }] },
    ],
  },
  {
    id: "Z", nome: "Area sicura — Materiale di valore", x: 420, y: 160, w: 150, h: 90, colore: "#dc2626",
    livelli: [
      { livello: "Pavimento (pallet)", contenuto: [{ articolo: "Inverter trifase 50 kW", qta: "2 pz" }] },
    ],
  },
  {
    id: "E", nome: "Area esterna coperta", x: 420, y: 290, w: 150, h: 70, colore: "#d97706",
    livelli: [
      { livello: "Rastrelliera", contenuto: [{ articolo: "Tubo corrugato Ø25", qta: "900 m" }, { articolo: "Canala metallica 200x60", qta: "85 barre" }] },
    ],
  },
];

export default function MappaMagazzino() {
  const [sel, setSel] = useState<Zona>(zone[1]);

  return (
    <div>
      <PageTitle
        title="Mappa magazzino"
        badge={<AnteprimaBadge />}
        subtitle="Pianta fisica del magazzino: clicca uno scaffale per vedere livelli e materiali collocati"
      />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* pianta */}
        <Card className="p-5 xl:col-span-2">
          <div className="mb-3 flex items-center gap-2 font-semibold text-slate-800">
            <MapPin size={18} className="text-petrol-600" /> Magazzino sede — Via dell'Artigianato 42, Bari
          </div>
          <div className="overflow-x-auto">
            <svg viewBox="0 0 600 400" className="min-w-[480px] w-full rounded-lg border border-slate-200 bg-slate-50">
              {/* perimetro stanza */}
              <rect x="10" y="10" width="580" height="380" fill="white" stroke="#94a3b8" strokeWidth="3" rx="4" />
              {/* porta ingresso */}
              <line x1="240" y1="390" x2="330" y2="390" stroke="white" strokeWidth="5" />
              <text x="285" y="381" textAnchor="middle" fontSize="11" fill="#94a3b8">Ingresso / banchina</text>
              {/* corridoio */}
              <text x="370" y="210" textAnchor="middle" fontSize="11" fill="#cbd5e1" transform="rotate(-90 370 210)">corridoio carrelli</text>

              {zone.map((z) => (
                <g key={z.id} onClick={() => setSel(z)} style={{ cursor: "pointer" }}>
                  <rect
                    x={z.x} y={z.y} width={z.w} height={z.h} rx="6"
                    fill={sel.id === z.id ? z.colore : "#e2e8f0"}
                    stroke={z.colore} strokeWidth={sel.id === z.id ? 0 : 2}
                  />
                  <text
                    x={z.x + z.w / 2} y={z.y + z.h / 2 + 4} textAnchor="middle" fontSize="13" fontWeight="600"
                    fill={sel.id === z.id ? "white" : "#475569"}
                  >
                    {z.id === "A" || z.id === "B" || z.id === "C" ? `Scaffale ${z.id}` : z.nome.split(" —")[0].split(" (")[0]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <p className="mt-2 text-xs text-slate-400">Pianta dimostrativa. Nella versione reale la mappa si costruisce in fase di configurazione e ogni movimento aggiorna la posizione degli articoli.</p>
        </Card>

        {/* dettaglio zona */}
        <Card className="h-fit p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="font-semibold text-slate-900">{sel.nome}</div>
            <span className="h-3 w-3 shrink-0 translate-y-1 rounded-full" style={{ backgroundColor: sel.colore }} />
          </div>
          <div className="mt-4 space-y-4">
            {sel.livelli.map((l) => (
              <div key={l.livello}>
                <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <Layers size={12} /> {l.livello}
                </div>
                <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 text-sm">
                  {l.contenuto.map((c) => (
                    <li key={c.articolo} className="flex items-center justify-between gap-2 px-3 py-2">
                      <span className="text-slate-800">{c.articolo}</span>
                      <span className="whitespace-nowrap font-medium text-slate-500">{c.qta}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-slate-400">
            Suggerimento: dalla scheda articolo si arriverà direttamente alla sua posizione sulla mappa. <Badge value="Materiale" />
          </div>
        </Card>
      </div>
    </div>
  );
}
