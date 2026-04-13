import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await login(form);
      if (res.data.success) {
        loginUser(res.data.user, res.data.token);
        navigate(res.data.user.role === 'admin' ? '/admin' : '/portal');
      } else {
        setError(res.data.message || 'Invalid credentials');
      }
    } catch (err) {
      // Axios throws on 4xx/5xx — extract the message if available
      const msg = err?.response?.data?.message;
      if (msg) {
        setError(msg);
      } else if (err?.code === 'ERR_NETWORK' || err?.code === 'ECONNREFUSED') {
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                required placeholder="you@email.com"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                required placeholder="••••••••"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 text-red-700 dark:text-red-300 rounded-xl px-4 py-3 text-sm">
                ❌ {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">Register here</Link>
          </p>

          {/* Demo credentials hint */}
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-xs text-blue-700 dark:text-blue-300">
            <strong>Demo credentials:</strong><br />
            Admin: admin@school.edu / admin123<br />
            Student: student@school.edu / student123<br />
            <span className="text-gray-400 dark:text-gray-500 mt-1 block">
              Make sure XAMPP is running and you've visited<br />
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">localhost/school-backend/database/seed_users.php</code>
            </span>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
