import React from 'react'
import Container from '../components/Container'

const page = () => {
  return (
    <Container>
      <div className="h-screen flex justify-center items-center ">
        <div className="w-full flex bg-themeColorOne my-12 text-themeColorThird rounded-3xl" id='bayiler'>

          <div className="w-1/2 my-12 flex justify-center items-center text-themeColorThird">
            <p>Burada bayilerle alakalı içerikleri bulacaksınız</p>
          </div>


          <div className="w-1/2 items-center justify-center px-20 py-20">

            <p className='text-5xl font-bold font-caveat mb-8'>Bayimiz olmak için </p>

            <div className='mb-5'>
              <label htmlFor="name" className='text-sm font-bold block mb-2'>Adınız</label>
              <input type="text" id='name' className='border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none' placeholder='Adınız' />
            </div>

            <div className='mb-5'>
              <label htmlFor="companyName" className='text-sm font-bold block mb-2'>Firma Adınız</label>
              <input type="text" id='companyName' className='border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none' placeholder='Firma adınız' />
            </div>

            <div className='mb-5'>
              <label htmlFor="telno" className='text-sm font-bold block mb-2'>Telefon Numaranız</label>
              <input type="text" id='telno' className='border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none' placeholder='Telefon numaranız' />
            </div>

          </div>

        </div>
      </div>
    </Container>
  )
}

export default page