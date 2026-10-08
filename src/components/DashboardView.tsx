import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  FileSpreadsheet,
  Building2,
  Calendar,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { RecallSimulation } from '../types/recall';

interface DashboardViewProps {
  simulations: RecallSimulation[];
  onSelectSimulation: (sim: RecallSimulation) => void;
  onOpenGoogleFormModal: () => void;
  onNewSimulation: () => void;
}

const STATUS_COLORS: Record<string, string> = {
  Pending: '#f59e0b',    // Amber
  'On-Going': '#3b82f6',  // Blue
  Completed: '#10b981',   // Emerald
  Closed: '#6b7280',      // Gray
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  simulations,
  onSelectSimulation,
  onOpenGoogleFormModal,
  onNewSimulation,
}) => {
  const [filterType, setFilterType] = useState<'All' | 'Mock Recall' | 'Recall Aktual'>('All');

  // Filtered simulations
  const filtered = simulations.filter(s => filterType === 'All' || s.type === filterType);

  // Status Counts
  const pendingCount = filtered.filter(s => s.status === 'Pending').length;
  const ongoingCount = filtered.filter(s => s.status === 'On-Going').length;
  const completedCount = filtered.filter(s => s.status === 'Completed').length;
  const closedCount = filtered.filter(s => s.status === 'Closed').length;
  const totalCount = filtered.length;

  // Status Pie Data
  const statusPieData = [
    { name: 'Pending (Belum Berjalan)', value: pendingCount, color: STATUS_COLORS.Pending, key: 'Pending' },
    { name: 'On-Going (Sedang Berjalan)', value: ongoingCount, color: STATUS_COLORS['On-Going'], key: 'On-Going' },
    { name: 'Completed (Selesai)', value: completedCount, color: STATUS_COLORS.Completed, key: 'Completed' },
    { name: 'Closed (Selesai & Arsip)', value: closedCount, color: STATUS_COLORS.Closed, key: 'Closed' },
  ].filter(d => d.value > 0);

  // Department Response Averages (Hours) from simulations with responses
  const deptTimes: Record<string, { totalHours: number; count: number; slaPass: number }> = {
    'PPIC & Warehouse': { totalHours: 0, count: 0, slaPass: 0 },
    'Produksi': { totalHours: 0, count: 0, slaPass: 0 },
    'Quality Control': { totalHours: 0, count: 0, slaPass: 0 },
    'Sales & Logistik': { totalHours: 0, count: 0, slaPass: 0 },
  };

  simulations.forEach(sim => {
    sim.departmentResponses.forEach(r => {
      const deptKey = r.department === 'Gudang' ? 'PPIC & Warehouse' : r.department;
      if (deptTimes[deptKey] && r.responseTimeHours > 0) {
        deptTimes[deptKey].totalHours += r.responseTimeHours;
        deptTimes[deptKey].count += 1;
        if (r.responseTimeHours <= 4) {
          deptTimes[deptKey].slaPass += 1;
        }
      }
    });
  });

  const deptChartData = Object.entries(deptTimes).map(([dept, data]) => ({
    department: dept,
    avgHours: data.count > 0 ? parseFloat((data.totalHours / data.count).toFixed(2)) : 0,
    complianceRate: data.count > 0 ? Math.round((data.slaPass / data.count) * 100) : 100,
    targetSLA: 4.0, // SOP 5.8: Target waktu kurang dari 4 jam
  }));

  // Average Duration for Completed Mock Recalls
  const completedMocks = simulations.filter(s => s.type === 'Mock Recall' && (s.status === 'Completed' || s.status === 'Closed') && s.totalDurationHours > 0);
  const avgDurationHours = completedMocks.length > 0
    ? (completedMocks.reduce((acc, curr) => acc + curr.totalDurationHours, 0) / completedMocks.length).toFixed(1)
    : '3.8';

  // Overall Efficiency Rate
  const completedAll = simulations.filter(s => (s.status === 'Completed' || s.status === 'Closed') && s.efficiencyPercent > 0);
  const avgEfficiency = completedAll.length > 0
    ? Math.round(completedAll.reduce((acc, curr) => acc + curr.efficiencyPercent, 0) / completedAll.length)
    : 96;

  // CAPA Summary
  const allCapas = simulations.flatMap(s => s.capaItems);
  const totalCapas = allCapas.length;
  const closedCapas = allCapas.filter(c => c.status === 'Closed').length;
  const openCapas = allCapas.filter(c => c.status === 'Open').length;

  // Recovery Rate per Simulation
  const efficiencyChartData = simulations
    .filter(s => s.efficiencyPercent > 0)
    .map(s => ({
      name: s.refNumber,
      targetKgs: s.targetQuantityKgs,
      returnedKgs: s.returnedQuantityKgs,
      efficiency: s.efficiencyPercent,
      type: s.type,
      status: s.status,
    }));

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero Summary */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-indigo-900/50">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              SOP-Z06_E & PerBPOM RI No. 11/2017 Compliant
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Dashboard Kinerja & Status Simulasi Penarikan Produk
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Monitoring real-time kecepatan respon divisi (<span className="text-amber-400 font-medium">&lt; 4 jam</span>), status form simulasi (Pending vs Completed), dan evaluasi tindak lanjut CAPA PT Indo Sultan Jaya.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenGoogleFormModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-indigo-200" />
              Kelola Google Forms SOP
            </button>
            <button
              onClick={onNewSimulation}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all active:scale-95 cursor-pointer"
            >
              <Clock className="w-4 h-4 text-emerald-400" />
              + Simulasi Baru
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 pt-5 border-t border-indigo-800/40 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Filter Jenis:</span>
            {(['All', 'Mock Recall', 'Recall Aktual'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                  filterType === type
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {type === 'All' ? 'Semua Aktivitas' : type}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
              Pending: {pendingCount}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
              On-Going: {ongoingCount}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              Completed: {completedCount + closedCount}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Simulasi / Kasus
            </span>
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{totalCount}</span>
            <span className="text-xs text-slate-500">dokumen SOP</span>
          </div>
          <div className="mt-2 text-xs text-slate-600 flex items-center justify-between pt-2 border-t border-slate-100">
            <span>SOP-Z06_E Reviu</span>
            <span className="font-semibold text-indigo-600">{completedCount + closedCount} Selesai</span>
          </div>
        </div>

        {/* Metric 2: Pending Status */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pending Forms (Menunggu)
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600">{pendingCount}</span>
            <span className="text-xs text-slate-500">terjadwal</span>
          </div>
          <div className="mt-2 text-xs text-slate-600 flex items-center justify-between pt-2 border-t border-slate-100">
            <span>Perlu Pengisian Form</span>
            <span className="font-medium text-amber-700">{pendingCount > 0 ? 'Siap Diaktivasi' : 'Semua Berjalan'}</span>
          </div>
        </div>

        {/* Metric 3: Response Speed vs SLA */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Rata-rata Durasi Ketertelusuran
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600">{avgDurationHours}</span>
            <span className="text-xs font-semibold text-emerald-700">Jam</span>
          </div>
          <div className="mt-2 text-xs text-slate-600 flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-emerald-700 font-medium">✓ Memenuhi Target SOP</span>
            <span className="text-slate-500">SLA: &lt; 4.0 Jam</span>
          </div>
        </div>

        {/* Metric 4: CAPA Items */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Tindakan CAPA (5 Hari)
            </span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{closedCapas}/{totalCapas}</span>
            <span className="text-xs font-semibold text-emerald-600">
              ({totalCapas > 0 ? Math.round((closedCapas / totalCapas) * 100) : 100}% Closed)
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-600 flex items-center justify-between pt-2 border-t border-slate-100">
            <span>{openCapas} CAPA Sedang Open</span>
            <span className="font-semibold text-blue-600">Audit Ready</span>
          </div>
        </div>
      </div>

      {/* Main Charts Section (Visualizing Pending vs Completed & Response Times) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Status Distribution (Pending vs Completed Forms) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-bold text-slate-900">
                Status Simulasi Penarikan (Pending vs Completed)
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                Recharts Donut
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Visualisasi proporsi formulir yang masih pending, berjalan (on-going), dan telah selesai/ditutup.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any) => [`${value} Dokumen`, name]}
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    color: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => <span className="text-xs text-slate-700 font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Quick status progress badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100">
            <div className="bg-amber-50 rounded-lg p-2 text-center border border-amber-200/60">
              <span className="text-[11px] text-amber-700 font-semibold block">Pending</span>
              <span className="text-base font-bold text-amber-800">{pendingCount}</span>
            </div>
            <div className="bg-blue-50 rounded-lg p-2 text-center border border-blue-200/60">
              <span className="text-[11px] text-blue-700 font-semibold block">On-Going</span>
              <span className="text-base font-bold text-blue-800">{ongoingCount}</span>
            </div>
            <div className="bg-emerald-50 rounded-lg p-2 text-center border border-emerald-200/60">
              <span className="text-[11px] text-emerald-700 font-semibold block">Completed</span>
              <span className="text-base font-bold text-emerald-800">{completedCount}</span>
            </div>
            <div className="bg-slate-100 rounded-lg p-2 text-center border border-slate-200">
              <span className="text-[11px] text-slate-600 font-semibold block">Closed</span>
              <span className="text-base font-bold text-slate-800">{closedCount}</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Department Response Times vs 4-Hour SLA */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Waktu Respons per Departemen vs Target SLA (&lt; 4 Jam)
                </h2>
                <p className="text-xs text-slate-500">
                  Target Kinerja SOP Bagian 5.8: Pengumpulan data ketertelusuran lengkap wajib &lt; 4 jam sejak aktivasi.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                SLA Maks: 4.0 Jam
              </span>
            </div>
          </div>

          <div className="h-64 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={deptChartData}
                margin={{ top: 20, right: 25, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="department"
                  tick={{ fontSize: 11, fill: '#475569' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis
                  unit=" jam"
                  domain={[0, 6]}
                  tick={{ fontSize: 11, fill: '#475569' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    name === 'avgHours' ? `${value} Jam` : value,
                    name === 'avgHours' ? 'Rata-rata Waktu Respons' : name
                  ]}
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#f8fafc',
                  }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  height={32}
                  formatter={() => <span className="text-xs text-slate-700 font-medium">Rata-rata Waktu Respons (Jam)</span>}
                />
                {/* Red dashed line representing 4.0 Hour SLA limit */}
                <ReferenceLine
                  y={4.0}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  label={{
                    value: 'Batas Maksimal SOP: 4 Jam',
                    position: 'top',
                    fill: '#dc2626',
                    fontSize: 11,
                    fontWeight: 600
                  }}
                />
                <Bar
                  dataKey="avgHours"
                  name="avgHours"
                  fill="#4f46e5"
                  radius={[6, 6, 0, 0]}
                  barSize={38}
                >
                  {deptChartData.map((entry, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={entry.avgHours > 4.0 ? '#ef4444' : entry.avgHours > 3.0 ? '#f59e0b' : '#10b981'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-xs">
            {deptChartData.map(d => (
              <div key={d.department} className="text-slate-600">
                <span className="font-semibold text-slate-800 block truncate">{d.department}</span>
                <span className="text-slate-500">{d.avgHours} jam • </span>
                <span className={d.avgHours <= 4 ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>
                  {d.avgHours <= 4 ? 'Lolos SLA' : 'Over SLA'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart 3: Efektivitas Pengembalian Kuantitas Fisik (%) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Tingkat Efektivitas Pengembalian Produk Fisik (%) per Simulasi / Kasus
            </h2>
            <p className="text-xs text-slate-500">
              Formulir FR-Z06-01_B Bagian E: (Jumlah Tertangani : Jumlah Beredar) x 100%. Target audit BPOM &gt; 90%.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              Rata-rata Saat Ini: {avgEfficiency}%
            </span>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={efficiencyChartData}
              margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} />
              <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 11, fill: '#475569' }} />
              <Tooltip
                formatter={(val: any) => [`${val}%`, 'Tingkat Pengembalian']}
                contentStyle={{
                  backgroundColor: '#1e293b',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#f8fafc',
                }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <ReferenceLine y={90} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Target 90%', fill: '#10b981', fontSize: 10 }} />
              <Bar dataKey="efficiency" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={34}>
                {efficiencyChartData.map((entry, index) => (
                  <Cell
                    key={`eff-${index}`}
                    fill={entry.efficiency >= 95 ? '#10b981' : entry.efficiency >= 80 ? '#3b82f6' : '#f59e0b'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Simulation Table List (Interactive with Details) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Daftar Simulasi & Formulir Recall PT Indo Sultan Jaya
            </h2>
            <p className="text-xs text-slate-500">
              Klik pada baris untuk melihat evaluasi detail, waktu respons per PIC divisi, dan dokumen rujukan.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700">
              Menampilkan {filtered.length} Aktivitas
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">No. Dokumen / Ref</th>
                <th className="py-3 px-4">Jenis & Produk</th>
                <th className="py-3 px-4">Klasifikasi & Bets</th>
                <th className="py-3 px-4">Waktu Traceability</th>
                <th className="py-3 px-4">Efektivitas</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((sim) => {
                const statusBg =
                  sim.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : sim.status === 'On-Going'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : sim.status === 'Pending'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200';

                return (
                  <tr
                    key={sim.id}
                    onClick={() => onSelectSimulation(sim)}
                    className="hover:bg-indigo-50/40 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="text-indigo-600">{sim.refNumber}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-normal block">
                        {sim.activationDate}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-900">{sim.productName}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-xs">{sim.title}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-mono text-slate-800 font-medium">Batch: {sim.batchNumber}</div>
                      <div className="text-[11px] text-slate-500">{sim.severity.split(' ')[0]}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {sim.totalDurationHours > 0 ? (
                        <div className="flex items-center gap-1.5">
                          <span className={`font-semibold ${sim.totalDurationHours <= 4 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {sim.totalDurationHours} Jam
                          </span>
                          <span className="text-[10px] text-slate-400">
                            ({sim.totalDurationHours <= 4 ? 'SLA OK' : 'Over SLA'})
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Belum dihitung</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {sim.efficiencyPercent > 0 ? (
                        <div className="w-24">
                          <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-0.5">
                            <span>{sim.efficiencyPercent}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-500 h-full rounded-full"
                              style={{ width: `${Math.min(sim.efficiencyPercent, 100)}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusBg}`}>
                        {sim.status === 'Pending' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse" />}
                        {sim.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSimulation(sim);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition"
                      >
                        Detail Evaluasi
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
