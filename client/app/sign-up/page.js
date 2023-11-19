'use client'
import{SignUp} from '@clerk/nextjs'
import{Box, CircularProgress} from '@mui/material'
import{useAuth} from '@clerk/nextjs'
import Image from 'next/image'
import Stack from '@mui/material/Stack'

export default function Page() {
  const {isLoaded} = useAuth()
  // const theme = useTheme();
  return (
    <Box
      key="signup"
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      backgroundColor="primary.main"
    >
      {!isLoaded ? (
        <CircularProgress />
      ) : (
        <Stack
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.5}}
          width="100vw"
          height="100vh"
          padding={0}
          margin={0}
          backgroundColor="primary"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <div style={{width: '50%', height: '100%', position: 'relative'}}>
            <Image
              priority={true}
              src="/spiderweb.png"
              alt="spiderweb"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <Box backgroundColor="primary">
            <div
              style={{
                width: '50%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SignUp />
            </div>
          </Box>
        </Stack>
      )}
    </Box>
  )
}
