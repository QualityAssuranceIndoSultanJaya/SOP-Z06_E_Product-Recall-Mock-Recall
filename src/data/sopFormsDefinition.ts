import { SOPFormTemplate } from '../types/recall';

export const SOP_FORM_TEMPLATES: SOPFormTemplate[] = [
  {
    id: 'fr-z06-04',
    code: 'FR-Z06-04_A',
    title: 'Formulir Laporan Evaluasi Mock Recall',
    sopRef: 'SOP-Z06_E Hal. 23-26 & Bagian 7.3',
    description: 'Simulasi penarikan tahunan untuk menguji kecepatan respon (<4 jam), kelengkapan data traceability dari 4 departemen, dan tindak lanjut CAPA 5 hari.',
    targetRole: 'QA Manager & PIC Departemen (Gudang, QC, Produksi, Sales)',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    sections: [
      {
        title: 'A. Informasi Dasar Mock Recall',
        description: 'Target kinerja pengumpulan traceability selesai < 4 jam sejak aktivasi (Pukul 08.00 WIB s/d 12.00 WIB).',
        questions: [
          {
            id: 'mock_no',
            title: 'Nomor Mock Recall',
            description: 'Format: MOCK-[Tahun]-[Nomor Urut], contoh: MOCK-2026-001',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'mock_date',
            title: 'Tanggal & Jam Pelaksanaan',
            type: 'DATE',
            required: true,
          },
          {
            id: 'mock_leader',
            title: 'Pimpinan Mock Recall (QA Manager)',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'mock_scenario',
            title: 'Skenario yang Disimulasikan',
            description: 'Contoh: Temuan cemaran mikroba patogen pada sampel pertinggal, kesalahan nomor izin edar/etiket.',
            type: 'PARAGRAPH',
            required: true,
          },
          {
            id: 'mock_product',
            title: 'Nama Produk & Nomor Batch Terlibat',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'mock_objectives',
            title: 'Tujuan Mock Recall',
            type: 'CHECKBOX',
            required: true,
            options: [
              '1. Uji kecepatan respon (< 4 jam)',
              '2. Uji kelengkapan data traceability antar departemen',
              '3. Identifikasi kelemahan sistem dan gap prosedur',
              '4. Kepatuhan audit BPOM RI No. 11/2017 & CPKB'
            ]
          }
        ]
      },
      {
        title: 'B. Evaluasi Waktu Respons & Ketertelusuran (Target < 4 Jam)',
        description: 'Pencatatan waktu penerimaan data dari PIC masing-masing departemen.',
        questions: [
          {
            id: 'dept_warehouse_time',
            title: 'Gudang: Waktu Penerimaan Data Stok, Lokasi & Dokumen',
            description: 'Data stok fisik FG, Area Karantina, batch pertinggal',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'dept_warehouse_status',
            title: 'Gudang: Memenuhi SLA < 4 Jam?',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: ['Ya (Lolos <4 Jam)', 'Tidak (Terlambat >4 Jam)']
          },
          {
            id: 'dept_production_time',
            title: 'Produksi: Waktu Penerimaan Batch Record & PO Kemasan',
            description: 'Catatan pengolahan bets (BMR), bahan baku yang dipakai, catatan pengemasan',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'dept_production_status',
            title: 'Produksi: Memenuhi SLA < 4 Jam?',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: ['Ya (Lolos <4 Jam)', 'Tidak (Terlambat >4 Jam)']
          },
          {
            id: 'dept_qc_time',
            title: 'QC: Waktu Penerimaan CoA & Hasil Uji Laboratorium',
            description: 'Hasil pengujian rilis produk, uji stabilitas, dan sampel pertinggal',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'dept_qc_status',
            title: 'QC: Memenuhi SLA < 4 Jam?',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: ['Ya (Lolos <4 Jam)', 'Tidak (Terlambat >4 Jam)']
          },
          {
            id: 'dept_sales_time',
            title: 'Sales & Logistik: Waktu Penerimaan Invoice & Data Distribusi Pelanggan',
            description: 'Daftar distributor/pelanggan yang menerima batch bersangkutan',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'dept_sales_status',
            title: 'Sales & Logistik: Memenuhi SLA < 4 Jam?',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: ['Ya (Lolos <4 Jam)', 'Tidak (Terlambat >4 Jam)']
          }
        ]
      },
      {
        title: 'C. Evaluasi Kelengkapan & Kualitas Data',
        description: 'Penilaian mutu data yang dikumpulkan selama simulasi.',
        questions: [
          {
            id: 'eval_initial_speed',
            title: '1. Kecepatan Respon Awal Tim',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: ['Lengkap (√)', 'Cukup (!)', 'Tidak Lengkap (X)']
          },
          {
            id: 'eval_completeness',
            title: '2. Kelengkapan Dokumen & Data yang Dikirim',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: ['Lengkap (√)', 'Cukup (!)', 'Tidak Lengkap (X)']
          },
          {
            id: 'eval_accuracy',
            title: '3. Akurasi Data Ketertelusuran (Traceability)',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: ['Lengkap (√)', 'Cukup (!)', 'Tidak Lengkap (X)']
          },
          {
            id: 'eval_communication',
            title: '4. Efektivitas Komunikasi WhatsApp Group & Email',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: ['Lengkap (√)', 'Cukup (!)', 'Tidak Lengkap (X)']
          }
        ]
      },
      {
        title: 'D. Tindakan Perbaikan (CAPA) & Rekomendasi Akhir',
        description: 'Tindakan perbaikan wajib diselesaikan maksimal 5 hari kerja (H+1 s/d H+5).',
        questions: [
          {
            id: 'identified_gaps',
            title: 'Daftar Kelemahan & Analisis Akar Masalah yang Ditemukan',
            type: 'PARAGRAPH',
            required: true,
          },
          {
            id: 'corrective_action_plan',
            title: 'Rencana Tindakan Perbaikan (1-3 CAPA Spesifik)',
            description: 'Sebutkan Tindakan, Departemen PIC, Deadline (H+1 s/d H+5), dan Kriteria Bukti Selesai.',
            type: 'PARAGRAPH',
            required: true,
          },
          {
            id: 'final_conclusion',
            title: 'Kesimpulan & Status Mock Recall',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: [
              'Berhasil (Sistem Responsif & Data Lengkap <4 Jam)',
              'Perlu Perbaikan (Ada Gap Minor, CAPA Diperlukan)',
              'Tidak Berhasil (Sistem Lambat >4 Jam / Gap Kritis)'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'fr-z06-01',
    code: 'FR-Z06-01_B',
    title: 'Formulir Laporan Penarikan Produk (Recall Report)',
    sopRef: 'SOP-Z06_E Hal. 15-17 & Bagian 7.2',
    description: 'Dokumen investigasi, disposisi (Reject/Rework), dan pelaporan penarikan aktual sesuai PerBPOM No. 11/2017 & SOP ISJ.',
    targetRole: 'QA Manager, QC Manager, GM Operational & Direktur',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    sections: [
      {
        title: 'A. Informasi Dasar & Klasifikasi Recall',
        questions: [
          {
            id: 'rec_no',
            title: 'Nomor Laporan Recall',
            description: 'Format: REC/[Kode Produk]/[Tahun]/[Nomor Urut]',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'rec_activation_date',
            title: 'Tanggal Aktivasi Recall',
            type: 'DATE',
            required: true,
          },
          {
            id: 'rec_trigger_type',
            title: 'Jenis Pemicu Recall',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: [
              'Atas Instruksi BPOM RI (Trigger Utama)',
              'Atas Instruksi LPPOM MUI (Kesesuaian Halal)',
              'Inisiatif Internal PT Indo Sultan Jaya'
            ]
          },
          {
            id: 'rec_severity_class',
            title: 'Tingkat Keparahan Recall',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: [
              'Kelas I (Bahaya Kesehatan / Bahan Dilarang)',
              'Kelas II (Cacat Mutu / Penyimpangan Spesifikasi)',
              'Kelas III (Ketidaknyamanan / Kesalahan Minor Etiket)'
            ]
          },
          {
            id: 'rec_scope',
            title: 'Ruang Lingkup Penarikan (Mengacu Pasal 5 PerBPOM 11/2017)',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: [
              'Recall Total (Semua batch yang beredar)',
              'Recall Parsial 3 Batch (1 bets sebelum, bets terlibat, 1 bets sesudahnya - Kasus Mikroba)',
              'Recall Parsial 1 Batch (Hanya bets bermasalah - Kasus ALT/AKK atau kedaluwarsa)'
            ]
          }
        ]
      },
      {
        title: 'B. Identifikasi Produk & Kuantitas Beredar',
        questions: [
          {
            id: 'prod_name',
            title: 'Nama Produk Lengkap',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'prod_code_batch',
            title: 'Kode Produk & Nomor Batch Terlibat',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'prod_dates',
            title: 'Tanggal Manufaktur (Mfg) & Tanggal Kedaluwarsa (Exp)',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'prod_circulating_qty',
            title: 'Jumlah yang Beredar di Pasar (Estimasi)',
            description: 'Sebutkan angka dan satuan (Kgs / Pcs / Karton)',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'prod_target_recall_qty',
            title: 'Total Target Kuantitas yang Ditarik',
            type: 'TEXT',
            required: true,
          }
        ]
      },
      {
        title: 'C. Alasan Penarikan & Akar Masalah (CPAR FR-Q04-01)',
        questions: [
          {
            id: 'cpar_problem_desc',
            title: 'Deskripsi Masalah / Alasan Recall',
            type: 'PARAGRAPH',
            required: true,
          },
          {
            id: 'cpar_root_cause_cat',
            title: 'Kategori Akar Masalah',
            type: 'CHECKBOX',
            required: true,
            options: [
              'Bahan Baku',
              'Proses Produksi / Formulasi',
              'Human Error',
              'Kemasan / Label / Etiket',
              'Penyimpanan / Distribusi',
              'Lainnya'
            ]
          },
          {
            id: 'cpar_ref_no',
            title: 'Nomor CPAR Terkait (FR-Q04-01)',
            type: 'TEXT',
            required: true,
          }
        ]
      },
      {
        title: 'D. Progress Penarikan Fisik & Disposisi Akhir',
        questions: [
          {
            id: 'progress_returned_qty',
            title: 'Total Produk Berhasil Dikembalikan ke Pabrik (Kg/Pcs/Karton)',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'progress_rate_percent',
            title: 'Tingkat / Persentase Pengembalian Produk (%)',
            description: 'Perhitungan: (Jumlah Tertangani / Jumlah Beredar) x 100%',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'disposition_decision',
            title: 'Keputusan Disposisi Akhir Produk',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: [
              'REJECT (Musnah di Pabrik - Disaksikan Petugas BPOM)',
              'REJECT (Local Disposal - Khusus Produk Ekspor dengan BA Sah)',
              'REJECT (Dijual Khusus ke Pasar Non-Halal atas Persetujuan Direktur)',
              'REWORK (Diperbaiki sesuai Instruksi Kerja yang disetujui QA/QC)'
            ]
          },
          {
            id: 'disposition_rationale',
            title: 'Alasan dan Analisis Disposisi',
            type: 'PARAGRAPH',
            required: true,
          }
        ]
      }
    ]
  },
  {
    id: 'fr-z06-03',
    code: 'FR-Z06-03_A',
    title: 'Surat Pemberitahuan Penarikan ke Pelanggan / Distributor',
    sopRef: 'SOP-Z06_E Hal. 19-22 (First Notification ≤24 Jam)',
    description: 'Formulir konfirmasi penerimaan instruksi isolasi stok dan pengembalian produk oleh distributor atau pelanggan.',
    targetRole: 'Distributor, Agen, Pelanggan Ekspor/Domestik & Tim Sales',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    sections: [
      {
        title: 'Konfirmasi Penerimaan Pemberitahuan Recall',
        description: 'Target pengiriman First Notification adalah ≤ 24 jam setelah keputusan recall.',
        questions: [
          {
            id: 'cust_company_name',
            title: 'Nama Perusahaan Distributor / Pelanggan',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'cust_contact_person',
            title: 'Nama PIC Kontak & Jabatan',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'cust_phone_email',
            title: 'Nomor Telepon / WhatsApp & Email PIC',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'cust_batch_acknowledged',
            title: 'Nomor Batch yang Diterima dan Dihentikan Peredarannya',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'cust_stock_isolated_qty',
            title: 'Jumlah Stok yang Telah Diisolasi di Gudang Distributor',
            description: 'Sebutkan jumlah dalam Carton/Pcs dan tanggal pemisahan stok',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'cust_action_taken',
            title: 'Tindakan yang Telah Dilakukan',
            type: 'CHECKBOX',
            required: true,
            options: [
              'Penjualan & distribusi langsung dihentikan',
              'Stok telah dipisahkan dan diberi tanda karantina',
              'Telah menghubungi sub-distributor / outlet ritel',
              'Siap melakukan pengembalian fisik atau Local Disposal'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'fr-z06-02',
    code: 'FR-Z06-02_A',
    title: 'Log Registrasi Recall & Mock Recall',
    sopRef: 'SOP-Z06_E Hal. 18',
    description: 'Pencatatan riwayat terpadu untuk monitoring kepatuhan berkala seluruh aktivitas penarikan aktual dan simulasi.',
    targetRole: 'QA Compliance & MR (Management Representative)',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    sections: [
      {
        title: 'Registrasi Entri Log Recall',
        questions: [
          {
            id: 'log_date',
            title: 'Tanggal Aktivitas',
            type: 'DATE',
            required: true,
          },
          {
            id: 'log_activity_type',
            title: 'Jenis Aktivitas',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: ['Recall Aktual', 'Mock Recall (Simulasi Tahunan)']
          },
          {
            id: 'log_ref_no',
            title: 'Nomor Referensi',
            description: 'REC/... untuk Aktual, MOCK-... untuk Mock Recall',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'log_product_batch',
            title: 'Nama Produk & Batch Terlibat',
            type: 'TEXT',
            required: true,
          },
          {
            id: 'log_involved_depts',
            title: 'Departemen Terlibat',
            type: 'CHECKBOX',
            required: true,
            options: ['QA', 'QC', 'Produksi', 'PPIC & Gudang', 'Sales & Logistik', 'Manajemen / Direksi']
          },
          {
            id: 'log_status',
            title: 'Status Saat Ini',
            type: 'MULTIPLE_CHOICE',
            required: true,
            options: ['Planning / Pending', 'On-Going', 'Completed', 'Closed']
          },
          {
            id: 'log_capa_ref',
            title: 'No. CPAR atau Rencana Tindakan Lanjut',
            type: 'TEXT',
            required: false,
          }
        ]
      }
    ]
  }
];

export function generateGoogleAppsScript(template: SOPFormTemplate): string {
  const formTitle = `${template.code} - ${template.title} [PT INDO SULTAN JAYA]`;
  const formDesc = `${template.description}\nStandar Operasional Prosedur: ${template.sopRef}\nSesuai PerBPOM RI No. 11/2017 & Standar CPKB / ISO 9001.`;

  let script = `/**
 * Google Apps Script untuk membuat Google Form otomatis:
 * ${template.code} - ${template.title}
 * Berdasarkan Dokumen SOP PT INDO SULTAN JAYA (SOP-Z06_E)
 * 
 * CARA MENGGUNAKAN:
 * 1. Buka script.google.com di browser Anda.
 * 2. Klik "New Project".
 * 3. Hapus kode bawaan dan tempel kode ini di editor.
 * 4. Klik ikon Run (Jalankan) untuk fungsi "create${template.id.replace(/[^a-zA-Z0-9]/g, '')}Form".
 * 5. Google Form resmi akan otomatis dibuat di Google Drive Anda!
 */

function create${template.id.replace(/[^a-zA-Z0-9]/g, '')}Form() {
  const form = FormApp.create('${formTitle.replace(/'/g, "\\'")}');
  form.setDescription('${formDesc.replace(/\n/g, '\\n').replace(/'/g, "\\'")}');
  form.setAllowResponseEdits(false);
  form.setCollectEmail(true);

`;

  template.sections.forEach((section, sIdx) => {
    script += `  // Section: ${section.title}\n`;
    if (sIdx > 0) {
      script += `  const pageBreak${sIdx} = form.addPageBreakItem();\n`;
      script += `  pageBreak${sIdx}.setTitle('${section.title.replace(/'/g, "\\'")}');\n`;
      if (section.description) {
        script += `  pageBreak${sIdx}.setHelpText('${section.description.replace(/'/g, "\\'")}');\n`;
      }
    } else {
      script += `  form.addSectionHeaderItem().setTitle('${section.title.replace(/'/g, "\\'")}').setHelpText('${(section.description || '').replace(/'/g, "\\'")}');\n`;
    }

    section.questions.forEach((q) => {
      const qTitle = q.title.replace(/'/g, "\\'");
      const qHelp = (q.description || '').replace(/'/g, "\\'");

      if (q.type === 'TEXT') {
        script += `  const item_${q.id} = form.addTextItem();\n`;
        script += `  item_${q.id}.setTitle('${qTitle}');\n`;
        if (qHelp) script += `  item_${q.id}.setHelpText('${qHelp}');\n`;
        script += `  item_${q.id}.setRequired(${q.required});\n`;
      } else if (q.type === 'PARAGRAPH') {
        script += `  const item_${q.id} = form.addParagraphTextItem();\n`;
        script += `  item_${q.id}.setTitle('${qTitle}');\n`;
        if (qHelp) script += `  item_${q.id}.setHelpText('${qHelp}');\n`;
        script += `  item_${q.id}.setRequired(${q.required});\n`;
      } else if (q.type === 'MULTIPLE_CHOICE' && q.options) {
        script += `  const item_${q.id} = form.addMultipleChoiceItem();\n`;
        script += `  item_${q.id}.setTitle('${qTitle}');\n`;
        if (qHelp) script += `  item_${q.id}.setHelpText('${qHelp}');\n`;
        const choices = q.options.map(opt => `item_${q.id}.createChoice('${opt.replace(/'/g, "\\'")}')`).join(', ');
        script += `  item_${q.id}.setChoices([${choices}]);\n`;
        script += `  item_${q.id}.setRequired(${q.required});\n`;
      } else if (q.type === 'CHECKBOX' && q.options) {
        script += `  const item_${q.id} = form.addCheckboxItem();\n`;
        script += `  item_${q.id}.setTitle('${qTitle}');\n`;
        if (qHelp) script += `  item_${q.id}.setHelpText('${qHelp}');\n`;
        const choices = q.options.map(opt => `item_${q.id}.createChoice('${opt.replace(/'/g, "\\'")}')`).join(', ');
        script += `  item_${q.id}.setChoices([${choices}]);\n`;
        script += `  item_${q.id}.setRequired(${q.required});\n`;
      } else if (q.type === 'DATE') {
        script += `  const item_${q.id} = form.addDateItem();\n`;
        script += `  item_${q.id}.setTitle('${qTitle}');\n`;
        if (qHelp) script += `  item_${q.id}.setHelpText('${qHelp}');\n`;
        script += `  item_${q.id}.setRequired(${q.required});\n`;
      }
    });

    script += `\n`;
  });

  script += `  Logger.log('Google Form berhasil dibuat!');
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Public Published URL: ' + form.getPublishedUrl());
  return { editUrl: form.getEditUrl(), publishedUrl: form.getPublishedUrl() };
}
`;

  return script;
}
