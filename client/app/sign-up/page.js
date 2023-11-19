"use client";
import { SignUp } from "@clerk/nextjs";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Stack from "@mui/material/Stack";
<<<<<<< HEAD

export default function Page() {
  const { isLoaded } = useAuth();
  // const theme = useTheme();
=======
import { useTheme } from "@mui/material/styles";

export default function Page() {
  const { isLoaded } = useAuth();
  const theme = useTheme();

>>>>>>> main
  return (
    <Box
      key="signup"
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
<<<<<<< HEAD
      backgroundColor="primary.main"
=======
      backgroundColor="background.inverted"
>>>>>>> main
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
<<<<<<< HEAD
          backgroundColor="primary"
=======
          backgroundColor="theme.palette.red.main"
>>>>>>> main
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
<<<<<<< HEAD
=======
          {" "}
          {/* <Box width="50%" height="100%"> */}
>>>>>>> main
          <div style={{ width: "50%", height: "100%", position: "relative" }}>
            <Image
              priority={true}
              src="/spiderweb.png"
              alt="spiderweb"
              layout="fill"
              objectFit="cover"
            />
          </div>
<<<<<<< HEAD
          <Box backgroundColor="primary">
            <div
              style={{
                width: "50%",
                height: "100%",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SignUp />
            </div>
=======
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
>>>>>>> main
          </Box>
        </Stack>
      )}
    </Box>
  );
}
