'use client'
import {Box, Paper, Button, Modal, Typography} from '@mui/material'
import {useState, useEffect, useRef} from 'react'
import ChatMessageBox from './chatMessageBox'
import TextInput from './textInput'
import axios from 'axios'
import {useAuth} from '@clerk/clerk-react'

export default function Chat({
  messages,
  setMessages,
  html,
  setHtml,
  chatObject,
  setChatObject,
}) {
  const {userId} = useAuth() // Call useAuth at the top level
  const [image, setImage] = useState(null)
  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (file && file.type.startsWith('image/')) {
      setImage(file)
    } else {
      setImage(null)
    }
    console.log(file)
  }
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }
  const addMessage = async (newMessage) => {
    if (!image) {
      const messageToChat = newMessage + `\nThe current html is \n${html}`
      const newMessagesToChat = [
        ...messages,
        {content: messageToChat, role: 'user'},
      ]
      const userMessages = [...messages, {content: newMessage, role: 'user'}]
      setMessages(userMessages)

      const conversation = {
        type: 'text',
        messages: processMessages(newMessagesToChat),
      }
      console.log('conversation', conversation)
      const response = await axios.post(
        'http://localhost:8000/chat',
        conversation,
        {headers: {'Content-Type': 'application/json'}},
      )

      const newMessages = [
        ...userMessages,
        {content: response.data, role: 'assistant'},
      ]
      const newChatObject = {
        ...chatObject,
        messages: newMessages,
        currentVersion: response.data,
      }
      setChatObject(newChatObject)
      const body = {
        projectId: userId,
        pageId: chatObject.id,
        newData: newChatObject,
      }
      await axios.put('/api/page', body, {
        headers: {'Content-Type': 'application/json'},
      })
    } else {
      const base64Image = await getBase64(image)

      const newMessagesToChat = [
        ...messages,
        {
          content: [
            {
              type: 'text',
              text: newMessage + `\nThe current html is \n${html}`,
            },
            {type: 'image_url', image_url: {url: base64Image}},
          ],
          role: 'user',
        },
      ]
      const userMessages = [...messages, {content: newMessage, role: 'user'}]
      setMessages(userMessages)

      const conversation = {
        type: 'image',
        messages: processMessages(newMessagesToChat),
      }
      const response = await axios.post(
        'http://localhost:8000/chat',
        conversation,
        {headers: {'Content-Type': 'application/json'}},
      )
      setImage(null)
      const newMessages = [
        ...userMessages,
        {content: response.data, role: 'assistant'},
      ]
      const newChatObject = {
        ...chatObject,
        messages: newMessages,
        currentVersion: response.data,
      }
      setChatObject(newChatObject)

      const body = {
        projectId: userId,
        pageId: chatObject.id,
        newData: newChatObject,
      }
      await axios.put('/api/page', body, {
        headers: {'Content-Type': 'application/json'},
      })
    }
  }
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
      {' '}
      <Box flexGrow="1" overflow="auto">
        <ChatMessageBox messages={messages} />
      </Box>
      <TextInput addMessage={addMessage} />
      <Box display="flex">
        <input
          accept="image/ * "
          style={{display: 'none'}}
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
                setImage(null)
              }}
            >
              Remove Image
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

// Function to process messages
const processMessages = (messages) => {
  let assistantMessageCount = 0

  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === 'assistant') {
      assistantMessageCount++
      if (assistantMessageCount > 3) {
        messages[i] = {
          ...messages[i],
          content: 'generated html but removed for brevity',
        }
      }
    }
  }

  return messages
}
