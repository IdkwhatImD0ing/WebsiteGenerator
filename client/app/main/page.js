"use client";
import TopBar from "../topbar";
import Chat from "./chat/chat";
import Renderer from "./renderer/renderer";
import Editor from "./editor/editor";
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
  const [html, setHtml] = useState("<h1> Renderer </h1>");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [framework, setFramework] = useState("html");

  const handleChange = (event) => {
    setFramework(event.target.value);
  };

  return (
    <div>
      <TopBar />
      <Stack direction="row" spacing={2}>
        <Button onClick={() => setShowChat(!showChat)}>Toggle</Button>
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
        {showChat ? (
          <Chat />
        ) : (
          <Editor
            html={html}
            css={css}
            js={js}
            setHtml={setHtml}
            setCss={setCss}
            setJs={setJs}
          />
        )}
        <Renderer html={html} css={css} js={js} />
      </Box>
    </div>
  );
}
