'use client';
import { Box, Paper } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import ChatMessageBox from './chatMessageBox';
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
    // TODO: check for markdown
    setHtml(response.data.slice(7, -3));
  };
  return (
    <Box
      key='chat'
      backgroundColor='white'
      color='black'
      width='100%'
      flexGrow='1'
      display='flex'
      flexDirection='column'
    >
      <Box flexGrow='1' overflow='auto'>
        <ChatMessageBox messages={messages} />
      </Box>
      <TextInput addMessage={addMessage} />
    </Box>
  );
}
