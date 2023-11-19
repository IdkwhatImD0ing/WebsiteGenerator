"use client";
import {
  Box,
  Paper,
  Button,
  Modal,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import ChatMessageBox from "./chatMessageBox";
import TextInput from "./textInput";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DrawingCanvas from "./canvas";

export default function Chat({ messages, setMessages, html, setHtml }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [image, setImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      setImage(null);
    }
    console.log(file);
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  useEffect(() => {
    // This will be called before the component unmounts or when the image state changes
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const addMessage = async (newMessage) => {
    if (!image) {
      const messageToChat = newMessage + `\nThe current html is \n${html}`;
      console.log(messageToChat);
      setMessages([...messages, { content: newMessage, role: "user" }]);
      const newMessagesToChat = [
        ...messages,
        { content: messageToChat, role: "user" },
      ];
      const conversation = { type: "text", messages: newMessagesToChat };
      const response = await axios.post(
        "http://localhost:8000/chat",
        conversation,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      setHtml(response.data);
    } else {
      const base64Image = await getBase64(image);
      console.log(base64Image);
      setMessages([...messages, { content: newMessage, role: "user" }]);

      const newMessagesToChat = [
        ...messages,
        {
          content: [
            {
              type: "text",
              text: newMessage + `\nThe current html is \n${html}`,
            },
            { type: "image_url", image_url: { url: base64Image } },
          ],
          role: "user",
        },
      ];
      const conversation = { type: "image", messages: newMessagesToChat };
      const response = await axios.post(
        "http://localhost:8000/chat",
        conversation,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      setImage(null);
      setHtml(response.data);
    }
  };
  return (
    <Box
      key="chat"
      backgroundColor="white"
      color="black"
      width="100%"
      flexGrow="1"
      display="flex"
      flexDirection="column"
    >
      {" "}
      <Box flexGrow="1" overflow="auto">
        <ChatMessageBox messages={messages} />
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Button
          style={{ display: "none" }}
          id="open-modal"
          onClick={handleOpen}
        />

        <TextInput
          addMessage={addMessage}
          startAdornment={
            <InputAdornment position="start">
              <label htmlFor="open-modal">
                <IconButton component="span" color="primary.main">
                  <AddCircleOutlineIcon color="primary.main" />
                </IconButton>
              </label>
            </InputAdornment>
          }
        />

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80vw",
              height: "80vh",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 2,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {/* Upload your sketch here! */}
            </Typography>
            <Box
              position="absolute"
              top={0}
              right={0}
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
            >
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple={false}
                type="file"
                onChange={handleImageChange}
              />
              {image ? (
                <IconButton
                  componnt="span"
                  onClick={() => {
                    setImage(null); // Remove the image when the close icon is clicked
                  }}
                  color="primary"
                >
                  <CloseIcon />
                </IconButton>
              ) : (
                <label htmlFor="raised-button-file">
                  <IconButton component="span" color="primary.main">
                    <UploadFileIcon color="primary.main" />
                  </IconButton>
                </label>
              )}
              <Box textAlign="right">
                <IconButton component="span" color="primary.main">
                  <CloseIcon color="primary.main" />
                </IconButton>
              </Box>
            </Box>
            <Box flex={1} height="100%" width="100%">
              {image ? (
                <Box display="flex" alignItems="center" justifyContent="center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    style={{ width: "auto", height: "50vh" }}
                  />
                </Box>
              ) : (
                <DrawingCanvas onDrawingComplete={setImage} />
              )}
            </Box>
          </Box>
        </Modal>
      </Box>
      {/* <TextInput addMessage={addMessage} />
      <Box display="flex">
        <input
          accept="image/ * "
          style={{ display: "none" }}
          id="raised-button-file"
          multiple={false}
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="raised-button-file">
          <Button component="span">Upload Image</Button>
        </label>
        {image && (
          <Box display="flex">
            <p>{image.name}</p>
            <Button
              onClick={() => {
                setImage(null);
              }}
            >
              Remove Image
            </Button>
          </Box>
        )}
      </Box> */}
    </Box>
  );
}
