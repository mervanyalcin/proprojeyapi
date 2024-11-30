import React from 'react'

interface IHeadingProps {
    text: string
}
const Heading: React.FC<IHeadingProps> = ({ text }) => {
    return (
        <div className=" mb-8">
            <div className="flex items-center gap-4">
                <h2 className="text-5xl font-bold text-themeColorThird uppercase"> {text} </h2>
                <div className="h-0.5 bg-themeColorThird flex-1 transform -translate-y-2" />
            </div>
        </div>
    )
}

export default Heading