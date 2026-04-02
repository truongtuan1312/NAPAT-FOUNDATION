import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}>
    {children}
  </motion.div>
);

const presets = [25, 50, 100, 250];

export default function Donate() {
  const [amount, setAmount] = useState('');
  const [custom, setCustom] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return;
    setLoading(true);
    // Record donation interest & send notification
    await base44.integrations.Core.SendEmail({
      to: 'thenapatfoundation@gmail.com',
      subject: `Donation Intent — $${amount} from ${name || 'Anonymous'}`,
      body: `Donation Intent\n\nName: ${name || 'Anonymous'}\nEmail: ${email || 'Not provided'}\nAmount: $${amount}\nMessage: ${message || 'None'}\n\nPlease follow up with payment instructions.`,
    });
    setDone(true);
    setLoading(false);
  };

  return (
    <div className="bg-white pt-16 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-100">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-white to-amber-50/30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-36">
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700 mb-4">Support the Mission</p>
            <h1 className="text-5xl md:text-7xl font-semibold text-stone-900 tracking-tight leading-[0.94] max-w-2xl mb-6">
              Fuel the<br /><span className="font-light italic text-stone-400">Nexus</span>
            </h1>
            <p className="text-lg text-stone-500 max-w-lg leading-relaxed">
              Your contribution supports artists, researchers, and community programs at the
              intersection of neuroscience, art, and human-centered technology.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Impact stats */}
      <section className="border-b border-stone-100 px-6 md:px-10 py-14 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-100 border border-stone-100">
          {[
            { icon: '🧠', title: 'Neuroscience Research', desc: 'Fund literature reviews, studies & publications' },
            { icon: '🎨', title: 'Artistic Programs', desc: 'Support therapeutic art & community projects' },
            { icon: '📚', title: 'Education Access', desc: 'Enable free resources & educational tools' },
          ].map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.08}>
              <div className="bg-white px-8 py-10">
                <div className="text-3xl mb-4">{item.icon}</div>
                <p className="text-base font-semibold text-stone-900 mb-1">{item.title}</p>
                <p className="text-sm text-stone-500">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Donation form */}
      <section className="px-6 md:px-10 py-20 bg-stone-50">
        <div className="max-w-2xl mx-auto">
          {done ? (
            <FadeUp>
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-stone-900 flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-semibold text-stone-900 mb-3">Thank You</h2>
                <p className="text-stone-500 text-lg leading-relaxed max-w-sm mx-auto">
                  We've received your donation intent. Our team will reach out with payment details shortly.
                </p>
              </div>
            </FadeUp>
          ) : (
            <>
              <FadeUp className="mb-10">
                <h2 className="text-3xl font-semibold text-stone-900 mb-2">Make a Contribution</h2>
                <p className="text-stone-500 text-sm">All donations directly support NAPAT programs and community initiatives.</p>
              </FadeUp>

              <FadeUp>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Amount selector */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-3">Select Amount (USD) *</label>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {presets.map(p => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => { setAmount(String(p)); setCustom(false); }}
                          className={`py-3 text-sm font-semibold border transition-all ${
                            !custom && amount === String(p)
                              ? 'bg-stone-900 text-white border-stone-900'
                              : 'bg-white text-stone-700 border-stone-200 hover:border-stone-900'
                          }`}
                        >
                          ${p}
                        </button>
                      ))}
                    </div>
                    <button type="button" onClick={() => { setCustom(true); setAmount(''); }}
                      className={`text-xs font-medium transition-colors ${custom ? 'text-stone-900 underline' : 'text-stone-400 hover:text-stone-700'}`}>
                      Enter custom amount
                    </button>
                    {custom && (
                      <input type="number" min="1" required value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="Enter amount in USD"
                        className="mt-3 w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white" />
                    )}
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Name (optional)</label>
                      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                        className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Email (for receipt)</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                        className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Message (optional)</label>
                    <textarea rows={3} value={message} onChange={e => setMessage(e.target.value)}
                      placeholder="A note for the NAPAT team..."
                      className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white resize-none" />
                  </div>

                  <p className="text-xs text-stone-400 leading-relaxed">
                    After submitting, our team will contact you with secure payment instructions via bank transfer, PayPal, or other arrangements.
                  </p>

                  <button type="submit" disabled={loading || !amount}
                    className="w-full bg-stone-900 text-white py-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-stone-700 transition-colors disabled:opacity-40">
                    {loading ? 'Processing...' : <><Heart className="w-4 h-4" /><span>Donate ${amount || '—'}</span></>}
                  </button>
                </form>
              </FadeUp>
            </>
          )}
        </div>
      </section>
    </div>
  );
}