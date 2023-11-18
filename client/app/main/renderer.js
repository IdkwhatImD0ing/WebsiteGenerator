"use client";

import { Box } from "@mui/material";

export default function Renderer({ html }) {
  return (
    <Box
      key="renderer"
      backgroundColor="white"
      color="black"
      width="45vw"
      height="80vh"
    >
      {" "}
      <iframe
        srcDoc={html}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
  );
}
