import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { submitAdmission } from '../services/api';

const steps = [
  { step: '01', title: 'Submit Application', desc: 'Fill out the online form with student details.' },
  { step: '02', title: 'Document Review', desc: 'Our team reviews submitted documents within 3 days.' },
  { step: '03', title: 'Assessment', desc: 'Student attends a brief academic assessment.' },
  { step: '04', title: 'Enrollment', desc: 'Receive offer letter and complete enrollment.' },
];

export default function Admissions() {
  const [form, setForm] = useState({ name: '', email: '', class: '', message: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await submitAdmission(form);
      setStatus('success');
      setForm({ name: '', email: '', class: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="text-5xl font-extrabold mb-4">Admissions</h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Join our vibrant international community. Applications for 2026–27 are open.
          </p>
        </motion.div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Admission Process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 relative">
                <span className="text-5xl font-extrabold text-blue-100 dark:text-blue-900 absolute top-4 right-4">{s.step}</span>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 relative z-10">{s.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 relative z-10">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Apply Online</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Fill in the form and we'll get back to you within 48 hours.</p>
            </div>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Student Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. John Smith" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent/Guardian Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="parent@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Applying for Class *</label>
                <select name="class" value={form.class} onChange={handleChange} required
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select a class</option>
                  {['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Any special requirements or questions..." />
              </div>

              {status === 'success' && (
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 rounded-xl px-4 py-3 text-sm">
                  ✅ Application submitted successfully! We'll contact you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 rounded-xl px-4 py-3 text-sm">
                  ❌ Something went wrong. Please try again or contact us directly.
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition">
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
