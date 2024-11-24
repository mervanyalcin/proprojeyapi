import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons';

interface IMenuItem {
    label: string;
    href: string;
    Icon?: IconType 
    onClick?: () => void

}

const MenuItem: React.FC<IMenuItem> = ({ href, label, onClick }) => {

    
    return (
        <div className="flex items-center group">
            {/* {
                Icon ? <Icon className="group-hover:text-headingColor" /> : ""
            } */}
            <Link href={href} className="px-2 py-3 cursor-pointer" onClick={onClick}> {label} </Link>
        </div>
    )
}

export default MenuItem