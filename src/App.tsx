import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { GoogleFormGenerator } from './components/GoogleFormGenerator';
import { SOPReferenceView } from './components/SOPReferenceView';
import { SimulationDetailModal } from './components/SimulationDetailModal';
import { NewSimulationModal } from './components/NewSimulationModal';
import { INITIAL_SIMULATIONS } from './data/initialData';
import { RecallSimulation, SimulationStatus } from './types/recall';
import { ShieldCheck, FileCheck2, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'forms' | 'sop'>('dashboard');
  const [simulations, setSimulations] = useState<RecallSimulation[]>(INITIAL_SIMULATIONS);
  const [selectedSimulation, setSelectedSimulation] = useState<RecallSimulation | null>(null);
  const [isNewSimulationOpen, setIsNewSimulationOpen] = useState(false);

  // Status update handler
  const handleStatusChange = (simId: string, newStatus: SimulationStatus) => {
    setSimulations(prev =>
      prev.map(sim => {
        if (sim.id === simId) {
          const isNowCompleted = newStatus === 'Completed' || newStatus === 'Closed';
          return {
            ...sim,
            status: newStatus,
            efficiencyPercent: isNowCompleted && sim.efficiencyPercent === 0 ? 97.5 : sim.efficiencyPercent,
            totalDurationHours: isNowCompleted && sim.totalDurationHours === 0 ? 3.6 : sim.totalDurationHours,
            conclusion: isNowCompleted && !sim.conclusion ? 'Berhasil (Sistem Responsif)' : sim.conclusion,
          };
        }
        return sim;
      })
    );

    if (selectedSimulation && selectedSimulation.id === simId) {
      setSelectedSimulation(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  // Add new simulation
  const handleAddSimulation = (newSim: RecallSimulation) => {
    setSimulations(prev => [newSim, ...prev]);
  };

  // Handlers for form submissions
  const handleFormSubmitted = (formData: any) => {
    // If it's a mock recall evaluation form
    if (formData.templateId === 'fr-z06-04') {
      const vals = formData.values || {};
      const newSim: RecallSimulation = {
        id: `sim-submit-${Date.now()}`,
        refNumber: vals.mock_no || `MOCK-2026-${Math.floor(Math.random() * 899) + 100}`,
        type: 'Mock Recall',
        title: vals.mock_scenario || 'Evaluasi Mock Recall (Pengisian Form Online)',
        productName: vals.mock_product || 'Batch Evaluasi Simulasi',
        productCode: 'ISJ-EVAL',
        batchNumber: 'B26-SUBMIT',
        triggerReason: vals.mock_scenario || 'Evaluasi formulir online',
        severity: 'Kelas II (Cacat Mutu)',
        scope: 'Recall Parsial (1 Batch)',
        status: 'Completed',
        activationDate: vals.mock_date || new Date().toISOString().replace('T', ' ').substring(0, 16),
        leadPIC: vals.mock_leader || 'ZFAN (QA Manager)',
        targetQuantityKgs: 1000,
        returnedQuantityKgs: 975,
        efficiencyPercent: 97.5,
        totalDurationHours: 3.4,
        departmentResponses: [
          {
            department: 'Gudang',
            dataRequired: 'Stok fisik gudang FG & lokasi karantina',
            responseTimeHours: 1.1,
            submittedAt: vals.dept_warehouse_time || '09:06 WIB',
            isWithinSLA: vals.dept_warehouse_status !== 'Tidak (Terlambat >4 Jam)',
            picName: 'PIC Gudang',
            notes: 'Respons tercatat via form online'
          },
          {
            department: 'Produksi',
            dataRequired: 'BMR (Batch Record) & PO Kemasan',
            responseTimeHours: 2.2,
            submittedAt: vals.dept_production_time || '10:12 WIB',
            isWithinSLA: vals.dept_production_status !== 'Tidak (Terlambat >4 Jam)',
            picName: 'PIC Produksi',
            notes: 'Respons tercatat via form online'
          },
          {
            department: 'Quality Control',
            dataRequired: 'CoA & Pengujian Laboratorium',
            responseTimeHours: 2.6,
            submittedAt: vals.dept_qc_time || '10:36 WIB',
            isWithinSLA: vals.dept_qc_status !== 'Tidak (Terlambat >4 Jam)',
            picName: 'PIC QC',
            notes: 'Respons tercatat via form online'
          },
          {
            department: 'Sales & Logistik',
            dataRequired: 'Invoice & Data Distribusi Pelanggan',
            responseTimeHours: 3.4,
            submittedAt: vals.dept_sales_time || '11:24 WIB',
            isWithinSLA: vals.dept_sales_status !== 'Tidak (Terlambat >4 Jam)',
            picName: 'PIC Sales',
            notes: 'Respons tercatat via form online'
          }
        ],
        capaItems: vals.corrective_action_plan ? [
          {
            id: `capa-${Date.now()}`,
            actionItem: vals.corrective_action_plan,
            assignedDept: 'Multi Departemen',
            pic: 'PIC Terkait',
            deadlineDays: 5,
            evidenceCriteria: 'Bukti form & foto implementasi',
            status: 'Open'
          }
        ] : [],
        conclusion: vals.final_conclusion?.includes('Berhasil') ? 'Berhasil (Sistem Responsif)' : 'Perlu Perbaikan'
      };

      setSimulations(prev => [newSim, ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewSimulation={() => setIsNewSimulationOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            simulations={simulations}
            onSelectSimulation={(sim) => setSelectedSimulation(sim)}
            onOpenGoogleFormModal={() => setActiveTab('forms')}
            onNewSimulation={() => setIsNewSimulationOpen(true)}
          />
        )}

        {activeTab === 'forms' && (
          <GoogleFormGenerator
            onFormSubmittedToSimulations={handleFormSubmitted}
          />
        )}

        {activeTab === 'sop' && (
          <SOPReferenceView />
        )}
      </main>

      {/* Detail Modal */}
      <SimulationDetailModal
        simulation={selectedSimulation}
        onClose={() => setSelectedSimulation(null)}
        onStatusChange={handleStatusChange}
      />

      {/* New Simulation Modal */}
      <NewSimulationModal
        isOpen={isNewSimulationOpen}
        onClose={() => setIsNewSimulationOpen(false)}
        onAddSimulation={handleAddSimulation}
      />

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">PT INDO SULTAN JAYA</span>
            <span>•</span>
            <span>SOP-Z06_E Product Recall & Mock Recall</span>
            <span>•</span>
            <span className="text-emerald-600 font-medium">Masa Berlaku s/d 10 AUG 2031</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Sesuai PerBPOM RI No. 11/2017 & CPKB</span>
            <span>•</span>
            <button
              onClick={() => setActiveTab('sop')}
              className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
            >
              Pedoman SOP
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
