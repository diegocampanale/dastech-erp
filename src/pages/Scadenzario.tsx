import { User, Truck } from "lucide-react";
import { scadenze } from "../mock/data";
import { Badge, PageTitle, TableWrap, Th, Td } from "../components/ui";

export default function Scadenzario() {
  const ordinate = [...scadenze].sort((a, b) => a.scadenza.localeCompare(b.scadenza));
  return (
    <div>
      <PageTitle title="Scadenzario" subtitle="Documenti di personale e mezzi con relative scadenze" />
      <TableWrap>
        <thead className="bg-slate-50">
          <tr><Th>Soggetto</Th><Th>Documento</Th><Th>Scadenza</Th><Th>Stato</Th></tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {ordinate.map((s) => (
            <tr key={s.id} className={s.stato === "scaduto" ? "bg-red-50/50" : undefined}>
              <Td>
                <span className="flex items-center gap-2 font-medium text-slate-900">
                  {s.tipoSoggetto === "Persona" ? <User size={15} className="text-slate-400" /> : <Truck size={15} className="text-slate-400" />}
                  {s.soggetto}
                </span>
              </Td>
              <Td>{s.documento}</Td>
              <Td className="whitespace-nowrap">{s.scadenza}</Td>
              <Td><Badge value={s.stato} /></Td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
    </div>
  );
}
