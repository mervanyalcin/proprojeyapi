"use client"

// pages/brands/edit/[id].tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { convertToLatinSlug } from '@/utils/functions';

export default function EditBrandPage() {
  const [name, setName] = useState('');
  const [order, setOrder] = useState(1)
  const [color, setColor] = useState('#3B82F6');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // URL'den ID'yi al
    const id = window.location.pathname.split('/').pop();

    // Marka bilgilerini yükle
    const fetchBrand = async () => {
      try {
        const response = await axios.get(`/api/brands/${id}`);
        setName(response.data.name);
        setImage(response.data.imageURL);
        setOrder(response.data.orderNumber)
        setColor(response.data.color)
      } catch (error) {
        console.error('Marka yüklenirken hata oluştu:', error);
        toast.error('Marka bilgileri yüklenemedi!');
      }
    };

    if (id) {
      fetchBrand();
    }
  }, []);



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

    const id = window.location.pathname.split('/').pop();
    setLoading(true);

    const url = convertToLatinSlug(name)

    try {
      await axios.put(`/api/brands/${id}`, {
        name,
        image,
        order,
        color,
        url
      });

      toast.success('Marka başarıyla güncellendi!');
      window.location.href = '/admin/markalar';
    } catch (error) {
      console.error(error);
      toast.error('Güncelleme sırasında bir hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Marka Düzenle</h1>

      <form onSubmit={handleSubmit} className="max-w-md flex flex-col gap-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Marka Adı
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Marka Logosu
          </label>
          <div className="mt-2">
            {image && (
              <img
                src={`${image}`}
                alt="Current logo"
                className="mb-2 h-32 w-32 object-contain"
              />
            )}
          </div>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className=" block w-full"
          />
          <p className=" text-sm text-gray-500">
            Yeni bir logo yüklemek istemiyorsanız boş bırakabilirsiniz.
          </p>
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

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? 'Güncelleniyor...' : 'Güncelle'}
          </button>

          <button
            type="button"
            onClick={() => window.location.href = '/admin/markalar'}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
}