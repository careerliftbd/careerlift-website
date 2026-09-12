import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Star, CheckCircle2, MapPin, Phone, Quote, ShieldCheck, ArrowRight,
  Clock, Sparkles, ChevronDown, X, Maximize2
} from 'lucide-react';

import NeoCard from '../../components/ui/NeoCard';
import NeoButton from '../../components/ui/NeoButton';
import SectionTitle from '../../components/ui/SectionTitle';
import { useLanguage } from '../../context/LanguageContext';
import AlumniSection from './AlumniSection';
import { supabase } from '../../config/supabase';

// Import split components
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';

export default function Home() {
  const { t = {}, lang = 'EN' } = useLanguage();
  const currentLang = lang || 'EN';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '', phone: '', interest: '🎉 NSDA Free Course (Scholarship / স্কলারশিপ)', source: 'Home Page'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 🖼️ Gallery Lightbox State
  const [selectedImg, setSelectedImg] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ডাইনামিক গ্যালারি স্টেট
  const [dbGallery, setDbGallery] = useState([]);

  useEffect(() => {
    // Supabase থেকে ছবি ফেচ করা (হোমপেজের জন্য লেটেস্ট ৮টি ছবি)
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8); 
      
      if (data && !error) {
        setDbGallery(data);
      }
    };
    
    fetchGallery();
  }, []);

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

  // ✅ SMART AUTO-FLAG DETECTOR
  const countryFlagMap = {
    "United Kingdom": "/flags/gb.png", "UK": "/flags/gb.png", "England": "/flags/gb.png",
    "Schengen": "/flags/schengen.png", "Europe": "/flags/schengen.png",
    "Japan": "/flags/jp.png", "Canada": "/flags/ca.png", "Australia": "/flags/au.png",
    "Malaysia": "/flags/my.png", "Malta": "/flags/mt.png", "South Korea": "/flags/kr.png",
    "Finland": "/flags/fi.png", "Germany": "/flags/de.png", "New Zealand": "/flags/nz.png",
    "China": "/flags/cn.png", "Sri Lanka": "/flags/lk.png", "UAE": "/flags/ae.png", "Dubai": "/flags/ae.png"
  };

  const getCountryFlag = (countryName, customFlagUrl) => {
    if (customFlagUrl) return customFlagUrl;
    for (let key in countryFlagMap) {
      if (countryName.toLowerCase().includes(key.toLowerCase())) return countryFlagMap[key];
    }
    return "/flags/gb.png";
  };

  // 🎯 1. SERVICES DATA (কাস্টম ইমেজ + সম্পূর্ণ তথ্য)
  const servicesList = [
    {
      id: 1,
      title: { EN: 'Skill Development', BN: 'স্কিল ডেভেলপমেন্ট' },
      img: '/Skill Development.png',
      desc: { EN: 'NSDA-approved Level 2 & 3 practical courses with hands-on lab training and job placement support.', BN: 'NSDA অনুমোদিত লেভেল ২ ও ৩ প্র্যাকটিক্যাল কোর্স, হ্যান্ডস-অন ল্যাব ট্রেনিং ও জব প্লেসমেন্ট সহায়তা।' },
      link: '/courses',
      btnText: { EN: 'Explore Courses', BN: 'কোর্স দেখুন' }
    },
    {
      id: 2,
      title: { EN: 'OTHM (UK Diploma)', BN: 'OTHM (ইউকে ডিপ্লোমা)' },
      img: '/othm-logosvg.png',
      desc: { EN: 'UK-accredited Level 4, 5 & 7 diplomas with direct university credit transfer to final year.', BN: 'ইউকে অ্যাক্রেডিটেড লেভেল ৪, ৫ ও ৭ ডিপ্লোমা — সরাসরি ইউনিভার্সিটির ফাইনাল ইয়ারে ক্রেডিট ট্রান্সফার।' },
      link: '/study-abroad',
      btnText: { EN: 'OTHM Programs', BN: 'OTHM প্রোগ্রাম' }
    },
    {
      id: 3,
      title: { EN: 'Study Abroad', BN: 'স্টাডি অ্যাব্রোড' },
      img: '/Study Abroad.png',
      desc: { EN: 'End-to-end visa guidance for UK, Japan, Canada & Europe with 98% success rate.', BN: 'ইউকে, জাপান, কানাডা ও ইউরোপে সম্পূর্ণ ভিসা গাইডলাইন — ৯৮% সাকসেস রেট।' },
      link: '/study-abroad',
      btnText: { EN: 'Destinations', BN: 'গন্তব্যসমূহ' }
    },
    {
      id: 4,
      title: { EN: 'Skilled Worker', BN: 'স্কিলড ওয়ার্কার' },
      img: '/Skilled Worker.png',
      desc: { EN: 'Caregiving, SSW & healthcare worker migration track with guaranteed job support.', BN: 'কেয়ারগিভিং, SSW ও হেলথকেয়ার ওয়ার্কার মাইগ্রেশন — নিশ্চিত চাকরির সহায়তা।' },
      link: '/services',
      btnText: { EN: 'Work Abroad', BN: 'ওয়ার্ক অ্যাব্রোড' }
    }
  ];

  // 🎓 2. FEATURED COURSES DATA (ফ্রি / পেইড সহ)
  const featuredCourses = [
    {
      id: "10", category: 'Healthcare & Beauty', image: '/Day long Primary Healthcare.png',
      duration: '1 Day (10 AM - 5 PM)', rating: '5.0', price: 'Paid',
      title: { EN: 'Day-long Primary Healthcare, First Aid & CPR', BN: 'দিনব্যাপী প্রাইমারি হেলথ কেয়ার, ফার্স্ট এইড ও সিপিআর' },
      tag: { EN: 'Certificate Included', BN: 'সার্টিফিকেট প্রদান' }
    },
    {
      id: "11", category: 'Healthcare & Beauty', image: '/CPR & Emmergency Response Program.jpg',
      duration: '1 Day (10 AM - 5 PM)', rating: '5.0', price: 'Paid',
      title: { EN: 'CPR & Emergency Response Training Program', BN: 'CPR ও ইমার্জেন্সি রেসপন্স ট্রেনিং প্রোগ্রাম' },
      tag: { EN: 'Hands-on Training', BN: 'হ্যান্ডস-অন ট্রেনিং' }
    },
    {
      id: "5", category: 'Healthcare & Beauty', image: '/Primary healthcare.png',
      duration: '3 Months', rating: '4.9', price: 'Free',
      title: { EN: 'Primary Healthcare Service Level 2', BN: 'প্রাইমারি হেলথকেয়ার সার্ভিস লেভেল-২' },
      tag: { EN: 'NSDA Certified', BN: 'NSDA অনুমোদিত' }
    },
    {
      id: "6", category: 'IT & Skills', image: '/IT Skills.png',
      duration: '3 Months', rating: '4.8', price: 'Free',
      title: { EN: 'IT Skills & Computer Operation', BN: 'আইটি স্কিলস ও কম্পিউটার অপারেশন' },
      tag: { EN: 'NSDA Certified', BN: 'NSDA অনুমোদিত' }
    }
  ];

  const isFree = (price) => {
    const p = String(price || '').toLowerCase();
    return p.includes('free') || p === '0' || p.includes('৳0') || p.includes('nsda');
  };

  // ✈️ 3. STUDY ABROAD PACKAGES (সম্পূর্ণ তথ্য সহ — badge, price, desc, intake)
  const featuredPackages = [
    {
      id: "uk-topup", country: "United Kingdom", customFlagUrl: null,
      title: { EN: "UK Direct 3rd Year Entry via OTHM Diploma", BN: "OTHM ডিপ্লোমার মাধ্যমে ইউকেতে সরাসরি ৩য় বর্ষে ভর্তি" },
      badge: "Save 50% Tuition", price: { EN: "Special Credit Transfer Pack", BN: "বিশেষ ক্রেডিট ট্রান্সফার সুবিধা" },
      desc: { EN: "Complete Level 4 & 5 in Bangladesh and enter final year Bachelor's in UK universities with 2 years PSW.", BN: "বাংলাদেশে লেভেল ৪ ও ৫ শেষ করে ইউকেতে সরাসরি ফাইনাল ইয়ারে ভর্তি এবং ২ বছরের ওয়ার্ক ভিসা।" },
      intake: "September / January", link: "/study-abroad#packages"
    },
    {
      id: "schengen-eu", country: "Schengen Area", customFlagUrl: null,
      title: { EN: "Europe 29 Countries Study & Job Search Package", BN: "ইউরোপের ২৯টি দেশে স্টাডি ও জব সার্চ ভিসা প্যাকেজ" },
      badge: "Free Tuition in Germany", price: { EN: "Low Bank Show & High Ratio", BN: "সহজ স্পনসর ও সর্বোচ্চ ভিসা হার" },
      desc: { EN: "Study in Germany, Finland, or Malta with zero to low tuition fees. Enjoy border-free travel across 29 EU nations.", BN: "জার্মানি, ফিনল্যান্ড বা মাল্টায় স্বল্প খরচে পড়াশোনা এবং ২৯টি ইউরোপীয় দেশে অবাধ যাতায়াত।" },
      intake: "Winter & Summer", link: "/study-abroad#packages"
    },
    {
      id: "japan-ssw", country: "Japan", customFlagUrl: null,
      title: { EN: "Japan Study & Direct SSW Work Visa Track", BN: "জাপান স্টাডি এবং নিশ্চিত SSW প্রফেশনাল জব ভিসা" },
      badge: "100% Job Support", price: { EN: "Easy Installment Available", BN: "টিউশন ফি সহজ কিস্তিতে দেয়" },
      desc: { EN: "Learn Japanese up to N4 level and transition directly into Caregiving or IT specified skilled worker jobs.", BN: "জাপানিজ ভাষা শিখে কেয়ারগিভিং বা স্কিলড সেক্টরে সরাসরি উচ্চ বেতনের চাকরির ১০০% নিশ্চয়তা।" },
      intake: "April / July / Oct", link: "/study-abroad#packages"
    },
    {
      id: "canada-express", country: "Canada", customFlagUrl: null,
      title: { EN: "Canada Express Entry & Study Package", BN: "কানাডা এক্সপ্রেস এন্ট্রি ও স্টাডি প্যাকেজ" },
      badge: "PR Pathway", price: { EN: "College & University Admissions", BN: "কলেজ ও ইউনিভার্সিটি ভর্তি" },
      desc: { EN: "Apply to top Canadian colleges with co-op programs and transition to Express Entry PR pathway.", BN: "কো-অপ প্রোগ্রাম সহ কানাডার শীর্ষ কলেজে ভর্তি এবং এক্সপ্রেস এন্ট্রি PR পাথওয়ে।" },
      intake: "Jan / May / Sept", link: "/study-abroad#packages"
    }
  ];

  // 📸 4. GALLERY IMAGES
  const galleryImages = [
    '/hero img/image 1.jpg',
    '/hero img/image 2.jpg',
    '/hero img/image 3.jpg',
    '/hero img/image 4.jpg'
  ];

  // ✅ SUCCESS STORIES
  const storiesList = t.stories || [
    { quote: "CareerLift transformed my career path completely. Their practical lab sessions in Caregiving helped me secure an immediate job placement.", name: "Tanvir Ahmed", role: "Caregiver Level-3", initials: "TA" },
    { quote: "The study abroad team is genuinely transparent. They guided me through my UK student visa without any hidden charges or false promises.", name: "Farhana Yasmin", role: "UK Student Visa Approved", initials: "FY" },
    { quote: "Best CPR and First Aid workshop in Dhaka! Highly experienced doctors and instructors. Certificate got me high priority in hospital job.", name: "Arif Billah", role: "Healthcare Responder", initials: "AB" },
    { quote: "Got my Japan SSW eligibility with their guidance. Easy installment facility helped my family a lot during processing.", name: "Samiya Akter", role: "Japan SSW Visa Track", initials: "SA" }
  ];

  return (
    <div className="pb-16 bg-slate-50 min-h-screen">

      {/* Dynamic Marquee CSS for Comment Cards */}
      <style>{`
        @keyframes marqueeRightToLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-comment-marquee {
          display: flex;
          width: max-content;
          animation: marqueeRightToLeft 35s linear infinite;
        }
        .animate-comment-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <HeroSection />
      <StatsSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 pt-6">

        {/* ============================================================ */}
        {/* 3. PREMIUM SERVICES (কাস্টম ইমেজ + সম্পূর্ণ তথ্য)            */}
        {/* ============================================================ */}
        <section>
          <SectionTitle
            subtitle={currentLang === 'EN' ? "What We Offer" : "আমাদের সেবাসমূহ"}
            title={t.servicesTitle || (currentLang === 'EN' ? "Comprehensive Institutional Services" : "আপনার পেশাগত উন্নয়নে আমাদের বিশেষায়িত সেবা")}
            description={t.servicesDesc || (currentLang === 'EN' ? "Empowering individuals and institutions with certified skills, healthcare support, and global migration advisory." : "স্বীকৃত দক্ষতা, হেলথকেয়ার সাপোর্ট এবং আন্তর্জাতিক মাইগ্রেশনের মাধ্যমে আমরা দিচ্ছি সর্বাত্মক সহায়তা।")}
          />

          {/* 👇 grid-cols-2 for mobile, lg:grid-cols-4 for PC */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {servicesList.map((service, idx) => (
              <NeoCard
                key={service.id}
                className="flex flex-col justify-between h-full bg-white hover:bg-slate-50/80 group border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl sm:rounded-3xl p-3 sm:p-7"
              >
                <div>
                  {/* কাস্টম ইমেজ আইকন */}
                  <div className="w-14 h-14 sm:w-20 sm:h-20 mb-3 sm:mb-6 p-2 bg-slate-50 rounded-2xl border border-slate-100 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <img
                      src={service.img}
                      alt={service.title.EN}
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>

                  <h3 className="text-xs sm:text-lg font-black text-slate-800 mb-1 sm:mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                    {service.title[currentLang] || service.title.EN}
                  </h3>
                  <p className="text-[10px] sm:text-sm text-slate-600 leading-relaxed font-medium line-clamp-3 sm:line-clamp-4">
                    {service.desc[currentLang] || service.desc.EN}
                  </p>
                </div>

                <div className="mt-3 sm:mt-8 pt-3 sm:pt-5 border-t border-slate-100">
                  <Link to={service.link} className="flex items-center text-[10px] sm:text-sm font-black text-slate-900 hover:text-blue-600 transition-colors group/link">
                    <span>{service.btnText[currentLang] || service.btnText.EN}</span>
                    <ArrowRight size={14} className="ml-1 sm:ml-2 group-hover/link:translate-x-1.5 transition-transform text-blue-600" />
                  </Link>
                </div>
              </NeoCard>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. FEATURED COURSES (ফ্রি / পেইড লেবেল + Overlap ফিক্স)     */}
        {/* ============================================================ */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3">
            <SectionTitle
              subtitle={currentLang === 'EN' ? "Skill to Success" : "দক্ষতা ও সাফল্য"}
              title={t.coursesTitle || (currentLang === 'EN' ? "Featured Certified Courses" : "আমাদের জনপ্রিয় কোর্সসমূহ")}
              description={t.coursesDesc || (currentLang === 'EN' ? "Handpicked practical courses designed to meet industry demands and ensure rapid job placements." : "ইন্ডাস্ট্রির বাস্তব চাহিদার সাথে মিল রেখে তৈরি ল্যাব-ভিত্তিক ব্যবহারিক প্রশিক্ষণ কোর্স।")}
              center={false}
            />
            <Link to="/courses" className="self-start md:self-end">
              <NeoButton variant="primary" className="!py-2.5 !px-5 sm:!py-3.5 sm:!px-7 text-xs sm:text-sm font-bold whitespace-nowrap shadow-md">
                {currentLang === 'EN' ? 'View All Courses →' : 'সকল কোর্স দেখুন →'}
              </NeoButton>
            </Link>
          </div>

          {/* 👇 grid-cols-2 for mobile, lg:grid-cols-4 for PC */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {featuredCourses.map((course, idx) => {
              const free = isFree(course.price);
              return (
                <NeoCard
                  key={idx}
                  className="!p-0 flex flex-col bg-white hover:bg-slate-50/50 border-slate-200/80 shadow-sm hover:shadow-xl group relative overflow-hidden transition-all duration-300 rounded-2xl"
                >
                  <div className="relative h-28 sm:h-44 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                    <img
                      src={course.image}
                      alt={course.title[currentLang] || course.title.EN}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

                    {/* 👇 ফ্রি / পেইড লেবেল */}
                    <div className={`absolute top-2 left-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-white shadow-sm ${free ? 'bg-emerald-500' : 'bg-blue-600'}`}>
                      {free
                        ? (currentLang === 'EN' ? 'Free Course' : 'ফ্রি কোর্স')
                        : (currentLang === 'EN' ? 'Premium' : 'পেইড কোর্স')}
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 flex flex-col flex-grow">
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wide">
                      {course.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {course.title[currentLang] || course.title.EN}
                    </h3>

                    {/* Duration + Rating একসাথে (মোবাইলে rating লুকানো) */}
                    <div className="flex items-center gap-1.5 mb-2 text-[9px] sm:text-[10px] font-bold text-slate-500">
                      <span className="flex items-center gap-0.5 truncate">
                        <Clock size={10} className="text-blue-500 flex-shrink-0" /> {course.duration}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="flex items-center space-x-1 px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">
                        <CheckCircle2 size={11} className="text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{course.tag[currentLang] || course.tag.EN}</span>
                      </span>
                    </div>

                    {/* ✅ OVERLAP FIX: মোবাইলে flex-col, PC তে flex-row */}
                    <div className="mt-auto pt-3 border-t border-slate-100">
                      {/* মোবাইল লেআউট: উপরে দাম/রেটিং, নিচে ফুল-উইডথ বাটন */}
                      <div className="flex flex-col gap-2 lg:hidden">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-black ${free ? 'text-emerald-600' : 'text-blue-600'}`}>
                            {free ? (currentLang === 'EN' ? 'Free' : 'ফ্রি') : course.price}
                          </span>
                          <span className="flex items-center space-x-1 text-[10px] font-black text-amber-600">
                            <Star size={11} className="fill-amber-500 text-amber-500" />
                            <span>{course.rating}</span>
                          </span>
                        </div>
                        <Link to={`/course/${course.id}`} className="block">
                          <button className="w-full px-3 py-2 rounded-lg bg-slate-900 text-white font-black text-[10px] shadow-md hover:bg-blue-600 active:scale-95 transition-all flex items-center justify-center space-x-1">
                            <span>{currentLang === 'EN' ? 'Details' : 'বিস্তারিত'}</span>
                            <ArrowRight size={11} />
                          </button>
                        </Link>
                      </div>

                      {/* PC লেআউট: এক লাইনে */}
                      <div className="hidden lg:flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center space-x-1 text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200/80">
                            <Star size={12} className="fill-amber-500 text-amber-500" />
                            <span>{course.rating}</span>
                          </span>
                          <span className={`text-xs font-black ${free ? 'text-emerald-600' : 'text-blue-600'}`}>
                            {free ? (currentLang === 'EN' ? 'Free' : 'ফ্রি') : course.price}
                          </span>
                        </div>
                        <Link to={`/course/${course.id}`}>
                          <button className="px-5 py-2.5 rounded-lg bg-slate-900 text-white font-black text-xs shadow-md hover:bg-blue-600 active:scale-95 transition-all flex items-center space-x-1 group/btn">
                            <span>{currentLang === 'EN' ? 'Details' : 'বিস্তারিত'}</span>
                            <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </NeoCard>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4.2 STUDY ABROAD & VISA PACKAGES (সম্পূর্ণ তথ্য ফিরে এসেছে)   */}
        {/* ============================================================ */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3">
            <SectionTitle
              subtitle={currentLang === 'EN' ? "Global Opportunities" : "আন্তর্জাতিক প্যাকেজ ও অফার"}
              title={currentLang === 'EN' ? "Study, Work & Migrate Worldwide" : "আমাদের স্পেশাল স্টাডি ও ভিসা প্যাকেজসমূহ"}
              description={currentLang === 'EN' ? "Explore our exclusive credit transfer pathways, free tuition options, and work-permit assured global packages." : "স্বল্প খরচে ব্রিটিশ ডিগ্রি, ইউরোপে ফ্রি পড়াশোনা এবং নিশ্চিত জবের সুযোগসমূহ।"}
              center={false}
            />
            <Link to="/study-abroad#packages" className="self-start md:self-end">
              <NeoButton variant="secondary" className="!py-2.5 !px-5 sm:!py-3.5 sm:!px-7 text-xs sm:text-sm font-bold whitespace-nowrap shadow-md !bg-slate-900 !text-white hover:!bg-blue-600">
                {currentLang === 'EN' ? 'Explore All Packages →' : 'সকল প্যাকেজ দেখুন →'}
              </NeoButton>
            </Link>
          </div>

          {/* 👇 grid-cols-2 for mobile, lg:grid-cols-4 for PC */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {featuredPackages.map((pkg, idx) => {
              const flagSrc = getCountryFlag(pkg.country, pkg.customFlagUrl);
              return (
                <NeoCard
                  key={idx}
                  className="flex flex-col justify-between h-full bg-white hover:bg-blue-50/20 border-slate-200/80 shadow-sm hover:shadow-xl group transition-all duration-300 rounded-2xl p-3 sm:p-6"
                >
                  <div>
                    {/* ফ্ল্যাগ + ব্যাজ */}
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-2 sm:mb-3">
                      <span className="text-[9px] sm:text-[10px] font-black text-slate-800 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded-full flex items-center space-x-1.5">
                        <img src={flagSrc} alt="flag" className="w-4 h-3 object-cover rounded" onError={(e) => { e.target.src = '/flags/gb.png'; }} />
                        <span className="truncate">{pkg.country}</span>
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-extrabold uppercase bg-amber-500/10 text-amber-600 border border-amber-500/20 px-1.5 py-0.5 rounded-full line-clamp-1">
                        ★ {pkg.badge}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-base font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors leading-snug line-clamp-3">
                      {pkg.title[currentLang]}
                    </h3>

                    <span className="text-[9px] sm:text-xs font-bold text-emerald-600 block mb-2 line-clamp-1">
                      ✔ {pkg.price[currentLang]}
                    </span>

                    <p className="text-[10px] sm:text-sm text-slate-600 leading-relaxed font-medium line-clamp-3 sm:line-clamp-4">
                      {pkg.desc[currentLang]}
                    </p>
                  </div>

                  <div className="mt-3 sm:mt-6 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1.5">
                    <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 flex items-center">
                      <Clock size={10} className="mr-1 text-blue-500" /> {pkg.intake}
                    </span>
                    <Link to={pkg.link} className="flex items-center text-[10px] sm:text-xs font-black text-blue-600 hover:text-blue-800 transition-colors group/link">
                      <span>{currentLang === 'EN' ? 'Apply' : 'আবেদন'}</span>
                      <ArrowRight size={12} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </NeoCard>
              );
            })}
          </div>
        </section>

{/* ============================================================ */}
        {/* 4.5 CAMPUS GALLERY (লাইটবক্স পপআপ সহ - Pinterest Style)      */}
        {/* ============================================================ */}
        <section className="bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-14 text-white overflow-hidden relative shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 relative z-10 gap-4">
            <div>
              <span className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-1 block flex items-center">
                <Sparkles size={14} className="mr-1.5 text-amber-400" /> Campus Gallery
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {currentLang === 'EN' ? 'Life at CareerLift Institute' : 'ক্যারিয়ারলিফটের ক্যাম্পাস জীবন'}
              </h2>
            </div>
            <Link to="/gallery">
              <button className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-blue-400 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl border border-white/15 transition-all whitespace-nowrap">
                <Maximize2 size={16} />
                <span>{currentLang === 'EN' ? 'View Full Gallery →' : 'সম্পূর্ণ গ্যালারি দেখুন →'}</span>
              </button>
            </Link>
          </div>

          {/* 👇 Pinterest Style Masonry Layout (CSS Columns) */}
          <div className="columns-2 lg:columns-4 gap-3 sm:gap-4 relative z-10">
            {dbGallery.length > 0 ? (
              dbGallery.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedImg(img.image_url)} // 👈 URL পাস করা হয়েছে
                  className="break-inside-avoid mb-3 sm:mb-4 relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 bg-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <img
                    src={img.image_url}
                    alt={img.caption || 'Campus Gallery Image'}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1576267423048-15c0040fec78?auto=format&fit=crop&w=600&q=80'; }}
                  />
                  
                  {/* হোভার করলে ক্যাপশন ও আইকন দেখাবে */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 backdrop-blur-[2px]">
                    <Maximize2 className="text-white w-6 h-6 sm:w-8 sm:h-8 mb-2 transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                    {img.caption && (
                      <p className="text-white text-[10px] sm:text-xs font-bold text-center line-clamp-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {img.caption}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-400 text-sm font-medium w-full">
                No images available in the gallery.
              </div>
            )}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. SUCCESS STORIES: INFINITE COMMENT MARQUEE                */}
        {/* ============================================================ */}
        <section className="overflow-hidden">
          <div className="mb-8 sm:mb-12 text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 inline-block mb-2">
              ★ {currentLang === 'EN' ? 'Verified Reviews' : 'শিক্ষার্থীদের বাস্তব অভিজ্ঞতা'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.storiesTitle || (currentLang === 'EN' ? "Success Stories & Feedback" : "সাফল্যের গল্প ও মতামত")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              {currentLang === 'EN' ? "Real reviews from students who transformed their careers and achieved global mobility with us." : "ক্যারিয়ারলিফটের হাত ধরে নিজেদের জীবন ও ক্যারিয়ার বদলে ফেলার বাস্তব অভিজ্ঞতা।"}
            </p>
          </div>

          <div className="relative w-full py-4 bg-slate-100/60 rounded-3xl border border-slate-200/60 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

            <div className="animate-comment-marquee gap-4 flex items-center">
              {[...storiesList, ...storiesList, ...storiesList].map((story, idx) => (
                <div
                  key={idx}
                  className="w-72 sm:w-80 flex-shrink-0 p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-0.5">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={13} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <Quote size={20} className="text-blue-100" />
                  </div>

                  <p className="text-slate-700 font-medium text-xs sm:text-sm italic leading-relaxed line-clamp-3">
                    "{story.quote ? story.quote.replace(/"/g, '') : ''}"
                  </p>

                  <div className="flex items-center space-x-3 pt-3 border-t border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs flex-shrink-0">
                      {story.initials || "CL"}
                    </div>
                    <div className="truncate">
                      <h4 className="font-black text-slate-900 text-xs sm:text-sm truncate">{story.name || "Verified Student"}</h4>
                      <span className="text-[10px] font-bold text-blue-600 block flex items-center space-x-1 truncate">
                        <CheckCircle2 size={11} className="text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{story.role || "Alumni"}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. VISIT CAMPUS, MAP & SMART FORM                            */}
        {/* ============================================================ */}
        <section id="consultation-form" className="bg-white border border-slate-200/80 shadow-xl rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-14 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              <div>
                <span className="text-blue-600 font-black text-xs uppercase tracking-widest block mb-1.5">
                  📍 {t.locationTag ? t.locationTag.replace('📍 ', '') : (currentLang === 'EN' ? 'VISIT OUR CAMPUS' : 'ক্যাম্পাস ভিজিট করুন')}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                  {t.contactTitle || (currentLang === 'EN' ? "CareerLift Head Office" : "আমাদের অফিস ও যোগাযোগ")}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 sm:mt-3 leading-relaxed">
                  {t.contactDesc || (currentLang === 'EN' ? "Our office is centrally located in Bijoy Nagar, Dhaka. Feel free to walk in for any course or visa inquiries." : "আমাদের অফিস ঢাকার বিজয়নগরের কেন্দ্রস্থলে অবস্থিত। ভিসা বা যেকোনো কোর্সের বিস্তারিত জানতে সরাসরি চলে আসুন।")}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3 sm:space-x-4 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 flex-shrink-0 font-bold">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-400">{t.addressTitle || (currentLang === 'EN' ? "Office Address" : "ঠিকানা")}</h4>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5 leading-snug">{t.addressText || "180–181 Prime Tower (Lift-3), Shaheed Nazrul Islam Sharak, Bijoy Nagar, Dhaka-1000"}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600 flex-shrink-0 font-bold">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-400">{t.hotlineTitle || (currentLang === 'EN' ? "Direct Hotline" : "হটলাইন")}</h4>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">{t.hotlineText || "+880 1818-304081 | +880 1965-157203"}</p>
                  </div>
                </div>
              </div>

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

            <div className="lg:col-span-7">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-10 space-y-6 shadow-sm">
                <div>
                  <h3 className="text-lg sm:text-2xl font-black text-slate-900">{currentLang === 'EN' ? 'Book Your Free Consultation' : 'ফ্রি কনসালটেন্সির জন্য রেজিস্ট্রেশন করুন'}</h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">{currentLang === 'EN' ? 'Fill out this form and our senior counselor will call you within 24 hours.' : 'ফর্মটি পূরণ করুন। আমাদের অভিজ্ঞ কাউন্সিলর আগামী ২৪ ঘণ্টার মধ্যে ফোনে আপনার সাথে যোগাযোগ করবেন।'}</p>
                </div>

                {submitSuccess ? (
                  <div className="p-8 rounded-2xl bg-emerald-100 border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 size={48} className="text-emerald-600 mx-auto animate-bounce" />
                    <h4 className="text-xl font-black text-emerald-900">{currentLang === 'EN' ? 'Registration Successful!' : 'আবেদন সফলভাবে গৃহীত হয়েছে!'}</h4>
                    <p className="text-xs sm:text-sm font-medium text-emerald-800">{currentLang === 'EN' ? 'We have received your details. Our counselor will call you soon.' : 'আমরা আপনার তথ্য পেয়েছি। আমাদের কাউন্সিলর শীঘ্রই আপনার সাথে যোগাযোগ করবেন।'}</p>
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

      <AlumniSection />

      {/* ============================================================ */}
      {/* 🖼️ IMAGE LIGHTBOX MODAL (গ্যালারি পপআপ)                       */}
      {/* ============================================================ */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImg(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <X size={32} />
          </button>
          <img
            src={selectedImg}
            alt="Fullscreen Campus"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}

    </div>
  );
}