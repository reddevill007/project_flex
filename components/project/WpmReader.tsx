"use client";

import React, { useState, useEffect } from "react";

interface WpmReaderProps {
  text: string;
}

const WpmReader: React.FC<WpmReaderProps> = ({ text }) => {
  const [wordCount, setWordCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [wpm, setWpm] = useState(0);
  const minRead = Math.ceil(wordCount / 200); // Assuming an average reading speed of 200 WPM

  useEffect(() => {
    const words = text.split(/\s+/).filter((word) => word !== "");
    setWordCount(words.length);

    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsedTime = (Date.now() - startTime) / 60000; // convert to minutes
      setTimeElapsed(elapsedTime);

      const currentWpm = Math.round((words.length / elapsedTime) * 60);
      setWpm(currentWpm);
    }, 1000);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <div>
      <p>{minRead} min read</p>
    </div>
  );
};

export default WpmReader;
