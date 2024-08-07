import React, { useEffect, useState } from 'react'
import banner1 from '../assets/banner/banner 1.png'
import banner2 from '../assets/banner/banner 2.png'
import banner3 from '../assets/banner/banner 3.png'
import banner4 from '../assets/banner/banner 4.png'
import banner5 from '../assets/banner/banner 5.png'
import banner6 from '../assets/banner/banner 6.png'
import banner7 from '../assets/banner/banner 7.png'
import banner8 from '../assets/banner/banner 8.png'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
const BannerProduct = () => {
    const [currentImage,setCurrentImage] = useState(0)
    const desktopImages = [
        banner1,
        banner2,
        banner3,
        banner4,
        banner5,
        banner6,
        banner7,
        banner8
    ]

    const nextImage = () =>{
        if(desktopImages.length - 1 > currentImage){
            setCurrentImage(preve => preve + 1)
        }
    }
    const preveImage = () =>{
        if(currentImage != 0){
            setCurrentImage(preve => preve - 1)
        }
    }


    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },5000)

        return ()=> clearInterval(interval)
    },[currentImage])

  return (
    <div className='container mx-auto px-4 rounded '>
        <div className='h-56 md:h-72 w-full bg-slate-200 relative'>

                <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
                    <div className=' flex justify-between w-full text-2xl'>
                        <button onClick={preveImage} className='bg-black shadow-md rounded-full p-1'><FaAngleLeft/></button>
                        <button onClick={nextImage} className='bg-black shadow-md rounded-full p-1'><FaAngleRight/></button> 
                    </div>
                </div>

                {/**desktop and tablet version */}
              <div className='hidden md:flex h-full w-full overflow-hidden'>
                {
                        desktopImages.map((imageURl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full'/>
                            </div>
                            )
                        })
                }
              </div>

              </div>
              </div>
  )
}

export default BannerProduct
