import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import StatCard from '../components/StatCard';
import ProgramCard from '../components/ProgramCard';

const programs = [
  { icon: '🎒', title: 'Primary School', desc: 'Building strong foundations through play-based and inquiry learning.', grades: 'Grades 1–5' },
  { icon: '📚', title: 'Middle School', desc: 'Developing critical thinking and collaborative skills.', grades: 'Grades 6–8' },
  { icon: '🎓', title: 'High School', desc: 'Rigorous academics preparing students for top universities.', grades: 'Grades 9–12' },
  { icon: '🌍', title: 'IB Diploma', desc: 'Internationally recognized programme for global citizens.', grades: 'Grades 11–12' },
];

const events = [
  { date: 'Apr 20', title: 'Science Fair 2026', desc: 'Annual inter-school science exhibition.' },
  { date: 'May 5', title: 'Sports Day', desc: 'Track & field events for all grades.' },
  { date: 'May 18', title: 'Cultural Night', desc: 'Celebrating diversity through arts and performance.' },
];

export default function Home() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div key={i}
              className="absolute rounded-full bg-white"
              style={{ width: Math.random() * 80 + 20, height: Math.random() * 80 + 20, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block bg-blue-500/30 border border-blue-400/40 text-blue-200 text-sm px-4 py-1 rounded-full mb-6">
              🏆 Ranked #1 International School 2025
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Shaping<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-200">
                Tomorrow's Leaders
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-xl mb-8">
              A world-class international education that nurtures curiosity, builds character, and prepares students for a global future.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/admissions"
                className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition shadow-lg">
                Apply Now
              </Link>
              <Link to="/about"
                className="border border-white/50 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard icon="👨‍🎓" value="2,400+" label="Students Enrolled" />
          <StatCard icon="👩‍🏫" value="180+" label="Expert Teachers" />
          <StatCard icon="🌍" value="45+" label="Nationalities" />
          <StatCard icon="🏆" value="98%" label="University Acceptance" />
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">About Us</span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              Excellence in Education Since 2005
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              International School is a premier institution offering world-class education from primary through high school. Our IB-accredited curriculum, state-of-the-art facilities, and dedicated faculty create an environment where every student thrives.
            </p>
            <Link to="/about" className="inline-block bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition font-semibold">
              Discover Our Story
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4">
            {['🔬 Science Labs', '🎨 Arts Studio', '⚽ Sports Complex', '💻 Tech Center'].map((item) => (
              <div key={item} className="bg-blue-50 dark:bg-gray-800 rounded-2xl p-5 text-center font-medium text-gray-700 dark:text-gray-300 text-sm">
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Academics</span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-2">Our Programs</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((p) => <ProgramCard key={p.title} {...p} />)}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">What's On</span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-2">Upcoming Events</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((e) => (
              <motion.div key={e.title} whileHover={{ y: -4 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                  {e.date}
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-3 mb-1">{e.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Applications for the 2026–27 academic year are now open. Secure your child's future today.</p>
          <Link to="/admissions"
            className="bg-white text-blue-800 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow-xl text-lg">
            Start Your Application
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  );
}
