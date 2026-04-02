import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Check, ArrowRight, Mail } from 'lucide-react';

const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}>
    {children}
  </motion.div>
);

const roleGroups = [
  {
    group: 'Research & Editorial',
    roles: [
      { id: 'research', title: 'Research Associate', desc: 'Neuroscience, art & interdisciplinary literature reviews.' },
      { id: 'editorial', title: 'Editorial Contributor', desc: 'Write, edit & shape Substack and NAPAT content.' },
    ]
  },
  {
    group: 'Creative & Community',
    roles: [
      { id: 'art_curation', title: 'Art Curator', desc: 'Identify & feature works aligned with NAPAT\'s mission.' },
      { id: 'community_outreach', title: 'Community Outreach', desc: 'Expand network, coordinate events & grow engagement.' },
    ]
  },
  {
    group: 'Technology & Education',
    roles: [
      { id: 'technology', title: 'Technology Lead', desc: 'Digital tools, platforms & AI/BCI adjacent projects.' },
      { id: 'education', title: 'Education Specialist', desc: 'Curricula & materials merging neuroarts & pedagogy.' },
      { id: 'events', title: 'Events Coordinator', desc: 'Plan and execute talks, workshops & sessions.' },
    ]
  },
];

const allRoles = roleGroups.flatMap(g => g.roles);

export default function Volunteer() {
  const [form, setForm] = useState({
    name: '', email: '', area_of_interest: '', availability: '', motivation: '', portfolio_url: '',
  });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.VolunteerApplication.create({ ...form, background: form.motivation, status: 'pending' });
    setDone(true);
    setLoading(false);
  };

  return (
    <div className="bg-white pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(214,211,209,0.2)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-36">
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4">Volunteer</p>
            <h1 className="text-5xl md:text-7xl font-semibold text-stone-900 tracking-tight leading-[0.94] mb-6 max-w-3xl">
              Join the<br /><em className="font-light not-italic" style={{ fontStyle: 'italic', color: '#a8a29e' }}>Collective</em>
            </h1>
            <p className="text-lg text-stone-500 max-w-xl leading-relaxed">
              We invite researchers, artists, engineers, philosophers, educators, and activists
              to contribute to our shared mission.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Roles — grouped */}
      <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
        <FadeUp className="mb-12">
          <h2 className="text-2xl font-semibold text-stone-900">Open Roles</h2>
        </FadeUp>
        <div className="space-y-12">
          {roleGroups.map((group, gi) => (
            <FadeUp key={group.group} delay={gi * 0.08}>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-4">{group.group}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-100 border border-stone-100">
                {group.roles.map((r, i) => (
                  <div key={r.id} className="bg-white px-7 py-7">
                    <p className="text-sm font-semibold text-stone-900 mb-1.5">{r.title}</p>
                    <p className="text-xs text-stone-500 leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Application form */}
      <section className="px-6 md:px-10 py-20 border-t border-stone-100 bg-stone-50">
        <div className="max-w-2xl mx-auto">
          {done ? (
            <FadeUp>
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-stone-900 flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-semibold text-stone-900 mb-3">Application Sent</h2>
                <p className="text-stone-500 leading-relaxed max-w-sm mx-auto">
                  We've notified our team and sent you a confirmation. We'll be in touch.
                </p>
              </div>
            </FadeUp>
          ) : (
            <>
              <FadeUp className="mb-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-3">Application</p>
                <h2 className="text-3xl font-semibold text-stone-900 mb-2">Volunteer Application</h2>
                <p className="text-sm text-stone-500">Your application will be sent directly to thenapatfoundation@gmail.com.</p>
              </FadeUp>
              <FadeUp>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Full Name *</label>
                      <input required value={form.name} onChange={e => set('name', e.target.value)}
                        className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Email *</label>
                      <input required type="email" value={form.email} onChange={e => set('email', e.target.value)}
                        className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Role Interest *</label>
                      <select required value={form.area_of_interest} onChange={e => set('area_of_interest', e.target.value)}
                        className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white appearance-none">
                        <option value="">Select a role</option>
                        {allRoles.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Availability *</label>
                      <select required value={form.availability} onChange={e => set('availability', e.target.value)}
                        className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white appearance-none">
                        <option value="">Select availability</option>
                        <option value="part_time">Part-time</option>
                        <option value="full_time">Full-time</option>
                        <option value="project_based">Project-based</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Why NAPAT? *</label>
                    <textarea required rows={5} value={form.motivation} onChange={e => set('motivation', e.target.value)}
                      placeholder="Tell us about your background and what draws you to NAPAT's mission..."
                      className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white resize-none" />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Portfolio / Website</label>
                    <input type="url" value={form.portfolio_url} onChange={e => set('portfolio_url', e.target.value)}
                      placeholder="https://"
                      className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white" />
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full bg-stone-900 text-white py-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-stone-700 transition-colors disabled:opacity-40">
                    {loading ? 'Sending...' : <><span>Submit Application</span><ArrowRight className="w-4 h-4" /></>}
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