import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Headphones } from 'lucide-react';

const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.55, delay }} className={className}>
    {children}
  </motion.div>
);

const episodes = [
  {
    number: '01',
    title: 'Art as not-beautiful',
    guest: 'Lam Vo',
    description: 'Guest Lam explores how art serves as a vessel for the messy, unpolished internality of being human. A conversation on beauty, rawness, and what art truly holds.',
    url: 'https://thenapatfoundation.substack.com/p/ep1-art-as-not-beautiful-lam-vo',
  },
];

export default function Podcast() {
  return (
    <div className="bg-white pt-16">
      <section className="border-b border-stone-100 px-6 md:px-10 py-24 max-w-7xl mx-auto">
        <FadeUp>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4">Podcast</p>
          <h1 className="text-5xl md:text-7xl font-semibold text-stone-900 tracking-tight leading-[0.94] max-w-2xl">
            NAPAT<br /><span className="font-light italic text-stone-400">Conversations</span>
          </h1>
          <p className="mt-6 text-lg text-stone-500 max-w-xl leading-relaxed">
            Long-form dialogues with artists, neuroscientists, philosophers, and technologists.
          </p>
        </FadeUp>
      </section>

      <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
        <div className="divide-y divide-stone-100 border-t border-stone-100">
          {episodes.map((ep, i) => (
            <FadeUp key={ep.number} delay={i * 0.08}>
              <a href={ep.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-start gap-8 py-10">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-stone-100 flex items-center justify-center group-hover:bg-stone-900 transition-colors">
                    <Headphones className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                    Episode {ep.number} · {ep.guest}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-medium text-stone-900 group-hover:text-stone-500 transition-colors mb-3">
                    {ep.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed max-w-2xl">{ep.description}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-stone-300 group-hover:text-stone-900 transition-colors flex-shrink-0 mt-1" />
              </a>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="py-20 text-center border-t border-stone-100 border-dashed mt-10">
          <div className="w-10 h-10 bg-stone-100 flex items-center justify-center mx-auto mb-5">
            <Headphones className="w-4 h-4 text-stone-400" />
          </div>
          <p className="text-stone-900 font-medium mb-1">More episodes coming soon</p>
          <p className="text-stone-400 text-sm">Subscribe to the newsletter to be notified</p>
        </FadeUp>
      </section>
    </div>
  );
}