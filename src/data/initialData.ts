import { RecallSimulation } from '../types/recall';

export const INITIAL_SIMULATIONS: RecallSimulation[] = [
  {
    id: 'sim-01',
    refNumber: 'MOCK-2026-001',
    type: 'Mock Recall',
    title: 'Simulasi Penarikan Tahunan Q1: Skenario Cemaran Mikroba',
    productName: 'Sultan Glow Day Cream 50g',
    productCode: 'SGD-050',
    batchNumber: 'B26A04',
    triggerReason: 'Simulasi audit internal: Potensi cemaran mikroba patogen pada produk jadi.',
    severity: 'Kelas I (Bahaya Kesehatan)',
    scope: 'Recall Parsial (3 Batch)',
    status: 'Completed',
    activationDate: '2026-02-15 08:00',
    closeDate: '2026-02-15 11:45',
    leadPIC: 'ZFAN (QA Manager)',
    targetQuantityKgs: 1250,
    returnedQuantityKgs: 1220,
    efficiencyPercent: 97.6,
    totalDurationHours: 3.75, // Target < 4 jam: Lolos
    departmentResponses: [
      {
        department: 'PPIC & Warehouse',
        dataRequired: 'Stok fisik gudang FG & lokasi karantina',
        responseTimeHours: 1.2,
        submittedAt: '09:12 WIB',
        isWithinSLA: true,
        picName: 'Hadi (Asisten Gudang)',
        notes: 'Semua stok terisolasi di Area Karantina bertanda garis kuning.'
      },
      {
        department: 'Produksi',
        dataRequired: 'BMR (Batch Record), PO Kemasan, Log Mesin',
        responseTimeHours: 2.1,
        submittedAt: '10:06 WIB',
        isWithinSLA: true,
        picName: 'Rudi (Spv Produksi)',
        notes: 'Catatan pengolahan bets dan penimbangan bahan baku lengkap.'
      },
      {
        department: 'Quality Control',
        dataRequired: 'CoA, Hasil Uji Rilis & Sampel Pertinggal',
        responseTimeHours: 2.8,
        submittedAt: '10:48 WIB',
        isWithinSLA: true,
        picName: 'Sarah (QC Analyst)',
        notes: 'Sertifikat analisis batch B26A04 & 2 batch terkait terverifikasi.'
      },
      {
        department: 'Sales & Logistik',
        dataRequired: 'Daftar invoice & kontak 14 distributor',
        responseTimeHours: 3.6,
        submittedAt: '11:36 WIB',
        isWithinSLA: true,
        picName: 'Andi (Sales Coordinator)',
        notes: 'Kontak seluruh distributor terkonfirmasi via email dan telepon.'
      }
    ],
    capaItems: [
      {
        id: 'capa-01',
        actionItem: 'Penyegaran SOP pelabelan merah DITAHAN - RECALL di area FG',
        assignedDept: 'Gudang',
        pic: 'Hadi',
        deadlineDays: 3,
        evidenceCriteria: 'Foto sosialisasi & form serah terima checklist',
        status: 'Closed',
        verifiedByQA: 'ZFAN (QA Mgr)',
        verifiedAt: '2026-02-18'
      }
    ],
    conclusion: 'Berhasil (Sistem Responsif)'
  },
  {
    id: 'sim-02',
    refNumber: 'MOCK-2026-002',
    type: 'Mock Recall',
    title: 'Simulasi Dadakan (Unannounced): Salah Tempel Label Nomor BPOM',
    productName: 'Royal Sultan Facial Cleanser 100ml',
    productCode: 'RSF-100',
    batchNumber: 'B26C11',
    triggerReason: 'Ketidaksesuaian penandaan etiket kemasan primer (klaim etiket).',
    severity: 'Kelas II (Cacat Mutu)',
    scope: 'Recall Parsial (1 Batch)',
    status: 'Completed',
    activationDate: '2026-05-10 08:00',
    closeDate: '2026-05-10 12:30',
    leadPIC: 'ZFAN (QA Manager)',
    targetQuantityKgs: 800,
    returnedQuantityKgs: 760,
    efficiencyPercent: 95.0,
    totalDurationHours: 4.5, // Target < 4 jam: Over SLA slightly
    departmentResponses: [
      {
        department: 'PPIC & Warehouse',
        dataRequired: 'Stok fisik gudang FG & buffer stock',
        responseTimeHours: 1.5,
        submittedAt: '09:30 WIB',
        isWithinSLA: true,
        picName: 'Hadi (Asisten Gudang)',
        notes: 'Stok teridentifikasi 120 karton di rak B-04.'
      },
      {
        department: 'Produksi',
        dataRequired: 'Log pengemasan sekunder & nomor PO kemasan',
        responseTimeHours: 3.1,
        submittedAt: '11:06 WIB',
        isWithinSLA: true,
        picName: 'Rudi (Spv Produksi)',
        notes: 'Ditemukan roll label bercampur di line kemas.'
      },
      {
        department: 'Quality Control',
        dataRequired: 'CoA & checklist inspeksi kemasan awal',
        responseTimeHours: 2.4,
        submittedAt: '10:24 WIB',
        isWithinSLA: true,
        picName: 'Sarah (QC Analyst)',
        notes: 'Data inspeksi release lengkap.'
      },
      {
        department: 'Sales & Logistik',
        dataRequired: 'Daftar pengiriman 28 gerai ritel modern',
        responseTimeHours: 4.5,
        submittedAt: '12:30 WIB',
        isWithinSLA: false, // Terlambat
        picName: 'Andi (Sales Coordinator)',
        notes: 'Terkendala sinkronisasi data ERP cabang luar kota.'
      }
    ],
    capaItems: [
      {
        id: 'capa-02',
        actionItem: 'Integrasi laporan logistik antar-cabang realtime pada sistem ERP',
        assignedDept: 'Sales & Logistik',
        pic: 'Andi',
        deadlineDays: 5,
        evidenceCriteria: 'User acceptance test modul live report ERP',
        status: 'Closed',
        verifiedByQA: 'ZFAN (QA Mgr)',
        verifiedAt: '2026-05-15'
      },
      {
        id: 'capa-03',
        actionItem: 'Form checklist verifikasi label 1 halaman sebelum feeding mesin',
        assignedDept: 'Produksi',
        pic: 'Rudi',
        deadlineDays: 2,
        evidenceCriteria: 'Form checklist terbit & implementasi di line 2',
        status: 'Closed',
        verifiedByQA: 'ZFAN (QA Mgr)',
        verifiedAt: '2026-05-12'
      }
    ],
    conclusion: 'Perlu Perbaikan'
  },
  {
    id: 'sim-03',
    refNumber: 'MOCK-2026-003',
    type: 'Mock Recall',
    title: 'Simulasi Ekspor Q3: Produk Terkirim ke Gudang Pelanggan Malaysia',
    productName: 'Sultan Body Lotion Jasmine 250ml',
    productCode: 'SBL-250',
    batchNumber: 'B26E09',
    triggerReason: 'Simulasi pengujian SOP ekspor Lampiran 3 (Opsi Local Disposal vs Return).',
    severity: 'Kelas II (Cacat Mutu)',
    scope: 'Recall Parsial (1 Batch)',
    status: 'On-Going',
    activationDate: '2026-08-20 08:00',
    leadPIC: 'ZFAN (QA Manager)',
    targetQuantityKgs: 2100,
    returnedQuantityKgs: 1450,
    efficiencyPercent: 69.0,
    totalDurationHours: 2.5,
    departmentResponses: [
      {
        department: 'PPIC & Warehouse',
        dataRequired: 'Surat jalan kontainer ekspor & manifest kargo',
        responseTimeHours: 1.0,
        submittedAt: '09:00 WIB',
        isWithinSLA: true,
        picName: 'Hadi (Asisten Gudang)',
        notes: 'Nomor BL (Bill of Lading) dan forwarder kargo teridentifikasi.'
      },
      {
        department: 'Quality Control',
        dataRequired: 'CoA Ekspor & retain sample re-testing',
        responseTimeHours: 2.2,
        submittedAt: '10:12 WIB',
        isWithinSLA: true,
        picName: 'Sarah (QC Analyst)',
        notes: 'Hasil pengujian ulang sampel selesai.'
      },
      {
        department: 'Produksi',
        dataRequired: 'Rekam bets bahan aktif & sertifikat halal bahan',
        responseTimeHours: 2.5,
        submittedAt: '10:30 WIB',
        isWithinSLA: true,
        picName: 'Rudi (Spv Produksi)',
        notes: 'Rekam bets lengkap.'
      },
      {
        department: 'Sales & Logistik',
        dataRequired: 'First notification ke importir Malaysia & draft Berita Acara',
        responseTimeHours: 0,
        submittedAt: 'Menunggu konfirmasi distributor...',
        isWithinSLA: true,
        picName: 'Andi (Sales Ekspor)',
        notes: 'Sedang menunggu bukti foto karantina dari gudang importir Selangor.'
      }
    ],
    capaItems: [
      {
        id: 'capa-04',
        actionItem: 'Penyusunan MoU klausul Local Disposal dengan forwarder mitra ekspor',
        assignedDept: 'Sales & Legal',
        pic: 'Andi',
        deadlineDays: 5,
        evidenceCriteria: 'Template addendum kontrak forwarder luar negeri',
        status: 'Open'
      }
    ],
    conclusion: 'Perlu Perbaikan'
  },
  {
    id: 'sim-04',
    refNumber: 'MOCK-2026-004',
    type: 'Mock Recall',
    title: 'Simulasi Rantai Dingin & Stabilitas Produk Serum C-Booster',
    productName: 'Sultan Intense Vitamin C Serum 20ml',
    productCode: 'SCS-020',
    batchNumber: 'B26G18',
    triggerReason: 'Skenario penurunan kadar vitamin C di bawah spesifikasi rilis (Cacat Mutu).',
    severity: 'Kelas II (Cacat Mutu)',
    scope: 'Recall Parsial (1 Batch)',
    status: 'Pending',
    activationDate: '2026-10-15 08:00',
    leadPIC: 'ZFAN (QA Manager)',
    targetQuantityKgs: 450,
    returnedQuantityKgs: 0,
    efficiencyPercent: 0,
    totalDurationHours: 0,
    departmentResponses: [],
    capaItems: [],
    conclusion: undefined
  },
  {
    id: 'sim-05',
    refNumber: 'REC-ISJ-2026-001',
    type: 'Recall Aktual',
    title: 'Penarikan Produk Nyata: Instruksi BPOM Temuan Cemaran Mikroba',
    productName: 'Royal Whitening Body Scrub 200g',
    productCode: 'RWB-200',
    batchNumber: 'B26B02',
    triggerReason: 'Surat Instruksi Penarikan BPOM RI No. PW.01/123/2026 (SOP Bab 7.1).',
    severity: 'Kelas I (Bahaya Kesehatan)',
    scope: 'Recall Parsial (3 Batch)',
    status: 'Closed',
    activationDate: '2026-03-01 09:00',
    closeDate: '2026-03-22 16:00',
    leadPIC: 'ZFAN (QA Manager)',
    targetQuantityKgs: 3400,
    returnedQuantityKgs: 3365,
    efficiencyPercent: 99.0,
    totalDurationHours: 3.2,
    departmentResponses: [
      {
        department: 'PPIC & Warehouse',
        dataRequired: 'Karantina stok gudang dan pencatatan nomor batch',
        responseTimeHours: 0.8,
        submittedAt: '09:48 WIB',
        isWithinSLA: true,
        picName: 'Hadi (Asisten Gudang)',
        notes: 'Stok langsung diblokir di sistem ERP (<15 menit).'
      },
      {
        department: 'Quality Control',
        dataRequired: 'Analisis produk kembalian & formulir disposisi',
        responseTimeHours: 1.5,
        submittedAt: '10:30 WIB',
        isWithinSLA: true,
        picName: 'Sarah (QC Analyst)',
        notes: 'Disposisi REJECT (Pemusnahan) disaksikan petugas BPOM.'
      },
      {
        department: 'Produksi',
        dataRequired: 'Penghentian mesin & karantina sisa bulk',
        responseTimeHours: 1.0,
        submittedAt: '10:00 WIB',
        isWithinSLA: true,
        picName: 'Rudi (Spv Produksi)',
        notes: 'Seluruh proses batch turunan dihentikan seketika.'
      },
      {
        department: 'Sales & Logistik',
        dataRequired: 'First notification <24 jam ke distributor nasional',
        responseTimeHours: 3.2,
        submittedAt: '12:12 WIB',
        isWithinSLA: true,
        picName: 'Andi (Sales)',
        notes: 'Surat resmi FR-Z06-03 terkirim ke 100% distributor dalam 6 jam.'
      }
    ],
    capaItems: [
      {
        id: 'capa-05',
        actionItem: 'Validasi ulang sistem filtrasi air RO dan sterilisasi tangki mixing 04',
        assignedDept: 'Teknik & Produksi',
        pic: 'Rudi',
        deadlineDays: 5,
        evidenceCriteria: 'Hasil uji mikrobiologi air RO 7 hari berturut-turut',
        status: 'Closed',
        verifiedByQA: 'ZFAN (QA Mgr)',
        verifiedAt: '2026-03-08'
      }
    ],
    conclusion: 'Berhasil (Sistem Responsif)'
  },
  {
    id: 'sim-06',
    refNumber: 'MOCK-2026-005',
    type: 'Mock Recall',
    title: 'Simulasi Sertifikasi Halal: Uji Ketertelusuran Bahan Kritis SJPH',
    productName: 'Sultan Lip Velvet Mauve 5ml',
    productCode: 'SLV-005',
    batchNumber: 'B26H01',
    triggerReason: 'Simulasi audit LPPOM MUI: Ketertelusuran sertifikat halal pigmen warna.',
    severity: 'Kelas III (Ketidaknyamanan)',
    scope: 'Recall Parsial (1 Batch)',
    status: 'Pending',
    activationDate: '2026-11-20 08:00',
    leadPIC: 'ZFAN (QA Manager)',
    targetQuantityKgs: 180,
    returnedQuantityKgs: 0,
    efficiencyPercent: 0,
    totalDurationHours: 0,
    departmentResponses: [],
    capaItems: [],
    conclusion: undefined
  }
];
