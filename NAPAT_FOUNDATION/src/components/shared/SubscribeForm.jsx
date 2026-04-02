import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INVOLVEMENT_OPTIONS = [
  'Register for membership',
  'Attending in-person events',
  'Contribute to dialogue via article submission',
  'Explore partnership opportunities',
  'Provide financial sponsorship',
  'Participating in the online discussions',
  'Reading written materials',
  'Receive newsletters',
  'Other media',
];

export default function SubscribeForm({ source = 'website' }) {
  const [email, setEmail] = useState('');
  const [involvement, setInvolvement] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleOption = (opt) => {
    setInvolvement(prev =>
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await base44.entities.Subscriber.create({ email, source, involvement });
    setSubmitted(true);
    setLoading(false);
    setEmail('');
    setInvolvement([]);
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex items-center gap-3 text-stone-700 text-sm font-medium py-3">
          <Check className="w-4 h-4 text-stone-900" /> Thank you — we'll be in touch.
        </motion.div>
      ) : (
        <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onSubmit={handleSubmit} className="space-y-6 max-w-lg">

          {/* Email */}
          <div className="flex gap-0">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 border border-stone-200 border-r-0 px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:border-stone-900 transition-colors bg-white"
            />
            <button type="submit" disabled={loading}
              className="bg-stone-900 text-white text-sm font-semibold px-5 py-3 flex items-center gap-2 hover:bg-stone-700 transition-colors flex-shrink-0">
              {loading ? '...' : <><span>Subscribe</span><ArrowRight className="w-3.5 h-3.5" /></>}
            </button>
          </div>

          {/* Involvement checkboxes */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-400 mb-3">
              I'm interested in (select all that apply)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {INVOLVEMENT_OPTIONS.map(opt => (
                <label key={opt}
                  className="flex items-start gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={involvement.includes(opt)}
                    onChange={() => toggleOption(opt)}
                    className="mt-0.5 w-3.5 h-3.5 accent-stone-900 flex-shrink-0"
                  />
                  <span className="text-xs text-stone-500 leading-relaxed group-hover:text-stone-800 transition-colors">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}