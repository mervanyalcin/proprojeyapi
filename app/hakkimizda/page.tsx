import React from 'react'
import Container from '../components/Container'
import Image from 'next/image'
import { PiStarFourFill } from 'react-icons/pi'
import Heading from '../components/Heading'

const page = () => {
  return (
    <Container>
      <div className=" relative overflow-hidden rounded-3xl px-20 py-20 bg-themeColorOne text-themeColorThird" id='hakkimizda'>

        <Heading text='HAKKIMIZDA' />


        <div className='flex flex-row'>
          <div className="w-1/2 justify-between items-center flex relative overflow-hidden py-10">
            <div className="absolute bg-themeColorSec h-full w-10 left-12 -bottom-0"></div>
            <div className="absolute bg-themeColorSec h-full w-10 left-32 -bottom-0"></div>
            <div className="absolute bg-themeColorSec h-full w-10 left-52 -bottom-0"></div>
            <div className="absolute bg-themeColorSec h-full w-10 left-72 -bottom-0"></div>
            <Image alt='' src={"/images/alci2.jpg"} width={1500} height={1500} className='object-cover w-auto h-[400px] object-center z-10' />
          </div>

          <div className='aboutus flex flex-col gap-y-2 text-center items-center justify-center w-1/2'>
            <PiStarFourFill className='mb-4' size={48} />
            <p className='text-5xl font-bold text-center font-caveat'>YILLARI KAPLAYAN</p>
            <p className='text-[42px] font-bold text-center font-caveat'>KALİTE VE SANAT</p>
            <div className=''>
              <p>1983 yılında başladık deneyimlerimize...</p>
              <p>Alçıya kalite kattık, sanatla tasarladık ve birçok projelerimizi</p>
              <p>başarıyla tasarlayıp uyguladık.</p>
              <p>
                2006 yılında kurduğumuz ticari ortakalığımızın sonunda gelecek nesile daha güzel bir gelecek bırakmak için PROPROJE - PROKAST - PRODEKOR isimlerini tescilledik vede
                yaptığımız her iş kalemine göre geçmişimizi isimlendirdik ve bugünümüze emin adımlarla geldik.
              </p>
              <p>
                PROKAST ile dış cephe prekast uygulamalarına yeni bir boyut kazandırıyoruz. Yükselen projelerinize estetik katan, kaliteli malzeme ile hayal gücünün sınırlarını zorlayan prekasttaki
                uygulamalarımızla KONUT, OTEL ve AVM gibi projelerinizle çıtasını yükseltip değerlerine değer katıyoruz.
              </p>

              <p>
                Bunun için her zaman geçmişimizin tarihi dokularını kaybetmeden, modern çizgiler arasında, alçıyı ve prekastı sanatla tasarımlarımızı harmanlayıp uyguladık.
              </p>
              <p>
                En kaliteli malzemeleri kullandığımız prekast’ta, yapınızın ömrünü uzatan veeserinizi görsellikle birleştiren muhteşem projelerle çözümler üretiyor,
                projenizi ister tarihi bir yapıya, isterseniz modern çizgi dönüştürüyoruz.
              </p>
              <p>
                Dokunuşlarına sahip bir mekana yükselen projelere değer katan kaliteli tasarımlarımızı, sadece tek bir projeye uygulamayı ilke edindik.
              </p>
              <p>
                Kendi markamızda imzamızı taşıyan hiçbir işi, başka bir projede uygulamadık.
              </p>
              <p>
                Her bir tasarım ayrı bir projenin imzası altındadır. Bizim için müşterilerimiz de, tasarımlarımız da özeldir, projelere değer katan özgünlük ve kaliteden ibarettir.
              </p>
              <p>
                Bu yüzden özgünlüğümüz ve kalitemiz her bir projede farklı esinti içindedir.
              </p>
              <p>
                Farklı projelere farklı alternatif tasarımlarla ve işçilikle yaklaşıyoruz ama her zaman değişmeyen bir şeyer var ki o da özgün tasarımlarımız,
                kaliteli malzemelerimiz ve ustalıkla gerçekleştirdiğimiz sanatla birleşen uygulamalarımızdır.
              </p>
              <p>
                TECRÜBEMİZ, HAYAL GÜCÜMÜZ İLE HARMANLANDIĞINDAGÖRECEĞİNİZ SADACE KALİTEMİZDİR.
              </p>
            </div>
          </div>
        </div>
      </div>

    </Container>
  )
}

export default page