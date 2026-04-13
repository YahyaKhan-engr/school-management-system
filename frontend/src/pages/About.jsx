import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const values = [
  { icon: '🌟', title: 'Excellence', desc: 'We set high standards and support every student to reach their full potential.' },
  { icon: '🤝', title: 'Integrity', desc: 'Honesty and ethical behavior are the cornerstones of our community.' },
  { icon: '🌍', title: 'Global Citizenship', desc: 'We celebrate diversity and prepare students for a connected world.' },
  { icon: '💡', title: 'Innovation', desc: 'Creative thinking and problem-solving are embedded in everything we do.' },
];

const team = [
  { name: 'Dr. Sarah Mitchell', role: 'Principal', emoji: '👩‍💼' },
  { name: 'Mr. James Okafor', role: 'Vice Principal', emoji: '👨‍💼' },
  { name: 'Ms. Priya Sharma', role: 'Head of Academics', emoji: '👩‍🏫' },
  { name: 'Mr. Carlos Rivera', role: 'Head of Student Affairs', emoji: '👨‍🏫' },
];

export default function About() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="text-5xl font-extrabold mb-4">About Our School</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Two decades of transforming lives through world-class international education.
          </p>
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          {[
            { title: '🔭 Our Vision', text: 'To be the leading international school that inspires lifelong learners and compassionate global citizens who make a positive difference in the world.' },
            { title: '🎯 Our Mission', text: 'We provide an exceptional, inquiry-based education in a nurturing multicultural environment, empowering students with the knowledge, skills, and values to thrive in a rapidly changing world.' },
          ].map((item) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-blue-50 dark:bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Principal Message */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <div className="text-7xl mb-4">👩‍💼</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Message from the Principal</h2>
            <blockquote className="text-lg text-gray-600 dark:text-gray-400 italic leading-relaxed mb-6">
              "At International School, we believe every child is unique and capable of extraordinary things. Our dedicated team works tirelessly to create an environment where curiosity is celebrated, challenges are embraced, and every student feels valued and supported. We are not just educating students — we are shaping the future."
            </blockquote>
            <p className="font-bold text-gray-900 dark:text-white">Dr. Sarah Mitchell</p>
            <p className="text-sm text-gray-500">Principal, International School</p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Leadership Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow border border-gray-100 dark:border-gray-700">
                <div className="text-6xl mb-3">{m.emoji}</div>
                <h3 className="font-bold text-gray-900 dark:text-white">{m.name}</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
