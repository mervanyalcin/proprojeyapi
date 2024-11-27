"use client"

import { useCallback, useEffect, useState } from 'react'
import Container from '../components/Container'
import Image from 'next/image'
import { FaPlus } from 'react-icons/fa'
import Link from 'next/link'
import { ProjectWBranding } from '../types'
import { usePathname } from 'next/navigation'
import { formatPathname } from '@/utils/functions'



const page = () => {


    const [allProjects, setAllProjects] = useState<ProjectWBranding[]>([])

    const params = usePathname()
 
    const getAllProjects = useCallback(async (id: string) => {
        try {


        } catch (error) {

        }
    }, [])

    useEffect(() => {
        getAllProjects("")
    }, [])




    return (
        <div className="">

            <div className="bg-themeColorOne py-20 text-themeColorThird text-5xl font-bold text-center mt-8"> {formatPathname(params as string)} </div>
            <Container>
                <div className="min-h-screen py-10">

                    <div className="grid grid-cols-3 h-auto gap-x-4 gap-y-10 mt-8">
                        <Link href={`/prodekor/${"ilgilimakam"}`}>
                            <div className="min-h-[300px] w-full relative group cursor-pointer flex items-center justify-center flex-col">
                                <Image alt='' src={"/images/alci2.jpg"} width={1500} height={1500} className='object-cover h-full w-full ' />
                                <div className="absolute top-0 left-0 bg-themeColorSec w-full h-full opacity-0 group-hover:opacity-40 transition-all  "></div>
                                <div className="text-white absolute group-hover:opacity-100 opacity-0 flex items-center justify-center h-full w-full top-0 left-0 ">
                                    <FaPlus size={48} className='transition-all -mb-20 group-hover:mb-0 duration-500 hover:scale-125' />
                                </div>
                                <p className=' font-bold bg-themeColorOne w-full p-2.5 text-themeColorThird'>Darkmen&Doss</p>
                            </div>
                        </Link>

                        <div className="min-h-[300px] w-full relative group cursor-pointer flex items-center justify-center flex-col">
                            <Image alt='' src={"/images/alci2.jpg"} width={1500} height={1500} className='object-cover h-full w-full ' />
                            <div className="absolute top-0 left-0 bg-themeColorSec w-full h-full opacity-0 group-hover:opacity-40 transition-all  "></div>
                            <div className="text-white absolute group-hover:opacity-100 opacity-0 flex items-center justify-center h-full w-full top-0 left-0 ">
                                <FaPlus size={48} className='transition-all -mb-20 group-hover:mb-0 duration-500 hover:scale-125' />
                            </div>
                            <p className=' font-bold bg-themeColorOne w-full p-2.5 text-themeColorThird'>Darkmen&Doss</p>
                        </div>

                        <div className="min-h-[300px] w-full relative group cursor-pointer flex items-center justify-center flex-col">
                            <Image alt='' src={"/images/alci2.jpg"} width={1500} height={1500} className='object-cover h-full w-full ' />
                            <div className="absolute top-0 left-0 bg-themeColorSec w-full h-full opacity-0 group-hover:opacity-40 transition-all  "></div>
                            <div className="text-white absolute group-hover:opacity-100 opacity-0 flex items-center justify-center h-full w-full top-0 left-0 ">
                                <FaPlus size={48} className='transition-all -mb-20 group-hover:mb-0 duration-500 hover:scale-125' />
                            </div>
                            <p className=' font-bold bg-themeColorOne w-full p-2.5 text-themeColorThird'>Darkmen&Doss</p>
                        </div>



                    </div>

                </div>
            </Container>
        </div>
    )
}

export default page