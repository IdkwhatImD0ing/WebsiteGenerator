'use client';

import { Box } from '@mui/material';
import { useRef, useEffect } from 'react';

export default function Renderer({ html, css, js }) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = html;
      const styleTag = document.createElement('style');
      styleTag.textContent = css;
      containerRef.current.appendChild(styleTag);

      // Execute JavaScript
      try {
        new Function(js)();
      } catch (error) {
        console.error('Error executing JavaScript:', error);
      }
    }
  }, [html, css, js]);
  return (
    <Box
      key='renderer'
      backgroundColor='white'
      color='black'
      width='45vw'
      height='80vh'
      margin='5px'
      ref={containerRef}
    ></Box>
  );
}
