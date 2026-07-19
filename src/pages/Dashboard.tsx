import { Link } from "react-router-dom";
import { FolderKanban, HardHat, CalendarClock, Euro, AlertTriangle, Receipt, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { commesse, dipendenti, scadenze, euro, totaleCommessa } from "../mock/data";
import { Card, PageTitle } from "../components/ui";

const stats = [
  { label: "Commesse attive", value: String(commesse.length), sub: "di cui 1 in avvio", icon: FolderKanban, color: "bg-petrol-100 text-petrol-700" },
  { label: "Personale in cantiere oggi", value: String(dipendenti.filter((d) => d.commessaId).length), sub: "su 6 in organico", icon: HardHat, color: "bg-emerald-100 text-emerald-700" },
  { label: "Scadenze imminenti", value: String(scadenze.filter((s) => s.stato !== "ok").length), sub: "2 già scadute", icon: CalendarClock, color: "bg-amber-100 text-amber-700" },
  { label: "Costo commesse in corso", value: euro(commesse.reduce((a, c) => a + totaleCommessa(c), 0)), sub: "consuntivo a oggi", icon: Euro, color: "bg-violet-100 text-violet-700" },
];

const chartData = commesse.map((c) => ({
  nome: c.nome.length > 22 ? c.nome.slice(0, 22) + "…" : c.nome,
  costo: totaleCommessa(c),
  budget: c.budget,
}));

export default function Dashboard() {
  return (
    <div>
      <PageTitle title="Dashboard direzione" subtitle="Panoramica aggiornata a venerdì 18 luglio 2026" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-slate-500">{s.label}</div>
                <div className="mt-1 text-2xl font-semibold text-slate-900">{s.value}</div>
                <div className="mt-1 text-xs text-slate-400">{s.sub}</div>
              </div>
              <div className={`rounded-lg p-2.5 ${s.color}`}>
                <s.icon size={20} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* alert operativi */}
      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
          <div className="text-sm">
            <span className="font-semibold text-amber-800">Materiale mancante prima della partenza:</span>{" "}
            <span className="text-amber-700">domani a Casamassima servono 6 terminali MT per cavo 185 mmq — giacenza zero.</span>{" "}
            <Link to="/app/richieste" className="inline-flex items-center gap-0.5 font-medium text-amber-800 underline">
              Vai alla richiesta <ArrowRight size={12} />
            </Link>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-petrol-200 bg-petrol-50 p-4">
          <Receipt size={18} className="mt-0.5 shrink-0 text-petrol-600" />
          <div className="text-sm">
            <span className="font-semibold text-petrol-800">2 fatture da confermare</span>{" "}
            <span className="text-petrol-700">in coda: il sistema ha già proposto la commessa di destinazione.</span>{" "}
            <Link to="/app/fatture" className="inline-flex items-center gap-0.5 font-medium text-petrol-800 underline">
              Apri coda fatture <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      <Card className="mt-6 p-5">
        <h2 className="mb-4 font-semibold text-slate-800">Costo per commessa (consuntivo vs budget)</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: 10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="nome" tick={{ fontSize: 11 }} interval={0} angle={-12} textAnchor="end" height={60} />
              <YAxis tickFormatter={(v) => `${v / 1000}k`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => euro(v)} />
              <Bar isAnimationActive={false} dataKey="budget" name="Budget" fill="#bcdaea" radius={[4, 4, 0, 0]} />
              <Bar isAnimationActive={false} dataKey="costo" name="Consuntivo" fill="#14688f" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-petrol-200" /> Budget</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-petrol-600" /> Consuntivo a oggi</span>
        </div>
      </Card>
    </div>
  );
}
