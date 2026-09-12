import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Users, ChevronRight, Loader2, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { lmsSupabase } from '../../config/lmsDb';

export default function AlumniSection() {
  const { lang } = useLanguage();
  const currentLang = lang || 'EN';
  
  const [alumniData, setAlumniData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestAlumni = async () => {
      setLoading(true);
      // 'Completed' স্ট্যাটাস দিয়ে ফিল্টার করা হয়েছে
      const { data, count, error } = await lmsSupabase
        .from('students')
        .select(`
          id,
          full_name,
          photo_link,
          enrollments!inner (
            course_name,
            course_status
          )
        `, { count: 'exact' })
        .eq('enrollments.course_status', 'Completed')
        .order('created_at', { ascending: false })
        .limit(10);

      if (data && !error) {
        setAlumniData(data);
        setTotalCount(count || data.length);
      }
      setLoading(false);
    };

    fetchLatestAlumni();
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center justify-center sm:justify-start space-x-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">
              <Users size={16} /> <span>{currentLang === 'EN' ? 'Alumni Network' : 'অ্যালামনাই নেটওয়ার্ক'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {currentLang === 'EN' ? 'Our Successful Students' : 'আমাদের সফল শিক্ষার্থীবৃন্দ'}
            </h2>
          </div>
          
          <Link to="/alumni" className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:border-blue-200 hover:shadow-md transition-all flex items-center gap-1 shrink-0">
            {currentLang === 'EN' ? `View All ${totalCount > 0 ? totalCount + '+' : ''} Alumni` : `সকল ${totalCount > 0 ? totalCount + '+' : ''} শিক্ষার্থী দেখুন`} <ChevronRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-10"><Loader2 size={32} className="animate-spin text-blue-500" /></div>
        ) : alumniData.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-sm font-medium border-2 border-dashed border-slate-300 rounded-2xl bg-white">
            No alumni data available yet.
          </div>
        ) : (
          <div 
            className="flex overflow-x-auto gap-3 sm:gap-4 pb-6 snap-x snap-mandatory scroll-smooth select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onContextMenu={(e) => e.preventDefault()} 
            onDragStart={(e) => e.preventDefault()}
          >
            {alumniData.map((alumni) => {
              const courseName = alumni.enrollments?.[0]?.course_name || 'N/A';
              const photo = alumni.photo_link || `https://ui-avatars.com/api/?name=${encodeURIComponent(alumni.full_name)}&background=f1f5f9&color=0f172a`;

              return (
                <div 
                  key={alumni.id} 
                  // AlumniPage এর ডিজাইনের সাথে মিল রেখে w-[260px] করা হয়েছে যেন বামে ছবি ও ডানে টেক্সট সুন্দরভাবে বসে
                  className="flex-shrink-0 w-[260px] sm:w-[280px] snap-start flex items-center gap-3 p-3.5 bg-white border border-slate-200 rounded-2xl hover:shadow-md hover:border-blue-200 transition-all cursor-grab active:cursor-grabbing"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-100 shrink-0 overflow-hidden border border-slate-100">
                    <img 
                      src={photo} 
                      alt="Alumni Profile" 
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
          </div>
        )}
      </div>
    </section>
  );
}