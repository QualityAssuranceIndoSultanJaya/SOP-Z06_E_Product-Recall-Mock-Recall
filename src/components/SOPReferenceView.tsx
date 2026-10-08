import React from 'react';
import {
  FileText,
  ShieldCheck,
  Clock,
  AlertOctagon,
  CheckCircle2,
  Workflow,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const SOPReferenceView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Standard Operating Procedure (SOP)
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              SOP-Z06_E: Product Recall & Mock Recall PT Indo Sultan Jaya
            </h1>
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Dokumen acuan legal dan teknis penarikan produk (aktual & simulasi tahunan), berlaku per <strong>10 Agustus 2026</strong>. Disahkan oleh QA Manager & GM Operational sesuai Peraturan BPOM RI No. 11/2017 & standar CPKB.
        </p>
      </div>

      {/* 6 Langkah Penarikan Produk Aktual */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
          <Workflow className="w-4 h-4 text-indigo-600" />
          Prinsip Dasar 6 Langkah Recall Aktual (Bagian 7.2 SOP)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-600 text-white">
                LANGKAH 1
              </span>
              <span className="text-[11px] font-mono text-rose-700 font-semibold">
                Target: 0 - 2 JAM
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-xs mb-1.5">STOP & BLOKIR SEGERA</h3>
            <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
              <li>Broadcast WhatsApp ke Grup "TIM RECALL ISJ".</li>
              <li><strong>QC (&lt;15 menit)</strong>: Status produk jadi "BLOCKED-RECALL" di ERP.</li>
              <li><strong>Gudang (&lt;1 jam)</strong>: Pindah fisik ke Area Karantina & label merah "DITAHAN – RECALL".</li>
              <li><strong>Produksi</strong>: Hentikan seketika proses terkait.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-600 text-white">
                LANGKAH 2
              </span>
              <span className="text-[11px] font-mono text-amber-700 font-semibold">
                Target: Jam ke-1
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-xs mb-1.5">INVESTIGASI & PERENCANAAN</h3>
            <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
              <li>Rapat Kilat Tim Inti (QA, QC, Gudang, Produksi, Sales).</li>
              <li>Tentukan ruang lingkup: <strong>Total</strong> atau <strong>Parsial (3/1 bets)</strong>.</li>
              <li>Identifikasi rantai distribusi domestik & ekspor.</li>
              <li>Penyusunan investigasi CPAR (FR-Q04-01).</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                LANGKAH 3
              </span>
              <span className="text-[11px] font-mono text-blue-700 font-semibold">
                Target: &le; 24 JAM
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-xs mb-1.5">NOTIFY & PLAN (PULL)</h3>
            <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
              <li>Kirim <strong>First Notification (FR-Z06-03)</strong> ke pelanggan & distributor.</li>
              <li>Instruksi stop penjualan & isolasi stok segera.</li>
              <li>Koordinasi logistik fisik / opsi Local Disposal ekspor.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">
                LANGKAH 4
              </span>
              <span className="text-[11px] font-mono text-indigo-700 font-semibold">
                Sesuai Jadwal Logistik
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-xs mb-1.5">RETRIEVE & DECIDE</h3>
            <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
              <li>Penerimaan produk kembalian ke pabrik.</li>
              <li>Pengujian sampel oleh QC Laboratory.</li>
              <li>Keputusan disposisi: <strong>REJECT</strong> atau <strong>REWORK</strong>.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-600 text-white">
                LANGKAH 5
              </span>
              <span className="text-[11px] font-mono text-purple-700 font-semibold">
                Eksekusi Disposisi
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-xs mb-1.5">ACT (TINDAKAN DISPOSISI)</h3>
            <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
              <li>Pemusnahan di pabrik (wajib saksi BPOM bila instruksi BPOM).</li>
              <li>Berita Acara Pemusnahan (FR-Q05-02_B) + min 3 foto.</li>
              <li>Atau Rework sesuai IK yang disetujui QC/QA.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                LANGKAH 6
              </span>
              <span className="text-[11px] font-mono text-emerald-700 font-semibold">
                Penutupan & Audit
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-xs mb-1.5">CLOSE & PELAPORAN</h3>
            <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
              <li>Laporan Akhir Recall (FR-Z06-01_B).</li>
              <li>Penyampaian resmi ke BPOM RI / LPPOM MUI.</li>
              <li>Pembaruan Log Recall & Mock Recall (FR-Z06-02_A).</li>
              <li>Arsip dokumen permanen.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mock Recall Target Performance Callout */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-2xl p-6 text-white border border-emerald-800 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold">
            Target Kinerja Mock Recall (SOP Bagian 5.7 - 5.9)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs border border-white/10">
            <div className="text-emerald-300 font-bold mb-1">1. Frekuensi Wajib</div>
            <p className="text-slate-200">
              Mock Recall wajib disimulasikan <strong>minimal 1 (satu) kali setahun</strong>, dapat diumumkan atau dadakan (unannounced).
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs border border-white/10">
            <div className="text-amber-300 font-bold mb-1">2. Target Kecepatan SLA</div>
            <p className="text-slate-200">
              Pengumpulan data traceability lengkap dari semua departemen (Gudang, Produksi, QC, Sales) wajib <strong>&lt; 4 jam</strong> sejak aktivasi.
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-xs border border-white/10">
            <div className="text-blue-300 font-bold mb-1">3. Tindakan Korektif (CAPA)</div>
            <p className="text-slate-200">
              Tindakan perbaikan dari temuan kelemahan mock recall wajib dieksekusi <strong>maksimal 5 hari kerja (H+1 s/d H+5)</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
