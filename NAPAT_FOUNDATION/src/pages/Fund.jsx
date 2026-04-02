import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}>
    {children}
  </motion.div>
);

const fundTypes = [
  { value: 'community_service', label: 'Community Service' },
  { value: 'research_development', label: 'Research & Development' },
  { value: 'artistic_therapy', label: 'Artistic Therapy' },
  { value: 'education_technology', label: 'Education Technology' },
];

const faqs = [
  { q: 'Who can apply?', a: "Artists, researchers, educators and community groups whose work aligns with NAPAT's interdisciplinary mission. Open globally." },
  { q: 'How does the process work?', a: 'Submit this short form. Our team will email you to request a full proposal if your project is a strong fit.' },
  { q: 'How long does review take?', a: 'Expect a response within 4–6 weeks on a rolling basis.' },
];

const donateAmounts = [25, 50, 100, 250];

export default function Fund() {
  const [tab, setTab] = useState('fund'); // 'fund' | 'donate'

  // Fund form
  const [fundForm, setFundForm] = useState({
    applicant_name: '', email: '', organization: '',
    project_title: '', fund_type: '', alignment_statement: '', agreed_to_terms: false,
  });
  const [fundDone, setFundDone] = useState(false);
  const [fundLoading, setFundLoading] = useState(false);

  // Donate form
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donateDone, setDonateDone] = useState(false);
  const [donateLoading, setDonateLoading] = useState(false);

  const [openFaq, setOpenFaq] = useState(null);

  const setF = (k, v) => setFundForm(f => ({ ...f, [k]: v }));

  const handleFundSubmit = async (e) => {
    e.preventDefault();
    if (!fundForm.agreed_to_terms) return;
    setFundLoading(true);
    await base44.entities.FundApplication.create({ ...fundForm, status: 'pending' });
    setFundDone(true);
    setFundLoading(false);
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!amount) return;
    setDonateLoading(true);
    setDonateDone(true);
    setDonateLoading(false);
  };

  return (
    <div className="bg-white pt-16">
      {/* Hero */}
      <section className="border-b border-stone-100 px-6 md:px-10 py-24 max-w-7xl mx-auto">
        <FadeUp>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4">Support</p>
          <h1 className="text-5xl md:text-7xl font-semibold text-stone-900 tracking-tight leading-[0.94] mb-6 max-w-3xl">
            Fund &<br /><em style={{ fontStyle: 'italic', fontWeight: 300, color: '#a8a29e' }}>Donate</em>
          </h1>
          <p className="text-lg text-stone-500 max-w-xl leading-relaxed">
            Apply for a community grant or make a direct contribution to support NAPAT's programs.
          </p>
        </FadeUp>
      </section>

      {/* Tab switcher */}
      <section className="border-b border-stone-100 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex">
          {[['fund', 'Apply for a Grant'], ['donate', 'Make a Donation']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`text-[13px] font-medium px-8 py-4 border-b-2 transition-colors ${
                tab === key ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Fund form */}
      {tab === 'fund' && (
        <section className="px-6 md:px-10 py-20 bg-stone-50">
          <div className="max-w-2xl mx-auto">
            {fundDone ? (
              <FadeUp>
                <div className="text-center py-20">
                  <h2 className="text-3xl font-semibold text-stone-900 mb-3">Application Sent</h2>
                  <p className="text-stone-500 leading-relaxed max-w-sm mx-auto">
                    We've received your inquiry and sent confirmation. Expect a reply within 4–6 weeks.
                  </p>
                </div>
              </FadeUp>
            ) : (
              <FadeUp>
                <p className="text-sm text-stone-500 mb-8">
                  Submit your initial inquiry below. If your project is a strong fit, we will contact you to request a full proposal.
                </p>
                <form onSubmit={handleFundSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Full Name *</label>
                      <input required value={fundForm.applicant_name} onChange={e => setF('applicant_name', e.target.value)}
                        className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Email *</label>
                      <input required type="email" value={fundForm.email} onChange={e => setF('email', e.target.value)}
                        className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Organization</label>
                      <input value={fundForm.organization} onChange={e => setF('organization', e.target.value)} placeholder="Optional"
                        className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Category *</label>
                      <select required value={fundForm.fund_type} onChange={e => setF('fund_type', e.target.value)}
                        className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white appearance-none">
                        <option value="">Select</option>
                        {fundTypes.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Project Title *</label>
                    <input required value={fundForm.project_title} onChange={e => setF('project_title', e.target.value)}
                      className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">NAPAT Mission Alignment *</label>
                    <textarea required rows={4} value={fundForm.alignment_statement} onChange={e => setF('alignment_statement', e.target.value)}
                      placeholder="How does your project align with NAPAT's interdisciplinary mission?"
                      className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white resize-none" />
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="terms" required checked={fundForm.agreed_to_terms}
                      onChange={e => setF('agreed_to_terms', e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-stone-900 flex-shrink-0" />
                    <label htmlFor="terms" className="text-sm text-stone-500 leading-relaxed">
                      I agree to the{' '}
                      <Link to={createPageUrl('Terms')} target="_blank" className="underline text-stone-900">Terms & Conditions</Link>
                      {' '}and confirm all information is accurate.
                    </label>
                  </div>
                  <button type="submit" disabled={fundLoading || !fundForm.agreed_to_terms}
                    className="w-full bg-stone-900 text-white py-4 text-sm font-semibold hover:bg-stone-700 transition-colors disabled:opacity-40">
                    {fundLoading ? 'Sending...' : 'Submit Inquiry →'}
                  </button>
                </form>
              </FadeUp>
            )}
          </div>
        </section>
      )}

      {/* Donate form */}
      {tab === 'donate' && (
        <section className="px-6 md:px-10 py-20 bg-stone-50">
          <div className="max-w-2xl mx-auto">
            {donateDone ? (
              <FadeUp>
                <div className="text-center py-20">
                  <h2 className="text-3xl font-semibold text-stone-900 mb-3">Thank You</h2>
                  <p className="text-stone-500 leading-relaxed max-w-sm mx-auto">
                    We've received your donation intent. Our team will reach out with payment details shortly.
                  </p>
                </div>
              </FadeUp>
            ) : (
              <FadeUp>
                <p className="text-sm text-stone-500 mb-8 leading-relaxed">
                  Every contribution supports NAPAT's research, community programs, and interdisciplinary initiatives.
                </p>
                <form onSubmit={handleDonate} className="space-y-6">
                  {/* Amount */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-3">Choose an amount (USD)</label>
                    <div className="grid grid-cols-4 gap-2">
                      {donateAmounts.map(p => (
                        <button key={p} type="button"
                          onClick={() => { setAmount(String(p)); setCustomAmount(false); }}
                          className={`py-4 text-base font-semibold border transition-all ${
                            !customAmount && amount === String(p)
                              ? 'bg-stone-900 text-white border-stone-900'
                              : 'bg-white text-stone-700 border-stone-200 hover:border-stone-900'
                          }`}>
                          ${p}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3">
                      <input
                        type="number" min="1"
                        value={customAmount ? amount : ''}
                        onChange={e => { setAmount(e.target.value); setCustomAmount(true); }}
                        onFocus={() => setCustomAmount(true)}
                        placeholder="Or enter custom amount"
                        className={`w-full border px-4 py-3 text-sm outline-none bg-white transition-colors ${
                          customAmount ? 'border-stone-900' : 'border-stone-200 focus:border-stone-900'
                        }`} />
                    </div>
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Email <span className="text-stone-300 normal-case tracking-normal font-normal">(for confirmation)</span></label>
                    <input type="email" value={donorEmail} onChange={e => setDonorEmail(e.target.value)} placeholder="your@email.com"
                      className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white" />
                  </div>
                  <button type="submit" disabled={donateLoading || !amount}
                    className="w-full bg-stone-900 text-white py-4 text-sm font-semibold hover:bg-stone-700 transition-colors disabled:opacity-40">
                    {donateLoading ? 'Processing...' : amount ? `Donate $${amount} →` : 'Select an amount to continue'}
                  </button>
                  <p className="text-xs text-stone-400 text-center">
                    Our team will reach out with secure payment instructions within 24 hours.
                  </p>
                </form>
              </FadeUp>
            )}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto border-t border-stone-100">
        <FadeUp className="mb-8">
          <h2 className="text-2xl font-semibold text-stone-900">Questions</h2>
        </FadeUp>
        <div className="max-w-2xl divide-y divide-stone-100 border-t border-stone-100">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.04}>
              <div>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4">
                  <span className="text-sm font-medium text-stone-900">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-stone-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-stone-400 flex-shrink-0" />}
                </button>
                {openFaq === i && <p className="text-sm text-stone-500 leading-relaxed pb-5">{faq.a}</p>}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}