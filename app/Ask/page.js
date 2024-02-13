"use client"
import React, { useState, useEffect} from 'react'
import { motion } from 'framer-motion';
import Cursor from '../Components/Cursor';
import Navbar from '../Components/Navbar';
import Star from '../Components/Star';


const query = async (data, setLoad) => {
  setLoad(true); // Set loading to true before the fetch

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/blenderbot-3B',
      {
        headers: { Authorization: 'Bearer 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' },
        method: 'POST',
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    setLoad(false); // Set loading to false after the fetch
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    setLoad(false); // Make sure to set loading to false in case of an error
    throw new Error('Error fetching data');
  }
};

function page() {
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
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [load,setload]=useState(false)

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    setload(true)
    event.preventDefault();

    if (question.trim() === '') {
      alert('Please enter a question.');
      return;
    }

    try {
      setload(true); // Set loading to true before querying the model
      const response = await query({ "inputs": question }, setload);
      setAnswer(response[0].generated_text);
    } catch (error) {
      console.error('Error fetching answer:', error);
      alert('Error fetching answer. Please try again later.');
    } finally {
      setload(false); // Set loading to false after querying the model
    }
  };

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
    <div className='askh'> 
    <div>
      
    <h1 onMouseEnter={textEnter} onMouseLeave={textLeave} className='z-20 text-6xl font-medium ask-h'>This is <span className='font-bold text-fuchsia-500 ss'>Ask Anything</span></h1> 

    <div className='ask-container flex justify-center items-center gap-10 mt-20'> 
      <form onSubmit={handleSubmit}>
        
        
          <input className='ask-input' placeholder="Ask me anything" type="text" value={question} onChange={handleQuestionChange} />
     
        <button className='generateBtn3 btbt' type="submit" onClick={handleSubmit}>Ask</button>
      </form>
      </div>
     
        <div className="loading3">
              <div className={load?"loading-bar-full2":"loading-bar2"}></div>
              <div className={load?"loading-text":"display-none"}>Loading Please Wait </div>
            </div> 
      {answer && (
        <div className='askAns'>
          <span>{answer} </span>
       
        </div>
      )}
    </div>
    </div>
    </>
  );
}

export default page;
