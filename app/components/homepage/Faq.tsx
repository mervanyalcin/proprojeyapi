import React, { useState } from 'react'
import Container from '../Container'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Heading from '../Heading';

const Faq = () => {

    // Gösterilen div sayısını kontrol eden state
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(120)

    // Toplam 12 div
    const totalDivs = 12;

    // Her sayfa 3 div gösterecek şekilde ayarladık
    const itemsPerPage = 3;

    // Gizli div'in durumunu tutmak için state (her div için ayrı)
    const [openDivs, setOpenDivs] = useState(Array(totalDivs).fill(false));

    // Dinamik içerik: Her div için başlık ve açıklama
    const divsContent = [
        { title: 'Div 1', description: 'Bu, birinci divin gizli içeriğidir.' },
        { title: 'Div 2', description: 'İkinci divin açıklaması burada yer alıyor.' },
        { title: 'Div 3', description: 'Üçüncü div için dinamik içerik.' },
        { title: 'Div 4', description: 'Dördüncü div için açıklama burada.' },
        { title: 'Div 5', description: 'Beşinci divin içeriği burada.' },
        { title: 'Div 6', description: 'Altıncı div için içerik açıklaması.' },
        { title: 'Div 7', description: 'Yedinci divin içerik açıklaması.' },
        { title: 'Div 8', description: 'Sekizinci divin gizli içeriği.' },
        { title: 'Div 9', description: 'Dokuzuncu divin açıklaması.' },
        { title: 'Div 10', description: 'Onuncu divin içeriği.' },
        { title: 'Div 11', description: 'Onbirinci divin açıklaması.' },
        { title: 'Div 12', description: 'Onikinci divin içeriği.' }
    ];

    // Şu an hangi divlerin görüneceğini hesaplayalım
    const displayedDivs = Array.from({ length: itemsPerPage }, (_, index) => {
        return (currentIndex + index) % totalDivs;  // Modül işlemi ile dairesel geçiş
    });

    // Geçiş için ileri ve geri fonksiyonları
    const goNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % totalDivs);
    };

    const goPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - itemsPerPage + totalDivs) % totalDivs);
    };

    // Tıklanan div'in gizli kısmını açma/kapama
    const toggleDetails = (index: number) => {
        if (selectedIndex === index) {
            setSelectedIndex(120)
        } else {
            setSelectedIndex(index)
        }
        const newOpenDivs = [...openDivs];
        newOpenDivs[index] = !newOpenDivs[index]; // Tıklanan div'in durumunu tersine çevir
        setOpenDivs(newOpenDivs);
    };

    return (
        <div className='py-10 my-12 bg-themeColorOne rounded-3xl'>
            <div className="relative px-20">

                <Heading text='Sıkça Sorular Sorular' />

                <div className="flex space-x-4 overflow-x-auto">
                    {displayedDivs.map((index) => (
                        <div key={index} className="w-1/3 h-64 bg-white text-black flex flex-col items-center justify-center rounded-lg cursor-pointer" onClick={() => toggleDetails(index)}                            >
                            <div>{divsContent[index].title}</div>
                        </div>
                    ))}
                </div>

                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2">
                    <button onClick={goPrev} className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-600">
                        <FaArrowLeft />
                    </button>
                </div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2">
                    <button onClick={goNext} className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-600"                        >
                        <FaArrowRight />
                    </button>
                </div>

                <div className="">

                    {
                        selectedIndex < totalDivs && (
                            <div className="mt-4 w-full p-2 bg-gray-700 text-white rounded-md">
                                {divsContent[selectedIndex].description}
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Faq