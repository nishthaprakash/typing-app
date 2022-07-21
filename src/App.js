import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

const text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export default function App() {
  const [textToType] = useState(text);
  const [typedText, setTypedText] = useState("");
  const [timer, setTimer] = useState();
  const [elapsedMs, setElapsedMs] = useState(0);
  const [started, setStarted] = useState(false);
  const [wpm, setWpm] = useState(0);
  
  const parts = useMemo(() => {
    const splitTextToType = textToType.split("");
    let endIndexMatch = 0;
    for (const [index, s] of splitTextToType.entries()) {
      if (s !== typedText[index]) {
        endIndexMatch = index;
        break;
      }
    }

    return {
      matchedPart: textToType.slice(0, endIndexMatch),
      unmatchedPart: textToType.slice(endIndexMatch)
    };
  }, [textToType, typedText]);
  
  const start = () => {
    const timer = setInterval(() => {
      setElapsedMs((elapsedMs) => elapsedMs + 1);
      if (!started) {
        setStarted(true);
      }
    }, 1000);
    setTimer(timer);
  };

  const restart = () => {
    setStarted(started);
    setElapsedMs(0);
    setTypedText("");
  };

  useEffect(() => {
    if (parts.unmatchedPart.length === 1) {
      clearInterval(timer);
      setWpm(textToType.split(" ").length / (elapsedMs / (60 * 1000)));
    }
  }, [parts, textToType, timer, elapsedMs]);

  if (parts.unmatchedPart.length > 1 ) {
    return (
      <div>
        <h2>Type the alphabet</h2>
        <p>Typing game to see how fast you can type. Timer starts when you do :)</p>
        <div>
          <b>{parts.matchedPart}</b>
          {parts.unmatchedPart}          
        </div>

        {/* <div className="btn-div">
          <button onClick={start}>start</button>
        </div> */}
        {/* {timer} */}
        
        <textarea
          disabled={!started}
          value={typedText}
          onChange={(e) => setTypedText(e.target.value)}
          style={{ width: "90vw", height: "300px" }}
        >
        </textarea>       
        
           <div>
           Your words per minute is {wpm}
           <br />
           <button onClick={restart}>restart</button>
         </div>      
          <h> {elapsedMs} seconds</h>        
         
      </div>
      
    );
  }
}