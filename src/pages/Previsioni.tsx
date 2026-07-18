import { AlertTriangle, TrendingUp, PackageSearch, Brain } from "lucide-react";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import { euro } from "../mock/data";
import { AnteprimaBadge, Card, PageTitle, TableWrap, Th, Td } from "../components/ui";

const proiezioni = [
  { commessa: "Capannone Modugno", budget: 185000, consuntivo: 104400, proiezione: 176800, rischio: "Basso" },
  { commessa: "Quadri Bitonto", budget: 96000, consuntivo: 44400, proiezione: 92500, rischio: "Basso" },
  { commessa: "Fotovoltaico Molfetta", budget: 240000, consuntivo: 108900, proiezione: 258400, rischio: "Alto" },
  { commessa: "Illum. Giovinazzo", budget: 74000, consuntivo: 34400, proiezione: 66100, rischio: "Basso" },
  { commessa: "Cabina Casamassima", budget: 132000, consuntivo: 19700, proiezione: 139200, rischio: "Medio" },
];

const alerts = [
  { icon: AlertTriangle, tono: "bg-red-100 text-red-700", titolo: "Fotovoltaico Molfetta: proiezione +7,7% oltre budget", testo: "Il ritmo di consumo dei materiali delle ultime 3 settimane porta il costo finale stimato a 258.400 €. Voce critica: noleggi (escavatore fermo 4 giorni)." },
  { icon: AlertTriangle, tono: "bg-amber-100 text-amber-700", titolo: "Cabina Casamassima: rischio medio su manodopera", testo: "Le ore registrate in avvio sono il 22% sopra la media storica di commesse simili (Cabina Trani 2023)." },
  { icon: TrendingUp, tono: "bg-emerald-100 text-emerald-700", titolo: "Capannone Modugno: margine in miglioramento", testo: "Avanzamento 62% con solo il 56% del budget consumato. Proiezione finale sotto budget di ~8.200 €." },
];

const fabbisogno = [
  { articolo: "Cavo FG16OR16 3x2,5 mmq", commessa: "Capannone Modugno", previsto: "≈ 800 m", giacenza: "1.200 m", azione: "Coperto" },
  { articolo: "Pannello fotovoltaico 450W", commessa: "Fotovoltaico Molfetta", previsto: "≈ 180 pz", giacenza: "130 pz", azione: "Ordinare 50 pz" },
  { articolo: "Plafoniera stagna LED 150 cm", commessa: "Quadri Bitonto", previsto: "≈ 60 pz", giacenza: "48 pz", azione: "Ordinare 12 pz" },
  { articolo: "Terminali MT cavo 185 mmq", commessa: "Cabina Casamassima", previsto: "≈ 12 pz", giacenza: "0 pz", azione: "Ordinare 12 pz" },
];

const rischioBadge: Record<string, string> = {
  Basso: "bg-emerald-100 text-emerald-700",
  Medio: "bg-amber-100 text-amber-700",
  Alto: "bg-red-100 text-red-700",
};

export default function Previsioni() {
  return (
    <div>
      <PageTitle
        title="Previsioni & analisi AI"
        badge={<AnteprimaBadge />}
        subtitle="Il sistema impara dallo storico delle commesse e stima costi finali, rischi e fabbisogni di materiale"
      />

      {/* alert AI */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {alerts.map((a) => (
          <Card key={a.titolo} className="p-5">
            <div className={`mb-3 inline-flex rounded-lg p-2 ${a.tono}`}><a.icon size={18} /></div>
            <div className="font-semibold leading-snug text-slate-900">{a.titolo}</div>
            <p className="mt-1.5 text-sm text-slate-500">{a.testo}</p>
          </Card>
        ))}
      </div>

      {/* grafico proiezioni */}
      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
          <Brain size={18} className="text-petrol-600" /> Proiezione costo a fine commessa
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={proiezioni} margin={{ left: 10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="commessa" tick={{ fontSize: 11 }} interval={0} />
              <YAxis tickFormatter={(v) => `${v / 1000}k`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => euro(v)} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar isAnimationActive={false} dataKey="consuntivo" name="Consuntivo a oggi" fill="#14688f" radius={[4, 4, 0, 0]} />
              <Bar isAnimationActive={false} dataKey="proiezione" name="Proiezione finale (AI)" fill="#8ec0da" radius={[4, 4, 0, 0]} />
              <Line isAnimationActive={false} type="monotone" dataKey="budget" name="Budget" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* tabella rischio */}
      <div className="mt-6">
        <TableWrap>
          <thead className="bg-slate-50">
            <tr><Th>Commessa</Th><Th className="text-right">Budget</Th><Th className="text-right">Proiezione finale</Th><Th className="text-right">Scostamento</Th><Th>Rischio sforamento</Th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {proiezioni.map((p) => {
              const delta = p.proiezione - p.budget;
              return (
                <tr key={p.commessa}>
                  <Td className="font-medium text-slate-900">{p.commessa}</Td>
                  <Td className="text-right">{euro(p.budget)}</Td>
                  <Td className="text-right">{euro(p.proiezione)}</Td>
                  <Td className={`text-right font-medium ${delta > 0 ? "text-red-600" : "text-emerald-600"}`}>
                    {delta > 0 ? "+" : ""}{euro(delta)}
                  </Td>
                  <Td><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${rischioBadge[p.rischio]}`}>{p.rischio}</span></Td>
                </tr>
              );
            })}
          </tbody>
        </TableWrap>
      </div>

      {/* fabbisogno materiali */}
      <Card className="mt-6 overflow-hidden">
        <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4 font-semibold text-slate-800">
          <PackageSearch size={18} className="text-petrol-600" /> Fabbisogno materiali previsto — prossime 4 settimane
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr><Th>Articolo</Th><Th>Commessa</Th><Th className="text-right">Fabbisogno stimato</Th><Th className="text-right">Giacenza</Th><Th>Azione suggerita</Th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {fabbisogno.map((f) => (
                <tr key={f.articolo}>
                  <Td className="font-medium text-slate-900">{f.articolo}</Td>
                  <Td>{f.commessa}</Td>
                  <Td className="text-right">{f.previsto}</Td>
                  <Td className="text-right">{f.giacenza}</Td>
                  <Td>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      f.azione === "Coperto" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>{f.azione}</span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
