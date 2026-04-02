import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Nav: Home | About | Library | Community | Volunteer | Contact
// Subscribe is primary CTA
const navItems = [
  { label: 'About', page: 'About' },
  { label: 'Library', page: 'Library' },
  { label: 'Community', page: 'Community' },
  { label: 'Support', page: 'Fund' },
  { label: 'Contact', page: 'Contact' },
];

export default function Layout({ children, currentPageName }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    base44.auth.me().then(u => { if (u?.role === 'admin') setIsAdmin(true); }).catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [currentPageName]);

  return (
    <div className="min-h-screen bg-white text-stone-900">
      <style>{`
        * { font-family: 'DM Sans', system-ui, sans-serif; }
        ::selection { background: #1a1815; color: #fff; }
      `}</style>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/97 backdrop-blur-md border-b border-stone-100' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-[64px] flex items-center justify-between gap-8">

          <Link to={createPageUrl('Home')}
            className="text-base font-semibold tracking-tight text-stone-900 hover:text-stone-500 transition-colors flex-shrink-0">
            NAPAT
          </Link>

          <div className="hidden lg:flex items-center gap-7 flex-1 justify-center">
            {navItems.map(item => (
              <Link key={item.page} to={createPageUrl(item.page)}
                className={`text-[13px] font-medium transition-colors duration-200 ${
                  currentPageName === item.page || (item.page === 'Fund' && currentPageName === 'Donate') || (item.page === 'Community' && currentPageName === 'Volunteer') ? 'text-stone-900' : 'text-stone-400 hover:text-stone-900'
                }`}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {isAdmin && (
              <Link to={createPageUrl('Admin')}
                className={`text-[13px] font-medium transition-colors duration-200 ${currentPageName === 'Admin' ? 'text-stone-900' : 'text-stone-400 hover:text-stone-900'}`}>
                Admin
              </Link>
            )}
            <a href="https://thenapatfoundation.substack.com/" target="_blank" rel="noopener noreferrer"
              className="text-[13px] font-semibold bg-stone-900 text-white px-4 py-2 hover:bg-stone-700 transition-colors">
              Subscribe
            </a>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-stone-700 text-xl font-light">
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-stone-100 overflow-hidden">
              <div className="px-6 py-6 flex flex-col gap-4">
                {navItems.map(item => (
                  <Link key={item.page} to={createPageUrl(item.page)}
                    className={`text-base font-medium ${currentPageName === item.page ? 'text-stone-900' : 'text-stone-500'}`}>
                    {item.label}
                  </Link>
                ))}
                <a href="https://thenapatfoundation.substack.com/" target="_blank" rel="noopener noreferrer"
                  className="mt-2 text-sm font-semibold bg-stone-900 text-white px-4 py-3 text-center">
                  Subscribe on Substack
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>{children}</main>

      <footer className="border-t border-stone-100 bg-stone-900 text-stone-400">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <p className="text-sm font-semibold text-stone-200 mb-3">NAPAT Foundation</p>
              <p className="text-xs text-stone-500 leading-relaxed">
                Neuroscience · Art · Philosophy<br />Anthropology · Technology
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-600 mb-4">Explore</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'About', page: 'About' },
                  { label: 'Library', page: 'Library' },
                  { label: 'Community', page: 'Community' },
                  { label: 'Volunteer', page: 'Volunteer' },
                ].map(p => (
                  <Link key={p.page} to={createPageUrl(p.page)} className="text-sm text-stone-500 hover:text-stone-200 transition-colors">{p.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-600 mb-4">Support</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Fund & Donate', page: 'Fund' },
                  { label: 'Contact', page: 'Contact' },
                  { label: 'Terms', page: 'Terms' },
                ].map(p => (
                  <Link key={p.page} to={createPageUrl(p.page)} className="text-sm text-stone-500 hover:text-stone-200 transition-colors">{p.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-600 mb-4">Connect</p>
              <div className="flex flex-col gap-2">
                {[
                  { l: 'Substack', u: 'https://thenapatfoundation.substack.com/' },
                  { l: 'Instagram', u: 'https://www.instagram.com/napatfoundation/' },
                  { l: 'X / Twitter', u: 'https://x.com/napatfoundation' },
                  { l: 'NRC', u: 'https://www.neuroartsresourcecenter.com/profile/napat-foundation-b4c31' },
                ].map(s => (
                  <a key={s.l} href={s.u} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-stone-500 hover:text-stone-200 transition-colors">{s.l} ↗</a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-8">
            <p className="text-xs text-stone-600">© {new Date().getFullYear()} NAPAT Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}