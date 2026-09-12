import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import { lmsSupabase } from '../../config/lmsDb';
import { ArrowLeft, Users, GraduationCap, Search, ShieldCheck, Loader2 } from 'lucide-react';

export default function AlumniPage() {
  const { lang } = useLanguage();
  const currentLang = lang || 'EN';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAlumni = async () => {
      setLoading(true);
      // 👇 'Completed' স্ট্যাটাস দিয়ে ফিল্টার করা হয়েছে
      const { data, error } = await lmsSupabase
        .from('students')
        .select(`
          id,
          full_name,
          photo_link,
          enrollments!inner (
            course_name,
            course_status
          )
        `)
        .eq('enrollments.course_status', 'Completed')
        .order('created_at', { ascending: false });

      if (data && !error) {
        setAlumniData(data);
      }
      setLoading(false);
    };

    fetchAlumni();
  }, []);

  const filteredAlumni = alumniData.filter(student => 
    student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.enrollments?.[0]?.course_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center space-x-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft size={16} /> 
            <span>{currentLang === 'EN' ? 'Back to Home' : 'হোমপেজে ফিরে যান'}</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Users size={30} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
                  {currentLang === 'EN' ? 'CareerLift Alumni' : 'ক্যারিয়ারলিফ্ট অ্যালামনাই'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                  {currentLang === 'EN' ? 'Verified student records. Content copying is disabled for privacy.' : 'যাচাইকৃত প্রোফাইল। প্রাইভেসির জন্য ডেটা কপি করা বন্ধ রাখা হয়েছে।'}
                </p>
              </div>
            </div>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder={currentLang === 'EN' ? 'Search by name or course...' : 'নাম বা কোর্স দিয়ে খুঁজুন...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={40} className="animate-spin text-blue-500" />
          </div>
        ) : (
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 select-none"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          >
            {filteredAlumni.map((alumni) => {
              const courseName = alumni.enrollments?.[0]?.course_name || 'N/A';
              const photo = alumni.photo_link || `https://ui-avatars.com/api/?name=${encodeURIComponent(alumni.full_name)}&background=f1f5f9&color=0f172a`;

              return (
                <div key={alumni.id} className="flex items-center gap-3 p-3.5 bg-white border border-slate-200 rounded-2xl hover:shadow-md hover:border-blue-200 transition-all">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-100 shrink-0 overflow-hidden border border-slate-100">
                    <img 
                      src={photo} 
                      alt="Protected Profile" 
                      draggable={false}
                      className="w-full h-full object-cover pointer-events-none" 
                      onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(alumni.full_name)}&background=f1f5f9&color=0f172a`; }}
                    />
                  </div>
                  <div className="min-w-0 flex-1 relative">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{alumni.full_name}</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate flex items-center gap-1 mt-0.5">
                      <GraduationCap size={12} className="text-emerald-600 shrink-0" /> {courseName}
                    </p>
                  </div>
                </div>
              );
            })}

            {filteredAlumni.length === 0 && (
              <div className="col-span-full py-10 text-center text-slate-500 font-medium">
                No alumni records found.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}