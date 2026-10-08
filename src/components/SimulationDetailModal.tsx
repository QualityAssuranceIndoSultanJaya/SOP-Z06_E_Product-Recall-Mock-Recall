import React from 'react';
import {
  X,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Calendar,
  User,
  ShieldCheck,
  Package,
  Layers,
  FileText
} from 'lucide-react';
import { RecallSimulation, SimulationStatus } from '../types/recall';

interface SimulationDetailModalProps {
  simulation: RecallSimulation | null;
  onClose: () => void;
  onStatusChange: (simId: string, newStatus: SimulationStatus) => void;
}

export const SimulationDetailModal: React.FC<SimulationDetailModalProps> = ({
  simulation,
  onClose,
  onStatusChange,
}) => {
  if (!simulation) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                {simulation.refNumber}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-slate-300">
                {simulation.type}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold">{simulation.title}</h2>
            <p className="text-xs text-slate-300 mt-1">
              Produk: <strong className="text-white">{simulation.productName}</strong> (Batch: {simulation.batchNumber})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Status & Quick Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Status Simulasi</span>
              <div className="mt-1 flex items-center gap-1.5 font-bold text-sm">
                <span className={`w-2 h-2 rounded-full ${
                  simulation.status === 'Completed' ? 'bg-emerald-500' :
                  simulation.status === 'On-Going' ? 'bg-blue-500' :
                  simulation.status === 'Pending' ? 'bg-amber-500' : 'bg-slate-500'
                }`}></span>
                {simulation.status}
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Tingkat Keparahan</span>
              <span className="mt-1 font-bold text-slate-900 block truncate">
                {simulation.severity}
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Total Durasi Traceability</span>
              <span className={`mt-1 font-bold text-sm ${simulation.totalDurationHours <= 4 && simulation.totalDurationHours > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                {simulation.totalDurationHours > 0 ? `${simulation.totalDurationHours} Jam` : 'Dalam Proses'}
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Efektivitas Penarikan</span>
              <span className="mt-1 font-bold text-sm text-indigo-600">
                {simulation.efficiencyPercent > 0 ? `${simulation.efficiencyPercent}%` : '-'}
              </span>
            </div>
          </div>

          {/* Status Controller */}
          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-slate-900 text-xs block">Ubah Status Alur SOP:</span>
              <span className="text-[11px] text-slate-500">Sesuaikan tahapan penarikan sesuai hasil rapat kilat tim inti.</span>
            </div>
            <div className="flex items-center gap-1.5">
              {(['Pending', 'On-Going', 'Completed', 'Closed'] as SimulationStatus[]).map((st) => (
                <button
                  key={st}
                  onClick={() => onStatusChange(simulation.id, st)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    simulation.status === st
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Department Responses vs 4h SLA Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-indigo-600" />
                Ketertelusuran Data 4 Departemen (Target SLA: &lt; 4 Jam)
              </h3>
            </div>

            {simulation.departmentResponses.length > 0 ? (
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Departemen</th>
                      <th className="py-2.5 px-3">Data yang Diminta</th>
                      <th className="py-2.5 px-3">Waktu Respons</th>
                      <th className="py-2.5 px-3">Kepatuhan SLA (&lt;4h)</th>
                      <th className="py-2.5 px-3">PIC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {simulation.departmentResponses.map((r, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{r.department}</td>
                        <td className="py-2.5 px-3 text-slate-600">{r.dataRequired}</td>
                        <td className="py-2.5 px-3 font-mono">
                          {r.responseTimeHours > 0 ? `${r.responseTimeHours} Jam (${r.submittedAt})` : r.submittedAt}
                        </td>
                        <td className="py-2.5 px-3">
                          {r.responseTimeHours > 0 ? (
                            r.isWithinSLA ? (
                              <span className="inline-flex items-center text-emerald-600 font-semibold gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Lolos SLA
                              </span>
                            ) : (
                              <span className="inline-flex items-center text-rose-600 font-semibold gap-1">
                                <AlertTriangle className="w-3.5 h-3.5" /> Terlambat
                              </span>
                            )
                          ) : (
                            <span className="text-slate-400">Menunggu</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-slate-500">{r.picName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center text-slate-400 italic">
                Belum ada data pengumpulan respons dari divisi. Formulir masih dalam status Pending.
              </div>
            )}
          </div>

          {/* Corrective Action (CAPA) */}
          {simulation.capaItems.length > 0 && (
            <div>
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Tindakan Perbaikan (CAPA) - Maksimal 5 Hari Kerja
              </h3>
              <div className="space-y-2">
                {simulation.capaItems.map((c) => (
                  <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-slate-900">{c.actionItem}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Departemen: {c.assignedDept} • PIC: {c.pic} • Target: {c.deadlineDays} Hari • Bukti: {c.evidenceCriteria}
                      </div>
                      {c.verifiedByQA && (
                        <div className="text-[10px] text-emerald-700 font-medium mt-1">
                          ✓ Diverifikasi oleh: {c.verifiedByQA} ({c.verifiedAt})
                        </div>
                      )}
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                      c.status === 'Closed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conclusion */}
          {simulation.conclusion && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Kesimpulan Akhir QA Manager</span>
                <span className="text-sm font-bold text-emerald-900">{simulation.conclusion}</span>
              </div>
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
