'use client';
import React, {useRef, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default function ChatMessageBox({messages}) {
  const messagesEndRef = useRef(null);

  useEffect(
      () => { messagesEndRef.current?.scrollIntoView({behavior : 'smooth'}); },
      [ messages ]);
  return (
    <List>
      {messages.map((message, index) => (
        <ListItem key={index} alignItems='flex-start'>
          <ListItemText
            primary={<Typography sx={{
    fontWeight: 'bold' }}>You: </Typography>}
            secondary={
              <Typography sx={{ fontSize: '1rem' }}>
                {message.content}
              </Typography>
            }
            secondaryTypographyProps={
    { style: {whiteSpace: 'pre-line'} }}
          />
        </ListItem>
      ))}
      <div ref={
    messagesEndRef} />
    </List>
  );
}
