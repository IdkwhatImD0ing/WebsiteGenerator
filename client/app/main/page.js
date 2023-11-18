import { Box } from "@mui/material";

import TopBar from "../topbar";

import Chat from "./chat/chat";
import Renderer from "./renderer/renderer";

export default function Page() {
  return (
    <div>
      <TopBar />
      <Box
        key="main"
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        {" "}
        <Chat />
        <Renderer />
      </Box>
      <h1>Main Page</h1>
    </div>
  );
}
