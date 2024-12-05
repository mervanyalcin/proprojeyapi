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
    const [color, setColor] = useState('#3B82F6');
    const [image, setImage] = useState<string | null>(null);
    const [order, setOrder] = useState(1)
    const [loading, setLoading] = useState(false);



    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !image) return;

        const url = convertToLatinSlug(name)


        setLoading(true);
        try {
            await axios.post('/api/brands', {
                name,
                image,
                url,
                color,
                order
            });

            // Başarılı kayıttan sonra formu temizle
            setName('');
            setImage(null);
            setColor("#3B82F6")
            setOrder(1)
            toast.success('Marka başarıyla kaydedildi!');
            router.push("/admin/markalar")
        } catch (error) {
            console.error(error);
            alert('Bir hata oluştu!');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Yeni Marka Ekle
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Marka Adı */}
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Marka Adı
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                        placeholder="Marka adını giriniz" />
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-bold">
                        Marka fotoğrafı
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="mt-1 block w-full"
                        onChange={handleImageChange}
                        required
                    />

                    {image && (
                        <img
                            src={image}
                            alt="Preview"
                            className="mt-2 h-32 w-32 object-contain"
                        />
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="order" className="block text-sm font-medium text-gray-700">
                        Sırası
                    </label>
                    <input
                        type="text"
                        id="order"
                        value={order}
                        onChange={(e) => setOrder(Number(e.target.value))}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                        placeholder="Markanın listelenme sırası" />
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
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="h-10 w-20 rounded cursor-pointer"
                        />
                        <span className="text-sm text-gray-500">
                            Seçilen Renk: {color}
                        </span>
                    </div>


                    {/* Renk Önizleme */}
                    <div className="mt-3 p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-2">Önizleme:</div>
                        <div
                            className="h-20 rounded-lg"
                            style={{ backgroundColor: color }}
                        />
                    </div>
                </div>

                {/* Submit Butonu */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    Markayı Ekle
                </button>
            </form>
        </div>
    );
};

export default BrandForm;