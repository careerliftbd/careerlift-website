import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, ArrowLeft, Share2, Facebook, MessageCircle, Link as LinkIcon, CheckCircle2, MapPin, Clock, Loader2 } from 'lucide-react';

export default function NoticeDetails() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const currentLang = lang || 'EN';

  const [noticeData, setNoticeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // ডামি ডেটা (যদি ডেটাবেসে না পাওয়া যায়)
  const fallbackNotice = { 
    id: "dummy-1", type_en: 'Notice', type_bn: 'নোটিশ', created_at: new Date().toISOString(), time: 'N/A', location: 'Online / Campus',
    image_url: null, 
    title_en: 'Admission Going On: UK September Intake 2026', title_bn: 'ইউকে সেপ্টেম্বর ২০২৬ ইনটেকের ভর্তি চলছে', 
    desc_en: 'Apply now via OTHM Diploma and save up to 50% tuition fees with 2 years PSW. The application window is open for a limited time. Secure your UK study visa today.', 
    desc_bn: 'OTHM ডিপ্লোমার মাধ্যমে আবেদন করুন এবং ৫০% পর্যন্ত টিউশন ফি সাশ্রয় করুন। আসন সংখ্যা সীমিত, আজই আপনার অ্যাসেসমেন্ট সম্পন্ন করুন।' 
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNoticeDetail = async () => {
      // যদি id টি ডামি হয়, তবে ডাটাবেসে খুঁজবে না
      if (id.startsWith('dummy')) {
        setNoticeData(fallbackNotice);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.from('notices').select('*').eq('id', id).single();
      if (data && !error) {
        setNoticeData(data);
      } else {
        setNoticeData(fallbackNotice);
      }
      setLoading(false);
    };

    fetchNoticeDetail();
  }, [id]);

  const formatDate = (dateString, lang) => {
    const date = new Date(dateString);
    if (lang === 'BN') return date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (loading || !noticeData) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 size={40} className="animate-spin text-blue-600"/></div>;
  }

  const pageUrl = window.location.href;
  const pageTitle = currentLang === 'EN' ? noticeData.title_en : noticeData.title_bn;

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: pageTitle, url: pageUrl }); } catch (err) {}
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ফর্ম সাবমিট লজিক (Supabase General Inquiries এ যাবে)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const interestContext = `[${noticeData.type_en}] ${noticeData.title_en}`;

    try {
      const { error } = await supabase.from('general_inquiries').insert([
        { name: formData.name, phone: formData.phone, interest: interestContext }
      ]);
      
      if (error) throw error;
      
      setSubmitSuccess(true);
      setFormData({ name: '', phone: '', email: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* ================= Notice Content Section ================= */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
          
          {noticeData.image_url && (
            <div className="w-full h-48 sm:h-72 md:h-96 overflow-hidden bg-slate-100">
              <img src={noticeData.image_url} alt={pageTitle} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-5 sm:p-8 md:p-10">
            {/* Top Bar: Back & Share */}
            <div className="flex items-center justify-between mb-6 sm:mb-8 border-b border-slate-100 pb-4">
              <Link to="/notices" className="text-xs sm:text-sm font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-lg">
                <ArrowLeft size={16} /> {currentLang === 'EN' ? 'Back' : 'ফিরে যান'}
              </Link>
              
              <div className="relative">
                <button onClick={handleShare} className="p-2 sm:px-4 sm:py-2 bg-blue-50 border border-blue-100 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <Share2 size={16} /> <span className="hidden sm:inline">{currentLang === 'EN' ? 'Share' : 'শেয়ার করুন'}</span>
                </button>
                
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fadeIn">
                    <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(pageTitle + " - " + pageUrl)}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-green-50 hover:text-green-600 transition-colors border-b border-slate-100">
                      <MessageCircle size={16} /> WhatsApp
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-slate-100">
                      <Facebook size={16} /> Facebook
                    </a>
                    <button onClick={copyToClipboard} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      {copied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <LinkIcon size={16} />} 
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tags & Meta Info */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`text-[10px] sm:text-xs font-black uppercase px-3 py-1 rounded-md border ${
                noticeData.type_en === 'Notice' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {currentLang === 'EN' ? noticeData.type_en : noticeData.type_bn}
              </span>
              <span className="flex items-center gap-1 text-slate-500 text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-100 px-3 py-1 rounded-md">
                <Calendar size={14}/> {formatDate(noticeData.created_at, currentLang)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
              {pageTitle}
            </h1>

            {/* Extra Info (Time & Location) - Only for events */}
            {noticeData.type_en === 'Event' && noticeData.time && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 bg-slate-50 border border-slate-200 p-4 rounded-xl mb-6">
                <div className="flex items-center gap-2 text-slate-700 text-sm font-semibold">
                  <Clock size={16} className="text-blue-500" /> {noticeData.time}
                </div>
                {noticeData.location && (
                  <div className="flex items-center gap-2 text-slate-700 text-sm font-semibold">
                    <MapPin size={16} className="text-red-500" /> {noticeData.location}
                  </div>
                )}
              </div>
            )}

            <div className="prose prose-slate max-w-none text-slate-600 font-medium text-sm sm:text-base leading-loose whitespace-pre-line">
              {currentLang === 'EN' ? (noticeData.content_en || noticeData.desc_en) : (noticeData.content_bn || noticeData.desc_bn)}
            </div>
          </div>
        </div>

        {/* ================= Dynamic Registration / Inquiry Form ================= */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            
            <div className="w-full md:w-5/12 space-y-3 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {currentLang === 'EN' 
                  ? (noticeData.type_en === 'Event' ? 'Register for this Event' : 'Interested? Apply Now!') 
                  : (noticeData.type_en === 'Event' ? 'এই ইভেন্টে অংশ নিতে রেজিস্ট্রেশন করুন' : 'আগ্রহী? এখনই আবেদন করুন')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                {currentLang === 'EN' ? 'Fill out the form below and our team will get back to you shortly.' : 'নিচের ফর্মটি পূরণ করুন, আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে।'}
              </p>
              
              <div className="mt-4 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-2 rounded-lg text-left">
                <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
                <span className="text-[11px] font-semibold text-blue-300 line-clamp-2">
                  Applying for: <span className="text-white font-bold">{pageTitle}</span>
                </span>
              </div>
            </div>

            <div className="w-full md:w-7/12 bg-white/5 backdrop-blur-md border border-white/10 p-5 sm:p-6 rounded-2xl">
              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-6 space-y-3 animate-fadeIn">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-white">Application Received!</h4>
                  <p className="text-xs text-slate-400">We will contact you soon regarding this {noticeData.type_en.toLowerCase()}.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <input type="text" required placeholder={currentLang === 'EN' ? 'Full Name' : 'আপনার সম্পূর্ণ নাম'} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="tel" required placeholder={currentLang === 'EN' ? 'Phone Number' : 'মোবাইল নম্বর'} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                    <input type="email" placeholder={currentLang === 'EN' ? 'Email (Optional)' : 'ইমেইল (ঐচ্ছিক)'} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50">
                    {isSubmitting ? 'Submitting...' : (currentLang === 'EN' ? 'Submit Application' : 'আবেদন জমা দিন')}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}