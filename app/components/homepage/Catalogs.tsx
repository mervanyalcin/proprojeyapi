import React from 'react'
import Container from '../Container'
import Image from 'next/image'

const Catalogs = () => {
    return (
        <div className="my-12 bg-themeColorOne rounded-3xl">
            <Container>
                <div className="inline-flex justify-around w-full py-20 " id='kataloglar'>

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
            </Container>
        </div>
    )
}

export default Catalogs