import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import SubscribeForm from '../components/shared/SubscribeForm';


const articles = [
  { title: 'Brain system behind making sense of art', date: 'Jan 28', category: 'Neuroscience', url: 'https://thenapatfoundation.substack.com/p/brain-system-behind-making-sense' },
  { title: 'Epistemic pillars in experienced and judged art', date: 'Jan 12', category: 'Philosophy', url: 'https://thenapatfoundation.substack.com/p/epistemic-pillars-in-experienced' },
  { title: 'Neural hierarchical structure of art interpretation', date: 'Dec 30', category: 'Neuroscience', url: 'https://thenapatfoundation.substack.com/p/neural-hierarchical-structure-of' },
];

const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const subscribeRef = useRef(null);
  const scrollToSubscribe = () => subscribeRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-10 pt-24 pb-16 max-w-7xl mx-auto">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(214,211,209,0.2)_0%,transparent_70%)] pointer-events-none" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-400 mb-10"
        >
          Neuroscience · Art · Philosophy · Anthropology · Technology
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(3.2rem,9vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.02em] text-stone-900 mb-8 max-w-5xl"
        >
          Where the mind<br />
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#a8a29e' }}>meets meaning</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg md:text-xl text-stone-500 max-w-lg leading-relaxed mb-12"
        >
          An interdisciplinary collective exploring the intersection of neuroscience,
          art, philosophy, anthropology, and technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap gap-3 items-center"
        >
          <button onClick={scrollToSubscribe}
            className="bg-stone-900 text-white text-sm font-semibold px-7 py-4 hover:bg-stone-700 transition-colors">
            Join the Conversation →
          </button>
          <Link to={createPageUrl('About')}
            className="text-sm font-medium text-stone-400 hover:text-stone-900 transition-colors px-2 py-4">
            About NAPAT →
          </Link>
        </motion.div>
      </section>

      {/* What we fund — unique to Home */}
      <section className="border-t border-stone-100 px-6 md:px-10 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4">Our Work</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-6 leading-tight">
              Research, technology, art —<br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#a8a29e' }}>grounded in evidence</em>
            </h2>
            <p className="text-sm text-stone-500 leading-relaxed mb-6">
              NAPAT funds and produces work across four areas: community service, research & development,
              artistic therapy, and education technology. Each project is held to the same standard —
              human-centered, ethically sound, and grounded in interdisciplinary evidence.
            </p>
            <Link to={createPageUrl('About')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 border border-stone-200 px-5 py-2.5 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all">
              About the Foundation →
            </Link>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="grid grid-cols-2 gap-px bg-stone-100 border border-stone-100">
              {[
                { num: '01', label: 'Community Service', desc: 'Building resilience and access to interdisciplinary knowledge.' },
                { num: '02', label: 'Research & Development', desc: 'Academic and applied research across the NAPAT disciplines.' },
                { num: '03', label: 'Artistic Therapy', desc: 'Art as a therapeutic tool rooted in neuroscience.' },
                { num: '04', label: 'Education Technology', desc: 'Ethical, human-centered learning tools for diverse contexts.' },
              ].map(item => (
                <div key={item.num} className="bg-white p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-300 mb-2">{item.num}</p>
                  <p className="text-sm font-semibold text-stone-900 mb-1.5">{item.label}</p>
                  <p className="text-xs text-stone-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Stat bar */}
      <section className="bg-stone-900 text-white px-6 md:px-10 py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { stat: '5', label: 'Core Disciplines' },
            { stat: '4', label: 'Grant Categories' },
            { stat: '7', label: 'Volunteer Roles' },
            { stat: '∞', label: 'Questions Worth Asking' },
          ].map(s => (
            <FadeUp key={s.label}>
              <p className="text-4xl md:text-5xl font-semibold text-stone-100 mb-2">{s.stat}</p>
              <p className="text-xs font-medium uppercase tracking-widest text-stone-500">{s.label}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Latest from Library */}
      <section className="px-6 md:px-10 py-24 border-t border-stone-100 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-3">Publications</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight">Latest Explorations</h2>
          </FadeUp>
          <Link to={createPageUrl('Library')} className="hidden md:block text-sm text-stone-400 hover:text-stone-900 transition-colors">
            View Library →
          </Link>
        </div>
        <div className="divide-y divide-stone-100">
          {articles.map((a, i) => (
            <FadeUp key={a.title} delay={i * 0.1}>
              <a href={a.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 py-7 hover:pl-2 transition-all duration-300">
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 bg-stone-100 px-2 py-0.5">{a.category}</span>
                    <span className="text-[11px] text-stone-400">{a.date}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-stone-900 group-hover:text-stone-500 transition-colors">{a.title}</h3>
                </div>
                <span className="text-stone-200 group-hover:text-stone-900 transition-colors text-lg flex-shrink-0">↗</span>
              </a>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Community + Volunteer */}
      <section className="bg-stone-50 border-t border-stone-100 px-6 md:px-10 py-24">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-3">Community</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight">Get Involved</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200">
            {[
              { title: 'Community Board', desc: 'Subscribers-only space to share articles, ask questions, and collaborate. Post your research, events, and ideas.', page: 'Community', cta: 'Open Board' },
              { title: 'Volunteer', desc: 'Join as researcher, curator, engineer, educator, or community builder. Applications sent directly to our team.', page: 'Volunteer', cta: 'Join the Team' },
            ].map((card, i) => (
              <FadeUp key={card.title} delay={i * 0.1}>
                <div className="bg-white p-10 h-full flex flex-col">
                  <h3 className="text-xl font-semibold text-stone-900 mb-3">{card.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed flex-1 mb-8">{card.desc}</p>
                  <Link to={createPageUrl(card.page)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 border border-stone-200 px-5 py-2.5 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all self-start">
                    {card.cta} →
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section ref={subscribeRef} className="px-6 md:px-10 py-32 max-w-7xl mx-auto border-t border-stone-100">
        <FadeUp>
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4">Newsletter</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight mb-4 leading-[1.1]">
              Stay in the conversation
            </h2>
            <p className="text-stone-500 text-lg mb-10 max-w-md leading-relaxed">
              Research updates, essays, and community news — delivered to your inbox.
            </p>
            <SubscribeForm source="home" />
            <p className="mt-4 text-xs text-stone-400">
              Full access on Substack →{' '}
              <a href="https://thenapatfoundation.substack.com/" target="_blank" rel="noopener noreferrer"
                className="underline hover:text-stone-700">thenapatfoundation.substack.com</a>
            </p>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}