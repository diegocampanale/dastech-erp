import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { sprechi, euro } from "../mock/data";
import { AnteprimaBadge, Card, PageTitle, TableWrap, Th, Td } from "../components/ui";

export default function Sprechi() {
  return (
    <div>
      <PageTitle
        title="Analisi sprechi materiali"
        badge={<AnteprimaBadge />}
        subtitle="Confronto tra materiale preventivato, consumato e avanzato per commessa (Fase 2)"
      />
      <Card className="p-5">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sprechi} margin={{ left: 10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="commessa" tick={{ fontSize: 11 }} interval={0} />
              <YAxis tickFormatter={(v) => `${v / 1000}k`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => euro(v)} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar isAnimationActive={false} dataKey="preventivato" name="Preventivato" fill="#8ec0da" radius={[4, 4, 0, 0]} />
              <Bar isAnimationActive={false} dataKey="consumato" name="Consumato" fill="#14688f" radius={[4, 4, 0, 0]} />
              <Bar isAnimationActive={false} dataKey="avanzato" name="Avanzato" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-6">
        <TableWrap>
          <thead className="bg-slate-50">
            <tr><Th>Commessa</Th><Th className="text-right">Preventivato</Th><Th className="text-right">Consumato</Th><Th className="text-right">Avanzato</Th><Th className="text-right">% avanzo</Th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {sprechi.map((s) => {
              const perc = Math.round((s.avanzato / s.preventivato) * 100);
              return (
                <tr key={s.commessa}>
                  <Td className="font-medium text-slate-900">{s.commessa}</Td>
                  <Td className="text-right">{euro(s.preventivato)}</Td>
                  <Td className="text-right">{euro(s.consumato)}</Td>
                  <Td className="text-right">{euro(s.avanzato)}</Td>
                  <Td className={`text-right font-medium ${perc > 10 ? "text-amber-600" : "text-emerald-600"}`}>{perc}%</Td>
                </tr>
              );
            })}
          </tbody>
        </TableWrap>
      </div>
    </div>
  );
}
