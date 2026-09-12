import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import { 
  LayoutDashboard, Users, FileText, Image, LogOut, 
  Menu, X, Bell, UserPlus, BookOpen, Trash2, Globe
} from 'lucide-react';

import ManageCourses from './ManageCourses';
import ManageGallery from './ManageGallery';
import ManageNotices from './ManageNotices';
import ManageAlumni from './ManageAlumni';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  
  const [inquiries, setInquiries] = useState([]);
  const [fetchingInquiries, setFetchingInquiries] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate('/cl-secure-gate-2026'); 
      else { setUser(session.user); setLoading(false); }
    };
    checkUser();
  }, [navigate]);

  useEffect(() => {
    if (activeMenu === 'inquiries' || activeMenu === 'study_abroad') {
      fetchInquiriesData();
    }
  }, [activeMenu]);

  // ডাইনামিক ফেচিং (যেই মেনুতে ক্লিক করবে, সেই টেবিল থেকে ডেটা আনবে)
  const fetchInquiriesData = async () => {
    setFetchingInquiries(true);
    const tableName = activeMenu === 'study_abroad' ? 'study_abroad_inquiries' : 'general_inquiries';
    
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) setInquiries(data);
    setFetchingInquiries(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    const tableName = activeMenu === 'study_abroad' ? 'study_abroad_inquiries' : 'general_inquiries';
    const { error } = await supabase.from(tableName).update({ status: newStatus }).eq('id', id);
    if (!error) setInquiries(inquiries.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const tableName = activeMenu === 'study_abroad' ? 'study_abroad_inquiries' : 'general_inquiries';
      const { error } = await supabase.from(tableName).delete().eq('id', id);
      if (!error) setInquiries(inquiries.filter(item => item.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/cl-secure-gate-2026');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'inquiries', label: 'General Inquiries', icon: <UserPlus size={20} /> },
    { id: 'study_abroad', label: 'Study Abroad Leads', icon: <Globe size={20} /> },
    { id: 'alumni', label: 'Alumni Database', icon: <Users size={20} /> },
    { id: 'courses', label: 'Manage Courses', icon: <BookOpen size={20} /> },
    { id: 'notices', label: 'Notice Board', icon: <FileText size={20} /> },
    { id: 'gallery', label: 'Gallery Images', icon: <Image size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col fixed md:relative z-50 h-screen shrink-0`}>
        <div className="h-20 flex items-center justify-between px-4 border-b border-slate-800">
          {isSidebarOpen && <span className="font-black text-xl tracking-wider text-blue-400">CareerLift<span className="text-white">.Admin</span></span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all ${
                activeMenu === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="shrink-0">{item.icon}</div>
              {isSidebarOpen && <span className="font-bold text-sm whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10">
            <LogOut size={20} className="shrink-0" />
            {isSidebarOpen && <span className="font-bold text-sm">Secure Logout</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          <h2 className="text-xl font-black text-slate-800">
            {menuItems.find(m => m.id === activeMenu)?.label || 'Dashboard'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-blue-700 font-black">AD</div>
              <div className="hidden md:block text-sm">
                <p className="font-bold text-slate-900">{user?.email}</p>
                <p className="text-xs text-emerald-500 font-bold">● Online</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
          
          {activeMenu === 'dashboard' && (
             <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl mt-8">
               <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
               <h3 className="text-2xl font-black mb-2">Welcome to Command Center!</h3>
               <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">Everything is securely connected to Supabase.</p>
             </div>
          )}

          {/* Combined View for both Tables */}
          {(activeMenu === 'inquiries' || activeMenu === 'study_abroad') && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">
                  {activeMenu === 'study_abroad' ? 'Study Abroad Submissions' : 'General Course Submissions'}
                </h3>
                <button onClick={fetchInquiriesData} className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-lg">
                  Refresh Data
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-xs tracking-wider">
                    <tr>
                      <th className="p-4">Date</th>
                      <th className="p-4">Student Info</th>
                      <th className="p-4">{activeMenu === 'study_abroad' ? 'Service & Destination' : 'Course Interest'}</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchingInquiries ? (
                      <tr><td colSpan="5" className="p-8 text-center text-slate-500 font-bold">Loading data...</td></tr>
                    ) : inquiries.length === 0 ? (
                      <tr><td colSpan="5" className="p-8 text-center text-slate-500">No records found.</td></tr>
                    ) : (
                      inquiries.map((item) => (
                        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-medium">{new Date(item.created_at).toLocaleDateString()}</td>
                          <td className="p-4">
                            <p className="font-bold text-slate-800">{item.name}</p>
                            <a href={`tel:${item.phone}`} className="text-blue-600 hover:underline">{item.phone}</a>
                          </td>
                          <td className="p-4">
                            {activeMenu === 'study_abroad' ? (
                              <>
                                <span className="font-semibold text-slate-700">{item.service_type}</span>
                                {item.destination && <span className="block text-xs text-slate-500 mt-1">Dest: {item.destination}</span>}
                              </>
                            ) : (
                              <span className="font-semibold text-slate-700">{item.interest}</span>
                            )}
                          </td>
                          <td className="p-4">
                            <select 
                              value={item.status} 
                              onChange={(e) => handleStatusChange(item.id, e.target.value)}
                              className={`text-xs font-bold rounded-full px-3 py-1 border outline-none cursor-pointer ${
                                item.status === 'Pending' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                item.status === 'Contacted' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>
                          <td className="p-4 text-center">
                            <button onClick={() => handleDelete(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 👇 Manage Courses View 👇 */}
          {activeMenu === 'courses' && (
            <ManageCourses />
          )}

          {/* 👇 Manage Gallery View 👇 */}
          {activeMenu === 'gallery' && (
            <ManageGallery />
          )}


          {/* 👇 Manage Notices View 👇 */}
          {activeMenu === 'notices' && (
            <ManageNotices />
          )}

          {/* 👇 Manage Alumni View 👇 */}
          {activeMenu === 'alumni' && (
            <ManageAlumni />
          )}

          {/* Placeholder Views for remaining menus */}
          {!['dashboard', 'inquiries', 'study_abroad', 'courses' , 'gallery' , 'notices', 'alumni'].includes(activeMenu) && (
            <div className="h-64 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-500">
              <h3 className="text-lg font-bold mb-1">{menuItems.find(m => m.id === activeMenu)?.label} Module</h3>
              <p className="text-sm">Database connection for this section will be implemented next.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}