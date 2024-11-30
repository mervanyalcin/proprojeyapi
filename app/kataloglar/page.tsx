import React from 'react'
import Container from '../components/Container'
import Image from 'next/image'
import Link from 'next/link'
import Heading from '../components/Heading'

const page = () => {
  return (
    <Container>

      <div className="flex items-center justify-center h-screen">
        <div className="py-20 bg-themeColorOne rounded-3xl w-full px-20">
          <div className="inline-flex justify-around w-full flex-col " id='kataloglar'>

 

            <Heading text='Kataloglarımız' />


            <div className="inline-flex justify-between w-full ">
              <Link href={"/catalogs/prodekor.pdf"} target="_blank" rel="noopener noreferrer" className="relative group h-[450px] block overflow-hidden cursor-pointer">
                <Image src={"/images/katalog_prodekor.jpg"} alt={"catalog.brand"} width={1000} height={1000} className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" />
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/70 to-transparent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/70 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black/70 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />

                <div className="absolute inset-0 p-4">
                  <div className="absolute top-2 left-2 w-12 h-12 border-l-2 border-t-2 border-white/0 group-hover:border-white/80 transition-all duration-500 group-hover:scale-110 origin-top-left" />
                  <div className="absolute top-2 right-2 w-12 h-12 border-r-2 border-t-2 border-white/0 group-hover:border-white/80 transition-all duration-500 group-hover:scale-110 origin-top-right" />
                  <div className="absolute bottom-2 left-2 w-12 h-12 border-l-2 border-b-2 border-white/0 group-hover:border-white/80 transition-all duration-500 group-hover:scale-110 origin-bottom-left" />
                  <div className="absolute bottom-2 right-2 w-12 h-12 border-r-2 border-b-2 border-white/0 group-hover:border-white/80 transition-all duration-500 group-hover:scale-110 origin-bottom-right" />
                </div>
              </Link>
              <Link href={"/catalogs/prodekor.pdf"} target="_blank" rel="noopener noreferrer" className="relative group h-[450px] block overflow-hidden cursor-pointer">
                <Image src={"/images/katalog_propiyer.jpg"} alt={"catalog.brand"} width={1000} height={1000} className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" />
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/70 to-transparent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/70 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black/70 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-0 p-4">
                  <div className="absolute top-2 left-2 w-12 h-12 border-l-2 border-t-2 border-white/0 group-hover:border-white/80 transition-all duration-500 group-hover:scale-110 origin-top-left" />
                  <div className="absolute top-2 right-2 w-12 h-12 border-r-2 border-t-2 border-white/0 group-hover:border-white/80 transition-all duration-500 group-hover:scale-110 origin-top-right" />
                  <div className="absolute bottom-2 left-2 w-12 h-12 border-l-2 border-b-2 border-white/0 group-hover:border-white/80 transition-all duration-500 group-hover:scale-110 origin-bottom-left" />
                  <div className="absolute bottom-2 right-2 w-12 h-12 border-r-2 border-b-2 border-white/0 group-hover:border-white/80 transition-all duration-500 group-hover:scale-110 origin-bottom-right" />
                </div>
              </Link>
              <Link href={"/catalogs/prokast.pdf"} target="_blank" rel="noopener noreferrer" className="relative group h-[450px] block overflow-hidden cursor-pointer">
                <Image src={"/images/katalog_prokast.jpg"} alt={"catalog.brand"} width={1000} height={1000} className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" />
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/70 to-transparent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/70 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black/70 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-0 p-4">
                  <div className="absolute top-2 left-2 w-12 h-12 border-l-2 border-t-2 border-white/0 group-hover:border-white/80 transition-all duration-500 group-hover:scale-110 origin-top-left" />
                  <div className="absolute top-2 right-2 w-12 h-12 border-r-2 border-t-2 border-white/0 group-hover:border-white/80 transition-all duration-500 group-hover:scale-110 origin-top-right" />
                  <div className="absolute bottom-2 left-2 w-12 h-12 border-l-2 border-b-2 border-white/0 group-hover:border-white/80 transition-all duration-500 group-hover:scale-110 origin-bottom-left" />
                  <div className="absolute bottom-2 right-2 w-12 h-12 border-r-2 border-b-2 border-white/0 group-hover:border-white/80 transition-all duration-500 group-hover:scale-110 origin-bottom-right" />
                </div>
              </Link>
            </div>


          </div>
        </div>
      </div>
    </Container>
  )
}

export default page