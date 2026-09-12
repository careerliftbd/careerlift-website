import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Award, BookOpen, Users, HelpCircle, 
  Sparkles, ArrowRight, Building, CheckCircle2, Target, 
  FileCheck, Globe, Zap, HeartHandshake, Phone, MapPin, ChevronDown
} from 'lucide-react';
import NeoButton from '../../components/ui/NeoButton';
import { supabase } from '../../config/supabase';


export default function NsdaFreeCourse() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Live Consultation Form State for Lead Capture
  const [formData, setFormData] = useState({ 
    name: '', phone: '', interest: '🎉 NSDA Free Course (Scholarship / স্কলারশিপ)', source: 'NSDA Free Course Page'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ LIVE GOOGLE SHEETS API INTEGRATION
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('general_inquiries').insert([
        { name: formData.name, phone: formData.phone, interest: formData.interest }
      ]);
      if (error) throw error;
      setSubmitSuccess(true);
      setFormData({ name: '', phone: '', interest: formData.interest }); // বা পেজ অনুযায়ী ডিফল্ট ভ্যালু
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* ================= 1. OFFICIAL PARTNERS LOGO BANNER ================= */}
      <section className="bg-white border-b border-slate-200/80 py-5 sm:py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
            <div>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত উদ্যোগ
              </span>
              <h2 className="text-xs sm:text-base font-bold text-slate-700 mt-1.5 sm:mt-2">
                প্রধানমন্ত্রীর কার্যালয়ের অধীনস্থ জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষ (NSDA) ও ASSET প্রজেক্ট
              </h2>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 bg-slate-50 px-4 sm:px-6 py-3 rounded-2xl border border-slate-200/60 shadow-inner">
              <img src="/NSDA.png" alt="NSDA" className="h-8 sm:h-11 w-auto object-contain hover:scale-110 transition-transform" title="National Skills Development Authority" />
              <img src="/asset project logo.png" alt="ASSET" className="h-8 sm:h-11 w-auto object-contain hover:scale-110 transition-transform" title="ASSET Project" />
              <div className="h-6 w-px bg-slate-300 hidden sm:block"></div>
              <img src="/careerlift-logo.png" alt="CareerLift" className="h-7 sm:h-9 w-auto object-contain hover:scale-110 transition-transform" title="CareerLift Institute" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. HERO SECTION ================= */}
      <section className="bg-slate-900 text-white pt-12 sm:pt-16 pb-16 sm:pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-black text-[10px] sm:text-xs uppercase tracking-wider backdrop-blur-md">
            <Sparkles size={14} />
            <span>১০০% সরকারি স্কলারশিপ ও বিনামূল্যে দক্ষতা উন্নয়ন প্রশিক্ষণ</span>
          </div>

          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            কেন ও কীভাবে আমাদের কোর্সসমূহ <br className="hidden sm:block"/>
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              সম্পূর্ণ বিনামূল্যে (100% FREE)?
            </span>
          </h1>

          <p className="text-xs sm:text-lg text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto">
            দেশের যুবসমাজ ও পিছিয়ে পড়া জনগোষ্ঠীকে আন্তর্জাতিক মানের কারিগরি শিক্ষায় দক্ষ করে তুলতে গণপ্রজাতন্ত্রী বাংলাদেশ সরকার এবং বিশ্বব্যাংকের যৌথ অর্থায়নে পরিচালিত যুগান্তকারী স্কিল ডেভেলপমেন্ট প্রকল্প।
          </p>

          <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold text-slate-300">
            <span className="flex items-center bg-white/10 px-3.5 py-2 rounded-xl border border-white/10"><ShieldCheck className="mr-2 text-emerald-400" size={16}/> কোনো গোপন খরচ নেই (Zero Hidden Cost)</span>
            <span className="flex items-center bg-white/10 px-3.5 py-2 rounded-xl border border-white/10"><Award className="mr-2 text-amber-400" size={16}/> সরকারি ও রাষ্ট্রীয় সনদ প্রদান</span>
          </div>
        </div>
      </section>

      {/* ================= 3. WHY & HOW IS IT FREE? (10-MIN SCHOOL RESPONSIVE GRID) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-14 shadow-xl border border-slate-200/80">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-lg mb-2">
              <HelpCircle size={13} />
              <span>স্বচ্ছতা ও অর্থায়নের উৎস</span>
            </div>
            <h2 className="text-xl sm:text-4xl font-black text-slate-900 leading-tight">
              এই কোর্সগুলো কেন সম্পূর্ণ ফ্রি এবং কীভাবে পরিচালিত হয়?
            </h2>
          </div>

          {/* 👇 মোবাইলে grid-cols-2 (পাশাপাশি ২টি কার্ড), ডেস্কটপে ৩টি */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8 text-slate-600 font-medium">
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-8 border border-slate-200/60 space-y-3 sm:space-y-4 hover:border-emerald-300 transition">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-base sm:text-xl">
                01
              </div>
              <h3 className="text-sm sm:text-lg font-black text-slate-900 leading-snug">সরকারি ও বিশ্বব্যাংকের অর্থায়ন</h3>
              <p className="text-[11px] sm:text-sm leading-relaxed">
                এই প্রশিক্ষণের যাবতীয় টিউশন ফি, ল্যাব খরচ এবং প্রশিক্ষকদের সম্মানী বাংলাদেশ সরকার এবং বিশ্বব্যাংকের (World Bank) ASSET প্রজেক্টের তহবিল থেকে সরাসরি বহন করা হয়।
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 sm:p-8 border border-slate-200/60 space-y-3 sm:space-y-4 hover:border-blue-300 transition">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-base sm:text-xl">
                02
              </div>
              <h3 className="text-sm sm:text-lg font-black text-slate-900 leading-snug">ক্যারিয়ারলিফটের প্রাতিষ্ঠানিক ভূমিকা</h3>
              <p className="text-[11px] sm:text-sm leading-relaxed">
                ক্যারিয়ারলিফ্ট ইনস্টিটিউট সরকারের অনুমোদিত ও কঠোর মানদণ্ডে যাচাইকৃত একটি প্রাতিষ্ঠানিক পার্টনার। আমরা সরকারের সিলেবাস অনুযায়ী ল্যাব-ভিত্তিক হাতে-কলমে প্রশিক্ষণ পরিচালনা করি।
              </p>
            </div>

            <div className="col-span-2 md:col-span-1 bg-slate-50 rounded-2xl p-4 sm:p-8 border border-slate-200/60 space-y-3 sm:space-y-4 hover:border-purple-300 transition">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-base sm:text-xl">
                03
              </div>
              <h3 className="text-sm sm:text-lg font-black text-slate-900 leading-snug">বিনামূল্যে এসেসমেন্ট ও সনদ</h3>
              <p className="text-[11px] sm:text-sm leading-relaxed">
                প্রশিক্ষণ শেষে NSDA কর্তৃক গৃহীত সরকারি পরীক্ষার ফি এবং রাষ্ট্রীয় সার্টিফিকেটের যাবতীয় খরচ প্রজেক্টের আওতাভুক্ত থাকায় এটি সম্পূর্ণ ফ্রি।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. ABOUT NSDA ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-14 border border-slate-800 shadow-xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center relative z-10">
            
            <div className="lg:col-span-4 text-center lg:text-left space-y-4 sm:space-y-6">
              <div className="bg-white p-5 sm:p-6 rounded-3xl inline-block shadow-lg mx-auto lg:mx-0">
                <img src="/NSDA.png" alt="NSDA Logo" className="h-24 sm:h-32 w-auto object-contain mx-auto" />
              </div>
              <div>
                <span className="text-emerald-400 font-black text-[10px] sm:text-xs uppercase tracking-widest block mb-1">
                  National Skills Development Authority
                </span>
                <h3 className="text-xl sm:text-3xl font-black leading-tight">
                  জাতীয় দক্ষতা উন্নয়ন কর্তৃপক্ষ (NSDA)
                </h3>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 text-xs text-slate-200 font-medium leading-relaxed flex items-center space-x-3 shadow-inner text-left">
                <div className="bg-white/90 p-1.5 rounded-xl flex-shrink-0">
                  <img src="/Government Seal of Bangladesh.png" alt="Govt Seal" className="w-9 h-9 object-contain" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">রাষ্ট্রীয় প্রশাসনিক পরিচয়</span>
                  গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের <strong className="text-white font-black underline">প্রধানমন্ত্রীর কার্যালয়ের</strong> সরাসরি অধীনস্থ কর্তৃপক্ষ।
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                <Target size={13} />
                <span>NSDA-এর মূলমন্ত্র ও লক্ষ্য</span>
              </div>
              
              <h2 className="text-xl sm:text-4xl font-black tracking-tight leading-snug">
                "দক্ষ জনশক্তি, সমৃদ্ধ দেশ"— এই মূলমন্ত্রে বাংলাদেশের কারিগরি শিক্ষাকে বিশ্বমানে উন্নীতকরণ।
              </h2>

              <p className="text-slate-300 text-xs sm:text-base leading-relaxed font-normal">
                বাংলাদেশের বিপুল শ্রমশক্তিকে আন্তর্জাতিক চাকরির বাজারের উপযোগী করে গড়ে তুলতে ২০১৮ সালে প্রধানমন্ত্রীর কার্যালয়ের অধীনে NSDA প্রতিষ্ঠিত হয়। এর মূল লক্ষ্য হলো দেশের সকল কারিগরি ও বৃত্তিমূলক প্রশিক্ষণের মান নিয়ন্ত্রণ করা এবং এমন রাষ্ট্রীয় সনদ প্রদান করা যা দেশ ও বিদেশে সমানভাবে গ্রহণযোগ্য।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 flex items-start space-x-3">
                  <CheckCircle2 className="text-emerald-400 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white">আন্তর্জাতিক মানদণ্ড (NTVQF)</h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">ন্যাশনাল টেকনিক্যাল অ্যান্ড ভোকেশনাল কোয়ালিফিকেশন ফ্রেমওয়ার্ক অনুযায়ী লেভেলভিত্তিক প্রশিক্ষণ।</p>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 flex items-start space-x-3">
                  <Globe className="text-blue-400 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white">গ্লোবাল রিকগনিশন</h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">জাপান, ইউকে, কানাডা ও মধ্যপ্রাচ্যের দেশগুলোতে কর্মসংস্থানের জন্য সরকারি সনদের বৈধতা।</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 5. ABOUT ASSET PROJECT ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-14 border border-slate-200/80 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full">
                <Zap size={13} />
                <span>ASSET প্রজেক্ট পরিচিতি ও উদ্দেশ্য</span>
              </div>

              <h2 className="text-xl sm:text-4xl font-black text-slate-900 leading-tight">
                ASSET: অর্থনৈতিক রূপান্তরের জন্য দক্ষতা ত্বরান্বিত ও শক্তিশালীকরণ প্রকল্প
              </h2>

              <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-medium">
                <strong>ASSET (Accelerating and Strengthening Skills for Economic Transformation)</strong> হলো শিক্ষা মন্ত্রণালয়ের কারিগরি ও মাদ্রাসা শিক্ষা বিভাগের অধীনস্থ এবং বিশ্বব্যাংকের অর্থায়নে পরিচালিত একটি মেগা প্রজেক্ট।
              </p>

              <div className="space-y-2.5 pt-1">
                <h4 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider">ASSET প্রজেক্ট কেন বিনামূল্যে প্রশিক্ষণ দিচ্ছে?</h4>
                <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700 font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                  <span><strong>বেকারত্ব দূরীকরণ:</strong> পুঁজির অভাবে যেন কোনো আগ্রহী তরুণ-তরুণী কারিগরি শিক্ষা থেকে বঞ্চিত না হয়।</span>
                </div>
                <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700 font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                  <span><strong>শিল্প ও কর্মসংস্থানের সংযোগ:</strong> শুধুমাত্র সার্টিফিকেট নয়, বরং ইন্ডাস্ট্রি ও হাসপাতালগুলোর বাস্তব চাহিদার সাথে মিল রেখে দক্ষ কর্মী তৈরি।</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 text-center bg-gradient-to-tr from-emerald-50 to-teal-50 p-6 sm:p-10 rounded-3xl border border-emerald-100/80 space-y-4 sm:space-y-6 shadow-inner">
              <div className="bg-white p-5 sm:p-6 rounded-3xl inline-block shadow-md">
                <img src="/asset project logo.png" alt="ASSET Logo" className="h-24 sm:h-32 w-auto object-contain mx-auto" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-black text-slate-900">ASSET Project Bangladesh</h3>
                <p className="text-[11px] font-bold text-slate-500">Directorate of Technical Education (DTE)<br/>Ministry of Education, Govt. of Bangladesh</p>
              </div>
              <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-center space-x-2 text-[11px] sm:text-xs font-black text-emerald-800">
                <HeartHandshake size={16} className="text-emerald-600" />
                <span>বিশ্বব্যাংকের (World Bank) আর্থিক সহায়তায় পরিচালিত</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 6. STUDENT BENEFITS SUMMARY (10-MIN SCHOOL RESPONSIVE GRID) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-xl sm:text-4xl font-black text-slate-900 leading-tight">
            এই স্কলারশিপের আওতায় একজন প্রশিক্ষণার্থী কী কী পাচ্ছেন?
          </h2>
          <p className="text-xs sm:text-base text-slate-600 font-medium mt-2">
            সরকার অনুমোদিত এই ফ্রি প্রশিক্ষণ কোর্সে অংশ নিলে আপনি যেসব প্রাতিষ্ঠানিক সুবিধা লাভ করবেন:
          </p>
        </div>

        {/* 👇 মোবাইলেও পাশাপাশি ২টি করে কার্ড (grid-cols-2), বড় স্ক্রিনে ৪টি */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 sm:space-y-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm sm:text-base">💰</div>
            <h4 className="font-black text-slate-900 text-xs sm:text-base leading-snug">১০০% টিউশন ফি মওকুফ</h4>
            <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">কোর্সের সম্পূর্ণ খরচ সরকারি প্রজেক্ট থেকে বহন করা হবে, কোনো মাসিক ফি নেই।</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 sm:space-y-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm sm:text-base">📜</div>
            <h4 className="font-black text-slate-900 text-xs sm:text-base leading-snug">সরকারি এসেসমেন্ট ও সনদ</h4>
            <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">NSDA-এর অধীনে সরকারি পরীক্ষার মাধ্যমে কিউআর কোড সংবলিত রাষ্ট্রীয় সনদ।</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 sm:space-y-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm sm:text-base">🔬</div>
            <h4 className="font-black text-slate-900 text-xs sm:text-base leading-snug">হাতে-কলমে ল্যাব সুবিধা</h4>
            <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">আধুনিক ল্যাবে বিশেষজ্ঞ প্রশিক্ষকদের তত্ত্বাবধানে ১০০% ব্যবহারিক ক্লাস।</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 sm:space-y-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm sm:text-base">🤝</div>
            <h4 className="font-black text-slate-900 text-xs sm:text-base leading-snug">কর্মসংস্থান ও জব প্লেসমেন্ট</h4>
            <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">কোর্স সফলভাবে সম্পন্নকারীদের দেশীয় স্বনামধন্য প্রতিষ্ঠানে জব প্লেসমেন্ট সহায়তা।</p>
          </div>
        </div>
      </section>

      {/* ================= 7. GOOGLE MAP + CONTACT + LIVE CONSULTATION FORM ================= */}
      <section id="consultation-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200/80 shadow-xl p-5 sm:p-14 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-emerald-600 block mb-1">📍 ক্যাম্পাসে এসে যোগাযোগ করুন</span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">ফ্রি কোর্সে আসন নিশ্চিত করুন</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 leading-relaxed">প্রতিটি ব্যাচে আসন সীমিত। সরাসরি আমাদের বিজয় নগর অফিসে এসে আপনার রেজিস্ট্রেশন কনফার্ম করুন।</p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-sm flex-shrink-0 font-bold"><MapPin size={18}/></div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-black uppercase text-slate-400">অফিসের ঠিকানা</h4>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">180–181 Prime Tower (Lift-3), Shaheed Nazrul Islam Sharak, Bijoy Nagar, Dhaka-1000</p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-sm flex-shrink-0 font-bold"><Phone size={18}/></div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-black uppercase text-slate-400">হটলাইন নম্বর</h4>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">+880 1818-304081 | +880 1965-157203</p>
                  </div>
                </div>
              </div>

              {/* ✅ FAIL-PROOF OPEN QUERY MAP EMBED */}
              <div className="w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <iframe 
                  title="CareerLift Office Map"
                  src="https://maps.google.com/maps?q=Prime+Tower,+Shaheed+Nazrul+Islam+Sharak,+Bijoy+Nagar,+Dhaka&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                  className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
                  style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-10 space-y-6 shadow-sm">
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900">ফ্রি কোর্সে ভর্তির জন্য প্রি-রেজিস্ট্রেশন</h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">ফর্মটি পূরণ করুন। আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করে ব্যাচের সময় জানিয়ে দেবেন।</p>
              </div>

              {submitSuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-100 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 size={48} className="text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="text-xl font-black text-emerald-900">প্রি-রেজিস্ট্রেশন সফল হয়েছে!</h4>
                  <p className="text-xs sm:text-sm font-medium text-emerald-800">আমরা আপনার তথ্য পেয়েছি। শীঘ্রই আমাদের অফিস থেকে আপনাকে ফোন করা হবে।</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5 sm:space-y-4">
                  {/* Row 1: Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">আপনার সম্পূর্ণ নাম *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="যেমন: Md. Shakawat Hossain" className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs" />
                    </div>
                    <div className="space-y-1 sm:space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">মোবাইল বা হোয়াটসঅ্যাপ নম্বর *</label>
                      <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="018XXXXXXXX" className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs" />
                    </div>
                  </div>

                  {/* Row 2: NSDA Course Selection */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">কোন কোর্সে ফ্রি ট্রেনিং করতে চান? *</label>
                    <div className="relative w-full">
                      <select name="interest" value={formData.interest} onChange={handleInputChange} className="w-full pl-3.5 pr-10 py-3 sm:py-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer appearance-none truncate block shadow-2xs">
                        <option value="NSDA Free Course (Primary Healthcare)">🚑 Primary Healthcare Service Level 2 (Govt. Free)</option>
                        <option value="NSDA Free Course (Caregiving)">🏥 Caregiving Level 3 (Govt. Free)</option>
                        <option value="NSDA Free Course (IT Skills)">💻 IT Skills & Computer Operation (Govt. Free)</option>
                        <option value="NSDA Free Course (General)">🎉 General NSDA Free Scholarship Batch</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button type="submit" disabled={isSubmitting} className="w-full py-3.5 sm:py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm transition-all shadow-lg active:scale-98 disabled:opacity-50 flex items-center justify-center space-x-2">
                      <span>{isSubmitting ? 'প্রসেসিং হচ্ছে...' : 'ফ্রি কোর্সের জন্য প্রি-রেজিস্ট্রেশন করুন →'}</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest pt-2">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>১০০% নিরাপদ ও সরকারি প্রজেক্ট সুরক্ষিত</span>
                  </div>
                </form>
              )}

              {/* WhatsApp Contact */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-600">
                <span>💬 জরুরি প্রয়োজনে?</span>
                <a href="https://wa.me/8801818304081" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline flex items-center space-x-1">
                  <span>হোয়াটসঅ্যাপে মেসেজ দিন →</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}