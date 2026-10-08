import React, { useState } from 'react';
import { X, Plus, AlertTriangle, ShieldAlert } from 'lucide-react';
import { RecallSimulation, RecallSeverity, RecallScope, RecallType, SimulationStatus } from '../types/recall';

interface NewSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSimulation: (sim: RecallSimulation) => void;
}

export const NewSimulationModal: React.FC<NewSimulationModalProps> = ({
  isOpen,
  onClose,
  onAddSimulation,
}) => {
  const [type, setType] = useState<RecallType>('Mock Recall');
  const [refNumber, setRefNumber] = useState(`MOCK-2026-00${Math.floor(Math.random() * 90) + 10}`);
  const [title, setTitle] = useState('');
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [triggerReason, setTriggerReason] = useState('');
  const [severity, setSeverity] = useState<RecallSeverity>('Kelas II (Cacat Mutu)');
  const [scope, setScope] = useState<RecallScope>('Recall Parsial (1 Batch)');
  const [status, setStatus] = useState<SimulationStatus>('Pending');
  const [targetQuantityKgs, setTargetQuantityKgs] = useState(1000);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSim: RecallSimulation = {
      id: `sim-${Date.now()}`,
      refNumber,
      type,
      title: title || `${type}: ${productName}`,
      productName,
      productCode,
      batchNumber,
      triggerReason,
      severity,
      scope,
      status,
      activationDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      leadPIC: 'ZFAN (QA Manager)',
      targetQuantityKgs: Number(targetQuantityKgs),
      returnedQuantityKgs: status === 'Completed' ? Number(targetQuantityKgs) * 0.96 : 0,
      efficiencyPercent: status === 'Completed' ? 96 : 0,
      totalDurationHours: status === 'Completed' ? 3.5 : 0,
      departmentResponses: status === 'Pending' ? [] : [
        {
          department: 'Gudang',
          dataRequired: 'Stok fisik gudang FG & lokasi karantina',
          responseTimeHours: 1.1,
          submittedAt: '09:06 WIB',
          isWithinSLA: true,
          picName: 'Hadi (Asisten Gudang)',
          notes: 'Stok terisolasi'
        },
        {
          department: 'Produksi',
          dataRequired: 'Batch record & PO Kemasan',
          responseTimeHours: 2.0,
          submittedAt: '10:00 WIB',
          isWithinSLA: true,
          picName: 'Rudi (Spv Produksi)',
          notes: 'Data lengkap'
        },
        {
          department: 'Quality Control',
          dataRequired: 'CoA & hasil uji lab',
          responseTimeHours: 2.5,
          submittedAt: '10:30 WIB',
          isWithinSLA: true,
          picName: 'Sarah (QC)',
          notes: 'CoA terverifikasi'
        },
        {
          department: 'Sales & Logistik',
          dataRequired: 'Invoice & data distribusi',
          responseTimeHours: 3.2,
          submittedAt: '11:12 WIB',
          isWithinSLA: true,
          picName: 'Andi (Sales)',
          notes: 'Kontak distributor terkonfirmasi'
        }
      ],
      capaItems: [],
      conclusion: status === 'Completed' ? 'Berhasil (Sistem Responsif)' : undefined,
    };

    onAddSimulation(newSim);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold">Registrasi Simulasi / Recall Baru</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Jenis Aktivitas</label>
              <select
                value={type}
                onChange={(e) => {
                  const val = e.target.value as RecallType;
                  setType(val);
                  setRefNumber(val === 'Mock Recall' ? `MOCK-2026-00${Math.floor(Math.random() * 90) + 10}` : `REC-ISJ-2026-00${Math.floor(Math.random() * 90) + 10}`);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Mock Recall">Mock Recall (Simulasi Tahunan)</option>
                <option value="Recall Aktual">Recall Aktual (Instruksi BPOM/Kasus Nyata)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Nomor Referensi</label>
              <input
                type="text"
                required
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value)}
                className="w-full px-3 py-2 font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Judul / Skenario Simulasi</label>
            <input
              type="text"
              required
              placeholder="e.g. Simulasi Q4: Uji Ketertelusuran Bahan Baku Pengawet"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Nama Produk</label>
              <input
                type="text"
                required
                placeholder="e.g. Sultan Glow Serum"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Kode Produk</label>
              <input
                type="text"
                required
                placeholder="e.g. SGS-020"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Nomor Batch</label>
              <input
                type="text"
                required
                placeholder="e.g. B26K09"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                className="w-full px-3 py-2 font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tingkat Keparahan</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as RecallSeverity)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Kelas I (Bahaya Kesehatan)">Kelas I (Bahaya Kesehatan)</option>
                <option value="Kelas II (Cacat Mutu)">Kelas II (Cacat Mutu)</option>
                <option value="Kelas III (Ketidaknyamanan)">Kelas III (Ketidaknyamanan)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Status Awal</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as SimulationStatus)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Pending">Pending (Menunggu Pelaksanaan)</option>
                <option value="On-Going">On-Going (Sedang Berjalan)</option>
                <option value="Completed">Completed (Selesai Dilaksanakan)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Alasan Pemicu / Skenario</label>
            <textarea
              rows={2}
              required
              placeholder="Jelaskan alasan atau skenario audit..."
              value={triggerReason}
              onChange={(e) => setTriggerReason(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-xs cursor-pointer"
            >
              Simpan ke Sistem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
