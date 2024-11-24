"use client"

import React, { use, useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Brandings } from '@prisma/client';

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [currentBrand, setCurrentBrand] = useState<Brandings>();
  const [isLoading, setIsLoading] = useState(true);


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
      id: currentBrand?.id
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
  }, [currentBrand])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    try {
      const response = axios.post("/api/brandings/update", data)
      response.then((res) => {
        toast.success("Marka güncellendi", {})
      }).then(() => {
        router.push("/admin/markalar")
      })
    } catch (error) {
      toast.error("Sunucu hatası oluştu, Lütfen daha sonra tekrar deneyin", {})
    }
  };


  if (isLoading === true) {
    return (
      <div className="h-full items-center justify-center flex">
        <div role="status">
          <svg aria-hidden="true" className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-md'>
      <div className="flex justify-between">
        <div className="">
          <p className='text-3xl font-bold'>Markayı Düzenle</p>
          <span className='text-gray-600'>burada ilgili markayı düzenleyebilirsiniz</span>
        </div>
      </div>


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