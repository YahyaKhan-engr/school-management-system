import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useAuth } from '../context/AuthContext';
import { getStudents, addStudent, updateStudent, deleteStudent, getAdmissions, uploadResult } from '../services/api';

export default function AdminPanel() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentForm, setStudentForm] = useState({ name: '', class: '', email: '' });
  const [editId, setEditId] = useState(null);
  const [resultForm, setResultForm] = useState({ student_id: '', subject: '', marks: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    fetchStudents();
    fetchAdmissions();
  }, []);

  const fetchStudents = async () => {
    try { const r = await getStudents(); setStudents(r.data.data || []); } catch {}
  };
  const fetchAdmissions = async () => {
    try { const r = await getAdmissions(); setAdmissions(r.data.data || []); } catch {}
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateStudent(editId, studentForm);
        setMsg('Student updated!');
      } else {
        await addStudent(studentForm);
        setMsg('Student added!');
      }
      setStudentForm({ name: '', class: '', email: '' });
      setEditId(null);
      fetchStudents();
    } catch { setMsg('Error saving student.'); }
    setLoading(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const handleEdit = (s) => {
    setStudentForm({ name: s.name, class: s.class, email: s.email });
    setEditId(s.id);
    setTab('students');
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this student?')) return;
    try { await deleteStudent(id); fetchStudents(); } catch {}
  };

  const handleResultSubmit = async (e) => {
    e.preventDefault();
    try {
      await uploadResult(resultForm);
      setMsg('Result uploaded!');
      setResultForm({ student_id: '', subject: '', marks: '' });
    } catch { setMsg('Error uploading result.'); }
    setTimeout(() => setMsg(''), 3000);
  };

  const tabs = ['dashboard', 'students', 'admissions', 'results'];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-8 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p className="text-gray-300 text-sm mt-1">Logged in as {user?.name} 🔐</p>
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
          {msg && (
            <div className="mb-4 bg-green-50 dark:bg-green-900/30 border border-green-200 text-green-700 dark:text-green-300 rounded-xl px-4 py-3 text-sm">
              ✅ {msg}
            </div>
          )}

          {/* Dashboard */}
          {tab === 'dashboard' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                {[
                  { label: 'Total Students', value: students.length, icon: '👨‍🎓' },
                  { label: 'Pending Admissions', value: admissions.length, icon: '📋' },
                  { label: 'Active Classes', value: 12, icon: '🏫' },
                ].map((s) => (
                  <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-100 dark:border-gray-700">
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{s.value}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Students</h3>
                {students.length === 0 ? (
                  <p className="text-gray-500 text-sm">No students yet. Add some from the Students tab.</p>
                ) : (
                  <div className="space-y-2">
                    {students.slice(0, 5).map((s) => (
                      <div key={s.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-sm text-gray-900 dark:text-white">{s.name}</span>
                        <span className="text-xs text-gray-500">{s.class}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Students */}
          {tab === 'students' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-100 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">{editId ? 'Edit Student' : 'Add Student'}</h3>
                  <form onSubmit={handleStudentSubmit} className="space-y-4">
                    {[
                      { name: 'name', label: 'Full Name', placeholder: 'John Smith' },
                      { name: 'email', label: 'Email', placeholder: 'student@email.com' },
                      { name: 'class', label: 'Class', placeholder: 'Grade 10' },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
                        <input value={studentForm[f.name]} placeholder={f.placeholder}
                          onChange={(e) => setStudentForm({ ...studentForm, [f.name]: e.target.value })} required
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <button type="submit" disabled={loading}
                        className="flex-1 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold py-2 rounded-xl transition">
                        {loading ? 'Saving...' : editId ? 'Update' : 'Add Student'}
                      </button>
                      {editId && (
                        <button type="button" onClick={() => { setEditId(null); setStudentForm({ name: '', class: '', email: '' }); }}
                          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Table */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden border border-gray-100 dark:border-gray-700">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="font-bold text-gray-900 dark:text-white">All Students ({students.length})</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          {['Name', 'Email', 'Class', 'Actions'].map(h => (
                            <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {students.length === 0 ? (
                          <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No students found</td></tr>
                        ) : students.map((s) => (
                          <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{s.name}</td>
                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{s.email}</td>
                            <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{s.class}</td>
                            <td className="px-4 py-3 flex gap-2">
                              <button onClick={() => handleEdit(s)}
                                className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-lg hover:bg-blue-200 transition">
                                Edit
                              </button>
                              <button onClick={() => handleDelete(s.id)}
                                className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded-lg hover:bg-red-200 transition">
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Admissions */}
          {tab === 'admissions' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Admission Applications ({admissions.length})</h2>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        {['Name', 'Email', 'Class', 'Message', 'Date'].map(h => (
                          <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {admissions.length === 0 ? (
                        <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No applications yet</td></tr>
                      ) : admissions.map((a) => (
                        <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{a.name}</td>
                          <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{a.email}</td>
                          <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{a.class}</td>
                          <td className="px-4 py-3 text-gray-500 dark:text-gray-400 max-w-xs truncate">{a.message}</td>
                          <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{a.created_at?.split('T')[0]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {tab === 'results' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="max-w-md">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upload Results</h2>
                <form onSubmit={handleResultSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Student ID</label>
                    <input value={resultForm.student_id} onChange={(e) => setResultForm({ ...resultForm, student_id: e.target.value })}
                      required placeholder="Student ID number"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                    <input value={resultForm.subject} onChange={(e) => setResultForm({ ...resultForm, subject: e.target.value })}
                      required placeholder="e.g. Mathematics"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marks (out of 100)</label>
                    <input type="number" min="0" max="100" value={resultForm.marks}
                      onChange={(e) => setResultForm({ ...resultForm, marks: e.target.value })} required placeholder="85"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                  <button type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold py-2.5 rounded-xl transition">
                    Upload Result
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
