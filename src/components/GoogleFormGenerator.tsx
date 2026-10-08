import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  ExternalLink,
  Send,
  Eye,
  Code2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Printer,
  FileCheck
} from 'lucide-react';
import { SOP_FORM_TEMPLATES, generateGoogleAppsScript } from '../data/sopFormsDefinition';
import { SOPFormTemplate } from '../types/recall';

interface GoogleFormGeneratorProps {
  onFormSubmittedToSimulations?: (formData: any) => void;
  accessToken?: string | null;
}

export const GoogleFormGenerator: React.FC<GoogleFormGeneratorProps> = ({
  onFormSubmittedToSimulations,
  accessToken,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<SOPFormTemplate>(SOP_FORM_TEMPLATES[0]);
  const [activeTab, setActiveTab] = useState<'preview' | 'script' | 'fill'>('preview');
  const [copied, setCopied] = useState(false);
  const [isCreatingGoogleForm, setIsCreatingGoogleForm] = useState(false);
  const [createdFormUrl, setCreatedFormUrl] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Form fill state
  const [formFillValues, setFormFillValues] = useState<Record<string, any>>({});
  const [fillSuccessMsg, setFillSuccessMsg] = useState<string | null>(null);

  const scriptCode = generateGoogleAppsScript(selectedTemplate);

  const handleCopyScript = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInputChange = (fieldId: string, value: any) => {
    setFormFillValues(prev => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleCheckboxToggle = (fieldId: string, opt: string) => {
    const current = (formFillValues[fieldId] as string[]) || [];
    const updated = current.includes(opt)
      ? current.filter(item => item !== opt)
      : [...current, opt];
    setFormFillValues(prev => ({
      ...prev,
      [fieldId]: updated,
    }));
  };

  const handleCreateLiveGoogleForm = async () => {
    if (!accessToken) {
      setFormError('Silakan hubungkan akun Google Anda terlebih dahulu untuk membuat form langsung via Google Forms API, atau gunakan kode Google Apps Script di tab "Apps Script Code" untuk membuat form gratis dalam 1 klik!');
      return;
    }

    setIsCreatingGoogleForm(true);
    setFormError(null);
    try {
      // 1. Create Form via Google Forms REST API
      const createRes = await fetch('https://forms.googleapis.com/v1/forms', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          info: {
            title: `${selectedTemplate.code} - ${selectedTemplate.title} [PT INDO SULTAN JAYA]`,
            documentTitle: `${selectedTemplate.code} ${selectedTemplate.title}`,
          },
        }),
      });

      if (!createRes.ok) {
        const errJson = await createRes.json();
        throw new Error(errJson.error?.message || 'Gagal membuat Google Form');
      }

      const createdFormData = await createRes.json();
      const formId = createdFormData.formId;

      // 2. Batch update to add description and questions
      const requests: any[] = [
        {
          updateFormInfo: {
            info: {
              description: `${selectedTemplate.description}\nSOP: ${selectedTemplate.sopRef}\nSesuai Regulasi BPOM 11/2017 & CPKB PT Indo Sultan Jaya.`,
            },
            updateMask: 'description',
          },
        },
      ];

      let itemIndex = 0;
      selectedTemplate.sections.forEach(section => {
        section.questions.forEach(q => {
          let itemObj: any = {
            title: q.title,
            description: q.description || '',
          };

          if (q.type === 'TEXT') {
            itemObj.questionItem = {
              question: {
                required: q.required,
                textQuestion: { paragraph: false },
              },
            };
          } else if (q.type === 'PARAGRAPH') {
            itemObj.questionItem = {
              question: {
                required: q.required,
                textQuestion: { paragraph: true },
              },
            };
          } else if (q.type === 'MULTIPLE_CHOICE' && q.options) {
            itemObj.questionItem = {
              question: {
                required: q.required,
                choiceQuestion: {
                  type: 'RADIO',
                  options: q.options.map(opt => ({ value: opt })),
                },
              },
            };
          } else if (q.type === 'CHECKBOX' && q.options) {
            itemObj.questionItem = {
              question: {
                required: q.required,
                choiceQuestion: {
                  type: 'CHECKBOX',
                  options: q.options.map(opt => ({ value: opt })),
                },
              },
            };
          } else if (q.type === 'DATE') {
            itemObj.questionItem = {
              question: {
                required: q.required,
                dateQuestion: { includeTime: false, includeYear: true },
              },
            };
          }

          if (itemObj.questionItem) {
            requests.push({
              createItem: {
                item: itemObj,
                location: { index: itemIndex++ },
              },
            });
          }
        });
      });

      if (requests.length > 1) {
        await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ requests }),
        });
      }

      const formUrl = `https://docs.google.com/forms/d/${formId}/edit`;
      setCreatedFormUrl(formUrl);
    } catch (err: any) {
      console.error('Error creating Google Form:', err);
      setFormError(err.message || 'Terjadi kesalahan saat memanggil Google Forms API.');
    } finally {
      setIsCreatingGoogleForm(false);
    }
  };

  const handleSimulateFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFillSuccessMsg('Formulir berhasil disubmit dan tersimpan dalam sistem simulasi SOP PT Indo Sultan Jaya!');
    if (onFormSubmittedToSimulations) {
      onFormSubmittedToSimulations({
        templateId: selectedTemplate.id,
        templateCode: selectedTemplate.code,
        values: formFillValues,
        submittedAt: new Date().toISOString(),
      });
    }
    setTimeout(() => setFillSuccessMsg(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header Selection */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Generator Google Form Berdasarkan SOP PT Indo Sultan Jaya
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Pilih Formulir Standar SOP Penarikan Produk (SOP-Z06_E)
            </h2>
            <p className="text-xs text-slate-500">
              Dokumen resmi PT Indo Sultan Jaya untuk diexport menjadi Google Form otomatis atau diisi langsung oleh tim.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview Tampilan Form
            </button>
            <button
              onClick={() => setActiveTab('fill')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'fill'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              Isi & Uji Form Online
            </button>
            <button
              onClick={() => setActiveTab('script')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'script'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Apps Script Generator
            </button>
          </div>
        </div>

        {/* 4 Form Template Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SOP_FORM_TEMPLATES.map((tmpl) => {
            const isSelected = selectedTemplate.id === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => {
                  setSelectedTemplate(tmpl);
                  setCreatedFormUrl(null);
                  setFormError(null);
                }}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-sm ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${tmpl.badgeColor}`}>
                    {tmpl.code}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  )}
                </div>
                <h3 className="font-semibold text-slate-900 text-xs line-clamp-1 mb-1">
                  {tmpl.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 mb-2 leading-relaxed">
                  {tmpl.description}
                </p>
                <div className="text-[10px] text-slate-400 font-medium">
                  {tmpl.sopRef}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Bar for Google Form Deployment */}
      <div className="bg-gradient-to-r from-indigo-50 via-slate-50 to-indigo-50 rounded-2xl p-4 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">
              {selectedTemplate.code}: {selectedTemplate.title}
            </div>
            <div className="text-xs text-slate-500">
              Role: <span className="font-medium text-slate-700">{selectedTemplate.targetRole}</span> • {selectedTemplate.sections.reduce((acc, s) => acc + s.questions.length, 0)} Pertanyaan
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {accessToken && (
            <button
              onClick={handleCreateLiveGoogleForm}
              disabled={isCreatingGoogleForm}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isCreatingGoogleForm ? 'Membuat di Google Drive...' : 'Buat Form di Google Drive'}
            </button>
          )}

          <button
            onClick={handleCopyScript}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition active:scale-95 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Kode Tersalin!' : 'Salin Apps Script Otomatis'}
          </button>
        </div>
      </div>

      {createdFormUrl && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Google Form berhasil dibuat di Google Drive Anda!</span>
          </div>
          <a
            href={createdFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-900 underline"
          >
            Buka Google Form <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {formError && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>{formError}</div>
        </div>
      )}

      {/* Main Content Area based on Tab */}
      {activeTab === 'preview' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Mock Google Forms Header Style */}
          <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-6 text-white">
            <div className="max-w-3xl mx-auto space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider font-semibold bg-white/20 px-2.5 py-0.5 rounded">
                  PT INDO SULTAN JAYA • QA/QC DEPT
                </span>
                <span className="text-xs text-indigo-200 font-mono">
                  {selectedTemplate.code}
                </span>
              </div>
              <h1 className="text-2xl font-bold">
                {selectedTemplate.title}
              </h1>
              <p className="text-xs text-indigo-100 leading-relaxed">
                {selectedTemplate.description}
              </p>
              <div className="text-[11px] text-indigo-200 pt-1 border-t border-indigo-700/50">
                Dasar Acuan: {selectedTemplate.sopRef}
              </div>
            </div>
          </div>

          {/* Form Sections Preview */}
          <div className="p-6 max-w-3xl mx-auto space-y-6">
            {selectedTemplate.sections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-4">
                <div className="p-4 bg-slate-50 border-l-4 border-indigo-600 rounded-r-xl">
                  <h3 className="font-bold text-slate-900 text-sm">{sec.title}</h3>
                  {sec.description && (
                    <p className="text-xs text-slate-500 mt-1">{sec.description}</p>
                  )}
                </div>

                <div className="space-y-3">
                  {sec.questions.map((q) => (
                    <div
                      key={q.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <label className="text-xs font-semibold text-slate-800">
                          {q.title} {q.required && <span className="text-rose-500">*</span>}
                        </label>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                          {q.type}
                        </span>
                      </div>

                      {q.description && (
                        <p className="text-[11px] text-slate-400 mb-2">{q.description}</p>
                      )}

                      {/* Mocked Input View */}
                      {q.type === 'TEXT' && (
                        <div className="w-full sm:w-80 border-b border-slate-300 py-1 text-xs text-slate-400 italic">
                          Teks jawaban singkat...
                        </div>
                      )}

                      {q.type === 'PARAGRAPH' && (
                        <div className="w-full border-b border-slate-300 py-2 text-xs text-slate-400 italic">
                          Teks jawaban panjang...
                        </div>
                      )}

                      {q.type === 'DATE' && (
                        <div className="w-48 border-b border-slate-300 py-1 text-xs text-slate-400">
                          HH / BB / TTTT
                        </div>
                      )}

                      {q.type === 'MULTIPLE_CHOICE' && q.options && (
                        <div className="space-y-2 mt-2">
                          {q.options.map((opt, oIdx) => (
                            <div key={oIdx} className="flex items-center gap-2 text-xs text-slate-700">
                              <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center"></div>
                              <span>{opt}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {q.type === 'CHECKBOX' && q.options && (
                        <div className="space-y-2 mt-2">
                          {q.options.map((opt, oIdx) => (
                            <div key={oIdx} className="flex items-center gap-2 text-xs text-slate-700">
                              <div className="w-4 h-4 rounded-sm border border-slate-400 flex items-center justify-center"></div>
                              <span>{opt}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Fill Online */}
      {activeTab === 'fill' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 max-w-3xl mx-auto">
          <div className="mb-6 pb-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">
              Formulir Interaktif: {selectedTemplate.code}
            </h2>
            <p className="text-xs text-slate-500">
              Isi data simulasi atau laporan recall untuk diverifikasi langsung dalam sistem PT Indo Sultan Jaya.
            </p>
          </div>

          {fillSuccessMsg && (
            <div className="mb-5 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{fillSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleSimulateFormSubmit} className="space-y-6">
            {selectedTemplate.sections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-4">
                <div className="bg-slate-50 p-3 rounded-lg border-l-4 border-indigo-600">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    {sec.title}
                  </h3>
                  {sec.description && (
                    <p className="text-[11px] text-slate-500 mt-0.5">{sec.description}</p>
                  )}
                </div>

                <div className="space-y-4">
                  {sec.questions.map((q) => (
                    <div key={q.id} className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-800 block">
                        {q.title} {q.required && <span className="text-rose-500">*</span>}
                      </label>
                      {q.description && (
                        <p className="text-[11px] text-slate-500">{q.description}</p>
                      )}

                      {q.type === 'TEXT' && (
                        <input
                          type="text"
                          required={q.required}
                          value={formFillValues[q.id] || ''}
                          onChange={(e) => handleInputChange(q.id, e.target.value)}
                          placeholder="Ketik jawaban Anda..."
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      )}

                      {q.type === 'PARAGRAPH' && (
                        <textarea
                          rows={3}
                          required={q.required}
                          value={formFillValues[q.id] || ''}
                          onChange={(e) => handleInputChange(q.id, e.target.value)}
                          placeholder="Ketik rincian lengkap..."
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      )}

                      {q.type === 'DATE' && (
                        <input
                          type="date"
                          required={q.required}
                          value={formFillValues[q.id] || ''}
                          onChange={(e) => handleInputChange(q.id, e.target.value)}
                          className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      )}

                      {q.type === 'MULTIPLE_CHOICE' && q.options && (
                        <div className="space-y-1.5">
                          {q.options.map((opt, oIdx) => (
                            <label key={oIdx} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                              <input
                                type="radio"
                                name={q.id}
                                required={q.required}
                                checked={formFillValues[q.id] === opt}
                                onChange={() => handleInputChange(q.id, opt)}
                                className="text-indigo-600 focus:ring-indigo-500"
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {q.type === 'CHECKBOX' && q.options && (
                        <div className="space-y-1.5">
                          {q.options.map((opt, oIdx) => (
                            <label key={oIdx} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={((formFillValues[q.id] as string[]) || []).includes(opt)}
                                onChange={() => handleCheckboxToggle(q.id, opt)}
                                className="rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm flex items-center gap-2 transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Laporan ke Sistem
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab: Apps Script Code */}
      {activeTab === 'script' && (
        <div className="bg-slate-900 rounded-2xl p-6 text-slate-100 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                Google Apps Script Code untuk: {selectedTemplate.code}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Salin dan tempel di <a href="https://script.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">script.google.com</a> untuk membuat Google Form otomatis dalam 3 detik.
              </p>
            </div>

            <button
              onClick={handleCopyScript}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition cursor-pointer self-start sm:self-auto"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Tersalin ke Clipboard' : 'Salin Kode Script'}
            </button>
          </div>

          <div className="text-xs text-slate-400 mb-4 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <strong>Petunjuk Cepat:</strong>
            <ol className="list-decimal list-inside space-y-1 mt-1 text-slate-300">
              <li>Klik tombol <strong>Salin Kode Script</strong> di atas.</li>
              <li>Buka <a href="https://script.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline font-semibold">script.google.com</a> lalu klik <strong>New project</strong>.</li>
              <li>Hapus teks bawaan dan tempel kode ini, lalu klik tombol <strong>Run (Jalankan)</strong>.</li>
              <li>Google Form resmi akan otomatis selesai dan link edit/publik akan muncul di Execution log!</li>
            </ol>
          </div>

          <pre className="font-mono text-xs bg-black/40 p-4 rounded-xl overflow-x-auto max-h-96 text-emerald-400 border border-slate-800">
            <code>{scriptCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
