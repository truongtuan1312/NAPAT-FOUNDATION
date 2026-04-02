import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.55, delay }} className={className}>
    {children}
  </motion.div>
);

const pillars = [
  { letter: 'N', name: 'Neuroscience', en: 'Neural architectures of mind, consciousness & aesthetic perception.', vi: 'Kiến trúc thần kinh của tâm trí, ý thức và nhận thức thẩm mỹ.' },
  { letter: 'A', name: 'Art', en: 'How creativity drives meaning, connection & societal adaptation.', vi: 'Cách sự sáng tạo thúc đẩy ý nghĩa, kết nối và thích nghi xã hội.' },
  { letter: 'P', name: 'Philosophy', en: 'Ethical frameworks guiding technological development.', vi: 'Các khung đạo đức hướng dẫn phát triển công nghệ.' },
  { letter: 'A', name: 'Anthropology', en: 'Human culture & behavior grounded in global context.', vi: 'Văn hóa và hành vi con người trong bối cảnh toàn cầu.' },
  { letter: 'T', name: 'Technology', en: 'Ethically sound emerging technologies — AI, BCI & beyond.', vi: 'Các công nghệ mới nổi có đạo đức — AI, BCI và hơn thế nữa.' },
];

const fundCategories = [
  {
    value: 'community_service',
    label: 'Community Service',
    desc: 'Grants for initiatives that build community resilience, access to interdisciplinary knowledge, and civic engagement.',
  },
  {
    value: 'research_development',
    label: 'Research & Development',
    desc: 'Funding for academic and applied research at the intersection of neuroscience, technology, philosophy, and the arts.',
  },
  {
    value: 'artistic_therapy',
    label: 'Artistic Therapy',
    desc: 'Support for programs using art as a therapeutic tool grounded in neuroscientific and anthropological principles.',
  },
  {
    value: 'education_technology',
    label: 'Education & Technology',
    desc: 'Tools from technology applied through computational neuroaesthetics into helpful applications and tools for learning, cognition, and human-centered design.',
  },
];

