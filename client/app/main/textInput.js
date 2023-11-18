'use client';
import {useState} from 'react';
import {Box, TextField, InputAdornment, IconButton} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function TextInput({addMessage}) {
  const [inputText, setInputText] = useState('');

  const handleChange = e => { setInputText(e.target.value); };

  const handleSubmit = e => {
    e.preventDefault();
    addMessage(inputText);
    setInputText('');
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box
  component = 'form'
  noValidate
  autoComplete = 'false'
  onSubmit = {handleSubmit} style = {{ margin: '10px' }} > < TextField
  placeholder = 'Type'
  variant = 'outlined'
  multiline
  fullWidth
  margin = 'normal'
        value={inputText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        InputProps={
    {
      endAdornment: (<InputAdornment position = 'end'>
                     <IconButton onClick = {handleSubmit}><SendIcon />
                     </IconButton>
            </InputAdornment>)
    }}
      />
    </Box>
  );
}
