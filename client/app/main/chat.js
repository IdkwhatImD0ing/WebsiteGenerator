'use client';
import { Box } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import TextInput from './textInput';
import axios from 'axios';

export default function Chat({
  messages,
  setMessages,
  html,
  setHtml,
  setCss,
  setJs
}) {
  const messagesEndRef = useRef(null);
  const addMessage = async newMessage => {
    const messageToChat = newMessage + `\nThe current html is \n${html}`;
    console.log(messageToChat);
    setMessages([...messages, { content: newMessage, role: 'user' }]);
    const newMessagesToChat = [
      ...messages,
      { content: messageToChat, role: 'user' }
    ];
    const conversation = { type: 'text', messages: newMessagesToChat };
    const response = await axios.post(
      'http://localhost:8000/chat',
      conversation,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(response);
    setHtml(response.data.slice(7, -3));
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
          messages
            .filter(message => message.role === 'user')
            .map((message, index) => <p key={index}>{message.content}</p>)}
        <div ref={messagesEndRef} />
      </Box>
      <TextInput addMessage={addMessage} />
    </Box>
  );
}
