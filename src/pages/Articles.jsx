import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.55, delay }} className={className}>
    {children}
  </motion.div>
);

const articles = [
  { title: 'The neural gap of visual ambiguity and indeterminacy', excerpt: 'How the brain resolves ambiguous forms or fails to identify visually indeterminate artistic structures.', date: 'Feb 2026', category: 'Neuroscience', url: 'https://thenapatfoundation.substack.com/' },
  { title: 'Brain system behind making sense of art', excerpt: 'The human encounter with art is a sophisticated dialogue between the object and the observer\'s internal world.', date: 'Jan 28, 2026', category: 'Neuroscience', url: 'https://thenapatfoundation.substack.com/p/brain-system-behind-making-sense' },
  { title: 'Epistemic pillars in experienced and judged art', excerpt: 'Epistemic pillars integral to our understanding of the aesthetic experience and art perception.', date: 'Jan 12, 2026', category: 'Philosophy', url: 'https://thenapatfoundation.substack.com/p/epistemic-pillars-in-experienced' },
  { title: 'Neural hierarchical structure of art interpretation', excerpt: 'From the moment art hits your retina, your brain begins a sophisticated climb: a high-speed computational journey.', date: 'Dec 30, 2025', category: 'Neuroscience', url: 'https://thenapatfoundation.substack.com/p/neural-hierarchical-structure-of' },
  { title: 'From ontology and existentialism to the teleological ambiguity of art', excerpt: 'Artmaking and civilization have coexisted for millennia. Over time, humans\' tendency to rationalize the world prompted the need to understand art.', date: 'Dec 14, 2025', category: 'Philosophy', url: 'https://thenapatfoundation.substack.com/p/from-ontology-and-existentialism' },
  { title: 'The cognitive circuitry of aesthetic fulfillment', excerpt: 'To understand why art rewards us is to look into the mind that perceives it.', date: 'Dec 1, 2025', category: 'Neuroscience', url: 'https://thenapatfoundation.substack.com/p/the-cognitive-circuitry-of-aesthetic' },
  { title: 'Allen Institute launches Brain Knowledge Platform', excerpt: 'By consolidating data from multiple sources into a cohesive framework, the BKP addresses a persistent challenge in neuroscience.', date: 'Nov 25, 2025', category: 'Technology', url: 'https://thenapatfoundation.substack.com/p/allen-institute-launches-brain-knowledge' },
  { title: 'EP1: Art as not-beautiful — Lam Vo', excerpt: 'Guest Lam explores how art serves as a vessel for the messy, unpolished internality of being human.', date: 'Dec 19, 2025', category: 'Podcast', url: 'https://thenapatfoundation.substack.com/p/ep1-art-as-not-beautiful-lam-vo' },
];

const catColors = {
  Neuroscience: 'bg-stone-100 text-stone-600',
  Philosophy: 'bg-amber-50 text-amber-700',
  Technology: 'bg-blue-50 text-blue-600',
  Podcast: 'bg-purple-50 text-purple-700',
};

export default function Articles() {
  return (
    <div className="bg-white pt-16">
      <section className="border-b border-stone-100 px-6 md:px-10 py-24 max-w-7xl mx-auto">
        <FadeUp>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4">Publications</p>
          <h1 className="text-5xl md:text-7xl font-semibold text-stone-900 tracking-tight leading-[0.94] max-w-2xl">
            Articles &<br /><span className="font-light italic text-stone-400">Research</span>
          </h1>
        </FadeUp>
      </section>

      <section className="px-6 md:px-10 py-12 max-w-7xl mx-auto">
        <div className="divide-y divide-stone-100">
          {articles.map((a, i) => (
            <FadeUp key={a.title} delay={i * 0.04}>
              <a href={a.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-start justify-between gap-6 py-9">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 ${catColors[a.category] || 'bg-stone-100 text-stone-600'}`}>
                      {a.category}
                    </span>
                    <span className="text-[11px] text-stone-400">{a.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium text-stone-900 group-hover:text-stone-500 transition-colors leading-snug mb-2">
                    {a.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed max-w-2xl">{a.excerpt}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-stone-300 group-hover:text-stone-900 transition-colors flex-shrink-0 mt-1.5" />
              </a>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="pt-12 border-t border-stone-100 text-center">
          <a href="https://thenapatfoundation.substack.com/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-stone-200 text-stone-700 text-sm font-medium px-6 py-3 hover:border-stone-900 hover:text-stone-900 transition-colors">
            <ExternalLink className="w-4 h-4" /> Read more on Substack
          </a>
        </FadeUp>
      </section>
    </div>
  );
}