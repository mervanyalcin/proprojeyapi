"use client"

import React from 'react'
import Container from './components/Container'
import AboutUs from './components/homepage/AboutUs'
import Faq from './components/homepage/Faq' 
import Catalogs from './components/homepage/Catalogs'
import Dealer from './components/homepage/Dealer'
import Contact from './components/homepage/Contact'
import PageBrandings from './components/homepage/Brandings'
import Link from 'next/link'

const page = () => {


  return (
    <div id='anasayfa' className='bg-themeColorSec'>


      <div className='w-full bg-green-400 homepagebg h-screen flex flex-col items-center justify-center text-white'>
        <p className='text-[70px] font-black uppercase text-themeColorOne'>PROPROJE YAPI</p>
        <p className='text-4xl font-semibold'>GEÇMİŞİN TECRÜBESİ GELECEĞE DOKUNUYOR</p>
        <Link href={"/admin"} >admin</Link>
      </div>

      <Container>
        <AboutUs />
        <Faq />
        <PageBrandings />
        <Catalogs />
        <Dealer />
        <Contact />
      </Container>







    </div >
  )
}

export default page