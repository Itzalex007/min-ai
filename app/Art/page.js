"use client"
import React, { useRef, useState, useEffect} from 'react'
// import img1 from "../../public/art-generator.png"
// import img from "./image/ai_art.jpeg"
import Image from "next/image"
import { motion } from 'framer-motion';
import Star from '../Components/Star';

import Navbar from '../Components/Navbar';

const page = () => {


  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [cursorVariant, setCursorVariant] = useState("default");


  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    }
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "#0f1b21",
      mixBlendMode: "difference"
    }
  }

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");




const [img_url,setImg_url]=useState("/")
let inputRef = useRef(null)
const [load,setload]=useState(false)
const [download,setDownload]=useState(false)

const imgGenerator = async ()=>{
  if(inputRef.current.value===""){
    return 0;
  }
  setload(true)
  const response = await  fetch(
    "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({ inputs: inputRef.current.value }),
    }
  )
    .then((res) => res.blob())
    .then((blob) => {
      setImg_url(window.URL.createObjectURL(blob));
      setload(false)
      setDownload(true)
    });
   
  }
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = img_url;
    a.download = 'image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <>
    <Star/>
    <Navbar/>
      <motion.div
        className='cursor'
        variants={variants}
        animate={cursorVariant}
      />
    
<div className="arth">


    <div className='flex flex-col justify-center items-center mt-36'>
      <h1 onMouseEnter={textEnter} onMouseLeave={textLeave} className=' arth1 z-20 text-6xl font-medium pb-8'>This is Art <span className='font-bold text-fuchsia-500 ss'>Generator</span></h1> 
            <Image className='arti border-solid border-green-500 border-2' src={img_url==="/"?"/ai_art.jpeg":img_url} width={612}  height={612} priority={true} alt='Try agin after some mint so many are trying so server became overloaded'></Image>
            <div className="loading">
              <div className={load?"loading-bar-full":"loading-bar"}></div>
              <div className={load?"loading-text":"display-none"}>Loading Please Wait </div>
            </div>
            <button className={download?"download-true":"display-none"}  onClick={handleDownload}>Download Image</button>
    </div>

<div className='flex justify-center items-center'>

    <div className="searchBox mb-10">
<input type="text" className='s'ref={inputRef} placeholder='Describe What You Want' />
<div className="generateBtn" onClick={()=>{imgGenerator()}}>Generate</div>
    </div>
</div>

</div>
    
    </>
  )
}

export default page
