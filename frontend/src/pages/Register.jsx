import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { register } from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await register(form);
      if (res.data.success) {
        navigate('/login');
      } else {
        setError(res.data.message || 'Registration failed');
      }
    } catch (err) {
      const msg = err?.response?.data?.message;
      if (msg) {
        setError(msg);
      } else if (err?.code === 'ERR_NETWORK') {
        setError('Cannot reach server. Make sure XAMPP is running and backend is in htdocs/school-backend.');
      } else {
        setError('Server error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center px-4 py-16">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">IS</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Register for the student portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Smith' },
              { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@email.com' },
              { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
                <input type={f.type} value={form[f.name]} placeholder={f.placeholder}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} required
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            ))}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 text-red-700 dark:text-red-300 rounded-xl px-4 py-3 text-sm">
                ❌ {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition">
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
