import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import About from '../pages/About';
import Admissions from '../pages/Admissions';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import StudentPortal from '../pages/StudentPortal';
import AdminPanel from '../pages/AdminPanel';

export default function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/portal" element={<StudentPortal />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </AnimatePresence>
  );
}
