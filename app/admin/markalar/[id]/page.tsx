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

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [currentBrand, setCurrentBrand] = useState<Brandings>();
  const [isLoading, setIsLoading] = useState(true);
  const [previewUrls, setPreviewUrls] = useState<string[]>([])


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
      images: currentBrand?.imageURL,
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
  }, [currentBrand])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
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
      const newData = { ...data, imageURL: imageUrls, url: url }
      const response = await axios.post("/api/brandings/update", newData)
      if (response.status === 200) {
        toast.success("Marka güncellendi", {})
        router.push("/admin/markalar")
      }
    } catch (error) {
      toast.error("Sunucu hatası oluştu, Lütfen daha sonra tekrar deneyin", {})
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

        <div>
          <label htmlFor="images" className="block text-sm font-bold">
            Proje Görselleri
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

        {
          previewUrls.length === 0 && (
            <div className="w-40 h-40 overflow-hidden">
              <Image
                src={currentBrand?.imageURL[0] as string}
                alt={`Preview`}
                width={500}
                height={500}
                className="object-cover rounded-md w-full h-full"
              />
            </div>
          )
        }

        {/* Resim önizleme */}
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


    </div>
  )
}

export default page