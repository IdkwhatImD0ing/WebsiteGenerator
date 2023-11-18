'use client';
import {useState} from 'react';
import {Box, TextField, Button} from '@mui/material';

export default function TextInput({addMessage}) {
  const [inputText, setInputText] = useState('');

  const handleChange = e => { setInputText(e.target.value); };

  const handleSubmit = e => {
    e.preventDefault();
    addMessage(inputText);
    setInputText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display='flex'>
        <TextField
  placeholder = 'Type'
  variant = 'outlined'
  fullWidth
  margin = 'normal'
          value={inputText}
          onChange={
    handleChange}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </form>
  );
}
