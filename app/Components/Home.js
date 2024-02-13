"use client"
import '../../app/Star.css'
import Image from "next/image"
import { motion } from 'framer-motion';
import React, { useState, useEffect} from 'react'
import Learn from './Learn';


const Home = () => {
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
    
    const s=()=>{
      window.scrollTo({
        top:'900', behavior:"smooth"
      })
    }
    
  return (
    <>
     <motion.div
        className='cursor z-50'
        variants={variants}
        animate={cursorVariant}
      />
    

    <div className='homepage'>

     <div className="flex justify-end items-center">
<div>

        <h1 onMouseEnter={textEnter} onMouseLeave={textLeave} className='minhaj home-h1'>Welcome To The <br /><span className='text-fuchsia-500 ss minmin'>Minhaj AI World</span>
        </h1>

        <div>

        <button onMouseEnter={textEnter} onMouseLeave={textLeave} onClick={s} className="generateBtn2 b">Explore More</button>
        </div>

</div>
<div className="mk">

        <Image
        className='img-r'
        width={987}
        height={980}
        src={"/robot.png"}
        />
<Image 
        className='img-r2'
         width={900}
        height={900}
        src={"/min.png"}
        />

        </div>
        </div> 
        </div>

<Learn/>
    </>
  )
}

export default Home
