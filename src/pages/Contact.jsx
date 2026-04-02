import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Check, ArrowRight, Instagram, ExternalLink } from 'lucide-react';

const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.55, delay }} className={className}>
    {children}
  </motion.div>
);

const affiliations = [
  { value: 'researcher', label: 'Researcher' },
  { value: 'artist', label: 'Artist' },
  { value: 'engineer', label: 'Engineer' },
  { value: 'philosopher', label: 'Philosopher' },
  { value: 'educator', label: 'Educator' },
  { value: 'other', label: 'Other' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', affiliation: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.ContactMessage.create(form);
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="bg-white pt-16">
      <section className="border-b border-stone-100 px-6 md:px-10 py-24 max-w-7xl mx-auto">
        <FadeUp>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4">Contact</p>
          <h1 className="text-5xl md:text-7xl font-semibold text-stone-900 tracking-tight leading-[0.94] max-w-2xl">
            Get in<br /><span className="font-light italic text-stone-400">Touch</span>
          </h1>
        </FadeUp>
      </section>

      <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16">
          {/* Form */}
          <div className="md:col-span-3">
            {sent ? (
              <FadeUp>
                <div className="py-20 text-center border border-stone-100">
                  <div className="w-12 h-12 bg-stone-900 flex items-center justify-center mx-auto mb-5">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-stone-900 mb-2">Message Sent</h3>
                  <p className="text-stone-500 text-sm">Thank you. We'll be in touch soon.</p>
                </div>
              </FadeUp>
            ) : (
              <FadeUp>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[['name', 'Full Name', 'text', true], ['email', 'Email Address', 'email', true]].map(([k, label, type, req]) => (
                      <div key={k}>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">{label}</label>
                        <input type={type} required={req} value={form[k]} onChange={e => set(k, e.target.value)}
                          className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors" />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Affiliation</label>
                      <select value={form.affiliation} onChange={e => set('affiliation', e.target.value)}
                        className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white appearance-none">
                        <option value="">Select role</option>
                        {affiliations.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Subject</label>
                      <input value={form.subject} onChange={e => set('subject', e.target.value)}
                        className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Message *</label>
                    <textarea required rows={6} value={form.message} onChange={e => set('message', e.target.value)}
                      placeholder="Tell us about your interest..."
                      className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 transition-colors resize-none" />
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full bg-stone-900 text-white py-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-stone-700 transition-colors disabled:opacity-40">
                    {loading ? 'Sending...' : <><span>Send Message</span><ArrowRight className="w-4 h-4" /></>}
                  </button>
                </form>
              </FadeUp>
            )}
          </div>

          {/* Sidebar */}
          <FadeUp delay={0.15} className="md:col-span-2">
            <div className="space-y-10">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-5">Connect</p>
                <div className="space-y-3">
                  {[
                    { label: 'Instagram', url: 'https://www.instagram.com/napatfoundation/' },
                    { label: 'X / Twitter', url: 'https://x.com/napatfoundation' },
                    { label: 'Substack', url: 'https://thenapatfoundation.substack.com/' },
                    { label: 'NRC Profile', url: 'https://www.neuroartsresourcecenter.com/profile/napat-foundation-b4c31' },
                  ].map(s => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between text-sm text-stone-600 hover:text-stone-900 py-2.5 border-b border-stone-100 transition-colors group">
                      <span>{s.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-300 group-hover:text-stone-700 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-5">We welcome</p>
                <ul className="space-y-2 text-sm text-stone-500">
                  {['Researchers & scientists', 'Artists & creatives', 'Philosophers & ethicists', 'Engineers & developers', 'Educators & activists'].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-stone-300 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}