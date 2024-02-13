import React from 'react'
import '../../app/Star.css'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from "next/link"



const Learn = () => {
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
  return (
    <>
       <motion.div
        className='cursor'
        variants={variants}
        animate={cursorVariant}
      />
    <div className='lh'>

     <h1 onMouseEnter={textEnter} onMouseLeave={textLeave} className='sf text-center mt-48 text-5xl'><span className='text-fuchsia-600 ff'> There Are 4 Models</span> In Minhaj AI World</h1> 

    <div className='flex justify-center items-center gap-20 card4'>
    <div class="card">
    <h2>Art Generation</h2> 
    <h3 onMouseEnter={textEnter} onMouseLeave={textLeave} className='info z-10 mt-6'>Convert words to art instantly with my AI text to image tool</h3> 
   <Link className='button' href='/Art'> <button className='z-100 button'>Go To Model</button></Link>
</div>

<div class="card">
<h2>Ask Anything</h2> 
    <h3 onMouseEnter={textEnter} onMouseLeave={textLeave} className='info z-10 mt-6'>Ask anything to model and get answer with the help of AI</h3> 
    <Link className='button' href='/Ask'> <button className='z-100 button'>Go To Model</button></Link>

</div>

<div class="card">
<h2>Text Generation</h2> 
    <h3 onMouseEnter={textEnter} onMouseLeave={textLeave} className='info z-10 mt-6'>Convert your text to long speech with my AI text to Speech Model</h3> 
    <Link className='button' href='/Text-Generation'> <button className='z-100 button'>Go To Model</button></Link>

</div>

<div class="card">
<h2>अंग्रेज़ी से हिन्दी</h2> 
    <h3 onMouseEnter={textEnter} onMouseLeave={textLeave} className='info z-10 mt-6'>Convert Your English into Hindi with my -अंग्रेज़ी से हिन्दी-  AI-Model</h3> 
    <Link className='button' href='/translation'> <button className='z-100 button'>Go To Model</button></Link>

</div>

    </div>

    </div>
    </>
  )
}

export default Learn
