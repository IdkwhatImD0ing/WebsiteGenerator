'use client'

import axios from 'axios'
import {
  Box,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  IconButton,
  Icon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Divider,
} from '@mui/material'
import {useState, useEffect, memo} from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'
import CreateIcon from '@mui/icons-material/Create'
import {useAuth} from '@clerk/clerk-react'
import CloseIcon from '@mui/icons-material/Close'
import {UserButton} from '@clerk/nextjs'

export default function Sidebar({chatObject, setChatObject}) {
  const [pages, setPages] = useState([])
  const [open, setOpen] = useState(false)
  const {userId} = useAuth() // Call useAuth at the top level

  useEffect(() => {
    if (userId) {
      fetchPages() // Pass user.id to fetchProjects
    }
  }, [userId, open])

  // const fetchProjects = async () => {
  //   try {
  //     const response = await axios.get(`api/projects?userId=${userId}`, {
  //       headers: {'Content-Type': 'application/json'},
  //     })
  //     console.log(response)
  //     setProjects(response.data)
  //   } catch (error) {
  //     console.error('Error fetching projects:', error)
  //   }
  // }

  const fetchPages = async () => {
    // TODO: fetch pages for selected project
    try {
      const response = await axios.get(
        `api/pages?userId=${userId}&projectId=${userId}`,
        {
          headers: {'Content-Type': 'application/json'},
        },
      )
      setPages(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching pages:', error)
    }
  }

  const selectPage = async (pageId) => {
    toggleDrawer()
    console.log(pageId)
    const response = await axios.get(
      `api/page?projectId=${userId}&pageId=${pageId}`,
      {
        headers: {'Content-Type': 'application/json'},
      },
    )
    console.log(response.data)
    setChatObject(response.data)
  }

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const addPage = async () => {
    toggleDrawer()
    const requestBody = {
      userId: userId,
      projectId: userId,
      pageName: 'New Page',
    }
    const response = await axios.post('/api/page', requestBody, {
      headers: {'Content-Type': 'application/json'},
    })

    console.log(response.data)
    const chatObject = {
      id: response.data.pageId,
      messages: [],
      currentVersion: '<div>Enter your first message on the left!</div>',
    }
    setChatObject(chatObject)
  }

  const deletePage = async (pageId) => {
    const requestBody = {
      userId: userId,
      projectId: userId,
      pageId: pageId,
    }
    const response = await axios.delete('/api/page', {
      data: requestBody,
      headers: {'Content-Type': 'application/json'},
    })
    if (chatObject.id === pageId) {
      setChatObject({})
    }

    fetchPages()
  }

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingPageId, setEditingPageId] = useState(null)
  const [editingPageName, setEditingPageName] = useState('')

  const openEditModal = (pageId, pageName) => {
    setEditingPageId(pageId)
    setEditingPageName(pageName)
    setEditModalOpen(true)
  }

  const handleCloseModal = () => {
    setEditModalOpen(false)
  }

  const handleUpdated = () => {
    fetchPages()
  }

  return (
    <Box>
      <EditModal
        projectId={userId}
        open={editModalOpen}
        onClose={handleCloseModal}
        initialPageName={editingPageName}
        pageId={editingPageId}
        onUpdated={handleUpdated}
      />
      <IconButton
        onClick={toggleDrawer}
        sx={{position: 'absolute', top: 7, left: 7}}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        variant="temporary"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{p: 2}}
        >
          <UserButton />
          <IconButton onClick={addPage}>
            <AddIcon />
          </IconButton>
        </Stack>

        <Divider />

        <Box
          style={{
            width: 250,
          }}
        >
          <List>
            {pages.map((page, index) => (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                key={index}
                paddingX={2}
                onClick={() => selectPage(page.pageId)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {backgroundColor: '#f5f5f5'},
                }}
              >
                <ListItemText primary={page.name} />
                <Stack direction="row">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation() // Stop propagation
                      openEditModal(page.pageId, page.name)
                    }}
                  >
                    <CreateIcon />
                  </IconButton>

                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation() // Stop propagation
                      deletePage(page.pageId)
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
              </Stack>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}

const EditModal = ({
  projectId,
  open,
  onClose,
  initialPageName,
  pageId,
  onUpdated,
}) => {
  const [newPageName, setNewPageName] = useState(initialPageName)

  const handleNameChange = (event) => {
    setNewPageName(event.target.value)
  }

  const handleConfirmEdit = async () => {
    await axios.put('/api/page', {
      projectId,
      pageId,
      pageName: newPageName,
    })

    onUpdated()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Name</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Page Name"
          type="text"
          fullWidth
          variant="standard"
          value={newPageName}
          onChange={handleNameChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirmEdit}>Confirm</Button>
      </DialogActions>
    </Dialog>
  )
}
