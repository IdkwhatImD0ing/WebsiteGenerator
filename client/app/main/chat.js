'use client';
import { Box, Paper, Button, Modal, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import ChatMessageBox from './chatMessageBox';
import TextInput from './textInput';
import axios from 'axios';

export default function Chat({ messages, setMessages, html, setHtml }) {
  const removeMarkdown = str => {
    if (str.startsWith('```html')) {
      str = str.slice(7);
    }
    if (str.endsWith('```')) {
      str = str.slice(0, -3);
    }
    return str;
  };
  const [image, setImage] = useState(null);
  const handleImageChange = event => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      setImage(null);
    }
    console.log(file);
  };
  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
  const addMessage = async newMessage => {
    if (!image) {
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
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response);
      setHtml(removeMarkdown(response.data));
    } else {
      const base64Image = await getBase64(image);
      console.log(base64Image);
      setMessages([...messages, { content: newMessage, role: 'user' }]);

      const newMessagesToChat = [
        ...messages,
        {
          content: [
            {
              type: 'text',
              text: newMessage + `\nThe current html is \n${html}`
            },
            {
              type: 'image_url',
              image_url: {
                url: base64Image
              }
            }
          ],
          role: 'user'
        }
      ];
      const conversation = { type: 'image', messages: newMessagesToChat };
      const response = await axios.post(
        'http://localhost:8000/chat',
        conversation,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response);
      setImage(null);
      setHtml(removeMarkdown(response.data));
    }
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
      <Box display='flex'>
        <input
          accept='image/*'
          style={{ display: 'none' }}
          id='raised-button-file'
          multiple={false}
          type='file'
          onChange={handleImageChange}
        />
        <label htmlFor='raised-button-file'>
          <Button component='span'>Upload Image</Button>
        </label>
        {image && (
          <Box display='flex'>
            <p>{image.name}</p>
            <Button
              onClick={() => {
                setImage(null);
              }}
            >
              Remove Image
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
