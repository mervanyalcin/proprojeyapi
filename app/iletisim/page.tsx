import React from 'react'
import Container from '../components/Container'

const page = () => {
  return (
    <Container>
      <div className="h-screen flex justify-center items-center ">
        <div className="w-full flex my-12 bg-themeColorOne rounded-3xl overflow-hidden" id='iletisim'>
          <div className="w-1/2">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47886.647937373506!2d33.78816955!3d41.3976415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4084fa1240163891%3A0xd819b0a02911d532!2sKastamonu%2C%20Kastamonu%20Merkez%2FKastamonu!5e0!3m2!1str!2str!4v1729856895863!5m2!1str!2str" width="600" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='w-full h-full'></iframe>
          </div>

          <div className="w-1/2 px-20 py-20 text-themeColorThird">
            <p className='text-5xl font-bold font-caveat mb-8'>Bize bir mesaj bırakın</p>

            <div className='mb-5'>
              <label htmlFor="name" className='text-sm font-bold block mb-2'>Adınız</label>
              <input type="text" id='name' className='border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none' placeholder='Telefon numaranız' />
            </div>

            <div className='mb-5'>
              <label htmlFor="telno" className='text-sm font-bold block mb-2'>Telefon Numaranız</label>
              <input type="text" id='telno' className='border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none' placeholder='Telefon numaranız' />
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="block mb-2 text-sm font-medium">Mesajınız</label>
              <textarea name="message" id="" className='border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none' placeholder='Mesajınız'></textarea>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default page 