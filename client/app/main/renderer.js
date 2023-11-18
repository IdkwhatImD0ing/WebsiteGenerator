'use client';

import { Box } from '@mui/material';
import { useRef, useEffect } from 'react';

export default function Renderer({ html, css, js }) {
  return (
    <Box
      key='renderer'
      backgroundColor='white'
      color='black'
      width='45vw'
      height='80vh'
      margin='5px'
    >
      <iframe
        srcDoc={html}
        sandbox='allow-same-origin allow-scripts allow-popups allow-forms'
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  );
}
