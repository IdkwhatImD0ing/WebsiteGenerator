"use client";
import TopBar from "../topbar";
import Chat from "./chat";
import Renderer from "./renderer";
import Editor from "./editor";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { useState } from "react";

export default function Page() {
  const [showChat, setShowChat] = useState(true);
  const [html, setHtml] = useState("<h1> This is a header </h1>");
  const [framework, setFramework] = useState("html");
  const [messages, setMessages] = useState([]);
  const handleChange = (event) => {
    setFramework(event.target.value);
  };

  return (
    <div>
      <TopBar />
      <Stack direction="row" spacing={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Framework</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={framework}
            label="Framework"
            onChange={handleChange}
            sx={{ width: "150px" }}
          >
            <MenuItem value={"html"}>Html</MenuItem>
            <MenuItem value={"react"}>React</MenuItem>
            <MenuItem value={"vue"}>Vue</MenuItem>
            <MenuItem value={"angular"}>Angular</MenuItem>
            <MenuItem value={"svelte"}>Svelte</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Box
        key="main"
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        {" "}
        <Box width="45vw" height="80vh" display="flex" flexDirection="column">
          {showChat ? (
            <Chat
              messages={messages}
              html={html}
              setMessages={setMessages}
              setHtml={setHtml}
            />
          ) : (
            <Editor html={html} setHtml={setHtml} />
          )}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "green",
              "&:hover": { backgroundColor: "darkgreen" },
            }}
            height="10px"
            onClick={() => setShowChat(!showChat)}
          >
            Switch to {showChat ? "Editor" : "Chat"}
          </Button>
        </Box>
        <Renderer html={html} />
      </Box>
    </div>
  );
}
