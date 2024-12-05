"use client"

import Loading from '@/app/components/Loading';
import ConfirmModal from '@/app/components/modals/ConfirmModal';
import { Brandings } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { BsTrash2 } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const page = () => {

  const [allBrandings, setAllBrandings] = useState<Brandings[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(1);

  const [selectedBranding, setSelectedBranding] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isImageUpdateModalOpen, setIsImageUpdateModalOpen] = useState(false)


  const handleDeleteBrand = useCallback(async (id: string) => {
    setIsProcessing(true);
    try {
      const response = await axios.post(`/api/brandings/delete`, { id: id })
      toast.success("Marka silindi")
      if (response.status === 200) {
        setIsDeleting(prev => prev + 1);
      }
      handleCloseModal();
    } catch (error) {
      toast.error('İşlem sırasında bir hata oluştu.')
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const getAllBrandings = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("/api/brandings/all-brandings");
      setAllBrandings(response.data);
      if (response.status === 200) {
        setIsLoading(false)
      }
    } catch (error) {
      toast(error as string);
    }
  }, []);
  useEffect(() => {
    getAllBrandings()
  }, [getAllBrandings, isDeleting]);


  const handleOpenModal = (id: string) => {
    setIsModalOpen(true);
    setSelectedBranding(id);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading === true) {
    return <Loading />
  }


  return (
    <div className=''>

      <div className="flex justify-between">
        <div className="">
          <p className='text-3xl font-bold'>Markalar</p>
          <span className=''>burada markaları yönetebilirsiniz</span>
        </div>
        <Link href="/admin/markalar/yeni-marka">
          <div className="flex items-center gap-x-3">
            <span className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer">
              yeni ekle <FaPlus />
            </span>
          </div>
        </Link>
      </div>


      <div className="divide-y mt-4 ">
        {allBrandings.map((brand) => (
          <div key={brand.id} style={{}} className="py-3 flex items-center justify-between hover:bg-gray-50">
            <div className='flex items-center'>
              <div style={{ backgroundColor: brand.color }} className="h-5 w-5 mr-2"></div>
              <span className="uppercase">{brand.name}</span>
            </div>
            <div className="flex gap-3">
              <button
                className="p-1 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100"
                title="Düzenle"
              >
                <Link href={`/admin/markalar/${brand.id}`}><BiPencil size={18} /></Link>
              </button>

              <button
                onClick={() => handleOpenModal(brand.id)}
                className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100"
                title="Sil"
              >
                <BsTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>


      <ConfirmModal
        isModalOpen={isModalOpen}
        isProcessing={isProcessing}
        handleConfirm={handleDeleteBrand}
        handleCloseModal={handleCloseModal}
        selectedBranding={selectedBranding}
      />


    </div >
  )
}

export default page