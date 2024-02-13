'use client'
import React from 'react'
import Link from "next/link"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaSearch, FaShoppingBag, FaTimes, FaUser } from "react-icons/fa";
import { usePathname } from 'next/navigation'
const Navbar = () => {
  const router = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
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
      backgroundColor: "rgb(255 0 255 / 53%)",
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
      <ul className='ul mt-4 h-auto mb-10 lg:flex items-center justify-around hidden'>
        <input type="text" placeholder='Search' className='search bg' />
        <li className='hover' onMouseEnter={textEnter} onMouseLeave={textLeave} ><Link className={router === '/' ? "active1" : ""} href="/">Home</Link></li>
        <li className='hover' onMouseEnter={textEnter} onMouseLeave={textLeave} ><Link className={router === '/Art' ? "active1" : ""} href="/Art">Art Generation</Link></li>
        <li className='hover' onMouseEnter={textEnter} onMouseLeave={textLeave} ><Link className={router === '/Ask' ? "active1" : ""} href="/Ask">Ask Anything</Link></li>
        <li className='hover' onMouseEnter={textEnter} onMouseLeave={textLeave} ><Link className={router === '/Text-Generation' ? "active1" : ""} href="/Text-Generation">Text Generation</Link></li>
        <li className='hover' onMouseEnter={textEnter} onMouseLeave={textLeave} ><Link className={router === '/translation' ? "active1" : "font-bold "} href="/translation">अंग्रेज़ी से हिन्दी</Link></li>

      </ul>
        <div className="lg:hidden">
            <button onClick={toggleMenu}>
                {
                    isMenuOpen ? <FaTimes className="w-10 h-10 text-fuchsia-600 ml-4 mt-4"/> : <FaBars className="w-10 h-10 ml-4 mt-4 text-fuchsia-600"/>
                }
            </button>
        </div>
      <ul className={`bg-black text-white px-4 py-2 rounded ${isMenuOpen ? "" : "hidden"}`} >
          
            <li  className=" hover:text-orange-500 my-3 cursor-pointer" >   <Link href="/" onClick={toggleMenu}>Home</Link></li>  
            <li  className=" hover:text-orange-500 my-3 cursor-pointer" >   <Link href="/Art" onClick={toggleMenu}>Art Generation</Link></li>  
            <li  className=" hover:text-orange-500 my-3 cursor-pointer" >   <Link href="/Ask" onClick={toggleMenu}>Ask Anything</Link></li>  
            <li  className=" hover:text-orange-500 my-3 cursor-pointer" >   <Link href="/Text-Generation" onClick={toggleMenu}>Text Generation</Link></li>  
            <li  className=" hover:text-orange-500 my-3 cursor-pointer" >   <Link href="/translation" onClick={toggleMenu}>अंग्रेज़ी से हिन्दी</Link></li>  
            
            
            </ul>
              </>

  )
}

export default Navbar
