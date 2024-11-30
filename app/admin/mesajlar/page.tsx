"use client"

import Loading from '@/app/components/Loading';
import { Messages } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {


  const [allMessages, setAllMessages] = useState<Messages[]>([])
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

  const getAllMessages = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("/api/messages")
      setAllMessages(response.data)
      setIsLoading(false)
    } catch (error) {
      toast.error(error as string);
    }
  }, [])
  useEffect(() => {
    getAllMessages()
  }, [isReadedHandle, getAllMessages])

  const handleIsReaded = async (id: string, isReadedType: boolean) => {
    if (isReadedType === false) {
      try {
        await axios.post("/api/messages/mark-as-read", { id }).then((res) => {
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
              <th className="text-left p-4 font-semibold text-gray-600 hidden md:table-cell">Telefon</th>
              <th className="text-center p-4 font-semibold text-gray-600">Durum</th>
            </tr>
          </thead>
          <tbody>
            {allMessages.map((messagesItem, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="md:hidden space-y-2">
                    <div className="font-semibold text-gray-800">{messagesItem.fullName}</div>
                    <div className="text-sm text-blue-600">{messagesItem.phoneNumber}</div>
                  </div>
                  <span className="hidden md:inline text-gray-800">{messagesItem.fullName}</span>
                </td>

                <td className="p-4 text-gray-800 hidden md:table-cell">{messagesItem.phoneNumber}</td>
                <td className="p-4 text-center">

                  <span className={`inline-block px-2 py-1 rounded-full text-sm ${messagesItem.isReaded
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800 cursor-pointer'
                    }`}
                    onClick={() => handleIsReaded(messagesItem.id, messagesItem.isReaded)}>
                    {messagesItem.isReaded ? 'Okundu' : 'Okunmadı'}
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