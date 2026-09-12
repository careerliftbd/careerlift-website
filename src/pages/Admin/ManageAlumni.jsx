import React, { useState, useEffect } from 'react';
import { lmsSupabase } from '../../config/lmsDb';
import { Users, ShieldAlert, Loader2, Search, ExternalLink } from 'lucide-react';

export default function ManageAlumni() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      const { data, error } = await lmsSupabase
        .from('students')
        .select(`
          id,
          full_name,
          photo_link,
          enrollments!inner (
            course_name,
            course_status
          )
        `)
        .eq('enrollments.course_status', 'Completed')
        .order('created_at', { ascending: false });

      if (data && !error) {
        setAlumni(data);
      } else {
        console.error("Error fetching LMS data:", error);
      }
      setLoading(false);
    };

    fetchAlumni();
  }, []);

  const filteredAlumni = alumni.filter(student => 
    student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.enrollments?.[0]?.course_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
      <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 className="font-bold text-slate-800 flex items-center">
          <Users size={20} className="mr-2 text-blue-600"/> 
          Alumni Database <span className="ml-3 text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded-full uppercase tracking-widest font-black border border-amber-200">Read Only</span>
        </h3>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* 👇 Vercel Link Button 👇 */}
          <a 
            href="YOUR_VERCEL_LINK_HERE" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
          >
            LMS Dashboard <ExternalLink size={16} />
          </a>

          <div className="relative w-full sm:w-auto">
            <input 
              type="text" 
              placeholder="Search alumni..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 md:w-64"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="bg-blue-50/50 border-b border-blue-100 p-4 flex items-center text-sm text-blue-800">
        <ShieldAlert size={18} className="mr-2 text-blue-600 shrink-0" />
        <p><strong>Note:</strong> This data is connected remotely to the LMS database. To edit or manage students, please open the LMS Dashboard.</p>
      </div>

      <div className="overflow-x-auto p-4">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-xs">
            <tr>
              <th className="p-4">Student Info</th>
              <th className="p-4">Course Info</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3" className="p-12 text-center"><Loader2 size={32} className="animate-spin text-blue-500 mx-auto" /></td></tr>
            ) : filteredAlumni.length === 0 ? (
              <tr><td colSpan="3" className="p-8 text-center font-medium text-slate-500">No Completed Students found in LMS.</td></tr>
            ) : (
              filteredAlumni.map((student) => {
                const enrollment = student.enrollments && student.enrollments.length > 0 ? student.enrollments[0] : null;
                
                return (
                  <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 flex items-center space-x-4">
                      <img 
                        src={student.photo_link || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                        onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; }}
                      />
                      <span className="font-bold text-slate-900">{student.full_name}</span>
                    </td>
                    <td className="p-4 font-semibold text-slate-700">
                      {enrollment?.course_name || 'N/A'}
                    </td>
                    <td className="p-4">
                      <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                        Alumni
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}