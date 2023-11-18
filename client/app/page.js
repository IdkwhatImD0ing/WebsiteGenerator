import {auth} from '@clerk/nextjs';
import {Box, Button} from '@mui/material';
import Link from 'next/link';
import {redirect} from 'next/navigation';

export default function Home() {
  const {userId} = auth();

  if (userId) {
    redirect('/main');
  }
  return (
    <Box
  height = '100vh'
  width = '100vw'
  display = 'flex'
  flexDirection = 'column'
  justifyContent = 'center'
  alignItems = 'center'
      sx={{
    backgroundImage: 'linear-gradient(to right, #ff6e7f, #bfe9ff)'
      }}
    >
      <h1>Website Generator</h1>
      <Box display='flex' flexDirection='row'>
        <Link href='/sign-in' passHref>
          <Button>Sign-in</Button>
        </Link>
        <Link href='/sign-up' passHref>
          <Button>Sign-up</Button>
        </Link>
      </Box>
    </Box>
  );
}
