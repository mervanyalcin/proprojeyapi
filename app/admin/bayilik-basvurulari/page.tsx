"use client"

import Loading from '@/app/components/Loading'
import { Dealer } from '@prisma/client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { BsTrash2 } from 'react-icons/bs'
import { toast } from 'react-toastify'

const page = () => {
  const [allDealerApply, setAllDealerApply] = useState<Dealer[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);
  const [isReadedHandle, setIsReadedHandle] = useState(1)
  const router = useRouter()



  const toggleAddress = (index: number) => {
    if (selectedAddressIndex === index) {
      setSelectedAddressIndex(null);
    } else {
      setSelectedAddressIndex(index);
    }
  };

  const getAllDealerApply = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("/api/dealer")
      setAllDealerApply(response.data)
      setIsLoading(false)
    } catch (error) {
      toast.error(error as string);
    }
  }, [])
  useEffect(() => {
    getAllDealerApply()
  }, [isReadedHandle, getAllDealerApply])

  const handleIsReaded = async (id: string, isReadedType: boolean) => {
    if (isReadedType === false) {
      try {
        await axios.post("/api/dealer/mark-as-read", { id }).then((res) => {
          if (res.status === 200) {
            toast.success("Okundu olarak işaretlendi")
          }
        })
        setIsReadedHandle(prev => prev + 1)
      } catch (error) {
        toast.error(error as string)
      }
    }
  }


  if (isLoading === true) {
    return <Loading />
  }

  return (
    <div>

      <div className="">
        <p className='text-3xl font-bold'>Bayilik Başvuruları</p>
        <span className=''>burada gelen bayilik başvurularını yönetebilirsiniz</span>
      </div>


      <div className="w-full shadow-sm rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-600">
                <span className="hidden md:inline">Ad Soyad</span>
                <span className="md:hidden">Kişi Bilgileri</span>
              </th>
              <th className="text-left p-4 font-semibold text-gray-600 hidden md:table-cell">Şirket</th>
              <th className="text-left p-4 font-semibold text-gray-600 hidden md:table-cell">Adres</th>
              <th className="text-left p-4 font-semibold text-gray-600 hidden md:table-cell">Telefon</th>
              <th className="text-left p-4 font-semibold text-gray-600 hidden md:table-cell">E-posta</th>
              <th className="text-center p-4 font-semibold text-gray-600">Durum</th>
            </tr>
          </thead>
          <tbody>
            {allDealerApply.map((dealerItem, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="md:hidden space-y-2">
                    <div className="font-semibold text-gray-800">{dealerItem.fullName}</div>
                    <div className="text-sm text-gray-600">{dealerItem.companyName}</div>
                    <div className="text-sm text-blue-600">{dealerItem.phoneNumber}</div>
                    <div className="text-sm text-blue-600">{dealerItem.email}</div>
                  </div>
                  <span className="hidden md:inline text-gray-800">{dealerItem.fullName}</span>
                </td>
                <td className="p-4 text-gray-800 hidden md:table-cell">{dealerItem.companyName}</td>
                <td className="p-4 text-gray-800 hidden md:table-cell relative group">
                  <button
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => toggleAddress(index)}
                  >
                    Adresi Göster
                    <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg left-0 top-full">
                      {dealerItem.address}
                    </div>
                  </button>
                  {/* {selectedAddressIndex === index && (
                    <div className="absolute z-20 w-64 p-3 mt-2 bg-white border rounded-lg shadow-lg left-0 top-full sm:hidden">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Adres Detayı</span>
                        <button
                          onClick={() => setSelectedAddressIndex(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-gray-600">{contact.address}</p>
                    </div>
                  )} */}
                </td>
                <td className="p-4 text-gray-800 hidden md:table-cell">{dealerItem.phoneNumber}</td>
                <td className="p-4 text-gray-800 hidden md:table-cell">{dealerItem.email}</td>
                <td className="p-4 text-center">

                  <span className={`inline-block px-2 py-1 rounded-full text-sm ${dealerItem.isReaded
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800 cursor-pointer'
                    }`}
                    onClick={() => handleIsReaded(dealerItem.id, dealerItem.isReaded)}>
                    {dealerItem.isReaded ? 'Okundu' : 'Okunmadı'}
                  </span>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  )
}

export default page