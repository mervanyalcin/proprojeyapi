"use client";

import { convertToLatinSlug } from '@/utils/functions';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const BrandForm = () => {
  const router = useRouter();
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      images: FileList,
      color: '#3B82F6'
    }
  });
  const selectedColor = watch('color');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const urls = Array.from(files).map(file => URL.createObjectURL(file))
      setPreviewUrls(urls)
    }
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      // Resimleri yükle
      const imageUrls = await Promise.all(
        Array.from(data.images).map(async (image) => {
          const formData = new FormData()
          formData.append('file', image as File)
          const response = await axios.post('/api/upload', formData)
          return response.data.url
        })
      )

      const url = convertToLatinSlug(data.name)
      const newData = { ...data, url: url, imageURL: imageUrls }
      const response = axios.post("/api/brandings/create", newData)
      response.then((res) => {
        toast.success("Markayı başarıyla eklediniz", {})
        reset()
        // setPreviewUrls([])
      }).then(() => {
        router.push("/admin/markalar")
      })
    } catch (error) {
      toast.error("Sunucu hatası oluştu, Lütfen daha sonra tekrar deneyin", {})
    }
  };

  return (
    <div className="max-w-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Yeni Marka Ekle
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Marka Adı */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
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

        <div>
          <label htmlFor="images" className="block text-sm font-bold">
            Marka fotoğrafı
          </label>
          <input
            id="images"
            type="file"
            accept="image/*"
            {...register("images", { required: true })}
            onChange={handleImageChange}
            className="mt-1 block w-full"
          />
          {errors.images && (
            <p className="text-red-500 mt-2">En az bir görsel yüklemelisiniz</p>
          )}
        </div>


        {/* Resim önizleme */}
        {previewUrls.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
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
          Markayı Ekle
        </button>
      </form>
    </div>
  );
};

export default BrandForm;