import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Brandings = () => {
    return (
        <div className='relative w-full my-12 bg-themeColorOne  rounded-3xl' id='markalar'>
            <div className='flex w-full  '>
                <Link href={"/prodekor"} className='w-1/4 h-96'>
                    <div className="w-full h-full group relative cursor-pointer overflow-hidden bg-white shadow-xl ring-1 ring-gray-900/5 transition-all hover:shadow-2xl duration-1000 ">
                        <span className="absolute duration-1000 bottom-10 left-10 z-10 bg-sky-500 w-36 h-12 flex items-center justify-center text-white">
                            PRODEKOR
                        </span>
                        <span className="absolute bottom-10 left-10 z-0 bg-sky-500 w-36 h-12 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:left-0 group-hover:bottom-0"></span>
                        <Image alt='' src={"/images/alci2.jpg"} width={1500} height={1500} className='object-cover h-full w-full object-center' />
                    </div>
                </Link>


                <Link href={"/prokast-masif-prekast"} className='w-1/4 h-96'>
                    <div className="w-full h-full  group relative cursor-pointer overflow-hidden bg-white shadow-xl ring-1 ring-gray-900/5 transition-all hover:shadow-2xl duration-1000 ">
                        <span className="absolute duration-1000 bottom-10 left-10 z-10 bg-sky-500 w-56 h-12 flex items-center justify-center text-white">
                            PROKAST Masif Prekast
                        </span>
                        <span className="absolute bottom-10 left-10 z-0 bg-sky-500 w-56 h-12 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:left-0 group-hover:bottom-0"></span>
                        <Image alt='' src={"/images/prokast.jpg"} width={1500} height={1500} className='object-cover h-full w-full object-center  ' />
                    </div>
                </Link>


                <Link href={"/prokast-hafifletilmis-prekast"} className='w-1/4 h-96'>
                    <div className="w-full h-full group relative cursor-pointer overflow-hidden bg-white shadow-xl ring-1 ring-gray-900/5 transition-all hover:shadow-2xl duration-1000 ">
                        <span className="absolute duration-1000 bottom-10 left-10 z-10 bg-sky-500 w-60 h-12 flex items-center justify-center text-white">
                            PROKAST Hafifletilmiş Prekast
                        </span>
                        <span className="absolute bottom-10 left-10 z-0 bg-sky-500 w-60 h-12 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:left-0 group-hover:bottom-0"></span>
                        <Image alt='' src={"/images/hafifletilmis.jpg"} width={1500} height={1500} className='object-cover h-full w-full object-center' />
                    </div>
                </Link>


                <Link href={"/propanel"} className='w-1/4 h-96'>
                    <div className="w-full h-full group relative cursor-pointer overflow-hidden bg-white shadow-xl ring-1 ring-gray-900/5 transition-all hover:shadow-2xl duration-1000 ">
                        <span className="absolute duration-1000 bottom-10 left-10 z-10 bg-sky-500 w-36 h-12 flex items-center justify-center text-white">
                            PROPANEL
                        </span>
                        <span className="absolute bottom-10 left-10 z-0 bg-sky-500 w-36 h-12 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:left-0 group-hover:bottom-0"></span>
                        <Image alt='' src={"/images/panel.jpg"} width={1500} height={1500} className='object-cover h-full w-full object-center ' />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Brandings