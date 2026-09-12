import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, GraduationCap, Award, CheckCircle2, 
  ArrowRight, ShieldCheck, MapPin, Phone, Mail, Clock, 
  FileCheck, Users, Sparkles, Building2, HelpCircle, 
  Calendar, DollarSign, BookOpen, Target, FileText, 
  Briefcase, Check, TrendingUp, Zap, Tag, Flame, ChevronDown
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import NeoButton from '../../components/ui/NeoButton';
import { supabase } from '../../config/supabase';

export default function StudyAbroad() {
  const { lang } = useLanguage();
  const currentLang = lang || 'EN';
  
  const [activeCountry, setActiveCountry] = useState('uk');
  const [heroTab, setHeroTab] = useState('UK');
  
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    serviceType: 'Study Abroad', 
    destination: 'UK', 
    level: 'Bachelors',
    source: 'Study Abroad Page'
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('study_abroad_inquiries').insert([
        { name: formData.name, phone: formData.phone, service_type: formData.serviceType, destination: formData.destination }
      ]);
      if (error) throw error;
      setSubmitSuccess(true);
      setFormData({ name: '', phone: '', serviceType: 'Study Abroad', destination: 'UK' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ SMART AUTO-FLAG DETECTOR FOR DYNAMIC PACKAGES
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

  // ✅ FUTURE CRUD READY: COMPLETE CATALOG OF STUDY ABROAD & VISA PACKAGES
  const studyPackagesList = [
    {
      id: "uk-othm-topup",
      country: "United Kingdom",
      customFlagUrl: null,
      title: { EN: "UK Direct 3rd Year Bachelor's Entry via OTHM Diploma", BN: "OTHM ডিপ্লোমার মাধ্যমে ইউকেতে সরাসরি ৩য় বর্ষে ভর্তি" },
      badge: "Save 50% Tuition",
      price: { EN: "Special Credit Transfer Pack", BN: "বিশেষ ক্রেডিট ট্রান্সফার সুবিধা" },
      intake: "September / January Intake",
      duration: "1 Year (In UK) + 2 Years PSW",
      desc: { EN: "Complete OTHM Level 4 & 5 at our institute in Bangladesh, then directly enter the final year Bachelor's degree at top UK universities. Save huge living & tuition costs.", BN: "বাংলাদেশে আমাদের ইনস্টিটিউটে লেভেল ৪ ও ৫ শেষ করে ইউকের সেরা ইউনিভার্সিটিতে সরাসরি ফাইনাল ইয়ারে ভর্তি। সাথে থাকছে ২ বছরের ফুল-টাইম ওয়ার্ক ভিসা।" },
      features: [
        { EN: "Direct university offer letter within 3 to 4 weeks", BN: "৩-৪ সপ্তাহের মধ্যে সরাসরি ইউনিভার্সিটি অফার লেটার" },
        { EN: "No bank statement freeze hassle for diploma phase", BN: "ডিপ্লোমা চলাকালীন কঠিন ব্যাংক স্টেটমেন্টের ঝামেলা নেই" },
        { EN: "Spouse & dependent visa allowed for Master's track", BN: "মাস্টার্স প্রোগ্রামে স্পাউস ও সন্তান নেওয়ার পূর্ণ সুযোগ" }
      ]
    },
    {
      id: "schengen-job-pack",
      country: "Europe (Schengen Area)",
      customFlagUrl: null,
      title: { EN: "29 Schengen Countries Study & Job Search Package", BN: "ইউরোপের ২৯টি দেশে স্টাডি ও জব সার্চ ভিসা প্যাকেজ" },
      badge: "Free Tuition in Germany",
      price: { EN: "Low Sponsor & High Ratio", BN: "সহজ স্পন্সর ও সর্বোচ্চ ভিসা হার" },
      intake: "Winter & Summer Intakes",
      duration: "Degree + 18 Months Job Search",
      desc: { EN: "Study in Germany, Finland, or Malta with zero to very affordable tuition fees. Unlock border-free travel across all 29 European states and get EU Blue Card eligibility.", BN: "জার্মানি, ফিনল্যান্ড বা মাল্টায় সম্পূর্ণ ফ্রি বা স্বল্প খরচে পড়াশোনা। ২৯টি ইউরোপীয় দেশে কোনো বর্ডার ছাড়াই অবাধ যাতায়াত এবং পড়াশোনা শেষে ১৮ মাসের দীর্ঘ জব সার্চ পারমিট।" },
      features: [
        { EN: "Zero tuition fees in public universities of Germany & Finland", BN: "জার্মানি ও ফিনল্যান্ডের সরকারি পাবলিক ইউনিভার্সিটিতে ফ্রি পড়াশোনা" },
        { EN: "Schengen Visa grants unrestricted travel across 29 nations", BN: "শেনজেন ভিসায় সমগ্র ইউরোপে অবাধ ভ্রমণ ও নেটওয়ার্কিং" },
        { EN: "Easy PR and citizenship transition after graduation", BN: "পড়াশোনা ও চাকরির পর খুব সহজেই ইউরোপীয় স্থায়ী নাগরিকত্ব (PR)" }
      ]
    },
    {
      id: "japan-ssw-track",
      country: "Japan",
      customFlagUrl: null,
      title: { EN: "Japan Study & Direct SSW Work Visa Track", BN: "জাপান স্টাডি এবং নিশ্চিত SSW প্রফেশনাল জব ভিসা" },
      badge: "100% Job Support",
      price: { EN: "Easy Installment Facility", BN: "টিউশন ফি সহজ কিস্তিতে দেয়" },
      intake: "April, July & October",
      duration: "Study + Direct SSW Job",
      desc: { EN: "Learn Japanese language up to NAT/JLPT N4 level and transition directly into Caregiving, IT, or engineering specified skilled worker jobs with guaranteed placement support.", BN: "জাপানিজ ভাষা শিখে কেয়ারগিভিং বা স্কিলড সেক্টরে সরাসরি উচ্চ বেতনের চাকরির ১০০% নিশ্চয়তা। সাশ্রয়ী খরচ এবং কিস্তিতে পরিশোধের সুযোগ।" },
      features: [
        { EN: "Guaranteed part-time job (28 hours/week) during studies", BN: "পড়াশোনা চলাকালীন সপ্তাহে ২৮ ঘণ্টা বৈধ পার্ট-টাইম কাজের নিশ্চয়তা" },
        { EN: "High visa success rate with proper financial guidance", BN: "সঠিক ডকুমেন্টেশনসহ সর্বোচ্চ ভিসা সাফল্যের হার" },
        { EN: "Direct conversion to SSW work visa in healthcare & tech", BN: "হেলথকেয়ার ও আইটি সেক্টরে সরাসরি SSW জব ভিসায় রূপান্তর" }
      ]
    },
    {
      id: "canada-pr-path",
      country: "Canada",
      customFlagUrl: null,
      title: { EN: "Canada Study & Express Entry PR Pathway", BN: "কানাডা স্টাডি এবং এক্সপ্রেস এন্ট্রি PR প্যাকেজ" },
      badge: "PR Pathway",
      price: { EN: "3 Years PGWP Included", BN: "৩ বছরের পোস্ট-গ্র্যাজুয়েট ওয়ার্ক পারমিট" },
      intake: "September & January",
      duration: "2-4 Years Degree + PGWP",
      desc: { EN: "Secure admission in Canadian public colleges and universities. Get up to 3 years of Post-Graduation Work Permit (PGWP) leading directly to Canadian Permanent Residency.", BN: "কানাডার বিশ্বস্বীকৃত পাবলিক ইউনিভার্সিটি ও কলেজে পড়াশোনা। কোর্স শেষে ৩ বছর পর্যন্ত কাজের সুযোগ এবং এক্সপ্রেস এন্ট্রির মাধ্যমে স্থায়ী বসবাসের (PR) সহজ পথ।" },
      features: [
        { EN: "Spouse open work permit & free school education for children", BN: "স্পাউস ওপেন ওয়ার্ক পারমিট এবং সন্তানদের বিনামূল্যে পড়াশোনা" },
        { EN: "Globally recognized degrees with high post-study wages", BN: "বিশ্বস্বীকৃত ডিগ্রি এবং পড়াশোনা শেষে উচ্চ পারিশ্রমিকের চাকরি" },
        { EN: "Clear alignment with Canadian immigration nominee programs", BN: "কানাডিয়ান প্রভিন্সিয়াল নমিনি ও PR প্রোগ্রামের সাথে সরাসরি সম্পৃক্ততা" }
      ]
    }
  ];

  const heroInteractiveData = {
    "UK": { flag: "🇬🇧", title: "United Kingdom", pathway: "Direct 3rd Year Entry via OTHM/Qualifi", visaRatio: "98.5%", workRights: "20 Hrs/Week + 2 Yrs PSW", timeframe: "3 to 4 Weeks", savings: "Save up to 50% Tuition Fee" },
    "Canada": { flag: "🇨🇦", title: "Canada", pathway: "Express Entry & PGWP PR Track", visaRatio: "96.0%", workRights: "Full Time + 3 Yrs PGWP", timeframe: "6 to 8 Weeks", savings: "Spouse Open Work Permit" },
    "Japan": { flag: "🇯🇵", title: "Japan", pathway: "Study & SSW Work Visa Conversion", visaRatio: "99.0%", workRights: "28 Hrs/Week + 100% Job", timeframe: "4 to 6 Weeks", savings: "Pay Tuition in Easy Installments" },
    "Europe": { flag: "🇪🇺", title: "Schengen Area", pathway: "Free Tuition in Germany & Finland", visaRatio: "97.5%", workRights: "29 Countries Unrestricted Travel", timeframe: "4 to 8 Weeks", savings: "Zero Tuition in Public Unis" }
  };

  const schengenRow1 = [
    { name: "Austria", flag: "/flags/at.png" }, { name: "Belgium", flag: "/flags/be.png" }, { name: "Bulgaria", flag: "/flags/Bulgaria.png" },
    { name: "Croatia", flag: "/flags/hr.png" }, { name: "Czech Republic", flag: "/flags/cz.png" }, { name: "Denmark", flag: "/flags/dk.png" },
    { name: "Estonia", flag: "/flags/ee.png" }, { name: "Finland", flag: "/flags/fi.png" }, { name: "France", flag: "/flags/fr.png" },
    { name: "Germany", flag: "/flags/de.png" }, { name: "Greece", flag: "/flags/gr.png" }, { name: "Hungary", flag: "/flags/hu.png" },
    { name: "Iceland", flag: "/flags/is.png" }, { name: "Italy", flag: "/flags/it.png" }, { name: "Latvia", flag: "/flags/lv.png" }
  ];

  const schengenRow2 = [
    { name: "Liechtenstein", flag: "/flags/li.png" }, { name: "Lithuania", flag: "/flags/lt.png" }, { name: "Luxembourg", flag: "/flags/lu.png" },
    { name: "Malta", flag: "/flags/mt.png" }, { name: "Netherlands", flag: "/flags/nl.png" }, { name: "Norway", flag: "/flags/no.png" },
    { name: "Poland", flag: "/flags/pl.png" }, { name: "Portugal", flag: "/flags/pt.png" }, { name: "Romania", flag: "/flags/ro.png" },
    { name: "Slovakia", flag: "/flags/sk.png" }, { name: "Slovenia", flag: "/flags/si.png" }, { name: "Spain", flag: "/flags/es.png" },
    { name: "Sweden", flag: "/flags/se.png" }, { name: "Switzerland", flag: "/flags/ch.png" }
  ];

  const destinations = {
    "uk": {
      id: "uk", name: { EN: "United Kingdom (UK)", BN: "যুক্তরাজ্য (UK)" }, flag: "/flags/gb.png", badge: "British Heritage",
      landmarkImg: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80",
      tagline: { EN: "The World's Most Prestigious Academic Heritage", BN: "বিশ্বের সবচেয়ে মর্যাদাপূর্ণ ও ঐতিহ্যবাহী শিক্ষাব্যবস্থা" },
      pswr: { EN: "2 Years Graduate Route (PSW)", BN: "২ বছরের পোস্ট-স্টাডি ওয়ার্ক ভিসা" },
      intakes: { EN: "September, January & May", BN: "সেপ্টেম্বর, জানুয়ারি ও মে ইনটেক" },
      tuition: { EN: "£11,000 - £16,000 / Year", BN: "১১,০০০ - ১৬,০০০ পাউন্ড / বছর" },
      requirements: { EN: "IELTS 6.0+ or OIETC / OTHM Level 4/5 Pathway", BN: "IELTS ৬.০+ অথবা OTHM/Qualifi ক্রেডিট ট্রান্সফার" },
      highlights: [
        { EN: "Direct 2nd/3rd Year Entry via OTHM & Qualifi Diplomas", BN: "OTHM ও Qualifi ডিপ্লোমার মাধ্যমে সরাসরি ২য়/৩য় বর্ষে ভর্তি" },
        { EN: "Spouse & Dependent Visa eligibility for Master's/PhD", BN: "মাস্টার্স ও পিএইচডি শিক্ষার্থীদের জন্য স্পাউস ভিসা সুবিধা" },
        { EN: "Over 50+ Partner Universities with Scholarship options", BN: "৫০+ পার্টনার ইউনিভার্সিটিতে বিশেষ স্কলারশিপের সুযোগ" },
        { EN: "20 Hours/Week part-time work allowed during studies", BN: "পড়াশোনার পাশাপাশি সপ্তাহে ২০ ঘণ্টা পার্ট-টাইম কাজের সুযোগ" }
      ]
    },
    "schengen": {
      id: "schengen", name: { EN: "Europe (Schengen Area)", BN: "ইউরোপ (শেনজেন জোন)" }, flag: "/flags/schengen.png", badge: "29 Countries 1 Visa", isSchengen: true,
      landmarkImg: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1000&q=80",
      tagline: { EN: "Low Tuition, High Employment & Unlimited Travel Across 29 Nations", BN: "স্বল্প টিউশন ফি এবং ২৯টি দেশে অবাধ যাতায়াত ও ক্যারিয়ার" },
      pswr: { EN: "1 to 2 Years Job Search Visa leading to EU Blue Card", BN: "১ থেকে ২ বছরের জব সার্চ ভিসা ও EU ব্লু কার্ড সুবিধা" },
      intakes: { EN: "September (Winter) & February (Summer)", BN: "সেপ্টেম্বর (উইন্টার) ও ফেব্রুয়ারি (সামার) ইনটেক" },
      tuition: { EN: "€0 (Free in Germany) to €6,000 / Year across Europe", BN: "০ (জার্মানিতে ফ্রি) থেকে ৬,০০০ ইউরো / বছর" },
      requirements: { EN: "IELTS 5.5+ / 6.0+ or MOI (Medium of Instruction)", BN: "IELTS ৫.৫+ অথবা MOI (ইংরেজি মাধ্যমের সনদ)" },
      highlights: [
        { EN: "Schengen Visa grants unrestricted border-free travel across all 29 European states", BN: "শেনজেন ভিসায় ২৯টি ইউরোপীয় দেশে কোনো বর্ডার ছাড়াই অবাধ যাতায়াত" },
        { EN: "Zero tuition fees in state-funded public universities of Germany and Finland", BN: "জার্মানি ও ফিনল্যান্ডের সরকারি পাবলিক ইউনিভার্সিটিতে সম্পূর্ণ ফ্রি পড়াশোনা" },
        { EN: "Huge corporate demand for IT specialists, engineers, and healthcare professionals", BN: "আইটি, ইঞ্জিনিয়ারিং এবং হেলথকেয়ার প্রফেশনালদের ইউরোপ জুড়ে সর্বোচ্চ চাহিদা" },
        { EN: "Easy transition to Permanent Residency (PR) and EU Citizenship after graduation", BN: "পড়াশোনা শেষে খুব সহজেই ইউরোপীয় স্থায়ী নাগরিকত্ব (PR) পাওয়ার সুযোগ" }
      ]
    },
    "japan": {
      id: "japan", name: { EN: "Japan (Study & SSW)", BN: "জাপান (স্টাডি ও SSW)" }, flag: "/flags/jp.png", badge: "100% Job Security",
      landmarkImg: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
      tagline: { EN: "Asia's Technology Hub with 100% Job Security", BN: "এশিয়ার প্রযুক্তি কেন্দ্র ও ১০০% কর্মসংস্থানের নিশ্চয়তা" },
      pswr: { EN: "Convertible to SSW / Work Visa", BN: "SSW বা প্রফেশনাল জব ভিসায় রূপান্তরযোগ্য" },
      intakes: { EN: "April, July, October & January", BN: "এপ্রিল, জুলাই, অক্টোবর ও জানুয়ারি" },
      tuition: { EN: "¥700,000 - ¥900,000 / Year", BN: "৭ - ৯ লাখ ইয়েন / বছর (সহজ কিস্তিতে দেয়)" },
      requirements: { EN: "NAT / JLPT N5 or N4 Level Competency", BN: "NAT বা JLPT N5/N4 লেভেল ভাষা দক্ষতা" },
      highlights: [
        { EN: "High visa success rate with proper financial documentation", BN: "সঠিক ডকুমেন্টেশনসহ সর্বোচ্চ ভিসা সাফল্যের হার" },
        { EN: "Part-time work permitted up to 28 hours per week", BN: "সপ্তাহে ২৮ ঘণ্টা বৈধ পার্ট-টাইম কাজের নিশ্চয়তা" },
        { EN: "Direct SSW (Specified Skilled Worker) caregiving job pathways", BN: "কেয়ারগিভিং ও স্কিলড সেক্টরে সরাসরি SSW জব ভিসার সুযোগ" },
        { EN: "Affordable tuition fees with installment payment facilities", BN: "অত্যন্ত সাশ্রয়ী টিউশন ফি এবং কিস্তিতে পরিশোধের সুবিধা" }
      ]
    },
    "canada": {
      id: "canada", name: { EN: "Canada", BN: "কানাডা" }, flag: "/flags/ca.png", badge: "PR Pathway",
      landmarkImg: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1000&q=80",
      tagline: { EN: "High Quality of Life & Direct PR Pathways", BN: "উন্নত জীবনযাত্রা ও সহজ PR (স্থায়ী বসবাস) সুবিধা" },
      pswr: { EN: "Up to 3 Years PGWP", BN: "সর্বোচ্চ ৩ বছরের পোস্ট-গ্র্যাজুয়েট ওয়ার্ক পারমিট" },
      intakes: { EN: "September, January & May", BN: "সেপ্টেম্বর, জানুয়ারি ও মে ইনটেক" },
      tuition: { EN: "$15,000 - $22,000 CAD / Year", BN: "১৫,০০০ - ২২,০০০ কানাডিয়ান ডলার / বছর" },
      requirements: { EN: "IELTS 6.0+ (No band less than 6.0)", BN: "IELTS ৬.০+ (প্রতিটি ব্যান্ডে ন্যূনতম ৬.০)" },
      highlights: [
        { EN: "Clear pathway to Canadian Permanent Residency (PR via Express Entry)", BN: "পড়াশোনা শেষে কানাডায় স্থায়ী বসবাসের (PR) সহজ সুযোগ" },
        { EN: "Globally recognized degrees from public universities & colleges", BN: "বিশ্বস্বীকৃত পাবলিক ইউনিভার্সিটি ও কলেজের ডিগ্রি" },
        { EN: "Spouse open work permit & free education for children", BN: "স্পাউস ওপেন ওয়ার্ক পারমিট এবং সন্তানদের বিনামূল্যে পড়াশোনা" },
        { EN: "Safe, multicultural, and immigrant-friendly society", BN: "নিরাপদ, বহুজাতিক এবং অভিবাসী-বান্ধব সমাজব্যবস্থা" }
      ]
    },
    "australia": {
      id: "australia", name: { EN: "Australia", BN: "অস্ট্রেলিয়া" }, flag: "/flags/au.png", badge: "High Wage Opportunity",
      landmarkImg: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1000&q=80",
      tagline: { EN: "World-Class Universities & Top Minimum Wage", BN: "বিশ্বসেরা ইউনিভার্সিটি এবং সর্বোচ্চ পারিশ্রমিক" },
      pswr: { EN: "2 to 5 Years Post-Study Work Visa", BN: "২ থেকে ৫ বছরের পোস্ট-স্টাডি ওয়ার্ক ভিসা" },
      intakes: { EN: "February, July & November", BN: "ফেব্রুয়ারি, জুলাই ও নভেম্বর ইনটেক" },
      tuition: { EN: "$20,000 - $32,000 AUD / Year", BN: "২০,০০০ - ৩২,০০০ অস্ট্রেলিয়ান ডলার / বছর" },
      requirements: { EN: "IELTS 6.0/6.5 or PTE equivalent", BN: "IELTS ৬.০/৬.৫ অথবা PTE সমমান" },
      highlights: [
        { EN: "Highest student part-time hourly minimum wage globally", BN: "বিশ্বের সর্বোচ্চ পার্ট-টাইম ঘণ্টাপ্রতি পারিশ্রমিক" },
        { EN: "Extended post-study work visa for regional universities", BN: "রিজিওনাল ইউনিভার্সিটিতে অতিরিক্ত বছর কাজের সুযোগ" },
        { EN: "Spouse allowed to travel and work full-time (for Masters)", BN: "মাস্টার্স শিক্ষার্থীদের স্পাউসের ফুল-টাইম কাজের সুযোগ" },
        { EN: "Direct skill assessment pathways for Permanent Residency", BN: "স্কিল এসেসমেন্টের মাধ্যমে স্থায়ী বসবাসের সুযোগ" }
      ]
    },
    "malaysia": {
      id: "malaysia", name: { EN: "Malaysia", BN: "মালয়েশিয়া" }, flag: "/flags/my.png", badge: "Low Cost & UK Degree",
      landmarkImg: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=80",
      tagline: { EN: "Affordable Education with British/Australian Dual Degrees", BN: "স্বল্প খরচে ব্রিটিশ ও অস্ট্রেলিয়ান ডুয়াল ডিগ্রি" },
      pswr: { EN: "Professional Employment Pass eligibility", BN: "প্রফেশনাল এমপ্লয়মেন্ট পাস সুবিধা" },
      intakes: { EN: "January, April, July & October", BN: "জানুয়ারি, এপ্রিল, জুলাই ও অক্টোবর" },
      tuition: { EN: "$3,000 - $6,000 USD / Year", BN: "৩,০০০ - ৬,০০০ মার্কিন ডলার / বছর" },
      requirements: { EN: "IELTS 5.5 or MOI accepted", BN: "IELTS ৫.৫ অথবা MOI (বিনা আইইএলটিএস-এ সুযোগ)" },
      highlights: [
        { EN: "Earn UK, US, or Australian university degree at 1/3rd of the cost", BN: "৩ ভাগের ১ ভাগ খরচে ইউকে বা অস্ট্রেলিয়ান ডিগ্রি অর্জন" },
        { EN: "Without IELTS admission possible via medium of instruction", BN: "আইইএলটিএস ছাড়া ইংরেজি মাধ্যমের সনদে ভর্তির সুযোগ" },
        { EN: "Extremely affordable living expenses and halal food environment", BN: "অত্যন্ত কম জীবনযাত্রার খরচ ও শতভাগ হালাল পরিবেশ" },
        { EN: "Seamless credit transfer to UK, Canada, or Australia in final year", BN: "শেষ বর্ষে ইউকে বা অস্ট্রেলিয়ায় ক্রেডিট ট্রান্সফার সুবিধা" }
      ]
    },
    "malta": {
      id: "malta", name: { EN: "Malta (Schengen)", BN: "মাল্টা (শেনজেন)" }, flag: "/flags/mt.png", badge: "Easy Schengen Entry",
      landmarkImg: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1000&q=80",
      tagline: { EN: "Gateway to Europe with High Employment Rates", BN: "ইউরোপের প্রবেশদ্বার ও সর্বোচ্চ কর্মসংস্থানের হার" },
      pswr: { EN: "1 Year Post-Study Work Permit", BN: "১ বছরের পোস্ট-স্টাডি ওয়ার্ক পারমিট" },
      intakes: { EN: "February, June & October", BN: "ফেব্রুয়ারি, জুন ও অক্টোবর ইনটেক" },
      tuition: { EN: "€4,500 - €7,000 / Year", BN: "৪,৫০০ - ৭,০০০ ইউরো / বছর" },
      requirements: { EN: "IELTS 5.5 or OIETC / Duolingo", BN: "IELTS ৫.৫ অথবা ডুয়োলিঙ্গো / স্পোকেন টেস্ট" },
      highlights: [
        { EN: "English is an official language—no language barrier", BN: "ইংরেজি সরকারি ভাষা হওয়ায় কোনো ভাষাগত জটিলতা নেই" },
        { EN: "Schengen visa allows unrestricted travel across 29 EU nations", BN: "শেনজেন ভিসায় ২৯টি ইউরোপীয় দেশে অবাধ যাতায়াত" },
        { EN: "High demand for hospitality, healthcare, and IT professionals", BN: "হসপিটালিটি, হেলথকেয়ার এবং আইটি সেক্টরে প্রচুর চাকরির সুযোগ" },
        { EN: "High visa success rate for Bangladeshi students", BN: "বাংলাদেশি শিক্ষার্থীদের জন্য অত্যন্ত ইতিবাচক ভিসা অনুপাত" }
      ]
    },
    "south-korea": {
      id: "south-korea", name: { EN: "South Korea", BN: "দক্ষিণ কোরিয়া" }, flag: "/flags/kr.png", badge: "Tech & E-7 Visa",
      landmarkImg: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1000&q=80",
      tagline: { EN: "Global Tech Powerhouse with D-10 & E-7 Visa Pathways", BN: "প্রযুক্তির পরাশক্তি এবং E-7 প্রফেশনাল জব ভিসা সুবিধা" },
      pswr: { EN: "D-10 Job Search to E-7 Work Visa", BN: "D-10 জব সার্চ থেকে E-7 ওয়ার্ক ভিসা" },
      intakes: { EN: "March & September", BN: "মার্চ এবং সেপ্টেম্বর ইনটেক" },
      tuition: { EN: "$3,500 - $7,000 USD / Year", BN: "৩,৫০০ - ৭,০০০ মার্কিন ডলার / বছর" },
      requirements: { EN: "IELTS 5.5+ or TOPIK Level 2/3", BN: "IELTS ৫.৫+ অথবা TOPIK লেভেল ২/৩" },
      highlights: [
        { EN: "Easy transition to professional E-7 visa after graduation", BN: "পড়াশোনা শেষে সহজে E-7 প্রফেশনাল ওয়ার্ক ভিসায় রূপান্তর" },
        { EN: "Generous government scholarships (GKS) up to 100%", BN: "সরকারি GKS স্কলারশিপের মাধ্যমে সম্পূর্ণ ফ্রি পড়াশোনার সুযোগ" },
        { EN: "High demand for IT, engineering, and language professionals", BN: "আইটি, ইঞ্জিনিয়ারিং এবং ভাষা বিশেষজ্ঞদের প্রচুর চাহিদা" },
        { EN: "Part-time work permitted during semesters & full-time in vacations", BN: "সেমিস্টার চলাকালীন পার্ট-টাইম ও ছুটিতে ফুল-টাইম কাজ" }
      ]
    },
    "finland": {
      id: "finland", name: { EN: "Finland (Schengen)", BN: "ফিনল্যান্ড (শেনজেন)" }, flag: "/flags/fi.png", badge: "World's Happiest Country",
      landmarkImg: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1000&q=80",
      tagline: { EN: "The World's Happiest Country with Premium Education", BN: "বিশ্বের সবচেয়ে সুখী দেশ ও বিশ্বসেরা শিক্ষাব্যবস্থা" },
      pswr: { EN: "2 Years Job Search Visa", BN: "২ বছরের জব সার্চ ভিসা সুবিধা" },
      intakes: { EN: "January & September", BN: "জানুয়ারি এবং সেপ্টেম্বর ইনটেক" },
      tuition: { EN: "€6,000 - €10,000 / Year (Early Bird Discounts)", BN: "৬,০০০ - ১০,০০০ ইউরো (আর্লি বার্ড স্কলারশিপ আছে)" },
      requirements: { EN: "IELTS 6.0+ or SAT / Entrance Exam", BN: "IELTS ৬.০+ অথবা ফিনল্যান্ড এন্ট্রান্স এক্সাম" },
      highlights: [
        { EN: "2 years post-study job search permit for all graduates", BN: "পড়াশোনা শেষে চাকরি খোঁজার জন্য ২ বছরের দীর্ঘ ওয়ার্ক পারমিট" },
        { EN: "Spouse and children can apply together with full work rights", BN: "পরিবারসহ একসাথে আবেদন এবং স্পাউসের ফুল-টাইম কাজের অনুমতি" },
        { EN: "High chance of permanent residency (PR) after 4 years of residence", BN: "৪ বছর বৈধ বসবাসের পর স্থায়ী নাগরিকত্ব (PR) পাওয়ার সুযোগ" },
        { EN: "Safe, clean, and highly tech-driven European society", BN: "অত্যন্ত নিরাপদ, দুর্নীতিমুক্ত এবং উন্নত প্রযুক্তিবান্ধব সমাজ" }
      ]
    },
    "germany": {
      id: "germany", name: { EN: "Germany (Schengen)", BN: "জার্মানি (শেনজেন)" }, flag: "/flags/de.png", badge: "Free Public Tuition",
      landmarkImg: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1000&q=80",
      tagline: { EN: "Zero Tuition Fee in Public Universities & Europe's Economic Giant", BN: "পাবলিক ইউনিভার্সিটিতে বিনা টিউশন ফি ও ইউরোপের অর্থনৈতিক পরাশক্তি" },
      pswr: { EN: "18 Months Job Search Visa", BN: "১৮ মাসের জব সার্চ ভিসা" },
      intakes: { EN: "Winter (Oct) & Summer (Apr)", BN: "উইন্টার (অক্টোবর) ও সামার (এপ্রিল)" },
      tuition: { EN: "€0 in Public Universities (Only Semester Contribution)", BN: "পাবলিক ইউনিভার্সিটিতে টিউশন ফি সম্পূর্ণ ফ্রি" },
      requirements: { EN: "IELTS 6.0+ or German A2/B1 Level", BN: "IELTS ৬.০+ অথবা জার্মান ভাষা A2/B1 লেভেল" },
      highlights: [
        { EN: "No tuition fee in top-ranked state public universities", BN: "সরকারি পাবলিক ইউনিভার্সিটিতে কোনো সেমিস্টার টিউশন ফি নেই" },
        { EN: "18 months job search visa leading to EU Blue Card PR", BN: "১৮ মাসের জব সার্চ ভিসা এবং দ্রুত EU ব্লু কার্ড ও PR লাভ" },
        { EN: "Massive demand for engineers, IT specialists, and healthcare staff", BN: "ইঞ্জিনিয়ার, আইটি ও হেলথকেয়ার পেশাজীবীদের সর্বোচ্চ চাহিদা" },
        { EN: "Schengen mobility across 29 European countries", BN: "শেনজেন ভিসায় সমগ্র ইউরোপে অবাধ ভ্রমণ ও নেটওয়ার্কিং" }
      ]
    },
    "new-zealand": {
      id: "new-zealand", name: { EN: "New Zealand", BN: "নিউজিল্যান্ড" }, flag: "/flags/nz.png", badge: "Green List PR",
      landmarkImg: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1000&q=80",
      tagline: { EN: "Safe, Peaceful Environment & Direct Green List PR Pathways", BN: "নিরাপদ, শান্তিময় পরিবেশ এবং গ্রিন লিস্ট PR সুবিধা" },
      pswr: { EN: "Up to 3 Years Post-Study Work Visa", BN: "সর্বোচ্চ ৩ বছরের পোস্ট-স্টাডি ওয়ার্ক ভিসা" },
      intakes: { EN: "February, July & November", BN: "ফেব্রুয়ারি, জুলাই ও নভেম্বর ইনটেক" },
      tuition: { EN: "$18,000 - $28,000 NZD / Year", BN: "১৮,০০০ - ২৮,০০০ নিউজিল্যান্ড ডলার / বছর" },
      requirements: { EN: "IELTS 6.0+ or PTE Equivalent", BN: "IELTS ৬.০+ অথবা সমমানের PTE স্কোর" },
      highlights: [
        { EN: "Direct Permanent Residency pathway through the 'Green List'", BN: "সরকারের 'গ্রিন লিস্ট' পেশাসমূহে সরাসরি PR-এর আবেদন সুযোগ" },
        { EN: "All 8 public universities are ranked in the world's top 3%", BN: "দেশের ৮টি পাবলিক ইউনিভার্সিটিই বিশ্বের শীর্ষ ৩%-এর অন্তর্ভুক্ত" },
        { EN: "Spouse gets open work permit for Level 8 (Postgrad) and above", BN: "পোস্ট-গ্র্যাজুয়েট শিক্ষার্থীদের স্পাউসের ফুল-টাইম কাজের অনুমতি" },
        { EN: "Friendly immigration policies and excellent student support", BN: "অত্যন্ত শিক্ষার্থীবান্ধব অভিবাসন নীতি এবং নিরাপদ পরিবেশ" }
      ]
    },
    "china": {
      id: "china", name: { EN: "China (Medical & Eng.)", BN: "চীন (মেডিকেল ও ইঞ্জিনিয়ারিং)" }, flag: "/flags/cn.png", badge: "Top Govt Scholarships",
      landmarkImg: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1000&q=80",
      tagline: { EN: "World-Class MBBS & Engineering with 100% Scholarships", BN: "বিশ্বমানের এমবিবিএস ও ইঞ্জিনিয়ারিংয়ে ১০০% স্কলারশিপ" },
      pswr: { EN: "Work/Internship visa conversion available", BN: "ইন্টার্নশিপ ও প্রফেশনাল জব ভিসায় রূপান্তরযোগ্য" },
      intakes: { EN: "September & March", BN: "সেপ্টেম্বর এবং মার্চ ইনটেক" },
      tuition: { EN: "$2,000 - $4,500 USD / Year (Many full free)", BN: "২,০০০ - ৪,৫০০ ডলার (অনেকাংশে সম্পূর্ণ ফ্রি)" },
      requirements: { EN: "HSC Pass / Basic English / MOI", BN: "এইচএসসি পাশ / সাধারণ ইংরেজি বা MOI সনদ" },
      highlights: [
        { EN: "CSC & Provincial scholarships covering 100% tuition + free hostel", BN: "সরকারি স্কলারশিপে সম্পূর্ণ ফ্রি পড়াশোনা এবং ফ্রি হোস্টেল সুবিধা" },
        { EN: "WHO & BMDC recognized English-medium MBBS (Medical) degrees", BN: "WHO এবং বাংলাদেশ মেডিকেল কাউন্সিল (BMDC) স্বীকৃত এমবিবিএস" },
        { EN: "World-leading laboratories for mechanical, AI & civil engineering", BN: "রোবোটিক্স, আইটি ও ইঞ্জিনিয়ারিংয়ের বিশ্বসেরা আধুনিক ল্যাব" },
        { EN: "Low cost of living and direct bullet train/air connectivity", BN: "অত্যন্ত সাশ্রয়ী জীবনযাত্রা এবং সহজ যাতায়াত ব্যবস্থা" }
      ]
    },
    "sri-lanka": {
      id: "sri-lanka", name: { EN: "Sri Lanka", BN: "শ্রীলঙ্কা (মেডিকেল ও টপ-আপ)" }, flag: "/flags/lk.png", badge: "Affordable British Pathway",
      landmarkImg: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80",
      tagline: { EN: "Affordable Medical & British University Credit Transfer Hub", BN: "স্বল্প খরচে মেডিকেল ও ব্রিটিশ ইউনিভার্সিটির ক্রেডিট ট্রান্সফার হাব" },
      pswr: { EN: "Academic Credit Transfer to UK/Australia", BN: "ইউকে বা অস্ট্রেলিয়ায় ক্রেডিট ট্রান্সফারের সুযোগ" },
      intakes: { EN: "January, June & September", BN: "জানুয়ারি, জুন ও সেপ্টেম্বর ইনটেক" },
      tuition: { EN: "$2,500 - $5,000 USD / Year", BN: "২,৫০০ - ৫,০০০ মার্কিন ডলার / বছর" },
      requirements: { EN: "HSC Pass or OTHM/Qualifi Diplomas", BN: "এইচএসসি পাশ অথবা OTHM/Qualifi ডিপ্লোমা" },
      highlights: [
        { EN: "Study British and Australian university curriculums closer to home", BN: "ঘরের কাছেই ব্রিটিশ ও অস্ট্রেলিয়ান ইউনিভার্সিটির সিলেবাসে পড়ার সুযোগ" },
        { EN: "Affordable and BMDC recognized MBBS & medical pathways", BN: "স্বল্প খরচে বাংলাদেশ মেডিকেল কাউন্সিল স্বীকৃত এমবিবিএস ডিগ্রি" },
        { EN: "Ideal destination for OTHM Level 4/5 Top-Up completion", BN: "OTHM ও কোয়ালিফাই ডিপ্লোমাধারীদের জন্য সাশ্রয়ী টপ-আপ গন্তব্য" },
        { EN: "Similar culture, pleasant climate, and very low living costs", BN: "পরিচিত সংস্কৃতি, চমৎকার আবহাওয়া এবং অত্যন্ত কম খরচ" }
      ]
    },
    "uae": {
      id: "uae", name: { EN: "Dubai / UAE", BN: "দুবাই / ইউএই" }, flag: "/flags/ae.png", badge: "Golden Visa & Zero Tax",
      landmarkImg: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
      tagline: { EN: "International University Branch Campuses & Tax-Free Career", BN: "আন্তর্জাতিক ইউনিভার্সিটির ক্যাম্পাস এবং করমুক্ত ক্যারিয়ার" },
      pswr: { EN: "Up to 2-10 Years (Golden Visa eligible)", BN: "২ থেকে ১০ বছরের গোল্ডেন ভিসা পাওয়ার সুযোগ" },
      intakes: { EN: "January, May & September", BN: "জানুয়ারি, মে ও সেপ্টেম্বর ইনটেক" },
      tuition: { EN: "$6,000 - $12,000 USD / Year", BN: "৬,০০০ - ১২,০০০ মার্কিন ডলার / বছর" },
      requirements: { EN: "IELTS 5.0/5.5 or MOI accepted", BN: "IELTS ৫.০/৫.৫ অথবা MOI (বিনা আইইএলটিএস-এ সুযোগ)" },
      highlights: [
        { EN: "Study at UK/Australian branch campuses (Heriot-Watt, Wollongong, etc.)", BN: "ব্রিটিশ ও অস্ট্রেলিয়ান ইউনিভার্সিটির আসল দুবাই ক্যাম্পাসে পড়াশোনা" },
        { EN: "100% tax-free full-time job opportunities after graduation", BN: "পড়াশোনা শেষে শতভাগ করমুক্ত উচ্চ বেতনের চাকরির সুযোগ" },
        { EN: "No bank statement freeze hassle—fast and smooth visa processing", BN: "জটিল ব্যাংক স্টেটমেন্ট ছাড়াই দ্রুততম সময়ে ভিসা প্রসেসিং" },
        { EN: "High demand for hospitality, business, and tech executives", BN: "হসপিটালিটি, ব্যবসা ও আইটি সেক্টরে কর্পোরেট জবের নিশ্চয়তা" }
      ]
    }
  };

  const processSteps = [
    { step: "01", title: { EN: "Profile Evaluation & Career Mapping", BN: "প্রোফাইল মূল্যায়ন ও ক্যারিয়ার ম্যাপিং" }, desc: { EN: "Our academic advisors analyze your educational background, gap years, IELTS score, and budget to select the best country and university.", BN: "আমাদের এক্সপার্টরা আপনার শিক্ষাগত যোগ্যতা, স্টাডি গ্যাপ, আইএলটিএস এবং বাজেট বিশ্লেষণ করে সেরা দেশ ও ইউনিভার্সিটি নির্বাচন করেন।" }, icon: <Target className="w-6 h-6 text-blue-600" /> },
    { step: "02", title: { EN: "Admission & Offer Letter Processing", BN: "অ্যাডমিশন ও অফার লেটার প্রসেসিং" }, desc: { EN: "We craft compelling SOPs, format recommendation letters, and submit applications directly to university portals for rapid Offer Letter issuance.", BN: "আমরা শক্তিশালী SOP ও LOR তৈরি করে সরাসরি ইউনিভার্সিটি পোর্টালে আবেদন করি, যা দ্রুততম সময়ে অফার লেটার নিশ্চিত করে।" }, icon: <FileText className="w-6 h-6 text-indigo-600" /> },
    { step: "03", title: { EN: "Credit Transfer & Qualification Setup", BN: "ক্রেডিট ট্রান্সফার ও ওটিএইচএম সেটআপ" }, desc: { EN: "For UK/Europe applicants, we map OTHM or Qualifi Level 4/5 diplomas to ensure direct Advanced Standing entry into the 2nd or 3rd year.", BN: "ইউকে বা ইউরোপের ক্ষেত্রে ওটিএইচএম বা কোয়ালিফাই ডিপ্লোমা ম্যাপিং করে সরাসরি ২য় বা ৩য় বর্ষে ভর্তির ব্যবস্থা করা হয়।" }, icon: <GraduationCap className="w-6 h-6 text-purple-600" /> },
    { step: "04", title: { EN: "Financial Compliance & Visa Filing", BN: "ফাইন্যান্সিয়াল কমপ্লায়েন্স ও ভিসা ফাইলিং" }, desc: { EN: "We provide meticulous guidance on bank sponsorship, source of funds, TB tests, insurance, and conduct rigorous Mock Embassy Interviews.", BN: "ব্যাংক স্পন্সরশিপ, ফান্ডের উৎস, ইনস্যুরেন্স এবং ভিসা ফাইলিংয়ে ১০০% নির্ভুল সহায়তা ও এমব্যাসি মক ইন্টারভিউ গ্রহণ।" }, icon: <ShieldCheck className="w-6 h-6 text-emerald-600" /> },
    { step: "05", title: { EN: "Visa Grant & Pre-Departure Briefing", BN: "ভিসা প্রাপ্তি ও প্রি-ডিপার্চার ওরিয়েন্টেশন" }, desc: { EN: "Upon visa approval, we assist with flight booking, airport pickup arrangements, student accommodation, and part-time job guidance abroad.", BN: "ভিসা পাওয়ার পর এয়ার টিকেট বুকিং, এয়ারপোর্টে রিসিভ, আবাসন ব্যবস্থা এবং বিদেশে পার্ট-টাইম জবের গাইডলাইন প্রদান।" }, icon: <Globe className="w-6 h-6 text-amber-600" /> }
  ];

  const currentCountry = destinations[activeCountry] || destinations['uk'];
  const allCountriesList = Object.values(destinations);
  const activeHeroInfo = heroInteractiveData[heroTab] || heroInteractiveData['UK'];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      
      {/* Dynamic Marquee CSS for Schengen 2-row scroll */}
      <style>{`
        @keyframes scrollLeft { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        @keyframes scrollRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }
        .animate-schengen-left { display: flex; width: max-content; animation: scrollLeft 30s linear infinite; }
        .animate-schengen-right { display: flex; width: max-content; animation: scrollRight 30s linear infinite; }
        .animate-schengen-left:hover, .animate-schengen-right:hover { animation-play-state: paused; }
      `}</style>

      {/* 1. HERO BANNER */}
      <section className="bg-slate-900 text-white pt-16 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80" alt="Campus" className="w-full h-full object-cover opacity-20 mix-blend-luminosity scale-105 animate-pulse-slow" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 text-xs font-black tracking-widest uppercase text-blue-400 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full backdrop-blur-md">
                <Globe size={14} className="text-blue-400 animate-spin-slow" />
                <span>{currentLang === 'EN' ? 'Global Migration & Higher Education' : 'আন্তর্জাতিক উচ্চশিক্ষা ও মাইগ্রেশন কনসালটেন্সি'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                {currentLang === 'EN' ? 'Your Strategic Gateway To ' : 'বিশ্বসেরা ইউনিভার্সিটিতে আপনার '} 
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                  {currentLang === 'EN' ? 'Global Universities.' : 'উচ্চশিক্ষার স্বপ্নপূরণ।'}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {currentLang === 'EN'
                  ? 'Representing 50+ universities across 14+ top legal destinations including UK, Europe (Schengen Area), Japan, Canada, and Australia. Experience ethical visa counseling and 98% visa success.'
                  : 'যুক্তরাজ্য, ইউরোপ (শেনজেন জোন), জাপান, কানাডা, অস্ট্রেলিয়াসহ বিশ্বের ১৪টিরও বেশি বৈধ দেশের ৫০টিরও বেশি ইউনিভার্সিটির প্রতিনিধি। ১০০% আইনি স্বচ্ছতা এবং ৯৮% ভিসা সাফল্যের নিশ্চয়তা।'}
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl backdrop-blur-sm text-center">
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 block">98%</span>
                  <span className="text-[10px] text-slate-300 font-bold uppercase">{currentLang === 'EN' ? 'Visa Success' : 'ভিসা সাফল্যের হার'}</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl backdrop-blur-sm text-center">
                  <span className="text-xl sm:text-2xl font-black text-blue-400 block">29+</span>
                  <span className="text-[10px] text-slate-300 font-bold uppercase">{currentLang === 'EN' ? 'Schengen Countries' : 'শেনজেন দেশসমূহ'}</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl backdrop-blur-sm text-center">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 block">0%</span>
                  <span className="text-[10px] text-slate-300 font-bold uppercase">{currentLang === 'EN' ? 'Hidden Charges' : 'হিডেন চার্জ নেই'}</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a href="#consultation-form">
                  <NeoButton variant="primary" className="!px-8 !py-4 text-sm font-bold shadow-lg shadow-blue-500/20">
                    {currentLang === 'EN' ? 'Book Free Profile Assessment' : 'ফ্রি প্রোফাইল অ্যাসেসমেন্ট বুক করুন'}
                  </NeoButton>
                </a>
                <a href="#packages">
                  <NeoButton variant="secondary" className="!bg-white/10 !text-white hover:!bg-white/20 !border-white/20 !px-8 !py-4 text-sm font-bold">
                    {currentLang === 'EN' ? 'View Special Packages ↓' : 'স্পেশাল প্যাকেজসমূহ ↓'}
                  </NeoButton>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-white/15 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-emerald-300">Live Visa Estimator</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400">CareerLift Portal</span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 bg-slate-950/60 p-1.5 rounded-2xl border border-white/10">
                  {Object.keys(heroInteractiveData).map((cKey) => (
                    <button
                      key={cKey} onClick={() => setHeroTab(cKey)}
                      className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${heroTab === cKey ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                    >
                      {heroInteractiveData[cKey].flag} {cKey}
                    </button>
                  ))}
                </div>

                <div className="space-y-4 pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Selected Destination</span>
                      <h3 className="text-2xl font-black text-white flex items-center space-x-2 mt-0.5">
                        <span>{activeHeroInfo.flag}</span>
                        <span>{activeHeroInfo.title}</span>
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase text-emerald-400 block">Success Ratio</span>
                      <span className="text-2xl font-black text-emerald-400">{activeHeroInfo.visaRatio}</span>
                    </div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2.5 text-xs font-semibold">
                    <div className="flex justify-between text-slate-300"><span className="text-slate-400">Main Pathway:</span><span className="text-white font-bold">{activeHeroInfo.pathway}</span></div>
                    <div className="flex justify-between text-slate-300"><span className="text-slate-400">Work Rights:</span><span className="text-amber-300 font-bold">{activeHeroInfo.workRights}</span></div>
                    <div className="flex justify-between text-slate-300"><span className="text-slate-400">Avg. Processing:</span><span className="text-blue-300 font-bold">{activeHeroInfo.timeframe}</span></div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-slate-300"><span>⚡ Cost & Time Savings Impact</span><span className="text-emerald-400">{activeHeroInfo.savings}</span></div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10"><div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full w-[85%] animate-pulse"></div></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">Want full assessment?</span>
                  <a href="#consultation-form" className="text-xs font-black text-blue-400 hover:text-blue-300 flex items-center space-x-1 underline"><span>Check Your Eligibility →</span></a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OFFICIAL ACCREDITATION PARTNERS */}
      <section className="bg-white border-b border-slate-200/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">
              {currentLang === 'EN' ? 'Global Qualifications & Pathway Partners' : 'আন্তর্জাতিক স্বীকৃতি ও ক্রেডিট ট্রান্সফার পার্টনার'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {currentLang === 'EN' ? 'Direct Credit Transfer & British Qualifications' : 'বাংলাদেশে বসেই ব্রিটিশ ডিপ্লোমা ও ক্রেডিট ট্রান্সফার সুবিধা'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {currentLang === 'EN' ? 'We are proud to integrate UK-regulated awarding bodies (OTHM, QUALIFI, UKQAS) and Bangladesh Government accreditation (NSDA) to save your time and up to 50% tuition costs.' : 'যুক্তরাজ্যের সরকারি শিক্ষা বোর্ড (OTHM, QUALIFI, UKQAS) এবং বাংলাদেশ সরকারের (NSDA) অনুমোদিত কারিকুলামের মাধ্যমে আপনার সময় এবং প্রায় ৫০% টিউশন ফি সাশ্রয় করুন।'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center justify-center">
            <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-3xl flex flex-col items-center justify-center text-center space-y-3 hover:border-blue-400 transition group h-full">
              <div className="h-14 flex items-center justify-center"><img src="/othm-logosvg.png" alt="OTHM" className="max-h-12 w-auto object-contain group-hover:scale-105 transition-transform" /></div>
              <div><h4 className="text-xs font-black text-slate-900 uppercase">OTHM Qualifications (UK)</h4><p className="text-[11px] text-slate-500 font-medium mt-0.5">Level 4, 5 & 6 Diplomas leading to direct Final Year Bachelor's entry in UK universities.</p></div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-3xl flex flex-col items-center justify-center text-center space-y-3 hover:border-blue-400 transition group h-full">
              <div className="h-14 flex items-center justify-center"><img src="/Qualifi-official.png" alt="QUALIFI" className="max-h-12 w-auto object-contain group-hover:scale-105 transition-transform" /></div>
              <div><h4 className="text-xs font-black text-slate-900 uppercase">QUALIFI Regulated (UK)</h4><p className="text-[11px] text-slate-500 font-medium mt-0.5">Ofqual regulated British qualifications allowing seamless global credit transfer.</p></div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-3xl flex flex-col items-center justify-center text-center space-y-3 hover:border-blue-400 transition group h-full">
              <div className="h-14 flex items-center justify-center"><img src="/UKQAS logo.png" alt="UKQAS" className="max-h-12 w-auto object-contain group-hover:scale-105 transition-transform" /></div>
              <div><h4 className="text-xs font-black text-slate-900 uppercase">UKQAS Academic Quality</h4><p className="text-[11px] text-slate-500 font-medium mt-0.5">Ensuring strict adherence to British higher education and institutional compliance.</p></div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-3xl flex flex-col items-center justify-center text-center space-y-3 hover:border-emerald-400 transition group h-full">
              <div className="h-14 flex items-center justify-center"><img src="/NSDA.png" alt="NSDA" className="max-h-12 w-auto object-contain group-hover:scale-105 transition-transform" /></div>
              <div><h4 className="text-xs font-black text-slate-900 uppercase">Govt. NSDA Approved</h4><p className="text-[11px] text-slate-500 font-medium mt-0.5">National Skills Development Authority certification under Prime Minister's Office.</p></div>
            </div>
          </div>

          <div className="mt-10 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-amber-400 font-black text-xs uppercase tracking-widest block">💡 Smart Cost-Saving Educational Pathway</span>
              <h3 className="text-xl sm:text-2xl font-black leading-tight">
                {currentLang === 'EN' ? 'Complete 1st & 2nd Year in Bangladesh → Final Year in UK / Europe!' : 'বাংলাদেশে ১ ম ও ২য় বর্ষ শেষ করে → ফাইনাল ইয়ার করুন ইউকে বা ইউরোপে!'}
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
                {currentLang === 'EN' ? 'Through OTHM and QUALIFI Level 4 & 5 diplomas studied at our institute, you gain "Advanced Standing". You directly enter the 3rd year (Top-Up Bachelor\'s) at UK/European universities, saving up to 50% in foreign living and tuition costs.' : 'আমাদের ইনস্টিটিউটে OTHM এবং QUALIFI লেভেল ৪ ও ৫ ডিপ্লোমা শেষ করে আপনি ইউকে বা ইউরোপের ইউনিভার্সিটিতে সরাসরি ৩য় বর্ষে (Top-Up Bachelor\'s) ভর্তি হতে পারবেন। এতে আপনার প্রায় ৫০% টিউশন ফি এবং থাকার খরচ বেঁচে যাবে!'}
              </p>
            </div>
            <div className="lg:col-span-4 text-center lg:text-right">
              <a href="#consultation-form" className="inline-block px-6 py-3.5 rounded-xl bg-white text-slate-900 font-black text-xs sm:text-sm hover:bg-amber-400 hover:text-slate-950 transition shadow-md whitespace-nowrap">
                {currentLang === 'EN' ? 'Check Credit Eligibility →' : 'ক্রেডিট ট্রান্সফার যোগ্যতা যাচাই →'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STUDY DESTINATIONS GRID */}
      <section id="destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200 inline-block">
            🗺️ {currentLang === 'EN' ? 'CHOOSE FROM 14+ LEGAL DESTINATIONS' : '১৪টিরও বেশি বৈধ ও পছন্দের দেশ নির্বাচন করুন'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {currentLang === 'EN' ? 'Explore Top Global Study Destinations' : 'বিশ্বের সেরা উচ্চশিক্ষা গন্তব্যসমূহ'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            {currentLang === 'EN' ? 'We have organized all legal study destinations in a clean, stable grid so you can browse comfortably. Click on any country to view its full admission, tuition, and work visa details below!' : 'শিক্ষার্থীদের সুবিধার জন্য সবগুলো বৈধ দেশ একটি পরিচ্ছন্ন ও স্থির গ্রিডে সাজানো হয়েছে। যেকোনো দেশে ক্লিক করলেই নিচে তার ভর্তির যোগ্যতা, টিউশন ফি ও কাজের সুযোগ লোড হবে!'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-12">
          {allCountriesList.map((dest) => {
            const isSelected = activeCountry === dest.id;
            const destName = dest.name[currentLang] || dest.name.EN;
            return (
              <button
                key={dest.id} onClick={() => setActiveCountry(dest.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer group ${isSelected ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105 z-10' : 'bg-white hover:bg-blue-50/50 text-slate-700 border-slate-200/80 hover:border-blue-300 shadow-2xs'}`}
              >
                <div className="w-10 h-7 rounded overflow-hidden shadow-2xs border border-slate-200/60 mb-2.5 flex-shrink-0 group-hover:scale-110 transition-transform"><img src={dest.flag} alt={dest.name.EN} className="w-full h-full object-cover" /></div>
                <h4 className="text-xs sm:text-sm font-black leading-tight line-clamp-1 w-full">{destName}</h4>
                <span className={`text-[9px] font-extrabold uppercase mt-1 block truncate w-full ${isSelected ? 'text-blue-400' : 'text-slate-400'}`}>{dest.badge}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-xl p-6 sm:p-12 transition-all duration-500 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-2 border-slate-100 group">
                <img src={currentCountry.landmarkImg} alt={currentCountry.name.EN} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 px-3.5 py-1.5 rounded-full text-xs font-black uppercase flex items-center space-x-2 shadow-md">
                  <img src={currentCountry.flag} alt="flag" className="w-5 h-3.5 object-cover rounded shadow-2xs" /><span>{currentCountry.name[currentLang] || currentCountry.name.EN}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block">Work Rights Abroad</span><h4 className="text-base font-black leading-snug mt-0.5">{currentCountry.pswr[currentLang] || currentCountry.pswr.EN}</h4>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-blue-600 block">📍 Destination Spotlight</span>
                <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mt-1">{currentCountry.name[currentLang] || currentCountry.name.EN}</h3>
                <p className="text-sm font-bold text-slate-600 bg-slate-50 p-3.5 rounded-xl border-l-4 border-blue-600 mt-3">★ {currentCountry.tagline[currentLang] || currentCountry.tagline.EN}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70"><span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block flex items-center"><Clock size={12} className="mr-1 text-blue-600"/> Available Intakes</span><span className="text-xs sm:text-sm font-black text-slate-800 mt-1 block">{currentCountry.intakes[currentLang] || currentCountry.intakes.EN}</span></div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70"><span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block flex items-center"><DollarSign size={12} className="mr-1 text-emerald-600"/> Average Tuition Fee</span><span className="text-xs sm:text-sm font-black text-slate-800 mt-1 block">{currentCountry.tuition[currentLang] || currentCountry.tuition.EN}</span></div>
                <div className="sm:col-span-2 p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/60"><span className="text-[10px] font-black text-blue-600 uppercase tracking-wider block flex items-center"><BookOpen size={12} className="mr-1 text-blue-600"/> Entry / Language Requirement</span><span className="text-xs sm:text-sm font-black text-slate-800 mt-1 block">{currentCountry.requirements[currentLang] || currentCountry.requirements.EN}</span></div>
              </div>

              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">{currentLang === 'EN' ? 'Key Advantages & Pathways:' : 'বিশেষ সুবিধাসমূহ:'}</h4>
                {currentCountry.highlights.map((point, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm font-bold text-slate-700"><CheckCircle2 size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" /><span>{point[currentLang] || point.EN}</span></div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a href="#consultation-form"><NeoButton variant="primary" className="!px-7 !py-3.5 text-xs sm:text-sm font-bold shadow-md">{currentLang === 'EN' ? `Apply For ${currentCountry.name.EN} →` : `${currentCountry.name.BN}-এর জন্য আবেদন করুন →`}</NeoButton></a>
                <a href="tel:+8801818304081" className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition"><Phone size={16} className="text-blue-600"/><span>{currentLang === 'EN' ? 'Talk to Visa Counselor' : 'কাউন্সেলরের সাথে কথা বলুন'}</span></a>
              </div>
            </div>

          </div>

          {currentCountry.isSchengen && (
            <div className="mt-12 pt-10 border-t border-slate-200">
              <div className="text-center max-w-2xl mx-auto mb-8"><span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">🇪🇺 29 Schengen Countries 1 Unified Visa</span><h4 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">{currentLang === 'EN' ? 'Explore All 29 Schengen Member States' : 'শেনজেন জোনের অন্তর্ভুক্ত ২৯টি দেশের পতাকাসমূহ'}</h4><p className="text-xs text-slate-500 font-medium mt-1">{currentLang === 'EN' ? 'With a single Schengen student visa, you can freely travel, network, and explore career opportunities across all these nations!' : 'একটি মাত্র শেনজেন স্টুডেন্ট ভিসায় আপনি নিচের ২৯টি দেশের যেকোনোটিতে কোনো বর্ডার ছাড়াই অবাধে যাতায়াত ও ক্যারিয়ার গড়তে পারবেন!'}</p></div>
              <div className="relative w-full overflow-hidden py-3 bg-slate-50 rounded-2xl border border-slate-200/60 mb-3"><div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div><div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div><div className="animate-schengen-left gap-4 flex items-center">{[...schengenRow1, ...schengenRow1, ...schengenRow1].map((c, i) => (<div key={i} className="flex items-center space-x-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs flex-shrink-0"><img src={c.flag} alt={c.name} className="w-6 h-4 object-cover rounded shadow-2xs" /><span className="text-xs font-black text-slate-700">{c.name}</span></div>))}</div></div>
              <div className="relative w-full overflow-hidden py-3 bg-slate-50 rounded-2xl border border-slate-200/60"><div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div><div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div><div className="animate-schengen-right gap-4 flex items-center">{[...schengenRow2, ...schengenRow2, ...schengenRow2].map((c, i) => (<div key={i} className="flex items-center space-x-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs flex-shrink-0"><img src={c.flag} alt={c.name} className="w-6 h-4 object-cover rounded shadow-2xs" /><span className="text-xs font-black text-slate-700">{c.name}</span></div>))}</div></div>
            </div>
          )}
        </div>
      </section>

      {/* ✅ EXCLUSIVE STUDY & VISA PACKAGES CATALOG (WITH AUTO-FLAG & 10-MIN SCHOOL RESPONSIVE GRID) */}
      <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200 inline-block">
            ★ {currentLang === 'EN' ? 'EXCLUSIVE GLOBAL PACKAGES & OFFERS' : 'আমাদের স্পেশাল স্টাডি ও ভিসা প্যাকেজসমূহ'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {currentLang === 'EN' ? 'Featured Study Abroad Pathways & Offers' : 'স্বল্প খরচে ও নিশ্চিত সম্ভাবনার বিশেষ প্যাকেজ'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            {currentLang === 'EN'
              ? 'Explore our highly curated credit transfer packages, scholarship opportunities, and post-study work visa assured global tracks designed for Bangladeshi students.'
              : 'ব্রিটিশ ডিগ্রিতে ৫০% টিউশন ওয়েভার, ইউরোপে ফ্রি পড়াশোনা এবং জাপানে নিশ্চিত জবের সুযোগসহ আমাদের এক্সক্লুসিভ প্যাকেজসমূহ বিস্তারিত জানুন।'}
          </p>
        </div>

        {/* 👇 মোবাইলেও পাশাপাশি ২টি করে কার্ড (grid-cols-2), বড় স্ক্রিনে ২টি (md:grid-cols-2) */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-8">
          {studyPackagesList.map((pkg, idx) => {
            const flagSrc = getCountryFlag(pkg.country, pkg.customFlagUrl);
            return (
              <div 
                key={idx} 
                className="bg-white rounded-[2rem] p-5 sm:p-8 border-2 border-slate-200/80 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 sm:space-y-6 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/10 transition-colors"></div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-3 sm:mb-6">
                    {/* 👇 অটোমেটিক পতাকা লোড হচ্ছে */}
                    <span className="text-[10px] sm:text-xs font-black text-slate-800 bg-slate-100 border border-slate-200/80 px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full flex items-center space-x-1.5">
                      <img src={flagSrc} alt="flag" className="w-4 h-3 object-cover rounded shadow-2xs" />
                      <span>{pkg.country}</span>
                    </span>
                    <span className="text-[9px] sm:text-xs font-extrabold uppercase bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center">
                      ★ {pkg.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-2xl font-black text-slate-900 leading-tight mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {pkg.title[currentLang]}
                  </h3>

                  <div className="flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-sm font-extrabold text-emerald-600 mb-2 sm:mb-4 bg-emerald-50/60 p-2 sm:p-2.5 rounded-xl border border-emerald-200/60 w-fit">
                    <Tag size={14} className="flex-shrink-0" />
                    <span className="truncate">{pkg.price[currentLang]}</span>
                  </div>

                  <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed font-medium mb-3 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                    {pkg.desc[currentLang]}
                  </p>

                  <div className="space-y-1.5 sm:space-y-2.5 pt-2 border-t border-slate-100">
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2 text-[10px] sm:text-sm font-bold text-slate-700">
                        <CheckCircle2 size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2 sm:line-clamp-none">{feat[currentLang]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 sm:pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider block flex items-center">
                      <Clock size={11} className="mr-1 text-blue-600" /> Intake & Duration
                    </span>
                    <span className="text-[11px] sm:text-xs font-black text-slate-800 block truncate">{pkg.intake} ({pkg.duration})</span>
                  </div>

                  <a href="#consultation-form">
                    <button className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-black text-[11px] sm:text-xs transition-all shadow-md active:scale-95 flex items-center space-x-1.5 group/btn">
                      <span>{currentLang === 'EN' ? 'Apply Now →' : 'আবেদন করুন →'}</span>
                    </button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. STUDY TOUR & SUMMER CAMP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-[2.5rem] p-8 sm:p-14 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-black tracking-widest uppercase text-indigo-400 bg-indigo-400/10 px-3.5 py-1.5 rounded-full border border-indigo-400/20">
                <Globe size={14} /><span>{currentLang === 'EN' ? 'INTERNATIONAL STUDY TOUR & CAMP' : 'আন্তর্জাতিক স্টাডি ট্যুর ও সামার ক্যাম্প'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
                {currentLang === 'EN' ? 'Global Exposure Without Long-Term Commitment.' : 'পড়াশোনার পাশাপাশি আন্তর্জাতিক অভিজ্ঞতা ও ক্যাম্পাস ট্যুর।'}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {currentLang === 'EN' ? 'Our short-term International Study Tours (10 to 21 days) to Malaysia, Singapore, UK, and Dubai are designed for students, university groups, and professionals. Experience world-class university campuses, attend corporate workshops, and enhance your visa travel history.' : 'স্কুল, কলেজ ও ইউনিভার্সিটির শিক্ষার্থী এবং পেশাজীবীদের জন্য আমরা আয়োজন করি ১০ থেকে ২১ দিনের আন্তর্জাতিক স্টাডি ট্যুর ও সামার ক্যাম্প (মালয়েশিয়া, সিঙ্গাপুর, ইউকে ও দুবাই)। এর মাধ্যমে বিশ্বসেরা ক্যাম্পাস ভ্রমণ, ওয়ার্কশপ সার্টিফিকেট অর্জন এবং শক্তিশালী ভিসা ট্রাভেল হিস্ট্রি তৈরি হয়।'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-start space-x-3"><CheckCircle2 className="text-indigo-400 mt-0.5 flex-shrink-0" size={18} /><div><h4 className="font-bold text-sm text-white">{currentLang === 'EN' ? 'University Workshops' : 'ইউনিভার্সিটি ওয়ার্কশপ'}</h4><p className="text-xs text-slate-400 mt-0.5">{currentLang === 'EN' ? 'Get international certificate from top foreign universities.' : 'বিখ্যাত ইউনিভার্সিটির সার্টিফিকেট ও ক্লাস করার অভিজ্ঞতা।'}</p></div></div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-start space-x-3"><CheckCircle2 className="text-emerald-400 mt-0.5 flex-shrink-0" size={18} /><div><h4 className="font-bold text-sm text-white">{currentLang === 'EN' ? 'Strong Travel History' : 'ভিসা ট্রাভেল হিস্ট্রি'}</h4><p className="text-xs text-slate-400 mt-0.5">{currentLang === 'EN' ? 'Boosts future student/work visa approval chances significantly.' : 'ভবিষ্যতে ইউকে/ইউরোপের ভিসা পাওয়ার সম্ভাবনা বহুগুণ বাড়িয়ে দেয়।'}</p></div></div>
              </div>
              <div className="pt-2"><a href="#consultation-form"><NeoButton variant="primary" className="!bg-indigo-600 hover:!bg-indigo-700 !px-7 !py-3.5 text-xs sm:text-sm font-bold shadow-lg">{currentLang === 'EN' ? 'Inquire About Upcoming Study Tour →' : 'পরবর্তী স্টাডি ট্যুর সম্পর্কে জানুন →'}</NeoButton></a></div>
            </div>
            <div className="lg:col-span-5"><div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 relative group"><img src="https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&w=800&q=80" alt="Tour" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div><div className="absolute bottom-4 left-4 right-4 text-white"><span className="text-[10px] font-bold uppercase tracking-widest bg-indigo-600 px-2.5 py-1 rounded">Next Batch: Summer 2026</span><h4 className="text-base font-black mt-1">Malaysia & Singapore University Tour</h4></div></div></div>
          </div>
        </div>
      </section>

      {/* 5. VISIT VISA CONSULTANCY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-xl p-8 sm:p-14 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1"><div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-2 border-slate-100 relative group"><img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80" alt="Visit Visa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div><div className="absolute bottom-4 left-4 right-4 text-white"><span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-600 px-2.5 py-1 rounded">99% Document Accuracy</span><h4 className="text-base font-black mt-1">Schengen, UK, Canada & Australia Visit Visa</h4></div></div></div>
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center space-x-2 text-xs font-black tracking-widest uppercase text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200"><FileCheck size={14} /><span>{currentLang === 'EN' ? 'TOURIST & VISIT VISA SERVICES' : 'ট্যুরিস্ট ও ভিজিট ভিসা প্রসেসিং'}</span></div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-slate-900">{currentLang === 'EN' ? 'Hassle-Free Visit Visas For Families & Professionals.' : 'পরিবার ও পেশাজীবীদের জন্য ঝামেলাহীন ভিজিট ও ট্যুরিস্ট ভিসা।'}</h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">{currentLang === 'EN' ? 'Planning a vacation, attending a business conference, or visiting relatives abroad? CareerLift provides expert document auditing, invitation letter drafting, itinerary planning, and interview preparation for UK, Canada, Australia, Japan, and Schengen visit visas.' : 'বিদেশে ছুটি কাটানো, বিজনেস সেমিনার বা আত্মীয়দের সাথে দেখা করার পরিকল্পনা করছেন? ইউকে, কানাডা, অস্ট্রেলিয়া, জাপান এবং শেনজেন ভিজিট ভিসার জন্য আমরা দিচ্ছি নির্ভুল ডকুমেন্ট অডিট, ট্রাভেল ইটিইনারারি এবং মক ইন্টারভিউ প্রস্তুতি।'}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center space-x-2.5"><CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" /><span className="text-xs sm:text-sm font-bold text-slate-800">{currentLang === 'EN' ? 'Bank Statement & Fund Auditing' : 'ব্যাংক স্টেটমেন্ট ও ফান্ড অডিটিং'}</span></div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center space-x-2.5"><CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" /><span className="text-xs sm:text-sm font-bold text-slate-800">{currentLang === 'EN' ? 'Hotel & Flight Itinerary Booking' : 'হোটেল ও এয়ার টিকেট ইটিইনারারি'}</span></div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center space-x-2.5"><CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" /><span className="text-xs sm:text-sm font-bold text-slate-800">{currentLang === 'EN' ? 'Corporate Business Visa Support' : 'কর্পোরেট বিজনেস ভিসা সাপোর্ট'}</span></div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center space-x-2.5"><CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" /><span className="text-xs sm:text-sm font-bold text-slate-800">{currentLang === 'EN' ? 'Family & Medical Visit Visa' : 'ফ্যামিলি ও মেডিকেল ভিজিট ভিসা'}</span></div>
              </div>
              <div className="pt-2"><a href="#consultation-form"><NeoButton variant="primary" className="!bg-emerald-600 hover:!bg-emerald-700 !px-7 !py-3.5 text-xs sm:text-sm font-bold shadow-md">{currentLang === 'EN' ? 'Consult For Visit Visa →' : 'ভিজিট ভিসার জন্য যোগাযোগ করুন →'}</NeoButton></a></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROCESS TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200 inline-block">🚀 {currentLang === 'EN' ? 'STEP-BY-STEP PATHWAY' : 'আমাদের ৫ ধাপের ভর্তি ও ভিসা প্রক্রিয়া'}</span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">{currentLang === 'EN' ? 'How We Guide You To Your Dream University' : 'যেভাবে আমরা আপনাকে গাইড করি'}</h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">{currentLang === 'EN' ? 'Our structured 5-step visa and admission processing ensures zero errors, maximum scholarship alignment, and high visa approval rates.' : 'আমাদের কাঠামোগত ৫ ধাপের ভর্তি ও ভিসা প্রসেসিং নিশ্চিত করে ১০০% নির্ভুল আবেদন, স্কলারশিপ প্রাপ্তি এবং সর্বোচ্চ ভিসা সাফল্য।'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {processSteps.map((stepItem, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-6"><div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-300 transition-all shadow-2xs">{stepItem.icon}</div><span className="text-2xl font-black text-slate-300 group-hover:text-blue-600 transition-colors">{stepItem.step}</span></div>
                <h3 className="text-base font-black text-slate-900 mb-2.5 leading-snug group-hover:text-blue-600 transition-colors">{stepItem.title[currentLang] || stepItem.title.EN}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{stepItem.desc[currentLang] || stepItem.desc.EN}</p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between"><span>STEP 0{idx + 1}</span><CheckCircle2 size={14} className="text-emerald-500" /></div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. COUNSELING SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-[2.5rem] p-8 sm:p-14 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-black tracking-widest uppercase text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20"><Users size={14} /><span>{currentLang === 'EN' ? '1-ON-1 COUNSELING SESSION' : 'সরাসরি ওয়ান-টু-ওয়ান কাউন্সেলিং'}</span></div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">{currentLang === 'EN' ? 'Visit Our Office For An Authentic Profile Assessment.' : 'সঠিক ও বাস্তব প্রোফাইল মূল্যায়নের জন্য চলে আসুন আমাদের অফিসে।'}</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">{currentLang === 'EN' ? 'We do not make fake promises. When you visit our Bijoy Nagar desk, our UK and Japan visa experts will personally inspect your certificates, explain real financial requirements, and show you transparent fee breakdowns.' : 'আমরা কোনো অবাস্তব বা ভুয়া প্রতিশ্রুতি দিই না। আমাদের বিজয় নগর অফিসে এলে ইউকে এবং জাপান ভিসা এক্সপার্টরা সরাসরি আপনার সার্টিফিকেট যাচাই করে সঠিক খরচের হিসাব এবং বাস্তব সম্ভাবনার কথা জানাবেন।'}</p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-xs sm:text-sm font-bold text-slate-200"><CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" /><span>{currentLang === 'EN' ? 'Direct meeting with Course Coordinators & Visa Officers' : 'কোর্স কো-অর্ডিনেটর ও ভিসা এক্সপার্টদের সাথে সরাসরি মিটিং'}</span></div>
                <div className="flex items-center space-x-3 text-xs sm:text-sm font-bold text-slate-200"><CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" /><span>{currentLang === 'EN' ? 'Free scholarship evaluation & document checklist review' : 'ফ্রি স্কলারশিপ যাচাই এবং ডকুমেন্ট চেকলিস্ট প্রদান'}</span></div>
                <div className="flex items-center space-x-3 text-xs sm:text-sm font-bold text-slate-200"><CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" /><span>{currentLang === 'EN' ? 'Open Saturday to Thursday (10:00 AM - 6:00 PM)' : 'শনিবার থেকে বৃহস্পতিবার খোলা (সকাল ১০:০০ টা - সন্ধ্যা ৬:০০ টা)'}</span></div>
              </div>
            </div>
            <div className="lg:col-span-6"><div className="aspect-video sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 relative group"><img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80" alt="Counseling" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div><div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between"><div><span className="text-[10px] font-bold uppercase tracking-widest bg-blue-600 px-2.5 py-1 rounded">Executive Desk</span><h4 className="text-base font-black mt-1">CareerLift Admission Counseling Hub</h4></div><div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black">✓</div></div></div></div>
          </div>
        </div>
      </section>

      {/* 8. GOOGLE MAP + CONTACT + BOOK CONSULTATION FORM */}
      <section id="consultation-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-xl p-6 sm:p-14 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-blue-600 block mb-1">📍 {currentLang === 'EN' ? 'VISIT OUR HEAD OFFICE' : 'অফিসের ঠিকানা ও ম্যাপ'}</span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{currentLang === 'EN' ? 'CareerLift Consultation Center' : 'ক্যারিয়ারলিফ্ট কনসালটেন্সি সেন্টার'}</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 leading-relaxed">{currentLang === 'EN' ? 'Our office is centrally located in Bijoy Nagar, Dhaka. Feel free to walk in for any visa or course inquiries.' : 'আমাদের অফিস ঢাকার বিজয়নগরের কেন্দ্রস্থলে অবস্থিত। ভিসা বা যেকোনো কোর্সের বিস্তারিত জানতে সরাসরি চলে আসুন।'}</p>
              </div>

              <div className="space-y-3.5">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3.5"><div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-sm flex-shrink-0 font-bold">📍</div><div><h4 className="text-xs font-black uppercase text-slate-400">{currentLang === 'EN' ? 'Head Office Address' : 'অফিসের ঠিকানা'}</h4><p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5 leading-snug">180–181 Prime Tower (Lift-3), Shaheed Nazrul Islam Sharak, Bijoy Nagar, Dhaka-1000</p></div></div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3.5"><div className="w-10 h-10 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-sm flex-shrink-0 font-bold">📞</div><div><h4 className="text-xs font-black uppercase text-slate-400">{currentLang === 'EN' ? 'Direct Hotline & WhatsApp' : 'সরাসরি হটলাইন ও হোয়াটসঅ্যাপ'}</h4><p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">+880 1818-304081 | +880 1965-157203</p></div></div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3.5"><div className="w-10 h-10 rounded-xl bg-white text-purple-600 flex items-center justify-center shadow-sm flex-shrink-0 font-bold">✉️</div><div><h4 className="text-xs font-black uppercase text-slate-400">{currentLang === 'EN' ? 'Official Email' : 'অফিসিয়াল ইমেইল'}</h4><p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">careerliftinstitute@gmail.com</p></div></div>
              </div>

              <div className="w-full h-52 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <iframe 
                  title="CareerLift Office Map"
                  src="https://maps.google.com/maps?q=Prime+Tower,+Shaheed+Nazrul+Islam+Sharak,+Bijoy+Nagar,+Dhaka&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                  className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="mt-3 flex items-center justify-between bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 flex items-center">
                  📍 180–181 Prime Tower, Bijoy Nagar
                </span>
                <a 
                  href="https://maps.app.goo.gl/PAuPP7wDQW79Emk49" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-black text-blue-600 hover:text-blue-800 underline flex items-center space-x-1"
                >
                  <span>Get Live Directions ↗</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-10 space-y-6 shadow-sm">
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900">{currentLang === 'EN' ? 'Book Your Free Consultation' : 'ফ্রি কনসালটেন্সির জন্য রেজিস্ট্রেশন করুন'}</h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">{currentLang === 'EN' ? 'Fill out this form and our senior counselor will call you within 24 hours to discuss your study, tour, or visit visa profile.' : 'ফর্মটি পূরণ করুন। আমাদের অভিজ্ঞ ভিসা কাউন্সিলর আগামী ২৪ ঘণ্টার মধ্যে ফোনে আপনার সাথে যোগাযোগ করবেন।'}</p>
              </div>

              {submitSuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-100 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 size={48} className="text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="text-xl font-black text-emerald-900">{currentLang === 'EN' ? 'Registration Successful!' : 'আবেদন সফলভাবে গৃহীত হয়েছে!'}</h4>
                  <p className="text-xs sm:text-sm font-medium text-emerald-800">{currentLang === 'EN' ? 'We have received your profile details. Our senior counselor will call you soon.' : 'আমরা আপনার তথ্য পেয়েছি। আমাদের সিনিয়র কাউন্সিলর শীঘ্রই আপনার সাথে ফোনে যোগাযোগ করবেন।'}</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5 sm:space-y-4">
                  {/* Row 1: Name and Phone */}
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

                  {/* Row 2: Service Type and Destination */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">{currentLang === 'EN' ? 'Required Service Type *' : 'কাঙ্ক্ষিত সেবার ধরন *'}</label>
                      <div className="relative w-full">
                        <select name="serviceType" value={formData.serviceType} onChange={handleInputChange} className="w-full pl-3.5 pr-10 py-3 sm:py-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer appearance-none truncate block shadow-2xs">
                          <option value="Study Abroad">🎓 Study Abroad & Student Visa</option>
                          <option value="Study Tour">✈️ International Study Tour & Summer Camp</option>
                          <option value="Visit Visa">🧳 Tourist & Visit Visa Consultancy</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                          <ChevronDown size={18} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1 sm:space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">{currentLang === 'EN' ? 'Preferred Destination' : 'পছন্দের গন্তব্য (দেশ)'}</label>
                      <div className="relative w-full">
                        <select name="destination" value={formData.destination} onChange={handleInputChange} className="w-full pl-3.5 pr-10 py-3 sm:py-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer appearance-none truncate block shadow-2xs">
                          <option value="UK">🇬🇧 United Kingdom (UK) - OTHM/Qualifi Pathway</option>
                          <option value="Schengen">🇪🇺 Europe (Schengen Area 29 Countries)</option>
                          <option value="Japan">🇯🇵 Japan (Study & SSW Work Visa)</option>
                          <option value="Canada">🇨🇦 Canada (Study & Express Entry PR)</option>
                          <option value="Australia">🇦🇺 Australia (High Wage & PSW)</option>
                          <option value="Malaysia">🇲🇾 Malaysia (UK Dual Award Degree)</option>
                          <option value="Malta">🇲🇹 Malta (Easy Schengen Entry)</option>
                          <option value="South Korea">🇰🇷 South Korea (Tech & E-7 Visa)</option>
                          <option value="Finland">🇫🇮 Finland (World's Happiest Country)</option>
                          <option value="Germany">🇩🇪 Germany (Free Public Tuition)</option>
                          <option value="New Zealand">🇳🇿 New Zealand (Green List PR)</option>
                          <option value="China">🇨🇳 China (WHO Medical & Engineering)</option>
                          <option value="Sri Lanka">🇱🇰 Sri Lanka (Affordable Medical Hub)</option>
                          <option value="UAE">🇦🇪 Dubai / UAE (Golden Visa & Tax-Free)</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                          <ChevronDown size={18} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button type="submit" disabled={isSubmitting} className="w-full py-3.5 sm:py-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-black text-xs sm:text-sm transition-all shadow-lg active:scale-98 disabled:opacity-50 flex items-center justify-center space-x-2 group">
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