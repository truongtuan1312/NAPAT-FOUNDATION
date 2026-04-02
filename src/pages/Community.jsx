import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.55, delay }} className={className}>
    {children}
  </motion.div>
);

const CATEGORIES = ['All', 'Article', 'Research', 'Question', 'Collaboration', 'Event', 'Resource'];
const catStyle = {
  Article: 'bg-stone-100 text-stone-700',
  Research: 'bg-blue-50 text-blue-700',
  Question: 'bg-amber-50 text-amber-700',
  Collaboration: 'bg-green-50 text-green-700',
  Event: 'bg-purple-50 text-purple-700',
  Resource: 'bg-rose-50 text-rose-700',
};

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Member state
  const [isMember, setIsMember] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');

  // Submission form
  const [form, setForm] = useState({
    author_name: '', author_email: '',
    title: '', content: '', category: 'Article',
  });

  const fetchPosts = async () => {
    setLoading(true);
    const data = await base44.entities.BulletinPost.filter({ status: 'approved' }, '-created_date', 100);
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!memberName || !memberEmail) return;
    setIsMember(true);
    setForm(f => ({ ...f, author_name: memberName, author_email: memberEmail }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.entities.BulletinPost.create({
      ...form,
      category: form.category.toLowerCase(),
    });
    setDone(true);
    setSubmitting(false);
    fetchPosts();
  };

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="bg-white pt-16">
      {/* Hero */}
      <section className="border-b border-stone-100 px-6 md:px-10 py-24 max-w-7xl mx-auto">
        <FadeUp>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4">Community</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-7xl font-semibold text-stone-900 tracking-tight leading-[0.94] mb-4">
                Community<br /><em style={{ fontStyle: 'italic', fontWeight: 300, color: '#a8a29e' }}>Board</em>
              </h1>
              <p className="text-stone-500 max-w-lg text-base">
                A subscriber-only space to share work, ask questions, find collaborators, and post events.
                Subscribe on Substack to unlock posting.
              </p>
              <div className="mt-6">
                <Link to={createPageUrl('Volunteer')}
                  className="inline-block text-sm font-semibold text-stone-900 border border-stone-200 px-5 py-2.5 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all">
                  Join as Volunteer →
                </Link>
              </div>
            </div>
            {isMember && !showForm && (
              <button onClick={() => { setShowForm(true); setDone(false); }}
                className="bg-stone-900 text-white text-sm font-semibold px-6 py-3 hover:bg-stone-700 transition-colors self-start md:self-auto flex-shrink-0">
                + Submit Post
              </button>
            )}
          </div>
        </FadeUp>
      </section>

      {/* Subscriber gate */}
      {!isMember && (
        <section className="px-6 md:px-10 py-16 bg-stone-50 border-b border-stone-100">
          <div className="max-w-md mx-auto">
            <FadeUp>
              <h2 className="text-2xl font-semibold text-stone-900 mb-2">Subscriber Access</h2>
              <p className="text-stone-500 text-sm mb-8 leading-relaxed">
                The Community Board is for NAPAT subscribers. Enter your email to post.
                Posts are publicly visible — submissions are reviewed before publishing.
              </p>
              <form onSubmit={handleJoin} className="space-y-3">
                <input required placeholder="Your name" value={memberName} onChange={e => setMemberName(e.target.value)}
                  className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white" />
                <input required type="email" placeholder="Your email" value={memberEmail} onChange={e => setMemberEmail(e.target.value)}
                  className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white" />
                <button type="submit"
                  className="w-full bg-stone-900 text-white py-3 text-sm font-semibold hover:bg-stone-700 transition-colors">
                  Access the Board →
                </button>
              </form>
              <p className="mt-5 text-xs text-stone-400">
                Not subscribed?{' '}
                <a href="https://thenapatfoundation.substack.com/" target="_blank" rel="noopener noreferrer"
                  className="underline hover:text-stone-700">Subscribe on Substack →</a>
              </p>

            </FadeUp>
          </div>
        </section>
      )}

      {/* Submission form */}
      {isMember && showForm && (
        <motion.section initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-stone-50 border-b border-stone-100 px-6 md:px-10 py-12">
          <div className="max-w-2xl mx-auto">
            {done ? (
              <div className="text-center py-10">
                <h2 className="text-2xl font-semibold text-stone-900 mb-2">Submission Received</h2>
                <p className="text-stone-500 text-sm mb-6">Thank you. Your post will appear once reviewed.</p>
                <button onClick={() => { setShowForm(false); setDone(false); }}
                  className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors underline">
                  Back to Board
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-stone-900">Submit a Post</h2>
                  <button onClick={() => setShowForm(false)} className="text-stone-400 hover:text-stone-900 text-sm">Cancel</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Category</label>
                      <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                        className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white">
                        {CATEGORIES.filter(c => c !== 'All').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Title *</label>
                      <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                        className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">Content *</label>
                    <textarea required rows={5} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                      placeholder="Share your article, question, event, or resource..."
                      className="w-full border border-stone-200 px-4 py-3 text-sm outline-none focus:border-stone-900 bg-white resize-none" />
                  </div>
                  <p className="text-xs text-stone-400">Posting as <strong className="text-stone-600">{memberName}</strong> — submissions are reviewed before publishing.</p>
                  <button type="submit" disabled={submitting}
                    className="bg-stone-900 text-white px-6 py-3 text-sm font-semibold hover:bg-stone-700 transition-colors disabled:opacity-40">
                    {submitting ? 'Submitting...' : 'Submit for Review'}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.section>
      )}

      {/* Category filter */}
      <section className="border-b border-stone-100 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex gap-0 flex-wrap">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`text-[13px] font-medium px-5 py-4 border-b-2 transition-colors ${
                activeCategory === cat
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts feed */}
      <section className="px-6 md:px-10 py-12 max-w-7xl mx-auto">
        {loading ? (
          <div className="py-24 text-center text-stone-400 text-sm">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-stone-900 font-semibold mb-2">No posts yet</p>
            <p className="text-stone-400 text-sm">Be the first to contribute to this category.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {filtered.map((post, i) => (
              <FadeUp key={post.id} delay={i * 0.03}>
                <div className="py-9">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 ${catStyle[post.category?.charAt(0).toUpperCase() + post.category?.slice(1)] || 'bg-stone-100 text-stone-600'}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">{post.author_name}</span>
                    <span className="text-stone-200">·</span>
                    <span className="text-xs text-stone-400">
                      {post.created_date ? format(new Date(post.created_date), 'MMM d, yyyy') : ''}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-stone-900 mb-3">{post.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed max-w-2xl">{post.content}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}