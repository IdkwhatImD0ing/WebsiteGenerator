'use client';
import { Box } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import TextInput from './textInput';

export default function Chat() {
  const [texts, setTexts] = useState([]);
  const textsEndRef = useRef(null);
  const addText = newText => {
    setTexts([...texts, newText]);
  };
  useEffect(() => {
    textsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [texts]);
  return (
    <Box
      key='chat'
      backgroundColor='white'
      color='black'
      width='45vw'
      height='80vh'
      margin='5px'
      display='flex'
      flexDirection='column'
    >
      <h1>Chat</h1>
      <Box flexGrow='1' overflow='auto'>
        {texts.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
        <div ref={textsEndRef} />
      </Box>
      <TextInput addText={addText} />
    </Box>
  );
}
