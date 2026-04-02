import React from 'react';
import { motion } from 'framer-motion';

const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.55, delay }} className={className}>
    {children}
  </motion.div>
);

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using the NAPAT Foundation website and any of its services — including the Community Fund, Bulletin Board, Volunteer applications, newsletter, and podcast — you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please refrain from using the platform.`,
  },
  {
    title: '2. Use of Platform',
    content: `The NAPAT platform is intended for individuals and organizations engaged in or supportive of interdisciplinary research, art, philosophy, anthropology, and technology. Users agree not to post content that is illegal, defamatory, discriminatory, harassing, or otherwise harmful. NAPAT reserves the right to remove any content or revoke access without notice.`,
  },
  {
    title: '3. Community Fund Applications',
    content: `Submitting a fund application does not guarantee funding. All applications are reviewed by the NAPAT review panel on a rolling basis. Applicants must provide accurate information. Misrepresentation of any kind will result in immediate disqualification. Approved funds must be used exclusively for the described project purpose. NAPAT may request documentation of fund usage.`,
  },
  {
    title: '4. Community Bulletin Board',
    content: `Posts on the Community Bulletin Board are public and associated with the name provided at submission. Users retain ownership of their content but grant NAPAT a non-exclusive license to display it on the platform. NAPAT reserves the right to remove posts that violate community standards, are off-topic, or constitute spam.`,
  },
  {
    title: '5. Volunteer Terms',
    content: `Volunteer participation is voluntary and does not constitute employment. Volunteers may be asked to sign an additional confidentiality or contribution agreement depending on the role. NAPAT is not liable for any outcomes arising from volunteer activities conducted independently of the Foundation.`,
  },
  {
    title: '6. Intellectual Property',
    content: `All original content on the NAPAT website — including articles, graphics, and design — is the property of the NAPAT Foundation unless otherwise attributed. Content from publications or third-party contributors is credited accordingly. Reproduction requires prior written permission.`,
  },
  {
    title: '7. Privacy & Data',
    content: `We collect only the information you provide through forms (email, name, application details). This data is used solely to administer our programs and communications. We do not sell or share personal data with third parties. You may request deletion of your data at any time by contacting us.`,
  },
  {
    title: '8. Disclaimers',
    content: `The NAPAT Foundation provides information and community resources for educational and research purposes. Nothing on this platform constitutes medical, legal, or financial advice. NAPAT makes no guarantees regarding the accuracy or completeness of external links or referenced publications.`,
  },
  {
    title: '9. Amendments',
    content: `NAPAT reserves the right to update these terms at any time. Continued use of the platform after changes are posted constitutes acceptance of the revised terms. We will make reasonable efforts to notify users of material changes.`,
  },
  {
    title: '10. Contact',
    content: `For questions regarding these Terms and Conditions, please use the Contact page or reach out to us through our official social channels. We welcome dialogue and are committed to transparent, ethical governance of this platform.`,
  },
];

export default function Terms() {
  return (
    <div className="bg-white pt-16">
      {/* Header */}
      <section className="border-b border-stone-100 px-6 md:px-10 py-24 max-w-7xl mx-auto">
        <FadeUp>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4">Legal</p>
          <h1 className="text-5xl md:text-7xl font-semibold text-stone-900 tracking-tight leading-[0.94] max-w-2xl">
            Terms &<br /><span className="font-light italic text-stone-400">Conditions</span>
          </h1>
          <p className="mt-6 text-sm text-stone-400">Last updated: February 2026</p>
        </FadeUp>
      </section>

      {/* Content */}
      <section className="px-6 md:px-10 py-20 max-w-4xl mx-auto">
        <div className="space-y-12">
          {sections.map((sec, i) => (
            <FadeUp key={sec.title} delay={i * 0.04}>
              <div className="border-t border-stone-100 pt-10 first:border-0 first:pt-0">
                <h2 className="text-lg font-semibold text-stone-900 mb-4">{sec.title}</h2>
                <p className="text-stone-500 text-sm leading-relaxed">{sec.content}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}