"use client"
import React, { useState, useEffect} from 'react'
import { motion } from 'framer-motion';
import Cursor from '../Components/Cursor';
import Star from '../Components/Star';
import Navbar from '../Components/Navbar';



function page() {
  const [load,setload]=useState(false)
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
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState('');

  const handleTranslate = async () => {
    
    setload(true)
    try {
      const response = await query({ inputs: inputText });
      setTranslation(response[0].generated_text);
    } catch (error) {
      console.error('Error translating:', error);
    }
  };
  async function query(data) {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/barghavani/English_to_Hindi',
      {
        headers: { Authorization: 'Bearer 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' },
        method: 'POST',
        body: JSON.stringify(data),
      }
  
    )
    setload(false)
    
    const result = await response.json();
    return result;
  }
  return (
    <>
      <motion.div
        className='cursor'
        variants={variants}
        animate={cursorVariant}
      />
    <Cursor/>
    <Star/>
    <Navbar/>
    <div className="th">

    <h1 onMouseEnter={textEnter} onMouseLeave={textLeave} className='z-20 text-6xl font-medium ask-h mb-7'>This is <span className='font-bold text-fuchsia-500 ss'>अंग्रेज़ी से हिन्दी</span></h1> 
    <div className='s-b flex justify-center items-center gap-10 mt-20'>
      <div>
        <input
        placeholder='Translate Here'
          id="inputText"
          className='ask-input'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></input>
      </div>
      <button className='generateBtn4' onClick={handleTranslate}>Translate</button>
    </div>
    <div className="loading3 mb-5 flex justify-center items-center flex-col mt-5">
              <div className={load?"loading-bar-full2":"loading-bar2"}></div>
              <div className={load?"loading-text":"display-none"}>Loading Please Wait </div>
            </div>
   
      <div className="flex justify-center askl items-center flex-col">
      <p className=" title2 text-fuchsia-600 text-2xl mb-6">Translated Given Below</p>
      <h2 className="text-4xl border-r-fuchsia-600">{translation}</h2>
    </div>
          </div>
          </>
  );
}

export default page;
