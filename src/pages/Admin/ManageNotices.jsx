import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { Newspaper, UploadCloud, Trash2, Edit2, X, Loader2, Plus, Save } from 'lucide-react';

export default function ManageNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // Form Toggles & Edit State
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  
  const initialForm = {
    type_en: 'Notice', type_bn: 'নোটিশ',
    title_en: '', title_bn: '',
    desc_en: '', desc_bn: ''
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchNotices = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('notices').select('*').order('created_at', { ascending: false });
    if (data && !error) setNotices(data);
    setLoading(false);
  };

  useEffect(() => { fetchNotices(); }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      let publicImageUrl = preview; // আগের ছবি থাকলে সেটাই ডিফল্ট

      // নতুন ছবি সিলেক্ট করা হলে স্টোরেজে আপলোড করবে
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `notice-${Date.now()}-${fileName}`;
        
        const { error: uploadError } = await supabase.storage.from('notices').upload(filePath, file);
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage.from('notices').getPublicUrl(filePath);
        publicImageUrl = data.publicUrl;
      }

      const noticeData = {
        ...formData,
        image_url: publicImageUrl && !publicImageUrl.startsWith('blob:') ? publicImageUrl : null 
        // blob URL সেভ হওয়া আটকাতে এই চেক
      };

      if (isEditing) {
        const { error: dbError } = await supabase.from('notices').update(noticeData).eq('id', editId);
        if (dbError) throw dbError;
        alert('Notice updated successfully!');
      } else {
        const { error: dbError } = await supabase.from('notices').insert([noticeData]);
        if (dbError) throw dbError;
        alert('Notice added successfully!');
      }
      
      resetForm();
      fetchNotices();
      
    } catch (error) {
      console.error(error);
      alert('Error saving notice.');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (notice) => {
    setFormData({
      type_en: notice.type_en || 'Notice', type_bn: notice.type_bn || 'নোটিশ',
      title_en: notice.title_en || '', title_bn: notice.title_bn || '',
      desc_en: notice.desc_en || '', desc_bn: notice.desc_bn || ''
    });
    setPreview(notice.image_url || null);
    setFile(null);
    setIsEditing(true);
    setEditId(notice.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      await supabase.from('notices').delete().eq('id', id);
      fetchNotices();
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
    setFormData(initialForm);
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 flex items-center">
          <Newspaper size={20} className="mr-2 text-blue-600"/> Notice Board
        </h3>
        <button 
          onClick={() => showForm ? resetForm() : setShowForm(true)} 
          className={`text-sm font-bold py-2 px-4 rounded-lg transition flex items-center space-x-2 ${showForm ? 'bg-slate-200 text-slate-700' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}`}
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          <span>{showForm ? 'Cancel' : 'Add Notice'}</span>
        </button>
      </div>

      {showForm && (
        <div className="p-6 border-b border-slate-200 bg-blue-50/30">
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Type (EN)</label>
                <select value={formData.type_en} onChange={e => setFormData({...formData, type_en: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 bg-white">
                  <option value="Notice">Notice</option>
                  <option value="Event">Event</option>
                  <option value="Update">Update</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Type (BN)</label>
                <select value={formData.type_bn} onChange={e => setFormData({...formData, type_bn: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 bg-white">
                  <option value="নোটিশ">নোটিশ</option>
                  <option value="ইভেন্ট">ইভেন্ট</option>
                  <option value="আপডেট">আপডেট</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Title (EN)</label>
                <input required type="text" value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Title (BN)</label>
                <input required type="text" value={formData.title_bn} onChange={e => setFormData({...formData, title_bn: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Description (EN)</label>
                <textarea required rows="3" value={formData.desc_en} onChange={e => setFormData({...formData, desc_en: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Description (BN)</label>
                <textarea required rows="3" value={formData.desc_bn} onChange={e => setFormData({...formData, desc_bn: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
              </div>
            </div>

            {/* Image Upload Area */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Notice Banner / Image (Optional)</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center bg-white relative hover:border-blue-500 transition-colors h-40 flex flex-col items-center justify-center">
                {preview ? (
                  <div className="relative h-full flex items-center justify-center">
                    <img src={preview} alt="Preview" className="h-full object-contain rounded-lg" />
                    <button type="button" onClick={() => { setFile(null); setPreview(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md"><X size={14}/></button>
                  </div>
                ) : (
                  <div className="py-2">
                    <UploadCloud size={28} className="mx-auto text-slate-400 mb-2"/>
                    <p className="text-xs font-bold text-slate-500">Click to browse image</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
            </div>

            <button type="submit" disabled={uploading} className="w-full bg-slate-900 hover:bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center transition disabled:opacity-50 mt-4">
              {uploading ? <Loader2 size={18} className="animate-spin mr-2" /> : <Save size={18} className="mr-2" />}
              {uploading ? 'Saving...' : isEditing ? 'Update Notice' : 'Publish Notice'}
            </button>
          </form>
        </div>
      )}

      <div className="p-6">
        {loading ? (
          <div className="flex justify-center p-10"><Loader2 size={32} className="animate-spin text-blue-500" /></div>
        ) : notices.length === 0 ? (
          <div className="text-center p-10 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-medium">
            No notices found. Add one!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notices.map((notice) => (
              <div key={notice.id} className="border border-slate-200 rounded-xl p-4 flex gap-4 hover:shadow-sm transition bg-white">
                {notice.image_url ? (
                  <img src={notice.image_url} alt="Notice" className="w-20 h-20 object-cover rounded-lg bg-slate-100" />
                ) : (
                  <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400"><Newspaper size={24}/></div>
                )}
                <div className="flex-1">
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase">{notice.type_en}</span>
                  <h4 className="font-bold text-slate-800 text-sm mt-1 line-clamp-2">{notice.title_en}</h4>
                  <p className="text-xs text-slate-500 mt-1">{new Date(notice.created_at).toLocaleDateString()}</p>
                </div>
                
                {/* Actions: Edit and Delete */}
                <div className="flex flex-col items-center space-y-2">
                  <button onClick={() => handleEdit(notice)} className="text-blue-500 hover:text-blue-700 p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(notice.id)} className="text-red-500 hover:text-red-700 p-2 bg-red-50 hover:bg-red-100 rounded-lg transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}