import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import { 
  CheckCircle2, Clock, Star, BookOpen, Award, Users, 
  ShieldCheck, ArrowRight, Briefcase, Target, Phone, MapPin, 
  GraduationCap, PlayCircle, FileText, ArrowLeft, ChevronDown, 
  Sparkles, Check, HelpCircle, Building2, Calendar
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// ✅ MOVED OUTSIDE COMPONENT TO PREVENT INFINITE RE-RENDER LOOP
const detailedCourses = {
  "1": {
    category: "Caregiving",
    image: "/Elderly person.png",
    title: { EN: "Caregiving for Elderly Persons Level 3", BN: "কেয়ারগিভিং ফর এল্ডারলি পার্সনস লেভেল-৩" },
    desc: { 
      EN: "A highly specialized clinical training program focused on geriatric care, designed for compassionate individuals aiming to build a secure global career in healthcare across the UK, Japan, and Canada.", 
      BN: "বয়স্ক ব্যক্তিদের সঠিক যত্ন ও সেবার ওপর ভিত্তি করে তৈরি বিশেষায়িত কোর্স। যারা দেশ ও বিদেশে হেলথকেয়ার সেক্টরে একটি নিরাপদ ক্যারিয়ার গড়তে চান, তাদের জন্য এই কোর্সটি অপরিহার্য।" 
    },
    duration: "3 - 6 Months",
    rating: "5.0",
    reviews: "128",
    eligibility: { EN: "Minimum SSC Pass / Equivalent", BN: "ন্যূনতম এসএসসি বা সমমান পাশ" },
    audience: [
      { EN: "Aspiring healthcare & nursing professionals", BN: "ভবিষ্যৎ হেলথকেয়ার প্রফেশনাল ও নার্স" },
      { EN: "Candidates applying for UK/Japan Caregiver Visas", BN: "ইউকে এবং জাপান কেয়ারগিভার ভিসার আবেদনকারী" },
      { EN: "Family caregivers seeking professional medical techniques", BN: "পরিবারের বয়স্কদের সঠিক চিকিৎসা সেবা দিতে আগ্রহী ব্যক্তি" }
    ],
    syllabus: [
      { EN: "Basic Human Anatomy & Geriatric Physiology", BN: "বেসিক হিউম্যান অ্যানাটমি ও ফিজিওলজি" },
      { EN: "Vital Signs Monitoring (BP, Blood Sugar, Pulse, Oxygen)", BN: "ভাইটাল সাইন মনিটরিং (বিপি, সুগার, পালস, অক্সিজেন)" },
      { EN: "Infection Control & Clinical Hygiene Management", BN: "ইনফেকশন কন্ট্রোল এবং হাইজিন ম্যানেজমেন্ট" },
      { EN: "Emergency First Aid & CPR Drill", BN: "ফার্স্ট এইড এবং জরুরি সিপিআর রেসপন্স" },
      { EN: "Geriatric Nutrition, Diet Planning & Mobility Assistance", BN: "বয়স্কদের পুষ্টি, ডায়েট প্ল্যানিং এবং হুইলচেয়ার সহায়তা" }
    ],
    career: { EN: "Direct eligibility for UK Health & Care Visa, Japan SSW Track, and high-paid roles in top domestic medical hospitals and geriatric centers.", BN: "ইউকে, জাপান ও কানাডার কেয়ারগিভার ভিসা এবং দেশীয় স্বনামধন্য হাসপাতাল ও কেয়ার হোমে সরাসরি কর্মসংস্থানের সুযোগ।" }
  },
  "2": {
    category: "Caregiving",
    image: "/Infant toddlers.png",
    title: { EN: "Caregiving for Infants, Toddlers and Children Level 3", BN: "কেয়ারগিভিং ফর ইনফ্যান্টস, টডলার্স অ্যান্ড চিলড্রেন লেভেল-৩" },
    desc: { 
      EN: "Comprehensive pediatric caregiving covering infant nutrition, child hygiene, early childhood psychological development, safety protocols, and pediatric emergency first aid.", 
      BN: "নবজাতক ও শিশুদের সঠিক পুষ্টি, স্বাস্থ্যবিধি, মানসিক বিকাশ, নিরাপত্তা প্রোটোকল এবং পেডিয়াট্রিক ফার্স্ট এইডের ওপর আন্তর্জাতিক মানের পূর্ণাঙ্গ প্রশিক্ষণ।" 
    },
    duration: "3 - 6 Months",
    rating: "5.0",
    reviews: "95",
    eligibility: { EN: "Minimum SSC Pass", BN: "ন্যূনতম এসএসসি পাশ" },
    audience: [
      { EN: "Aspiring Nannies, Daycare & Preschool workers", BN: "ভবিষ্যৎ ন্যানি এবং ডে-কেয়ার কর্মী" },
      { EN: "Au Pair visa candidates (Europe/USA)", BN: "ইউরোপ বা আমেরিকায় Au Pair ভিসা প্রত্যাশী" },
      { EN: "Pediatric clinic & nursery assistants", BN: "পেডিয়াট্রিক কেয়ার ও নার্সারি অ্যাসিস্ট্যান্ট" }
    ],
    syllabus: [
      { EN: "Infant Nutrition & Safe Feeding Techniques", BN: "শিশুর পুষ্টি এবং খাওয়ানোর সঠিক কৌশল" },
      { EN: "Early Childhood Psychological & Motor Development", BN: "শিশুর মানসিক ও বুদ্ধিবৃত্তিক বিকাশ" },
      { EN: "Pediatric First Aid, Choking & CPR Management", BN: "পেডিয়াট্রিক ফার্স্ট এইড এবং চোকিং সিপিআর" },
      { EN: "Hygiene, Diapering & Infection Control for Kids", BN: "শিশুদের হাইজিন এবং ইনফেকশন কন্ট্রোল" }
    ],
    career: { EN: "International Daycare Centers, Au Pair Cultural Exchange Programs abroad, and Pediatric Hospital wards.", BN: "ডে-কেয়ার সেন্টার, বিদেশের Au Pair প্রোগ্রাম এবং পেডিয়াট্রিক হাসপাতাল।" }
  },
  "3": {
    category: "Caregiving",
    image: "/Dementia caregiving.png",
    title: { EN: "Dementia Caregiving Level 3", BN: "ডিমেনশিয়া কেয়ারগিভিং লেভেল-৩" },
    desc: { 
      EN: "Advanced clinical caregiving for patients with Alzheimer's and Dementia. Master behavioral management, memory care techniques, and compassionate communication.", 
      BN: "অ্যালঝাইমার এবং ডিমেনশিয়ায় আক্রান্ত রোগীদের বিশেষ ক্লিনিক্যাল যত্ন। রোগীর আচরণের পরিবর্তন ব্যবস্থাপনা, মেমোরি কেয়ার এবং সংবেদনশীল যোগাযোগের ওপর উচ্চতর প্রশিক্ষণ।" 
    },
    duration: "3 - 6 Months",
    rating: "5.0",
    reviews: "112",
    eligibility: { EN: "Minimum SSC Pass", BN: "ন্যূনতম এসএসসি পাশ" },
    audience: [
      { EN: "Experienced Caregivers upgrading technical skills", BN: "অভিজ্ঞ কেয়ারগিভার যারা দক্ষতা বাড়াতে চান" },
      { EN: "Specialized geriatric nursing staff", BN: "বিশেষায়িত নার্সিং স্টাফ" },
      { EN: "Japan SSW & UK Care Visa Candidates", BN: "জাপান SSW ও ইউকে ভিসা ক্যান্ডিডেট" }
    ],
    syllabus: [
      { EN: "Understanding Alzheimer's & Dementia Neurology", BN: "অ্যালঝাইমার ও ডিমেনশিয়া সম্পর্কে ক্লিনিক্যাল ধারণা" },
      { EN: "Behavioral Change & Aggression Management", BN: "আচরণের পরিবর্তন নিয়ন্ত্রণ ও ব্যবস্থাপনা" },
      { EN: "Memory Care & Cognitive Stimulation Exercises", BN: "মেমোরি কেয়ার এবং কগনিটিভ ব্যায়াম" },
      { EN: "Compassionate Communication & Patient Psychology", BN: "রোগীর সাথে সংবেদনশীল যোগাযোগ" }
    ],
    career: { EN: "Specialized Dementia Care Homes and Geriatric Hospital wards across the UK, Japan, and Europe.", BN: "ইউকে, জাপান এবং কানাডার বিশেষায়িত কেয়ার হোম ও হাসপাতাল।" }
  },
  "4": {
    category: "Caregiving",
    image: "/Special needs.png",
    title: { EN: "Caregiving for Special Needs Persons Level 3", BN: "কেয়ারগিভিং ফর স্পেশাল নিডস পার্সনস লেভেল-৩" },
    desc: { 
      EN: "Professional support and mobility assistance for individuals with physical or cognitive disabilities. Learn adaptive care, patience, and specialized rehabilitation support.", 
      BN: "শারীরিক বা মানসিক প্রতিবন্ধকতার শিকার ও বিশেষ চাহিদাসম্পন্ন ব্যক্তিদের সহায়তার জন্য প্রফেশনাল প্রশিক্ষণ। মোবিলিটি সাপোর্ট এবং পুনর্বাসন সেবার কৌশল শিক্ষা।" 
    },
    duration: "3 - 6 Months",
    rating: "5.0",
    reviews: "88",
    eligibility: { EN: "Minimum SSC Pass", BN: "ন্যূনতম এসএসসি পাশ" },
    audience: [
      { EN: "Disability support & rehabilitation workers", BN: "প্রতিবন্ধী সহায়তা কর্মী ও রিহ্যাবিলিটেশন স্টাফ" },
      { EN: "Special education school assistants", BN: "বিশেষায়িত স্কুলের সহকারী" }
    ],
    syllabus: [
      { EN: "Mobility, Lifting & Wheelchair Assistance", BN: "মোবিলিটি এবং হুইলচেয়ার সহায়তা" },
      { EN: "Adaptive Care & Assistive Device Management", BN: "অ্যাডাপটিভ কেয়ার টেকনিক ও ডিভাইস ব্যবহার" },
      { EN: "Physical Therapy & Rehabilitation Basics", BN: "বেসিক ফিজিক্যাল থেরাপি ও রিহ্যাবিলিটেশন" },
      { EN: "Psychological Support & Special Empathy Training", BN: "মানসিক সহায়তা এবং সহানুভূতি" }
    ],
    career: { EN: "Rehab Centers, Disability Support Homes, and Special Education institutes globally.", BN: "রিহ্যাব সেন্টার এবং গ্লোবাল ডিজেবিলিটি সাপোর্ট হোম।" }
  },
  "5": {
    category: "Healthcare & Beauty",
    image: "/Primary healthcare.png",
    title: { EN: "Primary Healthcare Service Level 2", BN: "প্রাইমারি হেলথকেয়ার সার্ভিস লেভেল-২" },
    desc: { 
      EN: "Foundation course in primary community healthcare, patient assessment, basic pharmacology, hygiene management, and first response medical assistance.", 
      BN: "প্রাথমিক স্বাস্থ্যসেবা, রোগীর প্রাথমিক মূল্যায়ন, সাধারণ ওষুধ ব্যবস্থাপনা, স্বাস্থ্যবিধি এবং জরুরি প্রাথমিক চিকিৎসার ওপর ভিত্তিপ্রস্তর এবং গুরুত্বপূর্ণ কারিগরি কোর্স।" 
    },
    duration: "3 Months",
    rating: "4.9",
    reviews: "156",
    eligibility: { EN: "Minimum SSC Pass", BN: "ন্যূনতম এসএসসি পাশ" },
    audience: [
      { EN: "Community health workers & clinic aides", BN: "কমিউনিটি হেলথ ওয়ার্কার ও ক্লিনিক এইড" },
      { EN: "Pharmacy sales & dispensing assistants", BN: "ফার্মেসি অ্যাসিস্ট্যান্ট ও সেলস এক্সিকিউটিভ" },
      { EN: "Hospital reception & diagnostic staff", BN: "হাসপাতাল রিসিপশনিস্ট ও ডায়াগনস্টিক স্টাফ" }
    ],
    syllabus: [
      { EN: "Patient Assessment, Triage & Medical History", BN: "রোগীর মূল্যায়ন এবং ট্রায়াজ" },
      { EN: "Basic Pharmacology & Essential Medicine Intro", BN: "বেসিক ফার্মাকোলজি এবং ওষুধের পরিচিতি" },
      { EN: "First Response Medical Assistance & Wound Care", BN: "ফার্স্ট রেসপন্স চিকিৎসা ও ক্ষত সেবা" },
      { EN: "Clinical Hygiene & Sterilization Protocols", BN: "ক্লিনিক্যাল হাইজিন ও জীবাণুমুক্তকরণ" }
    ],
    career: { EN: "Local Clinics, Diagnostic Centers, Pharmacies, and Community Healthcare NGOs.", BN: "স্থানীয় ক্লিনিক, ডায়াগনস্টিক সেন্টার, এনজিও এবং ফার্মেসি।" }
  },
  "6": {
    category: "Healthcare & Beauty",
    image: "/Skin Care.png",
    title: { EN: "Skin Care Level 3", BN: "স্কিন কেয়ার লেভেল-৩" },
    desc: { 
      EN: "Professional dermatology basics, aesthetic skincare treatments, facial therapy, skin analysis, and hygiene protocols for modern salons and clinical aesthetic centers.", 
      BN: "ত্বকের সঠিক যত্ন, এস্থেটিক ট্রিটমেন্ট, ফেসিয়াল থেরাপি, স্কিন অ্যানালাইসিস এবং আধুনিক ক্লিনিক্যাল ও সেলুন হাইজিন প্রোটোকলের ওপর প্রফেশনাল লেভেল-৩ প্রশিক্ষণ।" 
    },
    duration: "3 Months",
    rating: "4.9",
    reviews: "142",
    eligibility: { EN: "Minimum SSC Pass", BN: "ন্যূনতম এসএসসি পাশ" },
    audience: [
      { EN: "Aspiring Beauticians & Aesthetic Clinic therapists", BN: "ভবিষ্যৎ বিউটিশিয়ান এবং এস্থেটিক থেরাপিস্ট" },
      { EN: "Salon Owners upgrading clinical standards", BN: "পার্লার বা সেলুন মালিক" }
    ],
    syllabus: [
      { EN: "Dermatology Basics & Skin Type Analysis", BN: "ত্বকের গঠন এবং স্কিন অ্যানালাইসিস" },
      { EN: "Facial Therapy, Peeling & Aesthetic Treatments", BN: "ফেসিয়াল থেরাপি এবং এস্থেটিকস" },
      { EN: "Clinical Salon Hygiene & Tool Sterilization", BN: "ক্লিনিক্যাল সেলুন হাইজিন ও জীবাণুমুক্তকরণ" },
      { EN: "Product Chemistry & Customized Application", BN: "প্রসাধনী জ্ঞান এবং ব্যবহার বিধি" }
    ],
    career: { EN: "Aesthetic Skin Clinics, Premium Salons, and high-income self-employment opportunities.", BN: "এস্থেটিক ক্লিনিক, প্রিমিয়াম পার্লার এবং আত্মকর্মসংস্থান।" }
  },
  "7": {
    category: "Language Skills",
    image: "/japanese language.png",
    title: { EN: "Japanese Language Level 2 (SSW Prep)", BN: "জাপানিজ ল্যাঙ্গুয়েজ লেভেল-২ (SSW প্রস্তুতি)" },
    desc: { 
      EN: "Tailored Japanese language mastery focusing on N5/N4 standards and healthcare vocabulary. Designed specifically for candidates aiming for Japan Specified Skilled Worker visas.", 
      BN: "জাপানের SSW (Specified Skilled Worker) কেয়ারগিভিং ও স্কিলড ভিসার জন্য বিশেষায়িত ভাষা প্রশিক্ষণ। জাপানি সংস্কৃতি, স্পোকেন এবং হেলথকেয়ার টেকনিক্যাল শব্দাবলি শিক্ষা।" 
    },
    duration: "3 - 4 Months",
    rating: "5.0",
    reviews: "205",
    eligibility: { EN: "Minimum SSC Pass", BN: "ন্যূনতম এসএসসি পাশ" },
    audience: [
      { EN: "Japan SSW Job Visa Candidates", BN: "জাপান SSW ভিসা প্রত্যাশী" },
      { EN: "Students aiming for higher study in Japanese Universities", BN: "জাপানে উচ্চশিক্ষায় আগ্রহী শিক্ষার্থী" }
    ],
    syllabus: [
      { EN: "Hiragana, Katakana & Basic Kanji Mastery", BN: "হিরাগানা, কাতাকানা এবং বেসিক কাঞ্জি" },
      { EN: "Everyday Japanese Spoken & Workplace Conversation", BN: "দৈনন্দিন জাপানি কথোপকথন ও কর্পোরেট শিষ্টাচার" },
      { EN: "Specialized Healthcare & Caregiving Vocabulary", BN: "হেলথকেয়ার ও কেয়ারগিভিং শব্দভাণ্ডার" },
      { EN: "JLPT N5 / NAT Exam Preparation & Mock Tests", BN: "JLPT N5 / NAT পরীক্ষার প্রস্তুতি ও মক টেস্ট" }
    ],
    career: { EN: "Direct placement pathways for Japan SSW Caregiver & Technical work visas.", BN: "জাপান SSW জব ভিসা এবং স্টুডেন্ট ভিসার সরাসরি পথ।" }
  },
  "8": {
    category: "Language Skills",
    image: "/English for work.png",
    title: { EN: "English for Work Level 2", BN: "ইংলিশ ফর ওয়ার্ক লেভেল-২" },
    desc: { 
      EN: "Practical workplace communication, professional email writing, interview preparation, and fluent spoken English tailored for corporate jobs and international work environments.", 
      BN: "কর্মক্ষেত্রে সাবলীল ইংরেজি কথোপকথন, প্রফেশনাল ইমেইল রাইটিং, ইন্টারভিউ প্রস্তুতি এবং কর্পোরেট ও আন্তর্জাতিক কর্মপরিবেশের জন্য ব্যবহারিক ইংরেজি যোগাযোগ দক্ষতা।" 
    },
    duration: "3 Months",
    rating: "4.9",
    reviews: "180",
    eligibility: { EN: "Open for Everyone", BN: "সবার জন্য উন্মুক্ত" },
    audience: [
      { EN: "Corporate Employees & Executives", BN: "কর্পোরেট পেশাজীবী ও এক্সিকিউটিভ" },
      { EN: "Job Seekers & University Graduates", BN: "চাকরিপ্রার্থী এবং বিশ্ববিদ্যালয় গ্র্যাজুয়েট" },
      { EN: "Freelancers targeting international clients", BN: "আন্তর্জাতিক ক্লায়েন্ট নিয়ে কাজ করা ফ্রিল্যান্সার" }
    ],
    syllabus: [
      { EN: "Fluent Spoken English & Pronunciation Practice", BN: "সাবলীল স্পোকেন ইংলিশ প্র্যাকটিস" },
      { EN: "Professional Email & Business Report Writing", BN: "প্রফেশনাল ইমেইল ও বিজনেস রাইটিং" },
      { EN: "Job Interview Preparation & Mock Sessions", BN: "ইন্টারভিউ প্রস্তুতি এবং মক টেস্ট" },
      { EN: "Corporate Etiquette & Public Presentation Skills", BN: "কর্পোরেট শিষ্টাচার এবং প্রেজেন্টেশন" }
    ],
    career: { EN: "Multinational Corporations (MNCs), BPO, International Freelancing, and Corporate sector.", BN: "মাল্টিন্যাশনাল কোম্পানি, বিপিও এবং কর্পোরেট সেক্টর।" }
  },
  "9": {
    category: "IT Skills",
    image: "/Digital Marketing.png",
    title: { EN: "Digital Marketing Level 3", BN: "ডিজিটাল মার্কেটিং লেভেল-৩" },
    desc: { 
      EN: "Master social media marketing, Facebook & Instagram ads, SEO, content strategy, and online brand management. Start freelancing or boost your business growth.", 
      BN: "সোশ্যাল মিডিয়া মার্কেটিং, ফেসবুক ও ইনস্টাগ্রাম অ্যাডস, এসইও (SEO), কন্টেন্ট স্ট্র্যাটেজি এবং অনলাইন ব্র্যান্ডিং মাস্টারক্লাস। ফ্রিল্যান্সিং ও ক্যারিয়ার উন্নতির সেরা মাধ্যম।" 
    },
    duration: "3 Months",
    rating: "4.9",
    reviews: "220",
    eligibility: { EN: "Basic Computer & Internet Knowledge", BN: "বেসিক কম্পিউটার ও ইন্টারনেট জ্ঞান" },
    audience: [
      { EN: "Aspiring Freelancers & Agency builders", BN: "ভবিষ্যৎ ফ্রিল্যান্সার ও এজেন্সি মালিক" },
      { EN: "Business Owners & E-commerce Entrepreneurs", BN: "ব্যবসায়ী এবং ই-কমার্স উদ্যোক্তা" },
      { EN: "Corporate Marketing Professionals", BN: "মার্কেটিং প্রফেশনাল" }
    ],
    syllabus: [
      { EN: "Social Media Marketing (SMM) & Brand Strategy", BN: "সোশ্যাল মিডিয়া মার্কেটিং (SMM) ও ব্র্যান্ড স্ট্র্যাটেজি" },
      { EN: "Facebook & Instagram Ads Campaign Mastery", BN: "ফেসবুক ও ইনস্টাগ্রাম অ্যাডস মাস্টারক্লাস" },
      { EN: "Search Engine Optimization (SEO) & Keyword Research", BN: "সার্চ ইঞ্জিন অপটিমাইজেশন (SEO)" },
      { EN: "Fiverr & Upwork Freelancing Success Guidelines", BN: "ফাইবার ও আপওয়ার্ক ফ্রিল্যান্সিং গাইডলাইন" }
    ],
    career: { EN: "Freelance Marketer, SEO Consultant, E-commerce Manager, and Digital Agency Executive.", BN: "ফ্রিল্যান্স মার্কেটার, এসইও এক্সপার্ট এবং ডিজিটাল মার্কেটিং এজেন্সি।" }
  },
  "10": {
    category: "Healthcare & Beauty",
    image: "/Day long Primary Healthcare.png",
    title: { EN: "Day-long Primary Healthcare, First Aid & CPR", BN: "দিনব্যাপী প্রাইমারি হেলথ কেয়ার, ফার্স্ট এইড ও সিপিআর" },
    desc: { 
      EN: "Learn essential life-saving skills in just one day! This intensive hands-on workshop equips you with practical knowledge to handle medical emergencies at home or the workplace.", 
      BN: "এক দিনেই শিখুন জীবন রক্ষাকারী দক্ষতা! এই নিবিড় ব্যবহারিক কর্মশালা আপনাকে বাড়ি বা কর্মক্ষেত্রে যেকোনো জরুরি চিকিৎসা পরিস্থিতি সামলানোর বাস্তব জ্ঞান প্রদান করবে।" 
    },
    duration: "1 Day (10 AM - 5 PM)",
    rating: "5.0",
    reviews: "340",
    eligibility: { EN: "Open for everyone", BN: "সবার জন্য উন্মুক্ত" },
    audience: [
      { EN: "Corporate, Factory & Garment Compliance Officers", BN: "কর্পোরেট এবং ফ্যাক্টরি কমপ্লায়েন্স কর্মী" },
      { EN: "Parents, Teachers & General Citizens", BN: "অভিভাবক, স্কুল শিক্ষক ও সচেতন নাগরিক" }
    ],
    syllabus: [
      { EN: "CPR (Cardiopulmonary Resuscitation) Practical Drill", BN: "সিপিআর (CPR) পদ্ধতি ও হ্যান্ডস-অন প্র্যাকটিস" },
      { EN: "Severe Bleeding Control & Emergency Wound Care", BN: "রক্তপাত নিয়ন্ত্রণ ও ক্ষত সেবা" },
      { EN: "Heimlich Maneuver (Choking Management)", BN: "চোকিং ম্যানেজমেন্ট ও হাইমলিচ ম্যানুভার" },
      { EN: "Burn Management, Fractures & Vital Signs Check", BN: "পোড়া ক্ষত ব্যবস্থাপনা ও ব্লাড প্রেশার চেক" }
    ],
    career: { EN: "Mandatory qualification for Factory/Garment Safety Officers and personal life-saving preparedness.", BN: "গার্মেন্টস বা ফ্যাক্টরি সেফটি অফিসার এবং ব্যক্তিগত জীবন রক্ষাকারী দক্ষতা।" }
  },
  "11": {
    category: "Healthcare & Beauty",
    image: "/CPR & Emmergency Response Program.jpg",
    title: { EN: "CPR & Emergency Response Training Program", BN: "CPR ও ইমার্জেন্সি রেসপন্স ট্রেনিং প্রোগ্রাম" },
    desc: { 
      EN: "An intensive hands-on training featuring live demo sessions on First Aid, CPR, fracture care, and emergency response. Guided by expert medical doctors and instructors.", 
      BN: "ফার্স্ট এইড, সিপিআর এবং ইমার্জেন্সি রেসপন্সের ওপর বিশেষজ্ঞ চিকিৎসকদের দ্বারা পরিচালিত হ্যান্ডস-অন প্র্যাকটিক্যাল ট্রেনিং ও লাইভ ডেমো সেশন।" 
    },
    duration: "1 Day (10 AM - 5 PM)",
    rating: "5.0",
    reviews: "215",
    eligibility: { EN: "Open for everyone", BN: "সবার জন্য উন্মুক্ত" },
    audience: [
      { EN: "Industrial Health & Safety Officers (HSE)", BN: "হেলথ ও সেফটি অফিসার (HSE)" },
      { EN: "Emergency Responders & Community Volunteers", BN: "ইমার্জেন্সি রেসপন্ডার ও স্বেচ্ছাসেবক" }
    ],
    syllabus: [
      { EN: "Advanced CPR & AED Machine Usage Demo", BN: "অ্যাডভান্সড সিপিআর ও AED মেশিন ব্যবহার" },
      { EN: "Instant Bleeding Control & Tourniquet Application", BN: "তাৎক্ষণিক রক্তপাত নিয়ন্ত্রণ ও টর্নিকেট ব্যবহার" },
      { EN: "Emergency Burn, Spinal & Fracture First Aid", BN: "জরুরি পোড়া ও স্পাইনাল হাড় ভাঙা ফার্স্ট এইড" }
    ],
    career: { EN: "Corporate First Responder, HSE compliance in industrial sectors, and NGO field operations.", BN: "কর্পোরেট ফার্স্ট রেসপন্ডার এবং ইন্ডাস্ট্রিয়াল সেফটি কমপ্লায়েন্স।" }
  }
};

export default function CourseDetails() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const currentLang = lang || 'EN';

  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [dynamicCourse, setDynamicCourse] = useState(null);
  const [fetchDone, setFetchDone] = useState(false); // 👈 ফেচ শেষ হলে ট্র্যাক করবে (ফেইল হলেও fallback দেখাবে)
  const [formData, setFormData] = useState({ 
    name: '', phone: '', interest: '', source: 'Course Details Page' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // ID পরিবর্তন হলে স্ক্রল টপ এবং পুরনো ডায়নামিক ডেটা রিসেট
  useEffect(() => {
    window.scrollTo(0, 0);
    setDynamicCourse(null);
    setFetchDone(false);
  }, [id]);

  // হার্ডকোডেড লিস্টে কোর্স আছে কিনা চেক
  const staticCourse = detailedCourses[id]; // ডেটাবেসের ID দিলে এখানে undefined আসবে

  // 👈 যদি হার্ডকোডে না থাকে, তবে ডেটাবেস (Supabase) থেকে খুঁজবে
  useEffect(() => {
    if (!staticCourse) {
      const fetchCourse = async () => {
        const { data, error } = await supabase
          .from('dynamic_courses')
          .select('*')
          .eq('id', id)
          .single();

        if (data && !error) {
          setDynamicCourse({
            id: data.id,
            category: data.category,
            image: data.image,
            title: { EN: data.title_en, BN: data.title_bn },
            desc: { EN: data.desc_en, BN: data.desc_bn },
            duration: data.duration,
            rating: data.rating,
            reviews: data.reviews,
            eligibility: { EN: data.eligibility_en, BN: data.eligibility_bn },
            audience: data.audience || [],
            syllabus: data.syllabus || [],
            career: { EN: data.career_en, BN: data.career_bn }
          });
        }
        setFetchDone(true); // সফল বা ব্যর্থ — ফেচ শেষ
      };
      fetchCourse();
    }
  }, [id, staticCourse]);

  // চূড়ান্ত কোর্স ভেরিয়েবল: স্ট্যাটিক > ডায়নামিক > fallback
  const course = staticCourse || dynamicCourse || detailedCourses["1"];

  // ✅ SAFELY SYNC INTEREST WITHOUT CAUSING INFINITE LOOPS
  useEffect(() => {
    if (course && course.title) {
      setFormData(prev => ({ ...prev, interest: course.title[currentLang] || '' }));
    }
  }, [id, currentLang, course]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby6xxm5ItCCd-z8tlMzYxZMx0xHn7IYdLY_iCOD0KxBi_sbDfDFyf00RQzQE_rj_s9x/exec";

    try {
      await fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: JSON.stringify(formData) });
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowModal(false);
      }, 3000);
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowModal(false);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ LOADING STATE — সব hook-এর পরে রাখা হয়েছে (Rules of Hooks)
  if (!staticCourse && !dynamicCourse && !fetchDone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-bold text-slate-500">Loading Course Details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* ================= 1. SAAS/UNIVERSITY STYLE HERO SECTION ================= */}
      <section className="bg-slate-900 text-white pt-8 sm:pt-12 pb-24 sm:pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <Link 
            to="/courses" 
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-colors mb-6 sm:mb-8 group bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md w-fit"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-blue-400" />
            <span>{currentLang === 'EN' ? 'Back to All Courses' : 'কোর্স তালিকায় ফিরে যান'}</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] sm:text-xs font-black uppercase tracking-widest backdrop-blur-md">
                <Sparkles size={13} className="text-amber-400" />
                <span>{course.category}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {course.title[currentLang]}
              </h1>

              <p className="text-xs sm:text-base text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {course.desc[currentLang]}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 pt-2">
                <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-200 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
                  <Clock size={16} className="text-blue-400 flex-shrink-0" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-200 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
                  <Star size={16} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                  <span>{course.rating} ({course.reviews} {currentLang === 'EN' ? 'Reviews' : 'রিভিউ'})</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-emerald-300 bg-emerald-500/10 px-3.5 py-2 rounded-xl border border-emerald-500/20">
                  <ShieldCheck size={16} className="text-emerald-400 flex-shrink-0" />
                  <span>{currentLang === 'EN' ? 'Govt. NSDA Approved' : 'সরকার ও NSDA অনুমোদিত'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img 
                  src={course.image} 
                  alt={course.title.EN} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block">Accreditation</span>
                    <h4 className="text-sm sm:text-base font-black leading-tight mt-0.5">National Skills Development Authority</h4>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
                    ✓
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. MAIN CONTENT BODY & STICKY ENROLLMENT CARD ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            
            <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-start space-x-4 p-4 sm:p-5 rounded-2xl bg-blue-50/50 border border-blue-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm font-bold">
                  <Award size={22} />
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-black text-blue-600 uppercase tracking-widest block mb-0.5">
                    {currentLang === 'EN' ? 'Global Certification' : 'সার্টিফিকেশন'}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                    {currentLang === 'EN' ? 'Govt. NSDA Level 2/3 Certified' : 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার (NSDA) অনুমোদিত'}
                  </h4>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 sm:p-5 rounded-2xl bg-purple-50/50 border border-purple-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm font-bold">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-black text-purple-600 uppercase tracking-widest block mb-0.5">
                    {currentLang === 'EN' ? 'Minimum Eligibility' : 'ভর্তির যোগ্যতা'}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                    {course.eligibility[currentLang]}
                  </h4>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-sm border border-slate-200/80">
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 mb-6 flex items-center">
                <Target size={24} className="mr-3 text-blue-600 flex-shrink-0" />
                <span>{currentLang === 'EN' ? 'Who Is This Course Designed For?' : 'কারা এই কোর্সটি করতে পারবেন?'}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {course.audience.map((aud, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-slate-700 font-bold text-xs sm:text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0 font-black">✓</div>
                    <span>{aud[currentLang]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-sm border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
                <h2 className="text-lg sm:text-2xl font-black text-slate-900 flex items-center">
                  <FileText size={24} className="mr-3 text-blue-600 flex-shrink-0" />
                  <span>{currentLang === 'EN' ? 'Curriculum & What You Will Learn' : 'যা যা শিখবেন (সম্পূর্ণ সিলেবাস)'}</span>
                </h2>
                <span className="text-xs font-bold text-slate-400">{course.syllabus.length} {currentLang === 'EN' ? 'Core Modules' : 'টি প্রধান মডিউল'}</span>
              </div>

              <div className="space-y-3">
                {course.syllabus.map((item, idx) => {
                  const isOpen = activeTab === idx;
                  return (
                    <div 
                      key={idx}
                      onClick={() => setActiveTab(isOpen ? -1 : idx)}
                      className={`rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                        isOpen ? 'bg-blue-50/40 border-blue-300 shadow-sm' : 'bg-slate-50/50 border-slate-200/70 hover:border-slate-300'
                      }`}
                    >
                      <div className="p-4 sm:p-5 flex items-center justify-between">
                        <div className="flex items-center space-x-3.5">
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 transition-colors ${
                            isOpen ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                          }`}>
                            0{idx + 1}
                          </span>
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                            {item[currentLang]}
                          </h4>
                        </div>
                        <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                      </div>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-blue-100/60 mt-1">
                          {currentLang === 'EN'
                            ? 'This comprehensive module includes theoretical foundations, practical laboratory drills, assessment checklists, and real-world clinical case studies aligned with NSDA guidelines.'
                            : 'এই মডিউলে রয়েছে তাত্ত্বিক ধারণা, ল্যাবরেটরি প্র্যাকটিক্যাল ড্রিল এবং বাংলাদেশ কারিগরি শিক্ষা বোর্ডের (NSDA) নীতিমালা অনুযায়ী বাস্তব কর্মক্ষেত্রের গাইডলাইন।'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-4">
                <Briefcase size={12} />
                <span>{currentLang === 'EN' ? 'Global Placement Impact' : 'চাকরি ও আন্তর্জাতিক সুযোগ'}</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black mb-4 relative z-10 leading-tight">
                {currentLang === 'EN' ? 'Career & Global Placement Pathways' : 'ক্যারিয়ার ও আন্তর্জাতিক কর্মসংস্থান'}
              </h2>

              <p className="text-slate-300 text-xs sm:text-base font-medium leading-relaxed relative z-10">
                {course.career[currentLang]}
              </p>
            </div>

          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border-2 border-slate-100 overflow-hidden relative">
              
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500"></div>
              
              <div className="text-center pt-3 pb-6 border-b border-slate-100">
                <span className="inline-block px-3.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
                  {currentLang === 'EN' ? 'Admissions Open for Next Batch' : 'পরবর্তী ব্যাচে ভর্তি চলছে'}
                </span>
                
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
                  {currentLang === 'EN' ? 'Consult for Fees & Scholarships' : 'ফি ও স্কলারশিপ জানতে যোগাযোগ করুন'}
                </h3>
                <p className="text-xs font-bold text-slate-400 mt-1">
                  {currentLang === 'EN' ? 'Special installment facilities available' : 'অফিসে বিশেষ ছাড় ও কিস্তির সুবিধা রয়েছে'}
                </p>
              </div>

              <div className="py-6 space-y-4 text-xs sm:text-sm font-bold">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center text-slate-400"><Clock size={16} className="mr-2 text-blue-500"/> {currentLang === 'EN' ? 'Duration' : 'সময়কাল'}</span>
                  <span className="text-slate-900 font-black">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center text-slate-400"><Users size={16} className="mr-2 text-emerald-500"/> {currentLang === 'EN' ? 'Batch Limit' : 'আসন সংখ্যা'}</span>
                  <span className="text-slate-900 font-black">{currentLang === 'EN' ? '24 Seats per batch' : 'সর্বোচ্চ ২৪ সিট'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center text-slate-400"><MapPin size={16} className="mr-2 text-purple-500"/> {currentLang === 'EN' ? 'Campus' : 'স্থান'}</span>
                  <span className="text-slate-900 font-black">{currentLang === 'EN' ? 'Bijoy Nagar, Dhaka' : 'বিজয় নগর, ঢাকা'}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button 
                  onClick={() => setShowModal(true)}
                  className="w-full py-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-black text-xs sm:text-sm shadow-lg shadow-slate-900/20 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer group"
                >
                  <span>{currentLang === 'EN' ? 'Book Free Counseling Now' : 'ফ্রি কনসালটেন্সি বুক করুন'}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <a 
                  href="tel:+8801818304081" 
                  className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs sm:text-sm active:scale-95 transition-all flex items-center justify-center space-x-2 block text-center"
                >
                  <Phone size={15} className="text-blue-600" />
                  <span>{currentLang === 'EN' ? 'Direct Hotline: 01818-304081' : 'সরাসরি কল: 01818-304081'}</span>
                </a>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center space-x-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>{currentLang === 'EN' ? '100% Confidential Advice' : '১০০% নিরাপদ ও গোপনীয় তথ্য সংরক্ষণ'}</span>
              </div>

            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white text-center shadow-lg">
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full block w-fit mx-auto mb-2">
                ✈️ Global Visa Support
              </span>
              <h4 className="text-base font-black leading-tight">
                {currentLang === 'EN' ? 'Planning to study or work abroad?' : 'বিদেশে উচ্চশিক্ষা বা কর্মসংস্থানের পরিকল্পনা?'}
              </h4>
              <p className="text-xs text-blue-100 mt-1 mb-4 font-medium">
                {currentLang === 'EN' ? 'We process UK, Japan, Canada & Schengen visas.' : 'ইউকে, জাপান ও কানাডা ভিসা প্রসেসিংয়ে আমরা দিচ্ছি ৯৮% সাফল্যের নিশ্চয়তা।'}
              </p>
              <Link to="/study-abroad">
                <button className="px-5 py-2 rounded-xl bg-white text-slate-900 hover:bg-amber-300 font-black text-xs transition shadow-sm">
                  {currentLang === 'EN' ? 'Explore Visa Pathways →' : 'ভিসা গাইডলাইন দেখুন →'}
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ================= 3. QUICK ENROLLMENT MODAL (LIVE GOOGLE SHEETS CRM) ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block">Course Admission Inquiry</span>
                <h3 className="text-lg font-black mt-0.5">{course.title[currentLang]}</h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {submitSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 size={48} className="text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="text-xl font-black text-slate-900">{currentLang === 'EN' ? 'Inquiry Received!' : 'আবেদন সফলভাবে গৃহীত হয়েছে!'}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    {currentLang === 'EN' 
                      ? 'Our admission coordinator will review your profile and call you within 24 hours.' 
                      : 'আমাদের অ্যাডমিশন কো-অর্ডিনেটর আপনার তথ্য যাচাই করে আগামী ২৪ ঘণ্টার মধ্যে ফোনে যোগাযোগ করবেন।'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">{currentLang === 'EN' ? 'Your Full Name *' : 'আপনার সম্পূর্ণ নাম *'}</label>
                    <input 
                      type="text" name="name" required value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Md. Shakawat Hossain" 
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">{currentLang === 'EN' ? 'WhatsApp / Phone Number *' : 'মোবাইল বা হোয়াটসঅ্যাপ নম্বর *'}</label>
                    <input 
                      type="tel" name="phone" required value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="018XXXXXXXX" 
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">{currentLang === 'EN' ? 'Course of Interest' : 'নির্বাচিত কোর্স'}</label>
                    <input 
                      type="text" disabled value={course.title[currentLang]} 
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm font-black text-slate-500 cursor-not-allowed"
                    />
                  </div>

                  <button 
                    type="submit" disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-black text-xs sm:text-sm shadow-lg active:scale-95 transition-all mt-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (currentLang === 'EN' ? 'Submitting Request...' : 'প্রসেসিং হচ্ছে...') : (currentLang === 'EN' ? 'Submit Counseling Request →' : 'আবেদন জমা দিন →')}
                  </button>

                  <div className="flex items-center justify-center space-x-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest pt-2">
                    <ShieldCheck size={13} className="text-emerald-500" />
                    <span>{currentLang === 'EN' ? 'Your information is 100% confidential' : '১০০% গোপনীয় ও নিরাপদ তথ্য সংরক্ষণ'}</span>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}