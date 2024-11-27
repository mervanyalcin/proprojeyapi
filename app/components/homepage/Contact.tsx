import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FaInstagram, FaPhone } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { MdMailOutline } from 'react-icons/md'
import { toast } from 'react-toastify'

const Contact = () => {
    const router = useRouter()


    const {
        register, handleSubmit, setValue, watch, formState: { errors, isDirty }
    } = useForm<FieldValues>({
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            message: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            await axios.post("/api/messages/create", data).then((res) => {
                if (res.status === 200) {
                    toast.success("Mesajınız için teşekkür ederiz")
                }
            })
        } catch (error) {
            toast.error("Bilinmeyen bir hata gerçekleşti terkar deneyebilirisniz.")
        }
    }


    return (
        <div className="">
            <div className="w-full  flex-col bg-themeColorOne rounded-3xl overflow-hidden" id='iletisim'>
                <div className="w-full flex">
                    <div className="w-1/2 px-20 py-20 text-themeColorThird">

                        <p className='text-5xl font-bold font-caveat mb-8'>Bize merhaba deyin,</p>

                        <div className='flex flex-col gap-y-4'>
                            <div className="flex items-center gap-x-4">
                                <div className="pb-10">
                                    <FaLocationDot size={32} className='' />
                                </div>
                                <div className="">
                                    <p className='text-themeColorThird'>Kastamonu Ofisimiz</p>
                                    <p className='text-black text-lg'>İnönü Mahallesi On Sekizinci Sokak No:32/D</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-x-4">
                                <div className="pb-10">
                                    <MdMailOutline size={32} />
                                </div>
                                <div className="">
                                    <p className='text-themeColorThird'>Mail adresimiz</p>
                                    <p className='text-black text-lg'>info@proprojeyapi.com.tr</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-x-4">
                                <div className="pb-10">
                                    <FaPhone size={32} />
                                </div>
                                <div className="">
                                    <p className='text-themeColorThird'>Telefon numaramız</p>
                                    <p className='text-black text-lg'>0532 059 73 26</p>
                                </div>
                            </div>
                        </div>

                        <div className=" border-themeColorSec p-4 rounded-lg mt-4">
                            <p className='font-bold'>
                                Projenizle alakalı sorular için, projenizi üç boyutlu veya teknik detaylandırılmasını yapmak için veya detaylı bilgi almak için bizimle iletişime geçmeyi unutmayın
                            </p>
                        </div>

                        <div className="flex items-center my-4  border-themeColorSec rounded-lg p-4">
                            <FaInstagram size={32} className='mr-1' />
                            <p>Ayrıca bizi instagramdan takip edebilirsiniz</p>
                        </div>


                    </div>

                    <div className="w-1/2 px-20 py-20 text-themeColorThird">
                        <form onSubmit={handleSubmit(onSubmit)} className=''>
                            <p className='text-5xl font-bold font-caveat mb-8'>Bize bir mesaj bırakın</p>

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

                            <div className="mb-5">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium">Mesajınız</label>
                                <textarea id="message" {...register("message", {
                                    required: "Mesaj alanı boş bırakılamaz"
                                })} rows={5} className='border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none' placeholder='mesajınız'></textarea>

                                {errors.message && (
                                    <p className=" text-xs text-black mt-1 bg-red-500 p-1">
                                        {errors.message?.message as string}
                                    </p>
                                )}
                            </div>


                            <button className="px-4 py-3 w-full border-2 border-themeColorThird text-themeColorThird font-bold rounded-md  hover:text-themeColorOne hover:bg-themeColorThird transition-all">
                                Gönder
                            </button>


                        </form>
                    </div>
                </div>



            </div>

            <div className=" overflow-hidden w-full h-[500px] mt-1 rounded-3xl">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47886.647937373506!2d33.78816955!3d41.3976415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4084fa1240163891%3A0xd819b0a02911d532!2sKastamonu%2C%20Kastamonu%20Merkez%2FKastamonu!5e0!3m2!1str!2str!4v1729856895863!5m2!1str!2str" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='w-full min-h-full h-[700px]'></iframe>
            </div>

        </div>
    )
}

export default Contact