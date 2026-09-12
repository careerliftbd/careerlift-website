import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { Plus, Edit2, Trash2, Save, X, BookOpen } from 'lucide-react';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // ফর্মের ডিফল্ট স্টেট
  const initialForm = {
    id: null,
    category: 'Caregiving',
    image: '',
    title_en: '', title_bn: '',
    desc_en: '', desc_bn: '',
    duration: '', badge: '',
    eligibility_en: '', eligibility_bn: '',
    career_en: '', career_bn: '',
    tags: '', // কমা দিয়ে আলাদা করা হবে
    audience_en: '', audience_bn: '', // নতুন লাইনে আলাদা করা হবে
    syllabus_en: '', syllabus_bn: '' // নতুন লাইনে আলাদা করা হবে
  };
  
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ডেটাবেস থেকে ডাইনামিক কোর্সগুলো আনা
  const fetchCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('dynamic_courses').select('*').order('created_at', { ascending: false });
    if (data) setCourses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ফর্ম সাবমিট (Create/Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ট্যাগগুলোকে Array তে রূপান্তর
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    // অডিয়েন্স এবং সিলেবাসকে Array of Objects এ রূপান্তর (নতুন লাইনের ওপর ভিত্তি করে)
    const audEnArr = formData.audience_en.split('\n').filter(i => i.trim());
    const audBnArr = formData.audience_bn.split('\n').filter(i => i.trim());
    const audienceArray = audEnArr.map((en, idx) => ({ EN: en, BN: audBnArr[idx] || en }));

    const sylEnArr = formData.syllabus_en.split('\n').filter(i => i.trim());
    const sylBnArr = formData.syllabus_bn.split('\n').filter(i => i.trim());
    const syllabusArray = sylEnArr.map((en, idx) => ({ EN: en, BN: sylBnArr[idx] || en }));

    const courseData = {
      category: formData.category, image: formData.image,
      title_en: formData.title_en, title_bn: formData.title_bn,
      desc_en: formData.desc_en, desc_bn: formData.desc_bn,
      duration: formData.duration, badge: formData.badge,
      eligibility_en: formData.eligibility_en, eligibility_bn: formData.eligibility_bn,
      career_en: formData.career_en, career_bn: formData.career_bn,
      tags: tagsArray, audience: audienceArray, syllabus: syllabusArray
    };

    try {
      if (isEditing) {
        // Update Course
        await supabase.from('dynamic_courses').update(courseData).eq('id', formData.id);
        alert('Course updated successfully!');
      } else {
        // Create New Course
        await supabase.from('dynamic_courses').insert([courseData]);
        alert('New course added successfully!');
      }
      
      setFormData(initialForm);
      setShowForm(false);
      setIsEditing(false);
      fetchCourses();
    } catch (error) {
      alert('Error saving course.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // এডিট বাটনে ক্লিক করলে ফর্ম ডেটা ফিল আপ করা
  const handleEdit = (course) => {
    setFormData({
      id: course.id, category: course.category, image: course.image || '',
      title_en: course.title_en || '', title_bn: course.title_bn || '',
      desc_en: course.desc_en || '', desc_bn: course.desc_bn || '',
      duration: course.duration || '', badge: course.badge || '',
      eligibility_en: course.eligibility_en || '', eligibility_bn: course.eligibility_bn || '',
      career_en: course.career_en || '', career_bn: course.career_bn || '',
      tags: course.tags ? course.tags.join(', ') : '',
      audience_en: course.audience ? course.audience.map(a => a.EN).join('\n') : '',
      audience_bn: course.audience ? course.audience.map(a => a.BN).join('\n') : '',
      syllabus_en: course.syllabus ? course.syllabus.map(s => s.EN).join('\n') : '',
      syllabus_bn: course.syllabus ? course.syllabus.map(s => s.BN).join('\n') : ''
    });
    setIsEditing(true);
    setShowForm(true);
  };

  // ডিলিট কোর্স
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course completely?")) {
      await supabase.from('dynamic_courses').delete().eq('id', id);
      fetchCourses();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h3 className="font-bold text-slate-800 flex items-center"><BookOpen size={20} className="mr-2 text-blue-600"/> Manage Dynamic Courses</h3>
        <button 
          onClick={() => { setFormData(initialForm); setIsEditing(false); setShowForm(!showForm); }}
          className={`text-sm font-bold py-2 px-4 rounded-lg transition flex items-center space-x-2 ${showForm ? 'bg-slate-200 text-slate-700' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}`}
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          <span>{showForm ? 'Close Form' : 'Add New Course'}</span>
        </button>
      </div>

      {showForm && (
        <div className="p-8 border-b border-slate-200 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <label className="text-xs font-bold text-slate-600">Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-lg bg-white text-sm outline-none focus:border-blue-500">
                  <option value="Caregiving">Caregiving</option>
                  <option value="Healthcare & Beauty">Healthcare & Beauty</option>
                  <option value="Language Skills">Language Skills</option>
                  <option value="IT Skills">IT Skills</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600">Image URL (e.g. /course-img.jpg)</label>
                <input type="text" name="image" required value={formData.image} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-lg bg-white text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600">Duration (e.g. 3 Months)</label>
                <input type="text" name="duration" required value={formData.duration} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-lg bg-white text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600">Badge/Highlight (Optional)</label>
                <input type="text" name="badge" value={formData.badge} onChange={handleInputChange} placeholder="e.g. UK Pathway" className="w-full mt-1 p-2 border rounded-lg bg-white text-sm outline-none focus:border-blue-500" />
              </div>
            </div>

            {/* English Data */}
            <div className="space-y-4 bg-blue-50/30 p-4 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-800 text-sm border-b border-blue-100 pb-2">English Details</h4>
              <input type="text" name="title_en" required placeholder="Course Title (English)" value={formData.title_en} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm outline-none" />
              <textarea name="desc_en" required placeholder="Description (English)" value={formData.desc_en} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm h-20 outline-none"></textarea>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="eligibility_en" placeholder="Eligibility (EN)" value={formData.eligibility_en} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm outline-none" />
                <input type="text" name="career_en" placeholder="Career Opportunity (EN)" value={formData.career_en} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm outline-none" />
              </div>
            </div>

            {/* Bengali Data */}
            <div className="space-y-4 bg-emerald-50/30 p-4 rounded-xl border border-emerald-100">
              <h4 className="font-bold text-emerald-800 text-sm border-b border-emerald-100 pb-2">Bengali Details</h4>
              <input type="text" name="title_bn" required placeholder="Course Title (Bengali)" value={formData.title_bn} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm outline-none" />
              <textarea name="desc_bn" required placeholder="Description (Bengali)" value={formData.desc_bn} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm h-20 outline-none"></textarea>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="eligibility_bn" placeholder="Eligibility (BN)" value={formData.eligibility_bn} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm outline-none" />
                <input type="text" name="career_bn" placeholder="Career Opportunity (BN)" value={formData.career_bn} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm outline-none" />
              </div>
            </div>

            {/* Arrays (Tags, Audience, Syllabus) */}
            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-800 text-sm border-b border-slate-200 pb-2">Tags, Audience & Syllabus</h4>
              <div>
                <label className="text-xs font-bold text-slate-600">Tags (Comma separated - e.g. Free, NSDA Certified, High Demand)</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-lg bg-white text-sm outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600">Target Audience (EN) - 1 per line</label>
                  <textarea name="audience_en" value={formData.audience_en} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-lg bg-white text-sm h-24 outline-none" placeholder="Target 1&#10;Target 2"></textarea>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600">Target Audience (BN) - 1 per line</label>
                  <textarea name="audience_bn" value={formData.audience_bn} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-lg bg-white text-sm h-24 outline-none" placeholder="টার্গেট ১&#10;টার্গেট ২"></textarea>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600">Syllabus Modules (EN) - 1 per line</label>
                  <textarea name="syllabus_en" value={formData.syllabus_en} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-lg bg-white text-sm h-24 outline-none" placeholder="Module 1&#10;Module 2"></textarea>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600">Syllabus Modules (BN) - 1 per line</label>
                  <textarea name="syllabus_bn" value={formData.syllabus_bn} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-lg bg-white text-sm h-24 outline-none" placeholder="মডিউল ১&#10;মডিউল ২"></textarea>
                </div>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition">
              <Save size={18} /> <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Course' : 'Publish Course'}</span>
            </button>
          </form>
        </div>
      )}

      {/* Course List Table */}
      <div className="overflow-x-auto p-4">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-xs">
            <tr>
              <th className="p-4">Course Details</th>
              <th className="p-4">Category / Duration</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="3" className="p-8 text-center">Loading...</td></tr> : 
             courses.length === 0 ? <tr><td colSpan="3" className="p-8 text-center">No dynamic courses found. Click 'Add New Course' to create one.</td></tr> :
             courses.map((course) => (
              <tr key={course.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-4">
                  <p className="font-bold text-slate-900">{course.title_en}</p>
                  <p className="text-xs text-slate-500">{course.title_bn}</p>
                </td>
                <td className="p-4">
                  <p className="font-semibold">{course.category}</p>
                  <p className="text-xs text-slate-500">{course.duration}</p>
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-3">
                    <button onClick={() => handleEdit(course)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(course.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}