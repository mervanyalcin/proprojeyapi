// components/FileUploader.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { ConfirmationModal } from './modals/ConfimationModal';
import { FileType } from '../types';

export default function FileUploader() {
  const [files, setFiles] = useState<FileType[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileToDelete, setFileToDelete] = useState<FileType | null>(null);
  const [showUploadConfirm, setShowUploadConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Sayfa yüklendiğinde mevcut dosyaları getir
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/files');
      setFiles(response.data.files);
    } catch (error) {
      console.error('Error fetching files:', error);
      alert('Dosyalar yüklenirken hata oluştu!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setSelectedFile(e.target.files[0]);
    setShowUploadConfirm(true);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        // Dosya yüklendikten sonra listeyi güncelle
        await fetchFiles();
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Dosya yükleme hatası!');
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
      setShowUploadConfirm(false);
    }
  };

  const initiateDelete = (file: FileType) => {
    setFileToDelete(file);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!fileToDelete) return;

    try {
      const response = await axios.delete('/api/files', {
        data: { filePath: fileToDelete.path }
      });
      
      if (response.data.success) {
        // Dosya silindikten sonra listeyi güncelle
        await fetchFiles();
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Dosya silme hatası!');
    } finally {
      setFileToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  if (isLoading) {
    return <div className="p-4">Dosyalar yükleniyor...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Fotoğraf Yükle
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isUploading}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
        />
      </div>

      {files.length === 0 ? (
        <p className="text-gray-500">Henüz yüklenmiş fotoğraf bulunmuyor.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <div key={file.id} className="relative group border rounded-lg p-2">
              <Image
                src={file.path}
                alt={file.name}
                width={300}
                height={200}
                className="rounded-lg object-cover w-full h-48"
              />
              <button
                onClick={() => initiateDelete(file)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Sil
              </button>
              <p className="mt-2 text-sm text-gray-600">{file.name}</p>
              <p className="text-xs text-gray-400">
                {new Date(file.createdAt).toLocaleDateString('tr-TR')}
              </p>
            </div>
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={showUploadConfirm}
        onClose={() => setShowUploadConfirm(false)}
        onConfirm={handleUpload}
        title="Fotoğraf Yükleme Onayı"
        message="Bu fotoğrafı yüklemek istediğinize emin misiniz?"
      />

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Fotoğraf Silme Onayı"
        message="Bu fotoğrafı silmek istediğinize emin misiniz?"
      />
    </div>
  );
}