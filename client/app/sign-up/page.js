'use client';
import { SignUp } from '@clerk/nextjs';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '@clerk/nextjs';

export default function Page() {
  const { isLoaded } = useAuth();
  return (
    <Box
      key='signup'
      width='100vw'
      height='100vh'
      display='flex'
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
    >
      {!isLoaded ? (
        <CircularProgress />
      ) : (
        <Box
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          width='70%'
          height='80%'
          padding={4}
          backgroundColor='white'
          display='flex'
          flexDirection='row'
          justifyContent='center'
          alignItems='center'
        >
          <SignUp />
        </Box>
      )}
    </Box>
  );
}