export default function About() {
  return (
    <div className="bg-white pt-16">
      {/* Hero */}
      <section className="border-b border-stone-100 px-6 md:px-10 py-28 max-w-7xl mx-auto">
        <FadeUp>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4">About</p>
          <h1 className="text-5xl md:text-7xl font-semibold text-stone-900 tracking-tight leading-[0.94] mb-8 max-w-3xl">
            NAPAT<br /><em style={{ fontStyle: 'italic', fontWeight: 300, color: '#a8a29e' }}>Foundation</em>
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl leading-relaxed">
            An interdisciplinary collective applying neuroscience, art, philosophy, anthropology,
            and technology to real-world problems — from cognitive-based healthcare and coding art
            to human-centered AI design. We believe the most pressing questions of our time require
            all of these lenses working in concert.
          </p>
        </FadeUp>
      </section>

      {/* Origin & Approach — unique to About */}
      <section className="px-6 md:px-10 py-24 max-w-7xl mx-auto border-b border-stone-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4">Origin</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight leading-tight mb-6">
              Why NAPAT<br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#a8a29e' }}>came to be</em>
            </h2>
            <p className="text-base text-stone-600 leading-relaxed mb-5">
              Modern challenges — from mental health crises to the ethics of AI — cannot be solved
              within any single discipline. NAPAT was founded on the conviction that neuroscience,
              art, philosophy, anthropology, and technology are not parallel tracks but a single
              interwoven conversation.
            </p>
            <p className="text-base text-stone-600 leading-relaxed">
              We exist to hold that conversation at scale: publishing research, funding projects,
              and building a community of thinkers who refuse to stay in their lane.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4">Approach</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight leading-tight mb-6">
              How we<br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#a8a29e' }}>work</em>
            </h2>
            <div className="space-y-5">
              {[
                { title: 'Publish', desc: 'Long-form essays, research summaries, and podcast conversations applying cognitive science, philosophy, and applied technology to real disciplines.' },
                { title: 'Fund', desc: 'Grants for R&D, artistic therapy, education technology, and community initiatives — including projects at the intersection of coding, art, and clinical neuroscience.' },
                { title: 'Convene', desc: 'Workshops, talks, and an open community board where researchers, designers, engineers, and artists think together across fields.' },
                { title: 'Build', desc: 'Applied models that bring cognitive science into healthcare tools, AI-assisted design, brain-computer interfaces, and arts-based learning technologies.' },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-5 items-start">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-300 pt-0.5 w-12 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-sm font-semibold text-stone-900 mb-1">{item.title}</p>
                    <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-stone-900 text-white px-6 md:px-10 py-20">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500 mb-8">Mission</p>
            <blockquote className="text-2xl md:text-3xl font-medium leading-[1.4] text-stone-100">
              "To foster a collaborative, global environment ensuring that human-centered
              transformations are rooted in{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#a8a29e' }}>ethical and evident necessity</em>
              {' '}rather than merely technological possibility."
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* Pillars — expanded with bilingual context, unique depth */}
      <section className="px-6 md:px-10 py-24 max-w-7xl mx-auto">
        <FadeUp className="mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-3">Framework</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight">Five Pillars</h2>
          <p className="text-stone-500 text-base mt-3 max-w-xl">Each pillar is a lens — not a silo. Together they form the analytical and creative framework behind everything NAPAT produces.</p>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-5 border border-stone-100 divide-y md:divide-y-0 md:divide-x divide-stone-100">
          {pillars.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.08} className="p-8 group hover:bg-stone-50 transition-colors">
              <span className="text-5xl font-bold text-stone-100 group-hover:text-stone-200 block mb-5">{p.letter}</span>
              <p className="text-sm font-semibold text-stone-900 mb-2">{p.name}</p>
              <p className="text-xs text-stone-500 leading-relaxed mb-2">{p.en}</p>
              <p className="text-xs text-stone-400 leading-relaxed italic">{p.vi}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Fund Categories */}
      <section className="border-t border-stone-100 bg-stone-50 px-6 md:px-10 py-24">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-3">Support</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-3">Fund Categories</h2>
            <p className="text-stone-500 max-w-lg">
              NAPAT Foundation offers grants across four areas aligned with our interdisciplinary mission.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 mb-10">
            {fundCategories.map((cat, i) => (
              <FadeUp key={cat.value} delay={i * 0.07}>
                <div className="bg-white p-10 h-full flex flex-col">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-3">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="text-lg font-semibold text-stone-900 mb-3">{cat.label}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed flex-1">{cat.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.2}>
            <div className="flex flex-wrap gap-4">
              <Link to={createPageUrl('Fund')}
                className="text-sm font-semibold text-white bg-stone-900 px-6 py-3 hover:bg-stone-700 transition-colors">
                Apply for a Grant →
              </Link>
              <Link to={createPageUrl('Fund')}
                className="text-sm font-semibold text-stone-900 border border-stone-200 px-6 py-3 hover:border-stone-900 transition-colors"
                onClick={() => sessionStorage.setItem('fundTab', 'donate')}>
                Make a Donation →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Community */}
      <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto border-t border-stone-100">
        <FadeUp className="mb-10">
          <h2 className="text-3xl font-semibold text-stone-900 mb-3">A Global Collective</h2>
          <p className="text-stone-500 max-w-2xl leading-relaxed">
            NAPAT Foundation is community-driven. We bring together researchers, artists, engineers,
            philosophers, and educators from around the world to collaborate, share, and build together.
            Our members span academia, clinical practice, creative industries, and civic spaces.
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="flex flex-wrap gap-4">
            <Link to={createPageUrl('Volunteer')}
              className="text-sm font-semibold text-white bg-stone-900 px-6 py-3 hover:bg-stone-700 transition-colors">
              Join as Volunteer →
            </Link>
            <Link to={createPageUrl('Community')}
              className="text-sm font-semibold text-stone-900 border border-stone-200 px-6 py-3 hover:border-stone-900 transition-colors">
              Visit Community Board →
            </Link>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}