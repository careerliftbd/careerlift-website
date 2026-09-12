import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import { useLanguage } from '../../context/LanguageContext';
import { Image as ImageIcon, Camera, Loader2, Sparkles, ArrowLeft } from 'lucide-react';

export default function GalleryPage() {
  const { lang } = useLanguage();
  const currentLang = lang || 'EN';

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchGalleryImages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error) {
        setImages(data);
      }
      setLoading(false);
    };

    fetchGalleryImages();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">

      {/* ================= HERO SECTION ================= */}
      <section className="bg-slate-900 text-white pt-10 sm:pt-14 pb-20 sm:pb-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-colors mb-8 sm:mb-10 group bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md w-fit"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-blue-400" />
            <span>{currentLang === 'EN' ? 'Back to Home' : 'হোম পেজে ফিরে যান'}</span>
          </Link>

          <div className="text-center space-y-4 sm:space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-black tracking-widest uppercase text-blue-400 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full backdrop-blur-md">
              <Camera size={14} className="text-amber-400" />
              <span>{currentLang === 'EN' ? 'Memories & Events' : 'স্মৃতি ও ইভেন্টসমূহ'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              {currentLang === 'EN' ? 'Life at ' : 'আমাদের '} 
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                {currentLang === 'EN' ? 'CareerLift' : 'গ্যালারি'}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
              {currentLang === 'EN' 
                ? 'Explore the vibrant moments, success stories, training sessions, and events at our skill development institute.'
                : 'আমাদের প্রতিষ্ঠানের বিভিন্ন ইভেন্ট, ট্রেনিং সেশন এবং শিক্ষার্থীদের সফলতার আনন্দঘন মুহূর্তগুলো দেখুন।'}
            </p>
          </div>
        </div>
      </section>

      {/* ================= PINTEREST STYLE GALLERY ================= */}
      <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 relative z-20">
        <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-10 shadow-2xl border border-slate-200/80 min-h-[50vh]">

          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 px-2 sm:px-0">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center">
              <ImageIcon size={24} className="mr-3 text-blue-600" />
              <span>{currentLang === 'EN' ? 'Photo Gallery' : 'ফটো গ্যালারি'}</span>
            </h2>
            <div className="text-xs sm:text-sm font-bold text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full">
              {images.length} {currentLang === 'EN' ? 'Photos' : 'টি ছবি'}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 size={40} className="text-blue-500 animate-spin" />
              <p className="text-sm font-bold text-slate-500">
                {currentLang === 'EN' ? 'Loading moments...' : 'ছবি লোড হচ্ছে...'}
              </p>
            </div>
          ) : images.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                <ImageIcon size={32} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-black text-slate-800">
                {currentLang === 'EN' ? 'No images found' : 'কোনো ছবি পাওয়া যায়নি'}
              </h3>
              <p className="text-sm font-medium text-slate-500">
                {currentLang === 'EN' ? 'Images will appear here once uploaded by the admin.' : 'অ্যাডমিন ছবি আপলোড করলে এখানে দেখা যাবে।'}
              </p>
            </div>
          ) : (
            /* Pinterest Masonry Layout (CSS Columns) */
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6">
              {images.map((img) => (
                <div 
                  key={img.id} 
                  className="break-inside-avoid mb-4 sm:mb-6 group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-slate-100 cursor-pointer"
                >
                  <img 
                    src={img.image_url} 
                    alt={img.caption || 'CareerLift Gallery Image'} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                    loading="lazy"
                  />

                  {/* Glassmorphism Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5">
                    {img.caption && (
                      <p className="text-white text-xs sm:text-sm font-bold leading-snug translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {img.caption}
                      </p>
                    )}
                    <div className="flex items-center space-x-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-75 duration-300">
                      <Sparkles size={12} className="text-blue-400" />
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        CareerLift
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}