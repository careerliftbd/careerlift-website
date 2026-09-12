import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home/Home';
import Courses from './pages/Courses/Courses';
import StudyAbroad from './pages/StudyAbroad/StudyAbroad';
import Services from './pages/Services/Services';
import AboutUs from './pages/AboutUs/AboutUs';
import NsdaFreeCourse from './pages/Courses/NsdaFreeCourse';
import CourseDetails from './pages/Courses/CourseDetails';
import AdminDashboard from './pages/Admin/AdminDashboard';
import NoticeBoard from './pages/Notices/NoticeBoard';
import NoticeDetails from './pages/Notices/NoticeDetails';
import GalleryPage from './pages/Gallery/GalleryPage';
import AlumniPage from './pages/Alumni/AlumniPage';
import AdminLogin from './pages/Admin/AdminLogin';

function ScrollToHashElement() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return null;
}

// 👇 অ্যাডমিন রুটগুলোতে সাধারণ Navbar ও Footer হাইড করার জন্য আপডেটেড লজিক
function LayoutWrapper() {
  const location = useLocation();
  // /admin অথবা /cl-secure দিয়ে শুরু হওয়া সব লিংকে Navbar/Footer হাইড হবে
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/cl-secure');

  return (
    <div className="min-h-screen flex flex-col justify-between relative overflow-hidden">
      
      {/* Decorative Background Glows (Only for public pages) */}
      {!isAdminRoute && (
        <>
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl -z-10 animate-pulse pointer-events-none"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl -z-10 animate-pulse pointer-events-none"></div>
        </>
      )}

      {/* Top Navigation (Hide on Admin Pages) */}
      {!isAdminRoute && <Navbar />}

      {/* Main Content Area */}
      <main className={isAdminRoute ? "w-full flex-grow" : "flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/study-abroad" element={<StudyAbroad />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/nsda-free-course" element={<NsdaFreeCourse />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          
          <Route path="/notices" element={<NoticeBoard />} />
          <Route path="/notice/:id" element={<NoticeDetails />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/alumni" element={<AlumniPage />} />
          
          {/* Admin Routes */}
          <Route path="/cl-secure-gate-2026" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Footer (Hide on Admin Pages) */}
      {!isAdminRoute && <Footer />}

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToHashElement />
      <LayoutWrapper />
    </Router>
  );
}