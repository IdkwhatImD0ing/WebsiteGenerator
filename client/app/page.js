import { auth } from "@clerk/nextjs";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect("/main");
  }
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: "linear-gradient(to right, #ff6e7f, #bfe9ff)",
      }}
      position="relative"
    >
      <Image
        priority={true}
        src="/window.png"
        alt="window "
        layout="fill"
        objectFit="cover"
      />
      <Box
        position="absolute"
        width="100vw"
        height="100vh"
        sx={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255, 99, 71, 0.3), rgba(12, 15, 15, 0.5))",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Link href="/main" passHref>
            <Button variant="contained">Sign In</Button>
          </Link>
          <Link href="/sign-up" passHref>
            <Button variant="contained">Sign Up</Button>
          </Link>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          position="absolute"
          color="primary.red"
          alignItems="center"
          width="100vw"
        >
          <Typography
            variant="h2"
            margin={5}
            paddingTop={20}
            color="white"
            fontWeight="bold"
          >
            WebWeaver
          </Typography>
          <Typography variant="h6" margin={10} color="white">
            WebWeaver is an AI-powered website generation tool that enables
            seamless collaboration with an AI chatbox to design, edit, and
            refine your ideal website in real-time.
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Link href="/sign-in" passHref>
            <Button variant="contained">Sign In</Button>
          </Link>
          <Link href="/sign-up" passHref>
            <Button variant="contained">Sign Up</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
