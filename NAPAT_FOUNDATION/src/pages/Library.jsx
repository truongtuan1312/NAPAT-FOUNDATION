import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}>
    {children}
  </motion.div>
);

const TABS = ['All', 'Articles', 'Podcast'];

export default function Library() {
  const [activeTab, setActiveTab] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.LibraryItem.filter({ published: true }, '-created_date', 50)
      .then(data => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeTab === 'All' ? items
    : activeTab === 'Articles' ? items.filter(i => i.type === 'article')
    : items.filter(i => i.type === 'podcast');

  return (
    <div className="bg-white pt-16">
      {/* Hero */}
      <section className="border-b border-stone-100 px-6 md:px-10 py-24 max-w-7xl mx-auto">
        <FadeUp>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4">Knowledge</p>
          <h1 className="text-5xl md:text-7xl font-semibold text-stone-900 tracking-tight leading-[0.94] mb-6">
            The Library
          </h1>
          <p className="text-lg text-stone-500 max-w-xl leading-relaxed">
            Articles, essays, and podcast conversations from the NAPAT collective — exploring
            the edges of neuroscience, art, philosophy, and technology.
          </p>
        </FadeUp>
      </section>

      {/* Tabs */}
      <section className="border-b border-stone-100 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex gap-0">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`text-[13px] font-medium px-6 py-4 border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="px-6 md:px-10 py-12 max-w-7xl mx-auto">
        {loading ? (
          <div className="py-24 text-center text-stone-400 text-sm">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center text-stone-400 text-sm">No items yet.</div>
        ) : (
        <div className="divide-y divide-stone-100">
          {filtered.map((item, i) => (
            <FadeUp key={item.id || item.title} delay={i * 0.06}>
              <a href={item.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-start justify-between gap-6 py-8 hover:pl-1 transition-all duration-300">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 ${
                      item.type === 'podcast' ? 'bg-purple-50 text-purple-700' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {item.type === 'podcast' ? 'Podcast' : item.category}
                    </span>
                    <span className="text-xs text-stone-400">{item.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium text-stone-900 group-hover:text-stone-500 transition-colors mb-1">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-sm text-stone-400">{item.subtitle}</p>
                  )}
                </div>
                <span className="text-stone-300 group-hover:text-stone-900 transition-colors text-lg mt-1 flex-shrink-0">↗</span>
              </a>
            </FadeUp>
          ))}
        </div>
        )}

        <FadeUp delay={0.3}>
          <div className="mt-10 pt-10 border-t border-stone-100">
            <p className="text-sm text-stone-400">
              More on{' '}
              <a href="https://thenapatfoundation.substack.com/" target="_blank" rel="noopener noreferrer"
                className="text-stone-700 underline hover:text-stone-900">Substack ↗</a>
            </p>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}