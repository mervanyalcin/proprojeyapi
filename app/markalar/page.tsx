"use client"

import React, { useCallback, useEffect, useState } from 'react'
import Container from '../components/Container'
import Link from 'next/link'
import Image from 'next/image'
import { Brandings } from '@prisma/client'
import axios from 'axios'
import { toast } from 'react-toastify'
import Heading from '../components/Heading'

const page = () => {

  const [brandings, setBrandings] = useState<Brandings[]>([])
  const [isLoading, setIsLoading] = useState(true);

  const getAllBrandings = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("/api/brandings/all-brandings")
      setBrandings(response.data)
      setIsLoading(false)
    } catch (error) {
      toast.error(error as string)
    }
  }, [])
  useEffect(() => {
    getAllBrandings()
  }, [])


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
    <Container>
      <div className="h-screen flex justify-center items-center ">
        <div className='relative w-full bg-themeColorOne rounded-3xl my-12 overflow-hidden py-20 px-20' id='markalar'>

          <Heading text='Markalarımız' />

          <div className='flex w-full space-x-4 '>
            {
              brandings.map((brandingsItem, index) => (
                <Link href={`/markalar/${brandingsItem.url}`} className='w-1/4 h-96' key={index}>
                  <div className="w-full h-full group relative cursor-pointer overflow-hidden bg-white shadow-xl ring-1 ring-gray-900/5 transition-all hover:shadow-2xl duration-1000 ">
                    <span className={`absolute bottom-10 left-10 z-10 w-36 h-12 flex items-center justify-center capitalize duration-1000 text-white`}>
                      {brandingsItem.name}
                    </span>
                    <span style={{ backgroundColor: brandingsItem.color }} className="absolute bottom-10 left-10 z-0 w-36 h-12 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:left-0 group-hover:bottom-0 "></span>
                    <Image alt='' src={`${brandingsItem.imageURL}`} width={1500} height={1500} className='object-cover h-full w-full object-center' />
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </Container>
  )
}

export default page