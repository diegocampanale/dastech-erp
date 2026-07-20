import { useState } from "react";
import { CalendarDays, UserCheck, Palmtree } from "lucide-react";
import { dipendenti, mezzi, commesse } from "../mock/data";
import { Card, PageTitle, useToast } from "../components/ui";

const giorni = ["Lun 20", "Mar 21", "Mer 22", "Gio 23", "Ven 24", "Sab 25"];

// colore per commessa
const colori: Record<string, string> = {
  C01: "bg-petrol-600", C02: "bg-emerald-600", C03: "bg-violet-600", C04: "bg-amber-500", C05: "bg-rose-500",
};
const nomiBrevi: Record<string, string> = {
  C01: "Modugno", C02: "Bitonto", C03: "Molfetta", C04: "Giovinazzo", C05: "Casamassima",
};

// allocazioni settimana: per risorsa, array di 6 giorni (commessaId | "ferie" | null)
type Slot = string | "ferie" | null;
const agenda: { nome: string; tipo: "Persona" | "Mezzo"; slot: Slot[] }[] = [
  { nome: "Stefano Campanale", tipo: "Persona", slot: ["C01", "C01", "C01", "C01", "C01", null] },
  { nome: "Daniele Campanale", tipo: "Persona", slot: ["C01", "C01", "ferie", "ferie", "C01", null] },
  { nome: "Gianni Campanale", tipo: "Persona", slot: ["C02", "C02", "C02", "C04", "C04", null] },
  { nome: "Antonio Campanale", tipo: "Persona", slot: ["C04", "C03", "C03", "C03", "C04", "C04"] },
  { nome: "Giacomo Campanale", tipo: "Persona", slot: ["C05", "C05", "C05", "C05", "C05", null] },
  { nome: "Nicola Frisina", tipo: "Persona", slot: ["C03", "C03", "C03", "ferie", "C03", null] },
  { nome: "Fiat Ducato — GF 342 KL", tipo: "Mezzo", slot: ["C01", "C01", "C01", "C01", "C01", null] },
  { nome: "Iveco Daily — FT 889 CV", tipo: "Mezzo", slot: ["C03", "C03", null, "C03", "C03", null] },
  { nome: "PLE 18 m — FC 456 TT", tipo: "Mezzo", slot: [null, null, null, "C04", "C04", "C04"] },
];

export default function Calendario() {
  const toast = useToast();
  const [giornoSel, setGiornoSel] = useState(2); // Mer 22

  const liberi = agenda.filter((r) => !r.slot[giornoSel]);

  return (
    <div>
      <PageTitle
        title="Risorse & Calendario"
        subtitle="Settimana 20–25 luglio 2026 · righe = persone e mezzi, colori = commessa"
        actions={
          <button onClick={() => toast("Nuova allocazione (demo)")}
            className="rounded-lg bg-petrol-600 px-4 py-2 text-sm font-medium text-white hover:bg-petrol-700">
            + Alloca risorsa
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <Card className="overflow-hidden xl:col-span-3">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Risorsa</th>
                  {giorni.map((g, i) => (
                    <th key={g}
                      onClick={() => setGiornoSel(i)}
                      className={`cursor-pointer px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide ${
                        i === giornoSel ? "bg-petrol-100 text-petrol-700" : "text-slate-500 hover:bg-slate-100"
                      }`}>
                      {g}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {agenda.map((r) => (
                  <tr key={r.nome}>
                    <td className="whitespace-nowrap px-4 py-2.5 text-sm">
                      <span className="font-medium text-slate-900">{r.nome}</span>
                      <span className="ml-1.5 text-xs text-slate-400">{r.tipo === "Mezzo" ? "· mezzo" : ""}</span>
                    </td>
                    {r.slot.map((s, i) => (
                      <td key={i} className={`px-1.5 py-2 text-center ${i === giornoSel ? "bg-petrol-50/60" : ""}`}>
                        {s === null ? (
                          <span className="text-xs text-slate-300">—</span>
                        ) : s === "ferie" ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-slate-200 px-2 py-1 text-[11px] font-medium text-slate-600">
                            <Palmtree size={11} /> Ferie
                          </span>
                        ) : (
                          <span className={`inline-block rounded-md px-2 py-1 text-[11px] font-semibold text-white ${colori[s]}`}>
                            {nomiBrevi[s]}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap gap-3 border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
            {commesse.map((c) => (
              <span key={c.id} className="flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-sm ${colori[c.id]}`} /> {nomiBrevi[c.id]}
              </span>
            ))}
          </div>
        </Card>

        <Card className="h-fit p-5">
          <div className="mb-3 flex items-center gap-2 font-semibold text-slate-800">
            <UserCheck size={18} className="text-petrol-600" /> Chi è libero — {giorni[giornoSel]}
          </div>
          {liberi.length === 0 ? (
            <p className="text-sm text-slate-400">Nessuna risorsa libera in questo giorno.</p>
          ) : (
            <ul className="space-y-2">
              {liberi.map((r) => (
                <li key={r.nome} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                  <span className="font-medium text-slate-800">{r.nome}</span>
                  <button onClick={() => toast(`${r.nome} allocato (demo)`)}
                    className="text-xs font-medium text-petrol-600 hover:underline">Alloca</button>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
            <CalendarDays size={14} className="mt-0.5 shrink-0" />
            Daniele Campanale in ferie mer–gio · Nicola Frisina in ferie giovedì. Clicca un giorno in intestazione per aggiornare il pannello.
          </div>
        </Card>
      </div>
    </div>
  );
}
