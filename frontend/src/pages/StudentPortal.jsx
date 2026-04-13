import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useAuth } from '../context/AuthContext';
import { getResults, getAttendance } from '../services/api';

const timetable = [
  { day: 'Monday', periods: ['Math', 'English', 'Science', 'PE', 'Art'] },
  { day: 'Tuesday', periods: ['English', 'History', 'Math', 'Music', 'Science'] },
  { day: 'Wednesday', periods: ['Science', 'Math', 'English', 'ICT', 'PE'] },
  { day: 'Thursday', periods: ['History', 'Art', 'Math', 'English', 'Science'] },
  { day: 'Friday', periods: ['ICT', 'English', 'PE', 'Math', 'Music'] },
];

const dummyResults = [
  { subject: 'Mathematics', marks: 92, grade: 'A' },
  { subject: 'English', marks: 88, grade: 'A' },
  { subject: 'Science', marks: 85, grade: 'B+' },
  { subject: 'History', marks: 79, grade: 'B' },
  { subject: 'ICT', marks: 95, grade: 'A+' },
];

const dummyAttendance = [
  { date: '2026-04-01', status: 'Present' },
  { date: '2026-04-02', status: 'Present' },
  { date: '2026-04-03', status: 'Absent' },
  { date: '2026-04-07', status: 'Present' },
  { date: '2026-04-08', status: 'Present' },
  { date: '2026-04-09', status: 'Late' },
  { date: '2026-04-10', status: 'Present' },
];

export default function StudentPortal() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('dashboard');
  const [results, setResults] = useState(dummyResults);
  const [attendance, setAttendance] = useState(dummyAttendance);

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      getResults(user.id).then(r => { if (r.data?.data?.length) setResults(r.data.data); }).catch(() => {});
      getAttendance(user.id).then(r => { if (r.data?.data?.length) setAttendance(r.data.data); }).catch(() => {});
    }
  }, [user]);

  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const attendancePct = Math.round((presentCount / attendance.length) * 100);
  const avgMarks = Math.round(results.reduce((s, r) => s + Number(r.marks), 0) / results.length);

  const tabs = ['dashboard', 'results', 'attendance', 'timetable'];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Portal Header */}
        <div className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white py-8 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Student Portal</h1>
              <p className="text-blue-200 text-sm mt-1">Welcome back, {user?.name} 👋</p>
            </div>
            <button onClick={() => { logoutUser(); navigate('/'); }}
              className="bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-2 rounded-lg transition">
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-4 text-sm font-medium capitalize border-b-2 transition whitespace-nowrap ${
                  tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Dashboard */}
          {tab === 'dashboard' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                {[
                  { label: 'Attendance', value: `${attendancePct}%`, icon: '📅', color: 'blue' },
                  { label: 'Average Marks', value: `${avgMarks}/100`, icon: '📊', color: 'green' },
                  { label: 'Subjects', value: results.length, icon: '📚', color: 'purple' },
                ].map((s) => (
                  <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-100 dark:border-gray-700">
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{s.value}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Results</h3>
                <div className="space-y-3">
                  {results.slice(0, 3).map((r) => (
                    <div key={r.subject} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{r.subject}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${r.marks}%` }} />
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white w-8">{r.marks}</span>
                        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">{r.grade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {tab === 'results' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Academic Results</h2>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      {['Subject', 'Marks', 'Grade', 'Status'].map(h => (
                        <th key={h} className="px-6 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {results.map((r) => (
                      <tr key={r.subject} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{r.subject}</td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{r.marks}/100</td>
                        <td className="px-6 py-4">
                          <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-bold">{r.grade}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${r.marks >= 80 ? 'bg-green-100 text-green-700' : r.marks >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                            {r.marks >= 80 ? 'Excellent' : r.marks >= 60 ? 'Good' : 'Needs Improvement'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Attendance */}
          {tab === 'attendance' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance Record</h2>
                <span className="text-lg font-bold text-blue-600">{attendancePct}% Present</span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      {['Date', 'Status'].map(h => (
                        <th key={h} className="px-6 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {attendance.map((a) => (
                      <tr key={a.date} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{a.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            a.status === 'Present' ? 'bg-green-100 text-green-700' :
                            a.status === 'Absent' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>{a.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Timetable */}
          {tab === 'timetable' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Weekly Timetable</h2>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Day</th>
                      {['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5'].map(p => (
                        <th key={p} className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">{p}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {timetable.map((row) => (
                      <tr key={row.day} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{row.day}</td>
                        {row.periods.map((p, i) => (
                          <td key={i} className="px-4 py-3">
                            <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-lg text-xs">{p}</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
