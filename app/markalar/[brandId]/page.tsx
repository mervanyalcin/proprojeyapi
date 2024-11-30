"use client"

import React, { use, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { FaPlus } from 'react-icons/fa'
import Link from 'next/link'
import Container from '@/app/components/Container'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ProjectWBranding } from '@/app/types'

const page = ({ params }: { params: Promise<{ brandId: string }> }) => {


  const [allProjects, setAllProjects] = useState<ProjectWBranding[]>([])
  const { brandId } = use(params);
  const getAllBrandings = useCallback(async () => {

    try {
      const response = await axios.post("/api/projects/by-brandings", { brandId })
      setAllProjects(response.data)
    } catch (error) {
      toast.error(error as string)
    }
  }, [])

  useEffect(() => {
    getAllBrandings()
  }, [getAllBrandings])




  return (
    <div className="">
      <div className="bg-themeColorOne py-20 text-themeColorThird text-5xl font-bold text-center mt-8 capitalize"> {brandId} </div>
      <Container>
        <div className="min-h-screen py-10">
          <div className="grid grid-cols-3 h-auto gap-x-4 gap-y-10 mt-8">


            {
              allProjects?.map((projectItem, index) => (
                <Link href={`${projectItem.Brandings.url}/${projectItem.id}`} key={index}>
                  <div className="min-h-[300px] w-full relative group cursor-pointer flex items-center justify-center flex-col">
                    <div className='w-full h-80 bg-red-500 overflow-hidden'>
                      <Image alt='' src={`${projectItem.photoLinks[0]}`} fill className='object-cover' />
                    </div>
                    <div className="absolute top-0 left-0 bg-themeColorSec w-full h-full opacity-0 group-hover:opacity-40 transition-all  "></div>
                    <div className="text-white absolute group-hover:opacity-100 opacity-0 flex items-center justify-center h-full w-full top-0 left-0 ">
                      <FaPlus size={48} className='transition-all -mb-20 group-hover:mb-0 duration-500 hover:scale-125' />
                    </div>
                    <p className=' font-bold bg-themeColorOne w-full p-2.5 text-themeColorThird uppercase z-10'> {projectItem.name}  </p>
                  </div>
                </Link>
              ))
            }





          </div>

        </div>
      </Container>
    </div>
  )
}

export default page