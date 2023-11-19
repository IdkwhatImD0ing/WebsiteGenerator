'use client'
import Chat from './chat'
import Renderer from './renderer'
import Editor from './editor'
import Sidebar from './sidebar'

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import {useState} from 'react'
import {useAuth} from '@clerk/nextjs'

// Chat Object
//{id: 1, messages: [], currentVersion: string, name: string}

export default function Page() {
  const [showChat, setShowChat] = useState(true)
  const [framework, setFramework] = useState('html')
  const [chatObject, setChatObject] = useState({})
  const messages = chatObject.messages
  const html = chatObject.currentVersion
  const id = chatObject.id

  // const handleChange = (event) => {
  //   setFramework(event.target.value)
  // }

  const setHtml = (html) => {
    const temp = {...chatObject}
    temp.currentVersion = html
    setChatObject(temp)
  }

  const setMessages = (messages) => {
    const temp = {...chatObject}
    temp.messages = messages
    setChatObject(temp)
  }
  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Sidebar setChatObject={setChatObject} chatObject={chatObject} />
        {/* <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Framework</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={framework}
            label="Framework"
            onChange={handleChange}
            sx={{width: '150px'}}
          >
            <MenuItem value={'html'}>Html</MenuItem>
            <MenuItem value={'react'}>React</MenuItem>
            <MenuItem value={'vue'}>Vue</MenuItem>
            <MenuItem value={'angular'}>Angular</MenuItem>
            <MenuItem value={'svelte'}>Svelte</MenuItem>
          </Select>
        </FormControl> */}
      </Stack>

      <Box
        key="main"
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        {Object.keys(chatObject) == 0 ? (
          <Box
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography align="center" variant="h5">
              You have no page selected. Please select a page to edit from the
              top left.
            </Typography>
          </Box>
        ) : (
          <Box
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              width="45vw"
              height="80vh"
              display="flex"
              flexDirection="column"
            >
              {showChat ? (
                <Chat
                  messages={messages}
                  html={html}
                  setMessages={setMessages}
                  setHtml={setHtml}
                  setChatObject={setChatObject}
                  chatObject={chatObject}
                  id={id}
                />
              ) : (
                <Editor html={html} setHtml={setHtml} />
              )}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'green',
                  '&:hover': {backgroundColor: 'darkgreen'},
                }}
                height="10px"
                onClick={() => setShowChat(!showChat)}
              >
                Switch to {showChat ? 'Editor' : 'Chat'}
              </Button>
            </Box>
            <Renderer html={html} />
          </Box>
        )}
      </Box>
    </div>
  )
}
