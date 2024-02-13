"use client"
import React, { useState, useEffect} from 'react'
import { motion } from 'framer-motion';
// import Cursor from '../Components/Cursor';
import Navbar from '../Components/Navbar';
import Star from '../Components/Star';
import Cursor from '../Components/Cursor';

function page() {
  const [load,setload]=useState(false)
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    setload(true)
    const MODEL_NAME = "gpt2";
    const url = `https://api-inference.huggingface.co/models/${MODEL_NAME}`;
   

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        options: {
          contentType: "application/json",
          // max_tokens: 200,
          max_length: 100,
          num_return_sequences: 3,
          use_cache: false,
          return_full_text: true,
          
        },
      }),
      
    };

    try {
      const response = await fetch(url, options);
      const res = await response.json();
      console.log(response);

      setGeneratedText(res[0].generated_text.trim());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setload(false)
  };
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
    <Cursor/>
    <Star/>
    <Navbar/>
<div className='gh'>

    <h1 onMouseEnter={textEnter} onMouseLeave={textLeave} className='z-20 text-6xl font-medium ask-h s-h'>This is <span className='font-bold text-fuchsia-500 ss'>Text Generation </span></h1> 


    <div className="s-c flex justify-center items-center gap-10 mt-20">
    <label className="block mb-4">
    
      <input
        type="text"
        value={prompt}
        onChange={handlePromptChange}
        className="ask-input"
        placeholder='Enter Text Here'
        />
    </label>
    <button
      onClick={handleSubmit}
      className="generateBtn3"
    >
      Generate
    </button>
  
  </div>
  <div className="loading3 mb-5 flex justify-center items-center flex-col">
              <div className={load?"loading-bar-full2":"loading-bar2"}></div>
              <div className={load?"loading-text":"display-none"}>Loading Please Wait </div>
            </div>
    <div className="flex justify-center askl items-center flex-col">
      <p className=" title2 text-fuchsia-600 text-2xl">Generated Text Given Below</p>
      <div className="generatedText">{generatedText}</div>
    </div>
        </div>
        </>
  );
}

export default page;
