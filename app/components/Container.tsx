"use client"

import React from 'react'


interface IContainerProps {
    children: React.ReactNode
    mt8?: boolean
};

const Container: React.FC<IContainerProps> = ({ children, mt8 }) => {
    return (
        <div
            className={`max-w-[1536px] mx-auto w-full ${mt8 && "mt-8"}`}>
            {children}
        </div>
    )
}

export default Container

