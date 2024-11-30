"use client"

import { User } from '@prisma/client'
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Container from '../components/Container';
import Link from 'next/link';
import { adminMenus } from '@/utils/menus';
import { signOut } from 'next-auth/react';
import Loading from '../components/Loading';


const layout = ({ children }: { children: React.ReactNode }) => {


  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = useCallback(async () => {
    setIsLoading(true)
    try {
      const user = await axios.get("/api/user");
      setCurrentUser(user.data)
      if (user.data === null) {
        window.location.href = "/giris-yap"
      }
      if (user.data !== null) {
        setIsLoading(false)
      }
    } catch (error) {
      toast.error("Sunucu hatası oluştu, Lütfen daha sonra tekrar deneyin", {
        position: "top-right",
        className: "text-md"
      });
    }
  }, []);

  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser, pathname]);

  const handleSignout = async () => {
    await signOut({
      callbackUrl: "https://proprojeyapi.com.tr/",
      redirect: true
    });
  };


 

  return (
    <Container>
      <div className='flex flex-col lg:flex lg:flex-row gap-x-4 mt-8 min-h-[462px] py-20 sm:flex-col md:flex-row md:text-sm'>

        <div className="w-full md:w-1/4 lg:w-1/5 lg:block bg-themeColorOne2 bg-white rounded-lg transition-all duration-500 pb-20  overflow-hidden mb-4 sm:mb-0">
          {
            adminMenus.map((item, index) => (
              <Link href={item.url} key={index} className='hover:text-blue-500'>
                <div className='w-full px-3 py-4 lg:border-b-2 cursor-pointer sm:border-none border-b-0'>
                  <p className='text-bold '>{item.title} </p>
                </div>
              </Link>
            ))
          }
          <div className='w-full px-3 py-4 lg:border-b-2 cursor-pointer sm:border-none border-b-0' onClick={() => handleSignout()}>
            <p className='text-bold '>Çıkış yap </p>
          </div>
        </div>

        <div className='w-full md:w-3/4 lg:w-3/4 py-8 px-4 bg-themeColorOne2 bg-white rounded-lg sm:w-full sm:px-8 '>
          {children}
        </div>
      </div>

    </Container>
  )
}

export default layout