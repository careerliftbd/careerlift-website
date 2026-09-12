import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Award, Users, Target, Sparkles, ArrowRight, 
  MapPin, Phone, Mail, Building2, CheckCircle2, Quote, 
  Briefcase, GraduationCap, Laptop, Globe, HeartHandshake, Linkedin, ChevronDown
} from 'lucide-react';
import NeoCard from '../../components/ui/NeoCard';
import NeoButton from '../../components/ui/NeoButton';
import SectionTitle from '../../components/ui/SectionTitle';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../config/supabase';

export default function AboutUs() {
  const { lang } = useLanguage();
  const currentLang = lang || 'EN';

  // Quick Lead Capture Form State for Bottom Section
  const [formData, setFormData] = useState({ 
    name: '', phone: '', interest: '🎉 NSDA Free Course (Scholarship / স্কলারশিপ)', source: 'About Us Page'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ LIVE GOOGLE SHEETS API INTEGRATION FOR ABOUT US PAGE
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

  // 1. Core Values Data (EN & BN Integrated)
  const coreValues = [
    {
      title: { EN: 'Excellence', BN: 'সর্বোচ্চ মান (Excellence)' },
      desc: { EN: 'Highest standards in teaching outcomes and practical industry skill development.', BN: 'প্রশিক্ষণ এবং ব্যবহারিক কারিগরি দক্ষতা অর্জনে আন্তর্জাতিক ও সর্বোচ্চ মান নিশ্চিতকরণ।' },
      icon: '🏆',
      color: 'border-t-blue-600 bg-blue-50/40'
    },
    {
      title: { EN: 'Integrity', BN: 'সততা ও স্বচ্ছতা (Integrity)' },
      desc: { EN: 'Ethics, honesty, and absolute transparency in student counseling and visa processing.', BN: 'শিক্ষার্থী কাউন্সেলিং এবং ভিসা প্রসেসিংয়ে নৈতিকতা, সততা এবং শতভাগ স্বচ্ছতা।' },
      icon: '🤝',
      color: 'border-t-indigo-600 bg-indigo-50/40'
    },
    {
      title: { EN: 'Empowerment', BN: 'স্বাবলম্বীকরণ (Empowerment)' },
      desc: { EN: 'Building confidence, self-reliance, and global employability for the future workforce.', BN: 'ভবিষ্যৎ কর্মজীবীদের জন্য আত্মবিশ্বাস, স্বনির্ভরতা এবং বিশ্বজুড়ে কর্মসংস্থানের যোগ্যতা তৈরি।' },
      icon: '⚡',
      color: 'border-t-purple-600 bg-purple-50/40'
    },
    {
      title: { EN: 'Innovation', BN: 'উদ্ভাবন (Innovation)' },
      desc: { EN: 'Adopting modern technologies, digital labs, and forward-thinking training modules.', BN: 'আধুনিক প্রযুক্তি, ডিজিটাল ল্যাব এবং যুগোপযোগী কাস্টমাইজড ট্রেনিং মডিউল গ্রহণ।' },
      icon: '💡',
      color: 'border-t-amber-600 bg-amber-50/40'
    },
    {
      title: { EN: 'Inclusion', BN: 'অন্তর্ভুক্তি (Inclusion)' },
      desc: { EN: 'Creating a fair, supportive, and respectful learning environment for all backgrounds.', BN: 'সকল স্তরের ও পটভূমির মানুষের জন্য একটি নিরপেক্ষ, সহযোগিতাপূর্ণ এবং সম্মানজনক শিক্ষার পরিবেশ।' },
      icon: '🌍',
      color: 'border-t-emerald-600 bg-emerald-50/40'
    }
  ];

  // 2. Leadership & Management Team Data
  const executiveDirector = {
    name: 'Sumaiya Tabassum',
    role: { EN: 'Executive Director (ED)', BN: 'নির্বাহী পরিচালক (ED)' },
    quote: { 
      EN: '"Ensuring quality education and operational excellence is my top priority. At CareerLift, we strive to create a structured learning environment that fosters sustainable professional growth and innovation."',
      BN: '"মানসম্মত শিক্ষা এবং প্রাতিষ্ঠানিক উৎকর্ষতা নিশ্চিত করাই আমার প্রধান অগ্রাধিকার। ক্যারিয়ারলিফটে আমরা এমন একটি শিক্ষার পরিবেশ তৈরি করতে বদ্ধপরিকর যা শিক্ষার্থীদের পেশাগত বিকাশ ও উদ্ভাবনকে উৎসাহিত করে।"'
    },
    email: null,
    linkedin: 'https://www.linkedin.com',
    badge: { EN: 'Executive Leadership', BN: 'নির্বাহী ব্যবস্থাপনা' }
  };

  const managementTeam = [
    {
      name: 'Nur Mohammad',
      role: { EN: 'Course Coordinator', BN: 'কোর্স কো-অর্ডিনেটর' },
      quote: { 
        EN: '"Guiding students to the right career path is not just my responsibility, it is my commitment. Every student\'s professional success is a milestone for our institute."',
        BN: '"শিক্ষার্থীদের সঠিক ক্যারিয়ারের দিকনির্দেশনা দেওয়া শুধুমাত্র আমার দায়িত্ব নয়, এটি আমার অঙ্গীকার। প্রতিটি শিক্ষার্থীর পেশাগত সাফল্যই আমাদের প্রতিষ্ঠানের জন্য এক একটি মাইলফলক।"'
      },
      email: 'nurmdpt@gmail.com',
      image: '/nur.jpg',
      linkedin: 'https://www.linkedin.com',
      badge: 'Academic Operations'
    },
    {
      name: 'Sirajis Salehin',
      role: { EN: 'Operations Manager', BN: 'অপারেশনস ম্যানেজার' },
      quote: { 
        EN: '"Operational discipline and administrative excellence ensure that our students get the best learning environment. We are strictly committed to quality and compliance."',
        BN: '"প্রাতিষ্ঠানিক শৃঙ্খলা ও প্রশাসনিক উৎকর্ষতা নিশ্চিত করে আমাদের শিক্ষার্থীরা যেন সেরা শিক্ষার পরিবেশ পায়। আমরা গুণগত মান এবং কমপ্লায়েন্সের প্রতি শতভাগ অঙ্গীকারবদ্ধ।"'
      },
      email: 'sirajissalehin98@gmail.com',
      image: '/salehin.jpg',
      linkedin: 'https://www.linkedin.com',
      badge: 'Administration'
    },
    {
      name: 'Md. Shakawat Hossain Faravi',
      role: { EN: 'IT Executive & Web Developer', BN: 'আইটি এক্সিকিউটিভ ও ওয়েব ডেভেলপার' },
      quote: { 
        EN: '"Architecting robust digital infrastructure and modern LMS platforms for future leaders. Technology is our catalyst, but the learner\'s ambition remains our true driving force."',
        BN: '"ভবিষ্যৎ লিডারদের জন্য ডিজিটাল পরিকাঠামো ও আধুনিক লার্নিং ম্যানেজমেন্ট সিস্টেম তৈরি করছি। প্রযুক্তি হলো আমাদের মাধ্যম, কিন্তু শিক্ষার্থীর অদম্য স্বপ্নই হলো মূল চালিকাশক্তি।"'
      },
      email: 'alfaravi17@gmail.com',
      image: '/Faravi 2.jpg',
      linkedin: 'https://www.linkedin.com/in/md-shakawat-hossain-faravi?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      badge: 'Technology & Dev'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* ================= 1. PAGE HEADER & HERO ================= */}
      <section className="bg-slate-900 text-white pt-12 sm:pt-16 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-blue-300 font-bold text-[10px] sm:text-xs uppercase tracking-wider backdrop-blur-md">
            <Building2 size={15} />
            <span>{lang === 'EN' ? 'Institutional Overview' : 'প্রাতিষ্ঠানিক পরিচিতি'}</span>
          </div>

          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            {lang === 'EN' ? 'Architecting ' : 'শিক্ষা ও কর্মসংস্থানের '} 
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              {lang === 'EN' ? 'Global Careers' : 'টেকসই সেতুবন্ধন'}
            </span> 
            {lang === 'EN' ? ' & Excellence.' : ' নির্মাণে আমরা।'}
          </h1>

          <p className="text-xs sm:text-lg text-slate-300 leading-relaxed font-medium max-w-3xl mx-auto">
            {lang === 'EN' 
              ? 'CareerLift is a premier skill development institute and migration advisory firm in Bangladesh. We combine government accreditation (NSDA) with international standards to empower the future workforce.' 
              : 'বাংলাদেশের পেশাগত ক্যারিয়ার উন্নয়নে নিবেদিত একটি শীর্ষস্থানীয় কারিগরি প্রশিক্ষণ ও কনসালটেন্সি প্রতিষ্ঠান। গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের ন্যাশনাল স্কিলস ডেভেলপমেন্ট অথরিটি (NSDA) কর্তৃক সরকারিভাবে স্বীকৃতিপ্রাপ্ত ও পরিচালিত।'}
          </p>

          {/* Quick Stats Matrix (2x2 on Mobile, 4 on Desktop) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto pt-4 sm:pt-6">
            <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
              <h4 className="text-lg sm:text-3xl font-black text-blue-400">NSDA</h4>
              <p className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase mt-0.5 sm:mt-1">{lang === 'EN' ? 'Govt. Accredited' : 'সরকার অনুমোদিত'}</p>
            </div>
            <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
              <h4 className="text-lg sm:text-3xl font-black text-emerald-400">98%</h4>
              <p className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase mt-0.5 sm:mt-1">{lang === 'EN' ? 'Visa Success' : 'ভিসা সাফল্যের হার'}</p>
            </div>
            <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
              <h4 className="text-lg sm:text-3xl font-black text-purple-400">500+</h4>
              <p className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase mt-0.5 sm:mt-1">{lang === 'EN' ? 'Students Trained' : 'প্রশিক্ষিত শিক্ষার্থী'}</p>
            </div>
            <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
              <h4 className="text-lg sm:text-3xl font-black text-amber-400">100%</h4>
              <p className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase mt-0.5 sm:mt-1">{lang === 'EN' ? 'Lab Focused' : 'ব্যবহারিক প্রশিক্ষণ'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. VISION & MISSION SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          
          {/* Vision Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-slate-200/80 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>
            <div className="space-y-4 sm:space-y-6 relative z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-black text-[10px] sm:text-xs uppercase tracking-widest border border-blue-200">
                <Target size={13} />
                <span>{lang === 'EN' ? 'OUR VISION' : 'আমাদের রূপকল্প (Vision)'}</span>
              </div>
              <h3 className="text-lg sm:text-3xl font-black text-slate-900 leading-tight">
                {lang === 'EN' ? 'To Become The Most Trusted Center For Career-Focused Education.' : 'ক্যারিয়ার-কেন্দ্রিক শিক্ষার সবচেয়ে বিশ্বস্ত কেন্দ্র হিসেবে গড়ে ওঠা।'}
              </h3>
              <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
                {lang === 'EN'
                  ? 'We aim to inspire innovation, encourage lifelong learning, and prepare the future workforce of Bangladesh to compete effectively in both local and global job markets.'
                  : 'উদ্ভাবনকে অনুপ্রাণিত করা, জীবনব্যাপী শিক্ষার সুযোগ তৈরি করা এবং বাংলাদেশের ভবিষ্যৎ কর্মজীবীদের দেশী ও আন্তর্জাতিক কর্মসংস্থানের বাজারের জন্য যোগ্য করে গড়ে তোলাই আমাদের প্রধান লক্ষ্য।'}
              </p>
            </div>
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100 text-[11px] sm:text-xs text-blue-600 font-bold flex items-center justify-between relative z-10">
              <span className="flex items-center"><CheckCircle2 size={15} className="mr-1.5"/> NSDA Recognized Standard</span>
              <span>★ ★ ★ ★ ★</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="space-y-4 sm:space-y-6 relative z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-[10px] sm:text-xs uppercase tracking-widest border border-emerald-500/30">
                <GraduationCap size={13} />
                <span>{lang === 'EN' ? 'OUR MISSION' : 'আমাদের লক্ষ্য (Mission)'}</span>
              </div>
              <h3 className="text-lg sm:text-3xl font-black leading-tight">
                {lang === 'EN' ? 'Equipping Learners With Skills, Confidence & Adaptability.' : 'শিক্ষার্থীদের দক্ষতা, আত্মবিশ্বাস ও মানিয়ে নেওয়ার ক্ষমতায় সমৃদ্ধ করা।'}
              </h3>
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
                {lang === 'EN'
                  ? 'CareerLift Skill Development Institute provides modern curriculums, experienced instructors, and advanced laboratory systems. We strive to create sustainable employment pathways globally.'
                  : 'ক্যারিয়ারলিফট আধুনিক কারিকুলাম, অভিজ্ঞ প্রশিক্ষক এবং উন্নত লার্নিং সিস্টেম প্রদান করে। দ্রুত পরিবর্তনশীল বিশ্বব্যবস্থায় শিক্ষার্থীদের জন্য টেকসই কর্মসংস্থানের সুযোগ সৃষ্টি করতে আমরা প্রতিশ্রুতিবদ্ধ।'}
              </p>
            </div>
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 text-[11px] sm:text-xs text-emerald-400 font-bold flex items-center justify-between relative z-10">
              <span className="flex items-center"><CheckCircle2 size={15} className="mr-1.5"/> 100% Practical & Lab Focused</span>
              <span>🎓 Global Standard</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 3. CEO & PRINCIPAL PROFILE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200/80 shadow-xl p-6 sm:p-14 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
            
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
              <div className="relative w-44 h-52 sm:w-56 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-white group">
                <img 
                  src="/Mostafizur.png" 
                  alt="Dr. Mostafizur Rahman Faisal" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-black text-[9px] sm:text-[10px] uppercase tracking-wider inline-block shadow-sm">
                    {lang === 'EN' ? 'Chief Executive Officer' : 'প্রধান নির্বাহী কর্মকর্তা'}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-black tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
                <span>👑 {lang === 'EN' ? 'CEO & PRINCIPAL STATEMENT' : 'সিইও ও প্রিন্সিপাল স্যারের বাণী'}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <h2 className="text-xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                    Dr. Mostafizur Rahman Faisal
                  </h2>
                  <div className="text-[11px] sm:text-sm font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1">
                    {lang === 'EN' ? 'CEO & Principal | CareerLift Institute' : 'সিইও ও প্রিন্সিপাল | ক্যারিয়ারলিফট স্কিল ডেভেলপমেন্ট ইনস্টিটিউট'}
                  </div>
                </div>

                <a 
                  href="https://www.linkedin.com" 
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all text-xs font-bold mx-auto sm:mx-0 shadow-sm flex-shrink-0"
                >
                  <Linkedin size={15} />
                  <span>LinkedIn Profile</span>
                </a>
              </div>

              <div className="relative bg-slate-50 border border-slate-200/80 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-inner text-left">
                <Quote size={32} className="text-blue-200 absolute top-4 right-4 pointer-events-none" />
                <p className="text-xs sm:text-lg font-semibold italic text-slate-700 leading-relaxed relative z-10">
                  {lang === 'EN'
                    ? '"At CareerLift, we firmly believe that structured skill education is the definitive passport to the future. Our primary objective is to empower the youth of Bangladesh with technical and healthcare competencies that command respect and high value globally."'
                    : '"ক্যারিয়ারলিফটে আমরা বিশ্বাস করি যে শিক্ষাই হলো ভবিষ্যতের পাসপোর্ট। আমাদের মূল লক্ষ্য হলো বাংলাদেশের তরুণ সমাজকে আন্তর্জাতিক মানের কারিগরি ও হেলথকেয়ার দক্ষতায় স্বাবলম্বী করে তোলা, যা বিশ্বজুড়ে তাদের সম্মানজনক কর্মসংস্থান নিশ্চিত করবে।"'}
                </p>
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[11px] sm:text-xs font-bold text-slate-600">
                <span className="flex items-center"><CheckCircle2 className="text-emerald-600 mr-1.5" size={15}/> Visionary Leadership</span>
                <span className="flex items-center"><CheckCircle2 className="text-blue-600 mr-1.5" size={15}/> Global Strategy</span>
                <span className="flex items-center"><CheckCircle2 className="text-purple-600 mr-1.5" size={15}/> Institutional Integrity</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 4. EXECUTIVE DIRECTOR PROFILE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 border-4 border-white/10 shadow-2xl flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4 backdrop-blur-md">
                👩‍💼
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-black text-[10px] sm:text-xs uppercase tracking-wider">
                {executiveDirector.badge[lang]}
              </span>
            </div>

            <div className="lg:col-span-9 space-y-3 sm:space-y-4 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-400">
                    {lang === 'EN' ? 'EXECUTIVE MANAGEMENT' : 'নির্বাহী ব্যবস্থাপনা'}
                  </div>
                  <h3 className="text-xl sm:text-4xl font-black tracking-tight text-white mt-0.5">
                    {executiveDirector.name}
                  </h3>
                  <div className="text-xs sm:text-sm font-bold text-blue-200 uppercase tracking-wider">
                    {executiveDirector.role[lang]}
                  </div>
                </div>

                <a 
                  href={executiveDirector.linkedin} 
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-blue-600 text-white transition-all text-xs font-bold mx-auto sm:mx-0 border border-white/15 flex-shrink-0"
                >
                  <Linkedin size={15} />
                  <span>LinkedIn Profile</span>
                </a>
              </div>

              <p className="text-xs sm:text-base text-slate-300 italic font-medium leading-relaxed bg-white/5 p-4 sm:p-6 rounded-2xl border border-white/10">
                {executiveDirector.quote[lang]}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 5. MANAGEMENT & OPERATIONS TEAM (10-MIN SCHOOL RESPONSIVE GRID) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <SectionTitle 
          subtitle={lang === 'EN' ? "Operations & Administration" : "ব্যবস্থাপনা ও টিম"} 
          title={lang === 'EN' ? "Our Management & Technical Team" : "পরিচিত হোন আমাদের দক্ষ টিমের সাথে"} 
          description={lang === 'EN' ? "The dedicated professionals driving our academic operations, discipline, and technological infrastructure." : "যাদের নিরলস পরিশ্রম, প্রশাসনিক শৃঙ্খলা এবং প্রযুক্তিগত দক্ষতায় এগিয়ে চলেছে আমাদের প্রতিষ্ঠান।"} 
        />

        {/* 👇 মোবাইলেও পাশাপাশি ২টি করে কার্ড (grid-cols-2), বড় স্ক্রিনে ৩টি (md:grid-cols-3) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8">
          {managementTeam.map((member, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-8 flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Avatar + Name */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-5 border-b border-slate-100">
                  <div className="relative w-16 h-16 sm:w-22 sm:h-22 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-top"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 sm:px-2.5 py-0.5 rounded-md inline-block mb-1">
                      {member.badge}
                    </span>
                    <h3 className="text-xs sm:text-lg font-black text-slate-900 leading-snug break-words group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-500 block mt-0.5 leading-normal">
                      {member.role[lang]}
                    </span>
                  </div>
                </div>

                {/* Quote Box */}
                <div className="mb-4 sm:mb-6">
                  <p className="text-[11px] sm:text-sm text-slate-600 italic leading-relaxed font-medium line-clamp-4 sm:line-clamp-none">
                    {member.quote[lang]}
                  </p>
                </div>
              </div>

              {/* Contact & LinkedIn Footer */}
              <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold gap-1 sm:gap-2">
                <a 
                  href={`mailto:${member.email}`} 
                  className="text-slate-500 hover:text-blue-600 flex items-center space-x-1 sm:space-x-1.5 transition min-w-0 flex-1"
                  title={member.email}
                >
                  <Mail size={13} className="text-blue-600 flex-shrink-0" />
                  <span className="truncate text-[10px] sm:text-xs">{member.email}</span>
                </a>

                <a 
                  href={member.linkedin} 
                  target="_blank" rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-2xs flex items-center justify-center flex-shrink-0"
                  title="Connect on LinkedIn"
                >
                  <Linkedin size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 6. OUR CORE VALUES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <SectionTitle 
          subtitle={lang === 'EN' ? "Guiding Principles" : "আমাদের মূলনীতি"} 
          title={lang === 'EN' ? "Our Core Values" : "যে আদর্শ ও নীতির ওপর আমরা প্রতিষ্ঠিত"} 
          description={lang === 'EN' ? "The fundamental institutional standards that govern our academic quality and professional counseling." : "আমাদের প্রতিটি পদক্ষেপ, প্রশিক্ষণ এবং কনসালটেন্সির ক্ষেত্রে আমরা এই ৫টি মূলনীতি মেনে চলি।"} 
        />

        {/* 👇 মোবাইলেও পাশাপাশি ২টি করে কার্ড (grid-cols-2), বড় স্ক্রিনে ৫টি */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
          {coreValues.map((val, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 border-t-4 ${val.color} flex flex-col justify-between group ${idx === 4 ? 'col-span-2 lg:col-span-1' : ''}`}
            >
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-2xs">
                  {val.icon}
                </div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors">
                  {val.title[lang]}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium">
                  {val.desc[lang]}
                </p>
              </div>
              <div className="mt-4 sm:mt-6 pt-2.5 sm:pt-3 border-t border-slate-100 text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                <span>0{idx + 1} / VALUE</span>
                <Sparkles size={12} className="text-blue-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 7. GOOGLE MAP + CONTACT + BOOK CONSULTATION FORM ================= */}
      <section id="consultation-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200/80 shadow-xl p-5 sm:p-14 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left Contact Info & Fail-Proof Map */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-blue-600 block mb-1">
                  📍 {currentLang === 'EN' ? 'VISIT OUR HEAD OFFICE' : 'অফিসের ঠিকানা ও ম্যাপ'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {currentLang === 'EN' ? 'CareerLift Consultation Center' : 'ক্যারিয়ারলিফ্ট কনসালটেন্সি সেন্টার'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 leading-relaxed">
                  {currentLang === 'EN' ? 'Our office is centrally located in Bijoy Nagar, Dhaka. Feel free to walk in for any visa or course inquiries.' : 'আমাদের অফিস ঢাকার বিজয়নগরের কেন্দ্রস্থলে অবস্থিত। ভিসা বা যেকোনো কোর্সের বিস্তারিত জানতে সরাসরি চলে আসুন।'}
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3 sm:space-x-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-sm flex-shrink-0 font-bold">📍</div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-black uppercase text-slate-400">{currentLang === 'EN' ? 'Head Office Address' : 'অফিসের ঠিকানা'}</h4>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5 leading-snug">180–181 Prime Tower (Lift-3), Shaheed Nazrul Islam Sharak, Bijoy Nagar, Dhaka-1000</p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3 sm:space-x-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-sm flex-shrink-0 font-bold">📞</div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-black uppercase text-slate-400">{currentLang === 'EN' ? 'Direct Hotline & WhatsApp' : 'সরাসরি হটলাইন ও হোয়াটসঅ্যাপ'}</h4>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">+880 1818-304081 | +880 1965-157203</p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3 sm:space-x-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white text-purple-600 flex items-center justify-center shadow-sm flex-shrink-0 font-bold">✉️</div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-black uppercase text-slate-400">{currentLang === 'EN' ? 'Official Email' : 'অফিসিয়াল ইমেইল'}</h4>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">careerliftinstitute@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* ✅ FAIL-PROOF OPEN QUERY EMBED */}
              <div className="w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <iframe 
                  title="CareerLift Office Map"
                  src="https://maps.google.com/maps?q=Prime+Tower,+Shaheed+Nazrul+Islam+Sharak,+Bijoy+Nagar,+Dhaka&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                  className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
                  style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="mt-3 flex items-center justify-between bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 flex items-center">
                  📍 180–181 Prime Tower, Bijoy Nagar
                </span>
                <a 
                  href="https://maps.app.goo.gl/PAuPP7wDQW79Emk49" 
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs font-black text-blue-600 hover:text-blue-800 underline flex items-center space-x-1"
                >
                  <span>Get Live Directions ↗</span>
                </a>
              </div>
            </div>

            {/* Right Form Box */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-10 space-y-6 shadow-sm">
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900">{currentLang === 'EN' ? 'Book Your Free Consultation' : 'ফ্রি কনসালটেন্সির জন্য রেজিস্ট্রেশন করুন'}</h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">{currentLang === 'EN' ? 'Fill out this form and our senior counselor will call you within 24 hours to discuss your profile.' : 'ফর্মটি পূরণ করুন। আমাদের অভিজ্ঞ ভিসা কাউন্সিলর আগামী ২৪ ঘণ্টার মধ্যে ফোনে আপনার সাথে যোগাযোগ করবেন।'}</p>
              </div>

              {submitSuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-100 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 size={48} className="text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="text-xl font-black text-emerald-900">{currentLang === 'EN' ? 'Registration Successful!' : 'আবেদন সফলভাবে গৃহীত হয়েছে!'}</h4>
                  <p className="text-xs sm:text-sm font-medium text-emerald-800">{currentLang === 'EN' ? 'We have received your profile details. Our senior counselor will call you soon.' : 'আমরা আপনার তথ্য পেয়েছি। আমাদের সিনিয়র কাউন্সিলর শীঘ্রই আপনার সাথে ফোনে যোগাযোগ করবেন।'}</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">{currentLang === 'EN' ? 'Your Full Name *' : 'আপনার সম্পূর্ণ নাম *'}</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="e.g. Md. Shakawat Hossain" className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs" />
                    </div>
                    <div className="space-y-1 sm:space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">{currentLang === 'EN' ? 'WhatsApp / Phone Number *' : 'মোবাইল বা হোয়াটসঅ্যাপ নম্বর *'}</label>
                      <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="018XXXXXXXX" className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs" />
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">{currentLang === 'EN' ? 'Required Service or Course *' : 'কাঙ্ক্ষিত সেবা বা কোর্স *'}</label>
                    <div className="relative w-full">
                      <select name="interest" value={formData.interest} onChange={handleInputChange} className="w-full pl-3.5 pr-10 py-3 sm:py-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer appearance-none truncate block shadow-2xs">
                        <option value="NSDA Free Course">🎉 NSDA Free Course (Scholarship / স্কলারশিপ)</option>
                        <option value="Study Abroad">🎓 Study Abroad & Student Visa</option>
                        <option value="Care Giving Level-2 & 3">🏥 Care Giving Level-2 & 3 (কেয়ার গিভিং)</option>
                        <option value="IT Skills & Computer Operation">💻 IT Skills & Computer Operation</option>
                        <option value="Day-long Primary Healthcare">🚑 Day-long Primary Healthcare & CPR Workshop</option>
                        <option value="Japanese Language Level 2">🇯🇵 Japanese Language Level 2 (SSW Prep)</option>
                        <option value="Digital Marketing Level 3">💻 Digital Marketing Level 3</option>
                        <option value="Study Tour">✈️ International Study Tour & Summer Camp</option>
                        <option value="Visit Visa">🧳 Tourist / Visit Visa Advisory</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button type="submit" disabled={isSubmitting} className="w-full py-3.5 sm:py-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-black text-xs sm:text-sm transition-all shadow-lg active:scale-98 disabled:opacity-50 flex items-center justify-center space-x-2">
                      <span>{isSubmitting ? (currentLang === 'EN' ? 'Processing Request...' : 'প্রসেসিং হচ্ছে...') : (currentLang === 'EN' ? 'Submit For Free Evaluation →' : 'ফ্রি মূল্যায়নের জন্য আবেদন করুন →')}</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-center space-x-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest pt-2">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>{currentLang === 'EN' ? '100% Confidential & Secure Advisory' : '১০০% গোপনীয় ও নিরাপদ তথ্য সংরক্ষণ'}</span>
                  </div>
                </form>
              )}

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-600">
                <span>💬 {currentLang === 'EN' ? 'Need instant reply?' : 'জরুরি প্রয়োজনে?'}</span>
                <a href="https://wa.me/8801818304081" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline flex items-center space-x-1">
                  <span>{currentLang === 'EN' ? 'Chat on WhatsApp Now →' : 'হোয়াটসঅ্যাপে মেসেজ দিন →'}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}