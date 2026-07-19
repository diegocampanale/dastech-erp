import { useState } from "react";
import { FileText, Check, Pencil, ChevronDown, ChevronUp } from "lucide-react";
import { euro } from "../mock/data";
import { Card, PageTitle, useToast } from "../components/ui";

type Fattura = {
  id: string;
  fornitore: string;
  numero: string;
  data: string;
  totale: number;
  stato: "Attribuita" | "Da confermare";
  commessaProposta: string;
  confidenza: number;
  righe: { articolo: string; qta: string; importo: number }[];
};

const fatture: Fattura[] = [
  {
    id: "F01", fornitore: "Elettroforniture Meridionali Srl", numero: "2026/1841", data: "17/07/2026", totale: 4820,
    stato: "Da confermare", commessaProposta: "Impianto elettrico capannone Modugno", confidenza: 92,
    righe: [
      { articolo: "Cavo FG16OR16 3x2,5 mmq (500 m)", qta: "2 bobine", importo: 1450 },
      { articolo: "Canala metallica 200x60", qta: "40 barre", importo: 756 },
      { articolo: "Interruttore magnetotermico 16A", qta: "36 pz", importo: 446 },
      { articolo: "Quadro da parete 54 moduli", qta: "4 pz", importo: 384 },
      { articolo: "Minuteria e accessori", qta: "—", importo: 1784 },
    ],
  },
  {
    id: "F02", fornitore: "Solartec Distribuzione SpA", numero: "V-00932", data: "16/07/2026", totale: 11840,
    stato: "Da confermare", commessaProposta: "Impianto fotovoltaico 200 kW Molfetta", confidenza: 97,
    righe: [
      { articolo: "Pannello fotovoltaico 450W", qta: "60 pz", importo: 8880 },
      { articolo: "Struttura di fissaggio tetto", qta: "1 kit", importo: 2160 },
      { articolo: "Connettori MC4 (cassetta)", qta: "2 pz", importo: 800 },
    ],
  },
  {
    id: "F03", fornitore: "Bari Elettrica Ingrosso", numero: "1204/B", data: "15/07/2026", totale: 1980,
    stato: "Attribuita", commessaProposta: "Rifacimento quadri elettrici stabilimento Bitonto", confidenza: 88,
    righe: [
      { articolo: "Plafoniera stagna LED 150 cm", qta: "48 pz", importo: 1080 },
      { articolo: "Tubo corrugato Ø25 (rotoli)", qta: "4 pz", importo: 220 },
      { articolo: "Scatole di derivazione IP55", qta: "60 pz", importo: 680 },
    ],
  },
];

export default function Fatture() {
  const toast = useToast();
  const [aperta, setAperta] = useState<string | null>("F01");

  return (
    <div>
      <PageTitle
        title="Materiali — Coda fatture"
        subtitle="Le fatture dei fornitori arrivano qui: il sistema propone la commessa, l'ufficio conferma"
      />
      <div className="space-y-4">
        {fatture.map((f) => {
          const open = aperta === f.id;
          return (
            <Card key={f.id} className="overflow-hidden">
              <button onClick={() => setAperta(open ? null : f.id)}
                className="flex w-full flex-wrap items-center gap-3 px-5 py-4 text-left hover:bg-slate-50">
                <div className="rounded-lg bg-petrol-100 p-2 text-petrol-700"><FileText size={18} /></div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-slate-900">{f.fornitore}</div>
                  <div className="text-sm text-slate-500">Fattura {f.numero} · {f.data}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-900">{euro(f.totale)}</div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    f.stato === "Attribuita" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}>{f.stato}</span>
                </div>
                {open ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
              </button>

              {open && (
                <div className="border-t border-slate-100 px-5 py-4">
                  <div className="mb-3 flex flex-wrap items-center gap-2 rounded-lg bg-petrol-50 px-3 py-2.5 text-sm">
                    <span className="text-slate-600">Commessa proposta dal sistema:</span>
                    <span className="font-semibold text-petrol-700">{f.commessaProposta}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      f.confidenza >= 90 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>confidenza {f.confidenza}%</span>
                  </div>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-slate-100">
                      {f.righe.map((r, i) => (
                        <tr key={i}>
                          <td className="py-2 text-slate-800">{r.articolo}</td>
                          <td className="py-2 text-right text-slate-500">{r.qta}</td>
                          <td className="py-2 text-right font-medium text-slate-800">{euro(r.importo)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {f.stato === "Da confermare" && (
                    <div className="mt-4 flex gap-2">
                      <button onClick={() => toast(`Fattura ${f.numero} attribuita (demo)`)}
                        className="flex items-center gap-1.5 rounded-lg bg-petrol-600 px-4 py-2 text-sm font-medium text-white hover:bg-petrol-700">
                        <Check size={15} /> Conferma commessa
                      </button>
                      <button onClick={() => toast("Selezione commessa (demo)")}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        <Pencil size={15} /> Correggi commessa
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
