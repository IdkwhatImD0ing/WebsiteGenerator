"use client";
import { Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import TextInput from "./textInput";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const addMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <Box
      key="chat"
      backgroundColor="white"
      color="black"
      width="45vw"
      height="80vh"
      margin="5px"
      display="flex"
      flexDirection="column"
    >
      <h1>Chat</h1>
      <Box flexGrow="1" overflow="auto">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <TextInput addMessage={addMessage} />
    </Box>
  );
}
