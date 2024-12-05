"use client"

import React, { use, useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Brandings } from '@prisma/client';
import Image from 'next/image';
import { convertToLatinSlug } from '@/utils/functions';
import Loading from '@/app/components/Loading';
import { FileType } from '@/app/types';
import { ConfirmationModal } from '@/app/components/modals/ConfimationModal';

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [currentBrand, setCurrentBrand] = useState<Brandings>();
  const [isLoading, setIsLoading] = useState(true);


  const [files, setFiles] = useState<FileType[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileToDelete, setFileToDelete] = useState<FileType | null>(null);
  const [showUploadConfirm, setShowUploadConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const { id } = use(params);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentBrand?.name,
      color: currentBrand?.color,
      id: currentBrand?.id,
    }
  });
  const selectedColor = watch('color');



  const getCurrentBrand = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.post("/api/brandings/current-branding", { id: id })
      if (response.data !== null) {
        setIsLoading(false)
      }
      setCurrentBrand(response.data)
    } catch (error) {
      toast.error("Sunucu hatası oluştu, Lütfen daha sonra tekrar deneyin", {
        position: "top-right",
        className: "text-md"
      });
    }
  }, [])
  useEffect(() => {
    getCurrentBrand()
  }, [getCurrentBrand])

  useEffect(() => {
    setValue("name", currentBrand?.name)
    setValue("color", currentBrand?.color)
    setValue("id", currentBrand?.id)

    console.log(currentBrand?.imageURL[0].split('.')[0] as string)
    setSearchTerm(currentBrand?.imageURL[0].split('.')[0] as string)
  }, [currentBrand])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const url = convertToLatinSlug(data.name)
      const newData = { ...data, imageURL: "imageUrls", url: url }
      const response = await axios.post("/api/brandings/update", newData)
      if (response.status === 200) {
        toast.success("Marka güncellendi", {})
        router.push("/admin/markalar")
      }
    } catch (error) {
      toast.error("Sunucu hatası oluştu, Lütfen daha sonra tekrar deneyin", {})
    }
  };

  const fetchFiles = async (search?: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/files', {
        params: { search: search }
      });
      setFiles(response.data.files);
    } catch (error) {
      console.error('Error fetching files:', error);
      alert('Dosyalar yüklenirken hata oluştu!');
    } finally {
      setIsLoading(false);
    }
  };

  // Sayfa yüklendiğinde ve arama terimi değiştiğinde dosyaları getir
  useEffect(() => {
    fetchFiles(searchTerm);
  }, [searchTerm]);

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
        await fetchFiles(searchTerm);
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

  const handleDelete = async () => {
    if (!fileToDelete) return;

    try {
      const response = await axios.delete('/api/files', {
        data: { filePath: fileToDelete.path }
      });

      if (response.data.success) {
        await fetchFiles(searchTerm);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Dosya silme hatası!');
    } finally {
      setFileToDelete(null);
      setShowDeleteConfirm(false);
    }
  };


  if (isLoading === true) {
    return <Loading />
  }

  return (
    <div className='max-w-md'>
      <div className="flex justify-between">
        <div className="">
          <p className='text-3xl font-bold'>Markayı Düzenle</p>
          <span className='text-gray-600'>burada ilgili markayı düzenleyebilirsiniz</span>
        </div>
      </div>


      <form onSubmit={handleSubmit(onSubmit)} className="space-y- mt-8 flex flex-col gap-y-4">
        {/* Marka Adı */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm text-gray-700 font-bold"
          >
            Marka Adı
          </label>
          <input
            type="text"
            id="name"
            {...register('name', {
              required: 'Marka adı gereklidir',
              minLength: {
                value: 2,
                message: 'Marka adı en az 2 karakter olmalıdır'
              }
            })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${errors.name
              ? 'border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
              }`}
            placeholder="Marka adını giriniz"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message as string}
            </p>
          )}
        </div>

        <div className="mb-6 space-y-4">
          {/* Dosya Yükleme */}
          <div>
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
        </div>

        {/* Yükleme durumu */}
        {isLoading ? (
          <div className="p-4 text-center">Dosyalar yükleniyor...</div>
        ) : files.length === 0 ? (
          <p className="text-gray-500 text-center">
            {searchTerm
              ? 'Aramanızla eşleşen fotoğraf bulunamadı.'
              : 'Henüz yüklenmiş fotoğraf bulunmuyor.'}
          </p>
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
                  onClick={() => {
                    setFileToDelete(file);
                    setShowDeleteConfirm(true);
                  }}
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


        {/* Renk Seçici */}
        <div className="space-y-2">
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700"
          >
            Marka Rengi
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              id="color"
              {...register('color', {
                required: 'Marka rengi gereklidir'
              })}
              className="h-10 w-20 rounded cursor-pointer"
            />
            <span className="text-sm text-gray-500">
              Seçilen Renk: {selectedColor}
            </span>
          </div>
          {/* Renk Önizleme */}
          <div className="mt-3 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">Önizleme:</div>
            <div
              className="h-20 rounded-lg"
              style={{ backgroundColor: selectedColor }}
            />
          </div>
        </div>

        {/* Submit Butonu */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          Markayı Güncelle
        </button>
      </form>

      {/* Onay Modalları */}
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
  )
}

export default page