"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const BrandForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      color: '#3B82F6' // Varsayılan mavi renk
    }
  });

  const selectedColor = watch('color');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    try {
      const response = axios.post("/api/brandings/create", data)

      response.then((res) => {
        toast.success("Marka eklendi", {})
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