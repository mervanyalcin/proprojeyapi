"use client"

import { Brandings } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Heading from '../Heading'

const PageBrandings = () => {
    const [brandings, setBrandings] = useState<Brandings[]>([])

    const getAllBrandings = useCallback(async () => {
        try {
            const response = await axios.get("/api/brandings/all-brandings")
            setBrandings(response.data)
        } catch (error) {
            toast.error(error as string)
        }
    }, [])
    useEffect(() => {
        getAllBrandings()
    }, [])


    return (
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
    )
}

export default PageBrandings