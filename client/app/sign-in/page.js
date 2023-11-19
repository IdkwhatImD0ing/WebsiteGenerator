'use client';
import {SignIn} from '@clerk/nextjs';
import {Box, CircularProgress} from '@mui/material';
import {useAuth} from '@clerk/nextjs';
import Image from 'next/image';
import {useTheme} from '@mui/material/styles';

export default function Page() {
  const {isLoaded} = useAuth();
  const theme = useTheme();

  return (
    <Box
  key = 'signup'
  width = '100vw'
  height = '100vh'
  display = 'flex'
  flexDirection = 'row'
  justifyContent = 'center'
      alignItems='center'
    >
      {!isLoaded ? (
        <CircularProgress />
      ) : (
        <Box
      initial = {
        { opacity: 0 }
      } animate = {
        { opacity: 1 }
      } exit = {
        { opacity: 0 }
      } transition = {
        { duration: 0.5 }
      } width = '100vw'
      height = '100vh'
      padding = {0} margin = {0} backgroundColor = 'background.inverted'
      display = 'flex'
      flexDirection = 'row'
      justifyContent = 'space-between'
      alignItems =
          'center' >
          <div style =
               {{ width: '50%', height: '100%', position: 'relative' }}>< Image
      priority = {true} src = "/spiderweb.png"
      alt = "spiderweb"
      layout = 'fill'
              objectFit='cover'
            />
          </div>
          <div style={{width: '50%', height: '100%', position: 'relative', display: 'flex', alignItems: "center", justifyContent: "center"}}>
            <SignIn />
          </div>
        </Box>
      )}
    </Box>
  );
}
