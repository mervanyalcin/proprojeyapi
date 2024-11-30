"use client"

import Loading from '@/app/components/Loading';
import { CityWCounty } from '@/app/types';
import { Brandings, County, Projects } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { use, useCallback, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const [cities, setCities] = useState<CityWCounty[]>([])
    const [counties, setCounties] = useState<County[]>([])
    const [brandings, setBrandings] = useState<Brandings[]>([])
    const [currentProject, setCurrentProject] = useState<Projects>()
    const [isSubmited, setIsSubmited] = useState(1)
    cities.sort((a, b) => a.name.localeCompare(b.name))
    counties.sort((a, b) => a.name.localeCompare(b.name))

    const [selectedCityId, setSelectedCityId] = useState("")
    const [selectedCountyId, setSelectedCountyId] = useState("")

    const { id } = use(params);
    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            images: FileList,
            brandingsId: ''
        }
    })

    const getCurrentProject = useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await axios.post("/api/projects/current", { id: id })
            if (response.data !== null) {
                setIsLoading(false)
            }
            setCurrentProject(response.data)
            reset({
                name: response.data.name,
                description: response.data.description,
                brandingsId: "673ebfe7b7dce1b327194dbb",
                images: response.data.photoLinks
            })
            setSelectedCityId(response.data.cityId)
            setSelectedCountyId(response.data.countyId)
            setPreviewUrls(response.data.photoLinks)
        } catch (error) {
            toast.error("Sunucu hatası oluştu, Lütfen daha sonra tekrar deneyin", {
                position: "top-right",
                className: "text-md"
            });
        }
    }, [])
    useEffect(() => {
        getCurrentProject()
    }, [getCurrentProject])

    const getBrandings = useCallback(async () => {
        try {
            const response = await axios.get('/api/brandings/all-brandings')
            setBrandings(response.data)
        } catch (error) {
            toast.error('Error:')
        }
    }, [])
    useEffect(() => {
        getBrandings()
    }, [getBrandings])

    const getCities = useCallback(async () => {
        try {
            const response = await axios.get('/api/city')
            setCities(response.data)
        } catch (error) {
            toast.error('Error:')
        }
    }, [])
    useEffect(() => {
        getCities()
    }, [getCities])

    const getCounties = useCallback(async () => {
        try {
            const response = await axios.get('/api/county')
            setCounties(response.data)
        } catch (error) {
            toast.error('Error:')
        }
    }, [])
    useEffect(() => {
        getCounties()
    }, [getCounties])

    useEffect(() => {
        if (selectedCityId !== "" && selectedCityId !== null && cities.length !== 0) {
            if (selectedCityId === "") {
                setSelectedCountyId("");
                setCounties([]);
                return;
            } else {
                const city = cities.find(c => c.id === selectedCityId);
                setCounties(city!.counties);
            }
        }
    }, [selectedCityId, cities]);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const urls = Array.from(files).map(file => URL.createObjectURL(file))
            setPreviewUrls(urls)
        }
    }

    const onSubmit = async (data: FieldValues) => {
        try {
            setIsLoading(true)
            setIsSubmited(prev => prev + 1)
            // Resimleri yükle
            const imageUrls = await Promise.all(
                Array.from(data.images).map(async (image) => {
                    const formData = new FormData()
                    formData.append('file', image as File)
                    const response = await axios.post('/api/upload', formData)
                    return response.data.url
                })
            )
            // Projeyi veritabanına kaydet
            const response = await axios.post('/api/projects/update', {
                name: data.name,
                description: data.description,
                images: imageUrls,
                cityId: selectedCityId,
                countyId: selectedCountyId,
                brandingsId: data.brandingsId
            })
            if (response.status === 200) {
                toast.info("Burada bir yönelndirme çalışacak")
            }
            toast.success('Proje başarıyla kaydedildi!')
        } catch (error) {
            toast.error('Bir hata oluştu!')
        } finally {
            setIsLoading(false)
        }
    }




    if (isLoading === true) {
        return <Loading />
    }
    return (
        <div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Proje Ekleme Formu
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="gap-y-4 flex flex-col">
                <div>
                    <label htmlFor="name" className="block text-sm font-bold">
                        Proje Adı
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder='Projenin adı'
                        {...register("name", { required: true })}
                        className="mt-1 block w-full rounded-md border p-2"
                    />
                    {errors.name && (
                        <p className="text-red-500 mt-2">Bu alan zorunludur</p>
                    )}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-bold">
                        Proje Açıklaması
                    </label>
                    <textarea
                        id="description"
                        placeholder='Projenin açıklaması'
                        {...register("description", { required: true })}
                        className="mt-1 block w-full rounded-md border p-2"
                        rows={4}
                    />
                    {errors.description && (
                        <p className="text-red-500 mt-2">Bu alan zorunludur</p>
                    )}
                </div>

                <div className="">
                    <label htmlFor="brand" className="block mb-2 text-sm font-bold">Markayı Seçiniz</label>
                    <select id="brandingsId" {...register("brandingsId", { required: true })} value={watch("brandingsId")} className=' capitalize border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5'>
                        <option value={""}>Markayı Seçiniz</option>
                        {
                            brandings.map((brand, index) =>
                                <option value={brand.id} key={brand.id}>{brand.name}</option>
                            )
                        }
                    </select>
                    {errors.brandingsId && (
                        <p className="text-red-500 mt-2">Bu alan zorunludur</p>
                    )}
                </div>

                <div className="">
                    <label htmlFor="city" className="block mb-2 text-sm font-bold">Şehir </label>
                    <select id="city"
                        value={selectedCityId}
                        onChange={e => setSelectedCityId(e.currentTarget.value)}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" >
                        <option value={""}>Şehir seçiniz</option>
                        {
                            cities.map((city, index) =>
                                <option value={city.id} key={city.id}>{city.name}</option>
                            )
                        }
                    </select>

                    {selectedCityId === "" && isSubmited !== 1 && (
                        <p className="text-red-500 mt-2">Bu alan zorunludur</p>
                    )}
                </div>

                <div className="">
                    <label htmlFor="county" className="block mb-2 text-sm font-bold">İlçe</label>
                    <select id="county" value={selectedCountyId} onChange={e => setSelectedCountyId(e.currentTarget.value)} className="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" >
                        <option value={"Şehir Seçiniz"}>İlçe seçiniz</option>
                        {
                            counties.map((county, index) =>
                                <option value={county.id} key={county.id}>{county.name}</option>
                            )}
                    </select>
                    {selectedCountyId === "" && isSubmited !== 1 && (
                        <p className="text-red-500 mt-2">Bu alan zorunludur</p>
                    )}
                </div>


                <div>
                    <label htmlFor="images" className="block text-sm font-bold">
                        Proje Görselleri
                    </label>
                    <input
                        id="images"
                        type="file"
                        multiple
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

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                    {isLoading ? 'Yükleniyor...' : 'Projeyi Güncelle'}
                </button>
            </form>

        </div>
    )
}

export default page