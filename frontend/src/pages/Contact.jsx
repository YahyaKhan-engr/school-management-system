import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, connect to a PHP mail endpoint
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">We'd love to hear from you. Reach out anytime.</p>
        </motion.div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
            <div className="space-y-5">
              {[
                { icon: '📍', label: 'Address', value: '123 Education Avenue, Knowledge City, 10001' },
                { icon: '📞', label: 'Phone', value: '+1 (555) 123-4567' },
                { icon: '✉️', label: 'Email', value: 'info@intlschool.edu' },
                { icon: '🕐', label: 'Office Hours', value: 'Mon–Fri: 7:30 AM – 4:30 PM' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{item.label}</p>
                    <p className="text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Map Embed */}
            <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                title="School Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291865!2d-73.98784368459418!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1617000000000!5m2!1sen!2sus"
                width="100%" height="250" style={{ border: 0 }} allowFullScreen loading="lazy"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 space-y-5 shadow">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send a Message</h2>
              {[
                { name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Smith' },
                { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@email.com' },
                { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Inquiry about admissions' },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
                  <input name={f.name} type={f.type} value={form[f.name]}
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    required placeholder={f.placeholder}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea name="message" value={form.message} rows={5} required
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              {sent && (
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 text-green-700 dark:text-green-300 rounded-xl px-4 py-3 text-sm">
                  ✅ Message sent! We'll respond within 24 hours.
                </div>
              )}
              <button type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
