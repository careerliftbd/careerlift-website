import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { Plus, Edit2, Trash2, Save, X, FileText } from 'lucide-react';

export default function ManageNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const initialForm = {
    id: null,
    type_en: 'Notice', type_bn: 'নোটিশ',
    title_en: '', title_bn: '',
    desc_en: '', desc_bn: '',
    content_en: '', content_bn: '',
    image_url: '',
    time: '', location: ''
  };
  
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNotices = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('notices').select('*').order('created_at', { ascending: false });
    if (data) setNotices(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (e) => {
    const types = {
      'Notice': 'নোটিশ',
      'Event': 'ইভেন্ট',
      'Update': 'আপডেট',
      'Result': 'ফলাফল'
    };
    setFormData({ 
      ...formData, 
      type_en: e.target.value, 
      type_bn: types[e.target.value] 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const noticeData = {
      type_en: formData.type_en, type_bn: formData.type_bn,
      title_en: formData.title_en, title_bn: formData.title_bn,
      desc_en: formData.desc_en, desc_bn: formData.desc_bn,
      content_en: formData.content_en, content_bn: formData.content_bn,
      image_url: formData.image_url || null,
      time: formData.time || null, location: formData.location || null
    };

    try {
      if (isEditing) {
        await supabase.from('notices').update(noticeData).eq('id', formData.id);
        alert('Notice updated successfully!');
      } else {
        await supabase.from('notices').insert([noticeData]);
        alert('Notice published successfully!');
      }
      
      setFormData(initialForm);
      setShowForm(false);
      setIsEditing(false);
      fetchNotices();
    } catch (error) {
      alert('Error saving notice.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (notice) => {
    setFormData({
      id: notice.id,
      type_en: notice.type_en, type_bn: notice.type_bn,
      title_en: notice.title_en, title_bn: notice.title_bn,
      desc_en: notice.desc_en, desc_bn: notice.desc_bn,
      content_en: notice.content_en || '', content_bn: notice.content_bn || '',
      image_url: notice.image_url || '',
      time: notice.time || '', location: notice.location || ''
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      await supabase.from('notices').delete().eq('id', id);
      fetchNotices();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h3 className="font-bold text-slate-800 flex items-center"><FileText size={20} className="mr-2 text-blue-600"/> Manage Notices</h3>
        <button 
          onClick={() => { setFormData(initialForm); setIsEditing(false); setShowForm(!showForm); }}
          className={`text-sm font-bold py-2 px-4 rounded-lg transition flex items-center space-x-2 ${showForm ? 'bg-slate-200 text-slate-700' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}`}
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          <span>{showForm ? 'Close Form' : 'Publish New Notice'}</span>
        </button>
      </div>

      {showForm && (
        <div className="p-8 border-b border-slate-200 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <label className="text-xs font-bold text-slate-600">Notice Type</label>
                <select name="type_en" value={formData.type_en} onChange={handleTypeChange} className="w-full mt-1 p-2 border rounded-lg bg-white text-sm outline-none focus:border-blue-500">
                  <option value="Notice">Notice</option>
                  <option value="Event">Event</option>
                  <option value="Update">Update</option>
                  <option value="Result">Result</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600">Image URL (Optional)</label>
                <input type="text" name="image_url" value={formData.image_url} onChange={handleInputChange} placeholder="e.g. https://.../image.jpg" className="w-full mt-1 p-2 border rounded-lg bg-white text-sm outline-none focus:border-blue-500" />
              </div>
              
              {formData.type_en === 'Event' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-600">Event Time (Optional)</label>
                    <input type="text" name="time" value={formData.time} onChange={handleInputChange} placeholder="e.g. 10:00 AM - 4:00 PM" className="w-full mt-1 p-2 border rounded-lg bg-white text-sm outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600">Event Location (Optional)</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Main Campus" className="w-full mt-1 p-2 border rounded-lg bg-white text-sm outline-none focus:border-blue-500" />
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4 bg-blue-50/30 p-4 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-800 text-sm border-b border-blue-100 pb-2">English Details</h4>
              <input type="text" name="title_en" required placeholder="Notice Title (English)" value={formData.title_en} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm outline-none" />
              <textarea name="desc_en" required placeholder="Short Description (For Card Preview)" value={formData.desc_en} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm h-16 outline-none"></textarea>
              <textarea name="content_en" required placeholder="Full Notice Content (Detailed)" value={formData.content_en} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm h-32 outline-none"></textarea>
            </div>

            <div className="space-y-4 bg-emerald-50/30 p-4 rounded-xl border border-emerald-100">
              <h4 className="font-bold text-emerald-800 text-sm border-b border-emerald-100 pb-2">Bengali Details</h4>
              <input type="text" name="title_bn" required placeholder="Notice Title (Bengali)" value={formData.title_bn} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm outline-none" />
              <textarea name="desc_bn" required placeholder="Short Description (Bengali)" value={formData.desc_bn} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm h-16 outline-none"></textarea>
              <textarea name="content_bn" required placeholder="Full Notice Content (Bengali)" value={formData.content_bn} onChange={handleInputChange} className="w-full p-2 border rounded-lg text-sm h-32 outline-none"></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition">
              <Save size={18} /> <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Notice' : 'Publish Notice'}</span>
            </button>
          </form>
        </div>
      )}

      {/* Notices Table */}
      <div className="overflow-x-auto p-4">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-xs">
            <tr>
              <th className="p-4">Notice Title</th>
              <th className="p-4">Type</th>
              <th className="p-4">Published Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="4" className="p-8 text-center">Loading...</td></tr> : 
             notices.length === 0 ? <tr><td colSpan="4" className="p-8 text-center">No notices found.</td></tr> :
             notices.map((notice) => (
              <tr key={notice.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-4">
                  <p className="font-bold text-slate-900">{notice.title_en}</p>
                </td>
                <td className="p-4">
                  <span className="font-semibold bg-slate-100 px-2 py-1 rounded text-xs">{notice.type_en}</span>
                </td>
                <td className="p-4 text-xs font-medium">
                  {new Date(notice.created_at).toLocaleDateString()}
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-3">
                    <button onClick={() => handleEdit(notice)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(notice.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"><Trash2 size={18} /></button>
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