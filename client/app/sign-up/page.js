"use client";
import { SignUp } from "@clerk/nextjs";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

export default function Page() {
  const { isLoaded } = useAuth();
  const theme = useTheme();

  return (
    <Box
      key="signup"
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      backgroundColor="background.inverted"
    >
      {" "}
      {!isLoaded ? (
        <CircularProgress />
      ) : (
        <Stack
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          width="100vw"
          height="100vh"
          padding={0}
          margin={0}
          backgroundColor="theme.palette.red.main"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {" "}
          {/* <Box width="50%" height="100%"> */}
          <div style={{ width: "50%", height: "100%", position: "relative" }}>
            <Image
              priority={true}
              src="/spiderweb.png"
              alt="spiderweb"
              layout="fill"
              objectFit="cover"
            />
          </div>
          {/* </Box> */}
          <Box
            backgroundColor="theme.palette.red.main"
            width="50%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <SignUp />
          </Box>
        </Stack>
      )}{" "}
    </Box>
  );
}
