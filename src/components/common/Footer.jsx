import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, MessageCircle, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand Logo + Aesthetic Text & Socials */}
          <div className="md:col-span-5 space-y-5">
            
            {/* 👇 লোগো এবং বোল্ড ও এস্থেটিক CAREERLIFT টেক্সট (সাবটাইটেল বাদ দেওয়া হয়েছে) */}
            <Link to="/" className="inline-flex items-center space-x-3 group cursor-pointer">
              <img 
                src="/careerlift-logo.png" 
                alt="CareerLift Logo" 
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col justify-center">
                <span className="text-xl sm:text-2xl font-black tracking-widest text-slate-900 group-hover:text-blue-600 transition-colors leading-none font-sans">
                  CAREER<span className="text-blue-600 group-hover:text-slate-900 transition-colors">LIFT</span>
                </span>
              </div>
            </Link>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pr-4 pt-1">
              <span className="font-bold text-slate-800">Global Education & Migration Services. NSDA Recognized.</span><br/>
              {lang === 'EN' 
                ? 'Empowering individuals with practical tech skills, healthcare training, and study abroad consultancy to build a brighter future.'
                : 'প্র্যাকটিক্যাল টেক স্কিল, হেলথকেয়ার ট্রেনিং এবং স্টাডি অ্যাব্রোড কনসালটেন্সির মাধ্যমে ভবিষ্যৎ প্রজন্মকে দক্ষ করে তোলা হচ্ছে।'}
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://www.facebook.com/careerliftskill/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-2xs hover:scale-105" title="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://www.youtube.com/@CareerliftInstitute" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-2xs hover:scale-105" title="YouTube">
                <Youtube size={18} />
              </a>
              <a href="https://wa.me/8801818304081" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-2xs hover:scale-105" title="WhatsApp">
                <MessageCircle size={18} />
              </a>
              
              {/* Official X (Twitter) Icon */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-2xs hover:scale-105" title="X (Twitter)">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-2xs hover:scale-105" title="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-black text-slate-900 text-xs sm:text-sm uppercase tracking-widest mb-4 sm:mb-6">Services & Links</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm font-bold text-slate-600">
              <li><Link to="/courses" className="hover:text-blue-600 hover:translate-x-1 inline-block transition-all">All Courses</Link></li>
              <li><Link to="/study-abroad" className="hover:text-blue-600 hover:translate-x-1 inline-block transition-all">Student Visa & Immigration</Link></li>
              <li><Link to="/nsda-free-course" className="hover:text-emerald-600 hover:translate-x-1 inline-block transition-all text-emerald-700">NSDA Free Training</Link></li>
              <li><Link to="/about-us" className="hover:text-blue-600 hover:translate-x-1 inline-block transition-all">About Us</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 hover:translate-x-1 inline-block transition-all">All Services</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="md:col-span-4">
            <h4 className="font-black text-slate-900 text-xs sm:text-sm uppercase tracking-widest mb-4 sm:mb-6">Contact Office</h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm font-bold text-slate-600">
              <li className="flex items-start space-x-3 group">
                <Phone size={16} className="text-blue-600 mt-1 group-hover:scale-110 transition-transform flex-shrink-0" />
                <div className="space-y-0.5">
                  <a href="tel:+8801818304081" className="hover:text-blue-600 block transition">+880 1818-304081 (WhatsApp)</a>
                  <a href="tel:+8801965157203" className="hover:text-blue-600 block transition">+880 1965-157203</a>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <Mail size={16} className="text-blue-600 mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                <a href="mailto:careerliftinstitute@gmail.com" className="hover:text-blue-600 transition break-all font-medium">
                  careerliftinstitute@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3 group">
                <MapPin size={16} className="text-blue-600 mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="leading-relaxed font-medium text-xs sm:text-sm">
                  180-181 Prime Tower (Lift-3),<br/>
                  Shaheed Nazrul Islam Sharak,<br/>
                  Bijoy Nagar, Dhaka-1000
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal (2025 সেট করা হয়েছে) */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500 text-center md:text-left">
          <div>
            © 2026 CareerLift (A Skill Development Institute And Medical Solutions). All Rights Reserved.
          </div>
          <div className="flex items-center justify-center space-x-4">
            <Link to="#" className="hover:text-blue-600 transition">Privacy Policy</Link>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <Link to="#" className="hover:text-blue-600 transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}