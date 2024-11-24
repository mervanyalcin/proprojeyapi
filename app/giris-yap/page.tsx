"use client"

import axios from 'axios';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';

const page = () => {

    const [isPassword, setIsPassword] = useState(false)
    const [isRePassword, setIsRePassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            name: "",
            surname: "",
            password: "",
            rePassword: "",
            phoneNumber: "",
        },
    });



    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        signIn("credentials", {
            ...data,
            redirect: false,
        }).then((callback) => {
            if (callback?.ok) {
                toast.success("Giriş yapıldı", {
                    position: "top-right",
                    className: "text-md",
                });
                window.location.href = "/admin";
            }
            if (callback?.error) {
                toast.error(callback.error, {
                    position: "top-right",
                    className: "text-md",
                });
            }
        });
    };




    return (
        <div className='w-[540px] mx-auto mt-20 bg-themeColorOne px-12 py-8 rounded-3xl'>


            <p className='text-3xl mb-4 text-themeColorThird'>Admin Giriş Ekranı</p>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-2">
                    {/* <label htmlFor="email" className="block mb-2 text-sm">
                        E - posta
                    </label> */}
                    <input
                        type="email"
                        id="email"
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-1.5 sm:p-2.5 focus:outline-none"
                        {...register("email", {
                            required: "Email adresi boş bırakılamaz",
                            pattern: {
                                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                                message: "",
                            },
                        })}
                        required
                        placeholder="Mail adresiniz"
                    />
                    {errors.email && (
                        <p className=" text-xs text-red-500 mt-1">
                            {errors.email?.message as string}
                        </p>
                    )}
                </div>



                <div className="mb-5 relative">
                    {/* <label htmlFor="password" className="block mb-2 text-sm ">
                        Şifre
                    </label> */}
                    <input
                        type={isRePassword ? "text" : "password"}
                        id="password"
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-1.5 sm:p-2.5 focus:outline-none"
                        required
                        {...register("password", {
                            // pattern: {
                            //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).+$/,
                            //     message:
                            //         "Şifreniz en az bir küçük, bir büyük harf ve rakam içermelidir",
                            // },
                            required: "Şifre boş bırakılamaz",
                        })}
                        placeholder="Şifreniz"
                    />
                    <FaEye className='absolute top-3 right-2 cursor-pointer' size={20} onClick={() => setIsRePassword(!isRePassword)} />
                    {errors.password && (
                        <p className=" text-xs text-red-500 mt-1">
                            {errors.password?.message as string}
                        </p>
                    )}
                </div>
                <div className="flex-col flex ">
                    {/* <span className='text-themeColorThird'>Giriş yapmak için email ve şifrenizi giriniz</span> */}
                    <Link href="/sifremi-unuttum" className=' text-sky-500 underline text-sm' >
                        <span className=''>şifremi unuttum</span>
                    </Link>
                </div>


                <button className='border my-4 p-4 w-full text-themeColorThird hover:text-white hover:bg-themeColorSec hover:border-themeColorSec transition-all rounded-xl'>Giriş Yap</button>

            </form>


        </div>
    )
}

export default page