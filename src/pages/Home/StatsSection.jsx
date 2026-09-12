import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronRight, Globe, TrendingUp, Users, Award, CheckCircle2, Calendar, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../config/supabase';

export default function StatsSection() {
  const { lang } = useLanguage();
  const currentLang = lang || 'EN';

  const [notices, setNotices] = useState([]);

  // ডেটাবেস থেকে লেটেস্ট ২টি নোটিশ ফেচ করা
  useEffect(() => {
    const fetchLatestNotices = async () => {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(2);

      if (data && !error && data.length > 0) {
        setNotices(data);
      }
    };
    fetchLatestNotices();
  }, []);

  const statsData = [
    { icon: <Globe size={18} className="text-blue-600" />, number: "50+", label: { EN: "Global Universities", BN: "পার্টনার ইউনিভার্সিটি" }, sub: { EN: "UK, Japan & Europe", BN: "ইউকে, জাপান ও ইউরোপ" }, bg: "bg-blue-50/50" },
    { icon: <TrendingUp size={18} className="text-emerald-600" />, number: "98%", label: { EN: "Visa Success", BN: "ভিসা সাফল্য" }, sub: { EN: "100% Legal Process", BN: "স্বচ্ছ প্রক্রিয়া" }, bg: "bg-emerald-50/50" },
    { icon: <Users size={18} className="text-purple-600" />, number: "500+", label: { EN: "Caregivers Deployed", BN: "কেয়ারগিভার কর্মরত" }, sub: { EN: "Top Medical Institutes", BN: "শীর্ষ হাসপাতালে" }, bg: "bg-purple-50/50" },
    { icon: <Award size={18} className="text-amber-600" />, number: "100%", label: { EN: "NSDA Approved", BN: "NSDA অনুমোদিত" }, sub: { EN: "Govt. Certification", BN: "সরকারি সার্টিফিকেট" }, bg: "bg-amber-50/50" }
  ];

  // যদি ডেটাবেসে নোটিশ না থাকে, তবে ডামি ডেটা দেখাবে
  const fallbackNotices = [
    {
      id: 'dummy-1',
      type_en: 'Important Notice', type_bn: 'গুরুত্বপূর্ণ নোটিশ',
      title_en: 'Admission Going On: UK September Intake 2026', title_bn: 'ইউকে সেপ্টেম্বর ২০২৬ ইনটেকের ভর্তি চলছে',
      desc_en: 'Apply now via OTHM Diploma and save up to 50% tuition fees with 2 years PSW. The application window is open for a limited time.', desc_bn: 'OTHM ডিপ্লোমার মাধ্যমে আবেদন করুন এবং ৫০% পর্যন্ত টিউশন ফি সাশ্রয় করুন। আসন সংখ্যা সীমিত, আজই আপনার অ্যাসেসমেন্ট সম্পন্ন করুন।',
      created_at: '2026-09-10T00:00:00',
      image_url: null
    },
    {
      id: 'dummy-2',
      type_en: 'Upcoming Event', type_bn: 'আপকামিং ইভেন্ট',
      title_en: 'Free Medical Camp & Caregiving Seminar', title_bn: 'ফ্রি মেডিকেল ক্যাম্প ও কেয়ারগিভিং সেমিনার',
      created_at: '2026-09-25T00:00:00',
      image_url: '/hero img/image 4.jpg'
    }
  ];

  const displayNotices = notices.length > 0 ? notices : fallbackNotices;

  // তারিখ ফরম্যাট করার ফাংশন
  const formatDate = (dateString, lang) => {
    const date = new Date(dateString);
    if (lang === 'BN') return date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="relative -mt-10 sm:-mt-14 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl p-4 sm:p-6 lg:p-8 rounded-3xl">
        
        {/* ================= পার্ট ১: কমপ্যাক্ট স্ট্যাটস রিবন ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8 sm:mb-10">
          {statsData.map((stat, idx) => (
            <div key={idx} className="flex items-center space-x-3 p-3 lg:p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all bg-white group">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${stat.bg}`}>
                {stat.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-base sm:text-lg lg:text-xl font-black text-slate-900 leading-none">{stat.number}</h4>
                <h5 className="text-[10px] sm:text-[11px] lg:text-xs font-bold text-slate-700 mt-0.5 truncate">{stat.label[currentLang]}</h5>
                <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium truncate">{stat.sub[currentLang]}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= পার্ট ২: নিউজ পোর্টাল ================= */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-5 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <Newspaper className="text-blue-600" />
            {currentLang === 'EN' ? 'Latest News & Events' : 'সর্বশেষ সংবাদ ও ইভেন্ট'}
          </h3>
          <Link to="/notices" className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1">
            {currentLang === 'EN' ? 'View All Notices' : 'সকল নোটিশ দেখুন'} <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {displayNotices.map((notice) => {
            // যদি ছবি না থাকে, তাহলে Text Card দেখাবে
            if (!notice.image_url) {
              return (
                <div key={notice.id} className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 lg:p-8 relative overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 uppercase tracking-wider">
                        {currentLang === 'EN' ? notice.type_en : notice.type_bn}
                      </span>
                      <div className="flex items-center space-x-1 text-slate-500 text-[10px] sm:text-xs font-medium">
                        <Calendar size={12} /><span>{formatDate(notice.created_at, currentLang)}</span>
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                        {currentLang === 'EN' ? notice.title_en : notice.title_bn}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {currentLang === 'EN' ? notice.desc_en : notice.desc_bn}
                      </p>
                    </div>
                  </div>
                  <Link to={`/notice/${notice.id}`} className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors mt-5">
                    <span>{currentLang === 'EN' ? 'Read Full Notice' : 'বিস্তারিত পড়ুন'}</span> <ChevronRight size={16} />
                  </Link>
                </div>
              );
            } 
            // যদি ছবি থাকে, তাহলে Image Card দেখাবে
            else {
              return (
                <Link key={notice.id} to={`/notice/${notice.id}`} className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow group h-full">
                  <div className="relative h-32 sm:h-40 lg:h-48 w-full overflow-hidden shrink-0">
                    <img src={notice.image_url} alt="Notice Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 uppercase tracking-wider shadow-sm">
                      {currentLang === 'EN' ? notice.type_en : notice.type_bn}
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 lg:p-6 flex flex-col justify-center flex-1 bg-white">
                    <div className="flex items-center space-x-1 text-slate-500 text-[10px] sm:text-xs font-medium mb-1.5">
                      <Calendar size={12} /><span>{formatDate(notice.created_at, currentLang)}</span>
                    </div>
                    <h4 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {currentLang === 'EN' ? notice.title_en : notice.title_bn}
                    </h4>
                  </div>
                </Link>
              );
            }
          })}
        </div>

        {/* ================= পার্ট ৩: ট্রাস্ট ফুটার রিবন ================= */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-700 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
            <CheckCircle2 className="text-emerald-600 shrink-0" size={16} />
            <span>{currentLang === 'EN' ? 'National Skills Development Authority (NSDA) Recognized' : 'প্রধানমন্ত্রীর কার্যালয়ের অধীনস্থ NSDA অনুমোদিত প্রতিষ্ঠান'}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-700 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
            <CheckCircle2 className="text-blue-600 shrink-0" size={16} />
            <span>{currentLang === 'EN' ? 'UK Regulated OTHM & QUALIFI Awarding Body Partner' : 'যুক্তরাজ্যের সরকারি শিক্ষা বোর্ড OTHM ও QUALIFI পার্টনার'}</span>
          </div>
        </div>

      </div>
    </div>
  );
}