import { motion } from 'framer-motion';

export default function StatCard({ icon, value, label }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center gap-2 text-center"
    >
      <div className="text-4xl">{icon}</div>
      <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">{value}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    </motion.div>
  );
}
