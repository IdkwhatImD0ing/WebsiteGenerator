'use client';
import TopBar from '../topbar';
import Chat from './chat/chat';
import Renderer from './renderer/renderer';
import Editor from './editor/editor';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

export default function Page() {
  const [showChat, setShowChat] = useState(true);
  const [html, setHtml] = useState('<h1> Renderer </h1>');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  return (
    <div>
      <TopBar />
      <Button onClick={() => setShowChat(!showChat)}>Toggle</Button>
      <Box
        key='main'
        display='flex'
        flexDirection='row'
        justifyContent='center'
      >
        {showChat ? (
          <Chat />
        ) : (
          <Editor
            html={html}
            css={css}
            js={js}
            setHtml={setHtml}
            setCss={setCss}
            setJs={setJs}
          />
        )}
        <Renderer html={html} css={css} js={js} />
      </Box>
    </div>
  );
}
