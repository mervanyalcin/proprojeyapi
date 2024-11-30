"use client"

import { FileType } from '@/app/types'
import { Brandings } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ConfirmationModal } from './ConfimationModal'

interface IUpdateBrandImageProps {
    id: string,
    isOpen: boolean,
    title: string,
    message: string,
    onClose: () => void;
    onConfirm: () => void;
}

const UpdateBrandImage = ({ id, isOpen, message, onClose, onConfirm, title }: IUpdateBrandImageProps) => {

    const [currentBrand, setCurrentBrand] = useState<Brandings>();
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [files, setFiles] = useState<FileType[]>([]);


    const [fileToDelete, setFileToDelete] = useState<FileType | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const urls = Array.from(files).map(file => URL.createObjectURL(file))
            setPreviewUrls(urls)
        }
    }

    const getCurrentBrand = useCallback(async () => {
        try {
            await axios.post("/api/brandings/current-branding", { id: id }).then((response) => {
                setCurrentBrand(response.data)
            }).then(async () => {

                try {
                    setIsLoading(true);
                    const response = await axios.get('/api/files', {
                        params: { url: currentBrand?.imageURL }
                    });
                    setFiles(response.data.files);
                } catch (error) {
                    console.error('Error fetching files:', error);
                    alert('Dosyalar yüklenirken hata oluştu!');
                } finally {
                    setIsLoading(false);
                }

            })
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
                // await fetchFiles();
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Dosya silme hatası!');
        } finally {
            setFileToDelete(null);
            setShowDeleteConfirm(false);
        }
    };


    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>

            <div className="flex flex-col bg-white p-6 rounded-lg  max-w-sm w-full mx-4">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{message}</p>
                <div className=' '>
                    <label htmlFor="images" className="block text-sm font-bold">
                        Proje Görselleri
                    </label>
                    <input
                        id="images"
                        type="file"
                        accept="image/*"
                        name='images'
                        onChange={handleImageChange}
                        className="mt-1 block w-full"
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

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 rounded hover:bg-gray-100"
                    >
                        İptal
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Onayla
                    </button>
                </div>
            </div>

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

export default UpdateBrandImage