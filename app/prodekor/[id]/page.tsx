import Container from '@/app/components/Container'
import React from 'react'

interface IPageProps {
    params: {
        id: string
    }
}

const page: React.FC<IPageProps> = ({ params }) => {
    return (
        <div className="d">
            <div className="bg-themeColorOne py-20 text-themeColorThird text-5xl font-bold text-center mt-8"> {params.id} </div>
            <Container>
                <div className='h-screen'>
                    İlgili makam büyüktür
                </div>
            </Container>
        </div>
    )
}

export default page