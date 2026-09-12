import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { Image as ImageIcon, UploadCloud, Trash2, X, Loader2 } from 'lucide-react';

export default function ManageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // ডাটাবেস থেকে ছবিগুলো আনা
  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
    if (data) setImages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ছবি সিলেক্ট করলে প্রিভিউ দেখানো
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // ছবি আপলোড ফাংশন
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select an image first.');
    
    setUploading(true);
    try {
      // 1. Storage এ আপলোড করা
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `careerlift-${Date.now()}-${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Public URL জেনারেট করা
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      // 3. Database এ URL সেভ করা
      const { error: dbError } = await supabase.from('gallery_images').insert([
        { image_url: publicUrl, file_path: filePath, caption: caption }
      ]);

      if (dbError) throw dbError;

      alert('Image uploaded successfully!');
      setFile(null);
      setPreview(null);
      setCaption('');
      fetchImages();
      
    } catch (error) {
      console.error(error);
      alert('Error uploading image.');
    } finally {
      setUploading(false);
    }
  };

  // ছবি ডিলিট ফাংশন (Storage + Database)
  const handleDelete = async (id, filePath) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      // Storage থেকে ডিলিট
      await supabase.storage.from('gallery').remove([filePath]);
      // Database থেকে ডিলিট
      await supabase.from('gallery_images').delete().eq('id', id);
      fetchImages();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center">
        <ImageIcon size={20} className="mr-2 text-blue-600"/> 
        <h3 className="font-bold text-slate-800">Gallery Management</h3>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-700 mb-4 flex items-center"><UploadCloud size={18} className="mr-2"/> Upload New Image</h4>
            
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center bg-white relative hover:border-blue-500 transition-colors">
                {preview ? (
                  <div className="relative">
                    <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                    <button type="button" onClick={() => { setFile(null); setPreview(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md"><X size={14}/></button>
                  </div>
                ) : (
                  <div className="py-6">
                    <UploadCloud size={32} className="mx-auto text-slate-400 mb-2"/>
                    <p className="text-xs font-bold text-slate-500">Click to browse image</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Caption / Title (Optional)</label>
                <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="e.g. Award Ceremony 2026" className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
              </div>

              <button type="submit" disabled={uploading || !file} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition disabled:opacity-50">
                {uploading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                <span>{uploading ? 'Uploading...' : 'Upload to Gallery'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Gallery Grid Section */}
        <div className="lg:col-span-2">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center">
            <ImageIcon size={18} className="mr-2 text-slate-400"/> Uploaded Images ({images.length})
          </h4>
          
          {loading ? (
            <div className="flex justify-center p-12"><Loader2 size={32} className="animate-spin text-blue-500" /></div>
          ) : images.length === 0 ? (
            <div className="text-center p-12 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-medium">
              No images in the gallery yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((img) => (
                <div key={img.id} className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-square bg-slate-100">
                  <img src={img.image_url} alt={img.caption || 'Gallery Image'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <p className="text-white text-xs font-bold truncate mb-2">{img.caption || 'No caption'}</p>
                    <button 
                      onClick={() => handleDelete(img.id, img.file_path)}
                      className="bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg flex items-center justify-center w-full transition"
                    >
                      <Trash2 size={12} className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}