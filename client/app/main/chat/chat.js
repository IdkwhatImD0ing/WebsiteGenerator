'use client';
import { Box } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import TextInput from './textInput';
import axios from 'axios';

export default function Chat({
  messages,
  setMessages,
  setHtml,
  setCss,
  setJs
}) {
  const messagesEndRef = useRef(null);
  const addMessage = async newMessage => {
    setMessages([...messages, { text: newMessage, role: 'user' }]);
    // what's the right endpoint
    const response = await axios.post('/chat', messages);
    setHtml(response);
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
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
        {messages != null &&
          messages.map((message, index) => <p key={index}>{message.text}</p>)}
        <div ref={messagesEndRef} />
      </Box>
      <TextInput addMessage={addMessage} />
    </Box>
  );
}
