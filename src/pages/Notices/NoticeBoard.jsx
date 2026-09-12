import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import { Calendar, ChevronRight, Newspaper, ArrowLeft, BellRing, Archive, Loader2 } from 'lucide-react';

export default function NoticeBoard() {
  const { lang } = useLanguage();
  const currentLang = lang || 'EN';

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // ডেটাবেস থেকে নোটিশগুলো ফেচ করা
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNotices = async () => {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error) {
        setNotices(data);
      }
      setLoading(false);
    };
    fetchNotices();
  }, []);

  // যদি ডেটাবেস খালি থাকে, তাহলে এই ডামি ডেটাগুলো দেখাবে
  const fallbackNotices = [
    { 
      id: "dummy-1", type_en: 'Notice', type_bn: 'নোটিশ', created_at: new Date().toISOString(), 
      title_en: 'Admission Going On: UK September Intake 2026', title_bn: 'ইউকে সেপ্টেম্বর ২০২৬ ইনটেকের ভর্তি চলছে', 
      desc_en: 'Apply now via OTHM Diploma and save up to 50% tuition fees with 2 years PSW. Seats are limited.', desc_bn: 'OTHM ডিপ্লোমার মাধ্যমে আবেদন করুন এবং ৫০% পর্যন্ত টিউশন ফি সাশ্রয় করুন। আসন সংখ্যা সীমিত।', 
      image_url: null 
    },
    { 
      id: "dummy-2", type_en: 'Event', type_bn: 'ইভেন্ট', created_at: new Date(Date.now() - 86400000 * 3).toISOString(), 
      title_en: 'Free Medical Camp & Caregiving Seminar', title_bn: 'ফ্রি মেডিকেল ক্যাম্প ও কেয়ারগিভিং সেমিনার', 
      desc_en: 'Join our free campus seminar to learn about Caregiving jobs in Japan and Europe.', desc_bn: 'জাপানে কেয়ারগিভিং জব সম্পর্কে বিস্তারিত জানতে আমাদের ফ্রি সেমিনারে অংশ নিন।', 
      image_url: '/hero img/image 4.jpg' 
    },
    { 
      id: "dummy-3", type_en: 'Update', type_bn: 'আপডেট', created_at: new Date(Date.now() - 86400000 * 15).toISOString(), 
      title_en: 'New NSDA Batch Starting Soon', title_bn: 'নতুন NSDA ব্যাচের ক্লাস শুরু হতে যাচ্ছে', 
      desc_en: 'The level-3 caregiving batch orientation will be held on the main campus auditorium.', desc_bn: 'লেভেল-৩ কেয়ারগিভিং ব্যাচের অরিয়েন্টেশন আগামী সপ্তাহে মূল ক্যাম্পাসের অডিটোরিয়ামে অনুষ্ঠিত হবে।', 
      image_url: null 
    }
  ];

  const displayNotices = notices.length > 0 ? notices : fallbackNotices;

  // তারিখ ফরম্যাট করার ফাংশন
  const formatDate = (dateString, lang) => {
    const date = new Date(dateString);
    if (lang === 'BN') return date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // ৭ দিনের কম পুরনো নোটিশগুলোকে 'New' হিসেবে মার্ক করার লজিক
  const isNoticeNew = (dateString) => {
    const noticeDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - noticeDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* ================= টপ নেভিগেশন ================= */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center space-x-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft size={16} /> 
            <span>{currentLang === 'EN' ? 'Back to Home' : 'হোমপেজে ফিরে যান'}</span>
          </Link>
        </div>

        {/* ================= পেজ হেডার ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 flex items-center justify-center shrink-0">
              <Newspaper size={30} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">
                {currentLang === 'EN' ? 'Official Notice Board' : 'অফিশিয়াল নোটিশ বোর্ড'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {currentLang === 'EN' ? 'Stay updated with our latest academic announcements and events.' : 'আমাদের সর্বশেষ একাডেমিক আপডেট, ভর্তি এবং ইভেন্ট সম্পর্কে জানুন।'}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>{currentLang === 'EN' ? 'New Updates' : 'নতুন নোটিশ'}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span>{currentLang === 'EN' ? 'Archived' : 'আর্কাইভ'}</span>
            </div>
          </div>
        </div>

        {/* ================= নোটিশ গ্রিড ================= */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={40} className="animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayNotices.map((notice) => {
              const isNew = isNoticeNew(notice.created_at);
              
              return (
                <Link 
                  key={notice.id} 
                  to={`/notice/${notice.id}`} 
                  className={`bg-white rounded-xl border flex flex-col shadow-sm hover:shadow-md transition-shadow group overflow-hidden ${
                    isNew ? 'border-blue-200' : 'border-slate-200'
                  }`}
                >
                  {/* নোটিশ ইমেজ */}
                  {notice.image_url ? (
                    <div className="relative h-48 w-full overflow-hidden shrink-0 bg-slate-100">
                      <img src={notice.image_url} alt="News" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                    </div>
                  ) : (
                    <div className={`h-2 w-full shrink-0 ${isNew ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                  )}
                  
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md border ${
                        notice.type_en === 'Notice' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                        notice.type_en === 'Event' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                        'bg-emerald-50 text-emerald-700 border-emerald-100'
                      }`}>
                        {currentLang === 'EN' ? notice.type_en : notice.type_bn}
                      </span>
                      
                      {isNew ? (
                        <span className="flex items-center space-x-1 text-[10px] font-black uppercase text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded animate-pulse">
                          <BellRing size={10} /> <span>{currentLang === 'EN' ? 'New' : 'নতুন'}</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 text-[10px] font-bold uppercase text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                          <Archive size={10} /> <span>{currentLang === 'EN' ? 'Archived' : 'আর্কাইভ'}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-1.5 text-slate-500 text-[11px] font-semibold mb-2.5">
                      <Calendar size={12} /><span>{formatDate(notice.created_at, currentLang)}</span>
                    </div>
                    
                    <h4 className={`text-base sm:text-lg font-bold leading-snug mb-2 group-hover:text-blue-600 transition-colors ${
                      isNew ? 'text-slate-900' : 'text-slate-700'
                    }`}>
                      {currentLang === 'EN' ? notice.title_en : notice.title_bn}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                      {currentLang === 'EN' ? notice.desc_en : notice.desc_bn}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      <span>{currentLang === 'EN' ? 'Read Complete Details' : 'সম্পূর্ণ নোটিশ পড়ুন'}</span> <ChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}