"use client"

import React from 'react'
import Container from '../components/Container'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'

const page = () => {

  const {
    register, handleSubmit, setValue, watch, reset, formState: { errors, isDirty }
  } = useForm<FieldValues>({
    defaultValues: {
      fullName: "",
      companyName: "",
      address: "",
      phoneNumber: "",
      email: "",
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.post("/api/dealer/create", data).then((res) => {
        if (res.status === 200) {
          toast.success("Başvurunuz başarılı bir şekilde bize ulaştı, yetkili kişi en kısa zamanda sizinle iletişime geçecektir.")
          reset()
        }
      })
    } catch (error) {
      toast.error("Bilinmeyen bir hata gerçekleşti terkar deneyebilirisniz.")
    }
  }


  return (
    <Container>
      <div className="h-screen flex justify-center items-center ">
        <div className="w-full flex bg-themeColorOne my-12 text-themeColorThird rounded-3xl" id='bayiler'>

          <div className="w-1/2 my-12 flex justify-center items-center text-themeColorThird">
            <p>Burada bayilerle alakalı içerikleri bulacaksınız</p>
          </div>


          <div className="w-1/2 items-center justify-center px-20 py-20">

            <p className='text-5xl font-bold font-caveat mb-8'>Bayimiz olmak için, </p>

            <form onSubmit={handleSubmit(onSubmit)}>

              <div className='mb-5'>
                <label htmlFor="fullName" className='text-sm font-bold block mb-2'>Adınız</label>
                <input type="text" id='fullName' maxLength={16} minLength={3} {...register("fullName", {
                  minLength: {
                    value: 3,
                    message: "En az 3 harften oluşmalıdır"
                  },
                  maxLength: {
                    value: 16,
                    message: "En fazla 16 harften oluşabilir"
                  },
                  required: "Ad kısmı boş bırakılamaz"
                })} className='border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none' placeholder='tam adınızı yazınız' />
                {
                  errors.fullName && (
                    <p className='text-xs text-black mt-1 bg-red-500 p-1'>
                      {errors.fullName?.message as string}
                    </p>
                  )
                }
              </div>

              <div className='mb-5'>
                <label htmlFor="companyName" className='text-sm font-bold block mb-2'>Firma Adı</label>
                <input type="text" id='companyName' maxLength={16} minLength={3} {...register("companyName", {
                  minLength: {
                    value: 3,
                    message: "En az 3 harften oluşmalıdır"
                  },
                  maxLength: {
                    value: 16,
                    message: "En fazla 16 harften oluşabilir"
                  },
                  required: "Ad kısmı boş bırakılamaz"
                })} className='border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none' placeholder='firma adını yazınız' />
                {
                  errors.companyName && (
                    <p className='text-xs text-black mt-1 bg-red-500 p-1'>
                      {errors.companyName?.message as string}
                    </p>
                  )
                }
              </div>

              <div className='mb-5'>
                <label htmlFor="phoneNumber" className='text-sm font-bold block mb-2'>Telefon Numaranız</label>
                <input type="text" id='phoneNumber' {...register("phoneNumber", {
                  pattern: {
                    value: /^0{1}\d{3}\d{3}\d{4}$/,
                    message:
                      "Telefon numaranız başında 0 ile birlikte 11 haneli rakamlardan oluşmalıdır.",
                  },
                  minLength: {
                    value: 11,
                    message: "11 karakterden oluşmalıdır",
                  },
                  required: "Telefon boş bırakılamaz",
                })} className='border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none' placeholder='telefon numaranız' />
                {errors.phoneNumber && (
                  <p className=" text-xs text-black mt-1 bg-red-500 p-1 ">
                    {errors.phoneNumber?.message as string}
                  </p>
                )}
              </div>

              <div className='mb-5'>
                <label htmlFor="email" className='text-sm font-bold block mb-2'>E-posta Adresiniz</label>
                <input type="text" id='email' {...register("email", {
                  pattern: {
                    value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                    message: "E-posta adresinizin doğru olduğuna emin olunuz",
                  },
                  required: "E-posta alanı boş bırakılamaz",
                })} className='border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none' placeholder='telefon numaranız' />
                {errors.email && (
                  <p className=" text-xs text-black mt-1 bg-red-500 p-1 ">
                    {errors.email?.message as string}
                  </p>
                )}
              </div>


              <div className="mb-5">
                <label htmlFor="address" className="text-sm font-bold block mb-2">Mesajınız</label>
                <textarea id="address" {...register("address", {
                  required: "Mesaj alanı boş bırakılamaz"
                })} rows={5} className='border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none' placeholder='mesajınız'></textarea>

                {errors.address && (
                  <p className=" text-xs text-black mt-1 bg-red-500 p-1">
                    {errors.address?.message as string}
                  </p>
                )}
              </div>

              <button className="px-4 py-3 w-full border-2 border-themeColorThird text-themeColorThird font-bold rounded-md  hover:text-themeColorOne hover:bg-themeColorThird transition-all">
                Başvur
              </button>

            </form>
          </div>

        </div>
      </div>
    </Container>
  )
}

export default page