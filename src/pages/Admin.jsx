import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';
import { Check, X, Pin, Loader2, Plus, Trash2, ExternalLink } from 'lucide-react';

const catStyle = {
  article: 'bg-stone-100 text-stone-700',
  research: 'bg-blue-50 text-blue-700',
  question: 'bg-amber-50 text-amber-700',
  collaboration: 'bg-green-50 text-green-700',
  event: 'bg-purple-50 text-purple-700',
  resource: 'bg-rose-50 text-rose-700',
  announcement: 'bg-stone-100 text-stone-700',
};

const EMPTY_LIBRARY_FORM = { title: '', type: 'article', category: '', subtitle: '', date: '', url: '', published: true };

export default function Admin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [user, setUser] = useState(null);

  // Library state
  const [section, setSection] = useState('community'); // 'community' | 'library'
  const [libraryItems, setLibraryItems] = useState([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryForm, setLibraryForm] = useState(EMPTY_LIBRARY_FORM);
  const [librarySubmitting, setLibrarySubmitting] = useState(false);
  const [editingLibrary, setEditingLibrary] = useState(null); // id being edited

  useEffect(() => {
    const init = async () => {
      const me = await base44.auth.me();
      setUser(me);
      fetchPosts();
      fetchLibrary();
    };
    init();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const data = await base44.entities.BulletinPost.list('-created_date', 200);
    setPosts(data);
    setLoading(false);
  };

  const fetchLibrary = async () => {
    setLibraryLoading(true);
    const data = await base44.entities.LibraryItem.list('-created_date', 100);
    setLibraryItems(data);
    setLibraryLoading(false);
  };

  const handleLibrarySubmit = async (e) => {
    e.preventDefault();
    setLibrarySubmitting(true);
    if (editingLibrary) {
      await base44.entities.LibraryItem.update(editingLibrary, libraryForm);
    } else {
      await base44.entities.LibraryItem.create(libraryForm);
    }
    setLibraryForm(EMPTY_LIBRARY_FORM);
    setEditingLibrary(null);
    setLibrarySubmitting(false);
    fetchLibrary();
  };

  const deleteLibraryItem = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    await base44.entities.LibraryItem.delete(id);
    setLibraryItems(prev => prev.filter(i => i.id !== id));
  };

  const startEditLibrary = (item) => {
    setEditingLibrary(item.id);
    setLibraryForm({ title: item.title, type: item.type, category: item.category || '', subtitle: item.subtitle || '', date: item.date, url: item.url, published: item.published !== false });
  };

  const updateStatus = async (id, status) => {
    await base44.entities.BulletinPost.update(id, { status });
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const togglePin = async (post) => {
    await base44.entities.BulletinPost.update(post.id, { pinned: !post.pinned });
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, pinned: !p.pinned } : p));
  };

  const deletePost = async (id) => {
    if (!window.confirm('Delete this post permanently?')) return;
    await base44.entities.BulletinPost.delete(id);
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  if (user && user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-16">
        <div className="text-center">
          <p className="text-stone-900 font-semibold mb-2">Access Denied</p>
          <p className="text-stone-400 text-sm">This page is for admins only.</p>
        </div>
      </div>
    );
  }

  const filtered = posts.filter(p => (p.status || 'pending') === activeTab);
  const counts = {
    pending: posts.filter(p => (p.status || 'pending') === 'pending').length,
    approved: posts.filter(p => p.status === 'approved').length,
    rejected: posts.filter(p => p.status === 'rejected').length,
  };

  return (
    <div className="bg-white min-h-screen pt-16">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-2">Admin</p>
            <h1 className="text-4xl font-semibold text-stone-900 tracking-tight">Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setSection('community')}
              className={`text-sm font-medium px-4 py-2 border transition-colors ${section === 'community' ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-200 text-stone-500 hover:text-stone-900'}`}>
              Community Board
            </button>
            <button onClick={() => setSection('library')}
              className={`text-sm font-medium px-4 py-2 border transition-colors ${section === 'library' ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-200 text-stone-500 hover:text-stone-900'}`}>
              Library
            </button>
          </div>
        </div>

        {section === 'library' && (
          <div>
            {/* Library form */}
            <div className="border border-stone-100 p-6 mb-8 bg-stone-50">
              <h2 className="text-base font-semibold text-stone-900 mb-5">
                {editingLibrary ? 'Edit Item' : 'Add New Item'}
              </h2>
              <form onSubmit={handleLibrarySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-1">Type</label>
                    <select value={libraryForm.type} onChange={e => setLibraryForm(f => ({ ...f, type: e.target.value }))}
                      className="w-full border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-900 bg-white">
                      <option value="article">Article</option>
                      <option value="podcast">Podcast</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-1">
                      {libraryForm.type === 'article' ? 'Category' : 'Guest / Subtitle'}
                    </label>
                    <input value={libraryForm.type === 'article' ? libraryForm.category : libraryForm.subtitle}
                      onChange={e => setLibraryForm(f => libraryForm.type === 'article' ? ({ ...f, category: e.target.value }) : ({ ...f, subtitle: e.target.value }))}
                      placeholder={libraryForm.type === 'article' ? 'e.g. Neuroscience' : 'e.g. Exploring neuroaesthetics'}
                      className="w-full border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-900 bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-1">Title *</label>
                  <input required value={libraryForm.title} onChange={e => setLibraryForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-900 bg-white" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-1">Date *</label>
                    <input required value={libraryForm.date} onChange={e => setLibraryForm(f => ({ ...f, date: e.target.value }))}
                      placeholder="e.g. Jan 28, 2026"
                      className="w-full border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-900 bg-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-1">Published</label>
                    <select value={libraryForm.published ? 'true' : 'false'} onChange={e => setLibraryForm(f => ({ ...f, published: e.target.value === 'true' }))}
                      className="w-full border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-900 bg-white">
                      <option value="true">Yes</option>
                      <option value="false">No (draft)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-1">Substack URL *</label>
                  <input required type="url" value={libraryForm.url} onChange={e => setLibraryForm(f => ({ ...f, url: e.target.value }))}
                    placeholder="https://thenapatfoundation.substack.com/p/..."
                    className="w-full border border-stone-200 px-3 py-2 text-sm outline-none focus:border-stone-900 bg-white" />
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={librarySubmitting}
                    className="bg-stone-900 text-white px-5 py-2 text-sm font-semibold hover:bg-stone-700 transition-colors disabled:opacity-40">
                    {librarySubmitting ? 'Saving...' : editingLibrary ? 'Update' : 'Add Item'}
                  </button>
                  {editingLibrary && (
                    <button type="button" onClick={() => { setEditingLibrary(null); setLibraryForm(EMPTY_LIBRARY_FORM); }}
                      className="text-sm text-stone-400 hover:text-stone-700 px-3">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Library list */}
            {libraryLoading ? (
              <div className="flex justify-center py-16"><Loader2 className="w-5 h-5 text-stone-400 animate-spin" /></div>
            ) : libraryItems.length === 0 ? (
              <p className="text-stone-400 text-sm text-center py-16">No items yet. Add your first one above.</p>
            ) : (
              <div className="space-y-2">
                {libraryItems.map(item => (
                  <div key={item.id} className="border border-stone-100 px-5 py-4 flex items-center justify-between gap-4 bg-white">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 ${item.type === 'podcast' ? 'bg-purple-50 text-purple-700' : 'bg-stone-100 text-stone-600'}`}>
                          {item.type === 'podcast' ? 'Podcast' : item.category || 'Article'}
                        </span>
                        <span className="text-xs text-stone-400">{item.date}</span>
                        {!item.published && <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-amber-50 text-amber-600">Draft</span>}
                      </div>
                      <p className="text-sm font-medium text-stone-900 truncate">{item.title}</p>
                      {item.subtitle && <p className="text-xs text-stone-400 truncate">{item.subtitle}</p>}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" title="Open link"
                        className="w-7 h-7 flex items-center justify-center text-stone-300 hover:text-stone-700 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button onClick={() => startEditLibrary(item)} className="text-xs text-stone-400 hover:text-stone-900 transition-colors px-1">edit</button>
                      <button onClick={() => deleteLibraryItem(item.id)}
                        className="w-7 h-7 flex items-center justify-center text-stone-300 hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {section === 'community' && <div>
        {/* Tabs */}
        <div className="flex gap-0 border-b border-stone-100 mb-8">
          {['pending', 'approved', 'rejected'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium px-5 py-3 border-b-2 capitalize transition-colors ${
                activeTab === tab ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}>
              {tab} <span className="ml-1 text-xs text-stone-400">({counts[tab]})</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-5 h-5 text-stone-400 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-stone-400 text-sm">No {activeTab} posts.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(post => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="border border-stone-100 p-6 bg-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 ${catStyle[post.category] || 'bg-stone-100 text-stone-600'}`}>
                        {post.category}
                      </span>
                      {post.pinned && <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-yellow-50 text-yellow-700">Pinned</span>}
                      <span className="text-xs text-stone-500">{post.author_name}</span>
                      {post.author_email && <span className="text-xs text-stone-400">({post.author_email})</span>}
                      <span className="text-stone-200">·</span>
                      <span className="text-xs text-stone-400">
                        {post.created_date ? format(new Date(post.created_date), 'MMM d, yyyy') : ''}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-stone-900 mb-1">{post.title}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed line-clamp-3">{post.content}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {activeTab === 'pending' && (
                      <>
                        <button onClick={() => updateStatus(post.id, 'approved')} title="Approve"
                          className="w-8 h-8 flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => updateStatus(post.id, 'rejected')} title="Reject"
                          className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {activeTab === 'approved' && (
                      <>
                        <button onClick={() => togglePin(post)} title={post.pinned ? 'Unpin' : 'Pin'}
                          className={`w-8 h-8 flex items-center justify-center transition-colors ${post.pinned ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' : 'bg-stone-50 text-stone-400 hover:bg-stone-100'}`}>
                          <Pin className="w-4 h-4" />
                        </button>
                        <button onClick={() => updateStatus(post.id, 'rejected')} title="Remove"
                          className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {activeTab === 'rejected' && (
                      <button onClick={() => updateStatus(post.id, 'approved')} title="Approve"
                        className="w-8 h-8 flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => deletePost(post.id)} title="Delete"
                      className="text-xs text-stone-300 hover:text-red-500 transition-colors px-1">
                      delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        </div>}
      </div>
    </div>
  );
}