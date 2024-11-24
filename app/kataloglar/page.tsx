import React from 'react'
import Container from '../components/Container'
import Image from 'next/image'

const page = () => {
  return (
    <Container>

      <div className="flex items-center justify-center h-screen">
        <div className="py-20 bg-themeColorOne rounded-3xl w-full">
          <div className="inline-flex justify-around w-full " id='kataloglar'>

            <div className="w-2/6 h-96 relative">
              <Image alt='' src={"/images/katalog_prodekor.jpg"} width={1500} height={1500} className='object-contain h-full w-full object-center ' />
            </div>
            <div className="w-2/6 h-96 relative">
              <Image alt='' src={"/images/katalog_propiyer.jpg"} width={1500} height={1500} className='object-contain h-full w-full object-center ' />
            </div>
            <div className="w-2/6 h-96 relative">
              <Image alt='' src={"/images/katalog_prokast.jpg"} width={1500} height={1500} className='object-contain h-full w-full object-center ' />
            </div>

          </div>
        </div>
      </div>
    </Container>
  )
}

export default page