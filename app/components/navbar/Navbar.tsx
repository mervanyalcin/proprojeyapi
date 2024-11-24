import Image from 'next/image'
import React from 'react'
import MenuItem from '../MenuItem'
import { FaHome, FaPhoneAlt, FaUsers } from 'react-icons/fa'

const Navbar = () => {
    return (
        <div className='z-[998] shadow-sm fixed w-full bg-themeColorSec py-4 '>
            <div className="w-[1140px] max-w-full mx-auto">

                <div className="md:flex items-center justify-between px-8 hidden">


                    <div className="">
                        <Image src={"/images/logo.png"} alt='' width={500} height={500} className='w-52' />
                    </div>

                    <div className='flex text-white tracking-wide  '>
                        <MenuItem href="/" label="Anasayfa" Icon={FaHome} />
                        <MenuItem href="/hakkimizda" label="Hakkımızda" Icon={FaUsers} />
                        <MenuItem href="/markalar" label="Markalarımız" Icon={FaHome} />
                        <MenuItem href="/kataloglar" label="E-Katalog" Icon={FaHome} />
                        <MenuItem href="/bayiler" label="Bayiler" Icon={FaHome} />
                        <MenuItem href="/iletisim" label="İletişim" Icon={FaPhoneAlt} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Navbar