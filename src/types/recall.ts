export type RecallType = 'Recall Aktual' | 'Mock Recall';

export type RecallSeverity = 'Kelas I (Bahaya Kesehatan)' | 'Kelas II (Cacat Mutu)' | 'Kelas III (Ketidaknyamanan)';

export type RecallScope = 'Recall Total' | 'Recall Parsial (3 Batch)' | 'Recall Parsial (1 Batch)';

export type SimulationStatus = 'Pending' | 'On-Going' | 'Completed' | 'Closed';

export type DispositionType = 'REJECT (Pemusnahan di Pabrik)' | 'REJECT (Local Disposal)' | 'REJECT (Pasar Non-Halal Khusus)' | 'REWORK (Perbaiki)';

export interface DepartmentResponse {
  department: 'PPIC & Warehouse' | 'Gudang' | 'Produksi' | 'Quality Control' | 'Sales & Logistik';
  dataRequired: string;
  responseTimeHours: number;
  submittedAt: string;
  isWithinSLA: boolean; // < 4 hours
  picName: string;
  notes: string;
}

export interface CorrectiveAction {
  id: string;
  actionItem: string;
  assignedDept: string;
  pic: string;
  deadlineDays: number;
  evidenceCriteria: string;
  status: 'Open' | 'Closed';
  verifiedByQA?: string;
  verifiedAt?: string;
}

export interface RecallSimulation {
  id: string;
  refNumber: string; // e.g. MOCK-2026-001 or REC-ISJ-2026-002
  type: RecallType;
  title: string;
  productName: string;
  productCode: string;
  batchNumber: string;
  triggerReason: string;
  severity: RecallSeverity;
  scope: RecallScope;
  status: SimulationStatus;
  activationDate: string;
  closeDate?: string;
  leadPIC: string; // QA Manager
  targetQuantityKgs: number;
  returnedQuantityKgs: number;
  efficiencyPercent: number;
  totalDurationHours: number; // For mock recall target < 4h
  departmentResponses: DepartmentResponse[];
  capaItems: CorrectiveAction[];
  conclusion?: 'Berhasil (Sistem Responsif)' | 'Perlu Perbaikan' | 'Tidak Berhasil (Sistem Lambat/Gap)';
  googleFormUrl?: string;
  googleFormId?: string;
}

export interface FormQuestion {
  id: string;
  title: string;
  description?: string;
  type: 'TEXT' | 'PARAGRAPH' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'SCALE' | 'DATE' | 'TIME';
  required: boolean;
  options?: string[];
  section?: string;
}

export interface SOPFormTemplate {
  id: string;
  code: string;
  title: string;
  sopRef: string;
  description: string;
  targetRole: string;
  badgeColor: string;
  sections: {
    title: string;
    description?: string;
    questions: FormQuestion[];
  }[];
}
