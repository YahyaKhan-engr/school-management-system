import { motion } from 'framer-motion';

export default function ProgramCard({ icon, title, desc, grades }) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-100 dark:border-gray-700"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{desc}</p>
      <span className="inline-block text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
        {grades}
      </span>
    </motion.div>
  );
}
