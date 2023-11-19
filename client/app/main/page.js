"use client";
import TopBar from "../topbar";
import Chat from "./chat";
import Renderer from "./renderer";
import Editor from "./editor";
import Sidebar from "./sidebar";
import {useTheme} from '@mui/material/styles';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import {useState} from "react";

export default function Page() {
  const theme = useTheme();

  const [showChat, setShowChat] = useState(true);
  const [html, setHtml] = useState("<h1> This is a header </h1>");
  const [framework, setFramework] = useState("html");

  const [messages, setMessages] = useState([]);
  const handleChange = (event) => { setFramework(event.target.value); };

  return (
    <div>
      <TopBar />
      <Stack
  direction = "row"
  spacing = {2} justifyContent = "space-between"
  alignItems =
      "center" > <Sidebar /><FormControl fullWidth>
      <InputLabel id = "demo-simple-select-label">Framework<
          /InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={framework}
            label="Framework"
            onChange={handleChange}
            sx={{ width: "150px" }}
          >
            <MenuItem value={"html"}>Html</MenuItem>
      <MenuItem value = {"react"}>
          React</MenuItem>
            <MenuItem value={"vue"}>Vue</MenuItem>
      <MenuItem value = {"angular"}>Angular<
          /MenuItem>
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
          <Box width="100%" height="7vh" display="flex" flexDirection="row" justifyContent="space-between">
            <Button
              variant="contained"
              sx={{
                backgroundColor: showChat ? "background.green" : "background.inverted",
                "&:hover": {backgroundColor: "background.green"}
              }}
              height="10px"
              fullWidth={true}
              onClick={() => setShowChat(true)}
            >
              Chat
            </Button><
      Button
  variant = "contained"
  sx = {
    {
      backgroundColor: showChat ? "background.inverted" : "background.red",
          "&:hover": {backgroundColor: "background.red"},
    }
  } height = "10px"
  fullWidth = {true} onClick = {() => setShowChat(false)} >
                               Code Editor</Button>
          </Box>{showChat
                                                                     ? (< Chat
              messages={messages}
              html={html}
              setMessages={setMessages}
              setHtml={
    setHtml}
            />
          ) : (
            <Editor html={html} setHtml={setHtml} />
          )}
        </Box>
        <Renderer html={html} />
      </Box>
    </div>
  );
}
