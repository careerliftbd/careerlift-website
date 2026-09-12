import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Play, CheckCircle2, Star, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import NeoButton from '../../components/ui/NeoButton';

// 🎯 কাস্টম টাইপিং এফেক্ট কম্পোনেন্ট
function TypeWriter({ textArray }) {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentText = textArray[index];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % textArray.length);
        }
      }, 50);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        if (displayText.length === currentText.length) {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      }, 80);
    }
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, textArray]);

  return (
    <span className="border-r-[3px] border-emerald-400 pr-1 animate-pulse">
      {displayText}
    </span>
  );
}

export default function HeroSection() {
  const { lang } = useLanguage();
  const currentLang = lang || 'EN';
  const [showVideoModal, setShowVideoModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToForm = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    }
  };

  // 🖼️ অটোমেটিক ইমেজ স্লাইডার 
  const images = [
    '/hero img/image 1.jpg',
    '/hero img/image 2.jpg',
    '/hero img/image 3.jpg',
    '/hero img/image 4.jpg'
  ];
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const typingTexts = {
    EN: ["Global Study & Careers.", "NSDA Certified Skills."],
    BN: ["স্টাডি অ্যাব্রোড ও গ্লোবাল ক্যারিয়ারে।", "NSDA অনুমোদিত কারিগরি দক্ষতায়।"]
  };

  return (
    <section className="bg-slate-900 text-white pt-12 pb-20 sm:pt-20 sm:pb-28 relative overflow-hidden">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ================= বাম পাশ ================= */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            <div className="inline-flex items-center space-x-2 text-xs font-black tracking-widest uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
              <Sparkles size={14} className="text-amber-400 animate-spin-slow" />
              <span>{currentLang === 'EN' ? 'Global Education & NSDA Certified Skills' : 'আন্তর্জাতিক শিক্ষা ও সরকারি স্বীকৃত স্কিল ডেভেলপমেন্ট'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.2]">
              {currentLang === 'EN' ? 'Your Trusted Partner For ' : 'আপনার নির্ভরযোগ্য মাধ্যম: '} <br className="hidden lg:block"/>
              
              <span className="relative inline-block mt-2 w-full text-center lg:text-left">
                <span className="invisible block pointer-events-none opacity-0">
                  {currentLang === 'EN' ? "Global Study & Careers." : "স্টাডি অ্যাব্রোড ও গ্লোবাল ক্যারিয়ারে।"}
                </span>
                
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent flex items-center justify-center lg:justify-start">
                  <TypeWriter textArray={typingTexts[currentLang]} />
                </span>
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {currentLang === 'EN'
                ? 'Empowering students and professionals with UK pathways, European study opportunities, and Prime Minister’s Office authorized NSDA skill training.'
                : 'যুক্তরাজ্য ও ইউরোপের শীর্ষ ইউনিভার্সিটিতে স্টাডি ভিসা এবং বাংলাদেশ সরকারের NSDA অনুমোদিত ল্যাব-ভিত্তিক ব্যবহারিক প্রশিক্ষণের নির্ভরযোগ্য প্ল্যাটফর্ম।'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200">{currentLang === 'EN' ? '98% Visa Success' : '৯৮% ভিসা সাফল্য'}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl">
                <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200">{currentLang === 'EN' ? 'Govt. NSDA Approved' : 'NSDA অনুমোদিত'}</span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-2.5 rounded-xl justify-center sm:justify-start">
                <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200">{currentLang === 'EN' ? '0% Hidden Cost' : 'স্বচ্ছ প্রক্রিয়া'}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {/* 👇 এখানে ডাবল বাটন এররটি ফিক্স করা হয়েছে */}
              <div onClick={handleScrollToForm} className="cursor-pointer inline-block">
                <NeoButton variant="primary" className="!px-6 sm:!px-8 !py-3.5 sm:!py-4 text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/20 pointer-events-none">
                  {currentLang === 'EN' ? 'Book Assessment →' : 'ফ্রি অ্যাসেসমেন্ট বুক করুন →'}
                </NeoButton>
              </div>
              
              <button 
                onClick={() => setShowVideoModal(true)}
                className="inline-flex items-center space-x-2 px-5 py-3.5 sm:py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all border border-white/15 cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play size={12} className="fill-white ml-0.5" />
                </div>
                <span>{currentLang === 'EN' ? 'Watch Video' : 'ভিডিও দেখুন'}</span>
              </button>
            </div>
          </div>

          {/* ================= ডান পাশ ================= */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] sm:aspect-square rounded-[2.5rem] overflow-hidden border-2 border-white/15 shadow-2xl relative bg-slate-800">
              
              {images.map((img, idx) => (
                <img 
                  key={idx}
                  src={img} 
                  alt={`CareerLift ${idx + 1}`} 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    idx === currentImg ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center justify-between z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">500+ Students</h4>
                    <p className="text-[10px] text-slate-400">Successfully Guided & Trained</p>
                  </div>
                </div>
                <div className="flex space-x-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-amber-400 text-amber-400" />)}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {showVideoModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative">
            <div className="p-4 bg-slate-800 flex justify-between items-center text-white font-bold text-sm px-6">
              <span>{currentLang === 'EN' ? 'CareerLift Overview' : 'ক্যারিয়ারলিফ্ট পরিচিতি'}</span>
              <button onClick={() => setShowVideoModal(false)} className="w-8 h-8 rounded-full bg-slate-700 hover:bg-red-600 text-white transition-colors">✕</button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center">
              <video src="/CareerLift__Global_Career.mp4" controls autoPlay playsInline className="w-full h-full"></video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}