import React, { useRef, useEffect } from 'react';
import { Box, Button } from '@mui/material';

const DrawingCanvas = ({ onDrawingComplete }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    // Adjust these to fit your required canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Set initial canvas state
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const getMousePos = (canvas, evt) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    };

    const startDrawing = (e) => {
      const mousePos = getMousePos(canvas, e);
      isDrawingRef.current = true;
      ctx.beginPath();
      ctx.moveTo(mousePos.x, mousePos.y);
    };

    const draw = (e) => {
      if (!isDrawingRef.current) return;
      const mousePos = getMousePos(canvas, e);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
    };

    const stopDrawing = () => {
      isDrawingRef.current = false;
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      window.removeEventListener('mouseup', stopDrawing);
    };
  }, []);

  const saveDrawing = () => {
    canvasRef.current.toBlob(blob => {
      // Now you have a Blob object that you can use
      const imageUrl = URL.createObjectURL(blob);
      console.log(imageUrl);
      onDrawingComplete(blob);
    }, 'image/png');
  };

  return (
    <Box 
    
    sx={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      <Button variant="contained" color="primary" onClick={saveDrawing}
      sx={{
        position: 'absolute',
        bottom: 5,
        right: 5,
      }}
      >
        Save Drawing
      </Button>
    </Box>
  );
};

export default DrawingCanvas;
