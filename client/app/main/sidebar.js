"use client";

import axios from "axios";
import {
  Box,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from "@mui/icons-material/Close";

export default function Sidebar({}) {
  const [projects, setProjects] = useState(["proj1", "proj2", "proj3"]);
  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [pages, setPages] = useState(["page1", "page2", "page3"]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProjects()
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/page", {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchPages = async (projectId) => {
    // TODO: fetch pages for selected project
    try {
      const response = await axios.get(
        "http://localhost:8000/pages",
        projectId,
        { headers: { "Content-Type": "application/json" } },
      );
      console.log(response);
      setPages(response.data);
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  const selectProject = (index) => {
    if (index === selectedProjectId) {
      setSelectedProjectId(null);
    } else {
      setSelectedProjectId(index);
    }
    console.log("EVENT", index);
    // TODO: will need to get id from event
    // fetchPages()
  };

  const selectPage = (event) => {
    console.log("go");
    // TODO: hit backend of selected page
    toggleDrawer();
  };

  const toggleDrawer = () => {
    console.log("toggleDrawer");
    setOpen(!open);
  };

  const addProject = () => {
    console.log("addProject");
  }

  return (
    <Box>
      <Button onClick={toggleDrawer}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        variant="temporary"
      >
        <Box style={{ textAlign: "right" }}>
        <Button onClick={addProject}>
            <AddIcon />
          </Button>
          <Button onClick={toggleDrawer}>
            <CloseIcon />
          </Button>
        </Box>

        <Box
          style={{
            width: 250,
          }}
        >
          <List>
            {projects.map((project, index) => (
              <Box key={index}>
                <Button onClick={() => selectProject(index)}>
                  <ListItemText primary={project} />
                </Button>
                {index === selectedProjectId && (
                  <List
                    style={{
                      marginLeft: "20px",
                    }}
                  >
                    {pages.map((page, pageIndex) => (
                      <Box key={pageIndex}>
                        <Button key={pageIndex} onClick={() => selectPage()}>
                          <ListItemText primary={page} />
                        </Button>
                      </Box>
                    ))}
                  </List>
                )}
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
