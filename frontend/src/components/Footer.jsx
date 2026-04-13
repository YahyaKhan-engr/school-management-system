import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">IS</div>
            <span className="font-bold text-white text-lg">IntlSchool</span>
          </div>
          <p className="text-sm text-gray-400">Empowering minds, shaping futures. Excellence in international education since 2005.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[['Home', '/'], ['About', '/about'], ['Admissions', '/admissions'], ['Contact', '/contact']].map(([l, t]) => (
              <li key={t}><Link to={t} className="hover:text-blue-400 transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Programs</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Primary School (Grades 1–5)</li>
            <li>Middle School (Grades 6–8)</li>
            <li>High School (Grades 9–12)</li>
            <li>IB Diploma Programme</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>📍 123 Education Ave, City</li>
            <li>📞 +1 (555) 123-4567</li>
            <li>✉️ info@intlschool.edu</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} International School. All rights reserved.
      </div>
    </footer>
  );
}
