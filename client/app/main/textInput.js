// TextInput.js
import { useState } from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function TextInput({ addMessage, startAdornment }) {
  const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage(inputText);
    setInputText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      style={{ padding: "10px" }} 
      display="flex"
      flexGrow={1}
    >
      <TextField
        placeholder="Type your message"
        variant="outlined"
        multiline
        fullWidth
        margin="none" // Changed from normal to none to remove extra space
        value={inputText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: startAdornment, // This is where we add the startAdornment prop
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
