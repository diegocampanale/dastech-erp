import { MessageCircle, Camera, ScanLine, CheckCircle2, ArrowRight, Check, Pencil } from "lucide-react";
import { AnteprimaBadge, Card, PageTitle, useToast } from "../components/ui";

type MsgWA = {
  id: string;
  mittente: string;
  telefono: string;
  ora: string;
  commessa: string;
  fase: "Ricevuto" | "OCR completato" | "In validazione";
  fotoNota: string[];       // righe "scritte a mano" sulla scheda fotografata
  estratte: { articolo: string; quantita: string; conf: number }[];
};

const messaggi: MsgWA[] = [
  {
    id: "W01", mittente: "Vito Lorusso", telefono: "+39 340 112 2334", ora: "Oggi 07:42",
    commessa: "Capannone Modugno", fase: "In validazione",
    fotoNota: ["cavo 3x2,5 → 300 mt", "canala 200 n.15 barre", "magnetot. 16A x12", "fascette lunghe 2 buste"],
    estratte: [
      { articolo: "Cavo FG16OR16 3x2,5 mmq", quantita: "300 m", conf: 96 },
      { articolo: "Canala metallica 200x60", quantita: "15 barre", conf: 91 },
      { articolo: "Interruttore magnetotermico 16A", quantita: "12 pz", conf: 94 },
      { articolo: "Fascette 360 mm (busta 100)", quantita: "2 buste", conf: 78 },
    ],
  },
  {
    id: "W02", mittente: "Francesco Mastro", telefono: "+39 345 003 8821", ora: "Oggi 06:58",
    commessa: "Fotovoltaico Molfetta", fase: "OCR completato",
    fotoNota: ["pannelli 450 → 20 pz", "cavo solare 6mmq 2 bobine", "MC4 1 cassetta"],
    estratte: [
      { articolo: "Pannello fotovoltaico 450W", quantita: "20 pz", conf: 97 },
      { articolo: "Cavo solare 6 mmq (bobina 100 m)", quantita: "2 pz", conf: 89 },
      { articolo: "Connettori MC4 (cassetta)", quantita: "1 pz", conf: 92 },
    ],
  },
  {
    id: "W03", mittente: "Luca Petruzzelli", telefono: "+39 342 887 4410", ora: "Ieri 17:21",
    commessa: "Cabina Casamassima", fase: "Ricevuto",
    fotoNota: ["terminali 185 x6", "guanti isolanti tg 9 — 10 paia", "nastro autoagglom. 5 rot."],
    estratte: [],
  },
];

const fasi = ["Ricevuto", "OCR completato", "In validazione"] as const;

export default function WhatsAppOCR() {
  const toast = useToast();
  return (
    <div>
      <PageTitle
        title="Canale WhatsApp + OCR"
        badge={<AnteprimaBadge />}
        subtitle="I capi cantiere fotografano la scheda del materiale da prendere e la inviano su WhatsApp: il sistema la legge (OCR) e prepara la richiesta da validare."
      />

      {/* pipeline */}
      <Card className="mb-6 p-5">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {[
            { icon: Camera, label: "Foto scheda dal cantiere" },
            { icon: MessageCircle, label: "Arrivo su WhatsApp Business" },
            { icon: ScanLine, label: "Lettura OCR + riconoscimento articoli" },
            { icon: CheckCircle2, label: "Validazione ufficio → ordine" },
          ].map((s, i, arr) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg bg-petrol-50 px-3 py-2 text-petrol-700">
                <s.icon size={16} /> <span className="font-medium">{s.label}</span>
              </div>
              {i < arr.length - 1 && <ArrowRight size={16} className="text-slate-300" />}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {messaggi.map((m) => (
          <Card key={m.id} className="flex flex-col p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700"><MessageCircle size={18} /></div>
                <div>
                  <div className="font-semibold text-slate-900">{m.mittente}</div>
                  <div className="text-xs text-slate-500">{m.telefono} · {m.ora}</div>
                </div>
              </div>
            </div>
            <div className="mt-1.5 text-sm text-slate-500">Commessa: <span className="font-medium text-slate-700">{m.commessa}</span></div>

            {/* stato pipeline */}
            <div className="mt-3 flex items-center gap-1">
              {fasi.map((f, i) => {
                const attiva = fasi.indexOf(m.fase) >= i;
                return (
                  <div key={f} className="flex flex-1 flex-col gap-1">
                    <div className={`h-1.5 rounded-full ${attiva ? "bg-emerald-500" : "bg-slate-200"}`} />
                    <span className={`text-[10px] ${attiva ? "text-emerald-600 font-medium" : "text-slate-400"}`}>{f}</span>
                  </div>
                );
              })}
            </div>

            {/* "foto" della scheda */}
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 shadow-inner">
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-600">
                <Camera size={12} /> Foto scheda cartacea
              </div>
              <ul className="space-y-1 font-mono text-[13px] italic text-slate-700">
                {m.fotoNota.map((r, i) => <li key={i}>✎ {r}</li>)}
              </ul>
            </div>

            {/* estrazione OCR */}
            {m.estratte.length > 0 ? (
              <>
                <div className="mt-3 mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <ScanLine size={12} /> Articoli riconosciuti
                </div>
                <ul className="flex-1 divide-y divide-slate-100 rounded-lg border border-slate-200 text-sm">
                  {m.estratte.map((r, i) => (
                    <li key={i} className="flex items-center justify-between gap-2 px-3 py-2">
                      <span className="text-slate-800">{r.articolo}</span>
                      <span className="flex items-center gap-2 whitespace-nowrap">
                        <span className="font-medium text-slate-500">{r.quantita}</span>
                        <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                          r.conf >= 90 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        }`}>{r.conf}%</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => toast("Inviata alle Richieste materiale (demo)")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-petrol-600 px-3 py-2 text-sm font-medium text-white hover:bg-petrol-700">
                    <Check size={16} /> Valida
                  </button>
                  <button onClick={() => toast("Apertura correzione (demo)")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <Pencil size={16} /> Correggi
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 flex flex-1 items-center justify-center rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-400">
                OCR in coda di elaborazione…
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
