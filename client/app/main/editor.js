"use client";
import { Box, TextField, Button } from "@mui/material";
import AceEditor from "react-ace";
import { useState } from "react";
export default function Editor({ html, setHtml }) {
  const [htmlText, setHtmlText] = useState(html);

  const handleChange = (newValue, setter) => {
    setter(newValue);
  };

  const refresh = () => {
    setHtml(htmlText);
  };

  return (
    <Box
      key="editor"
      backgroundColor="white"
      color="black"
      width="100%"
      flexGrow="1"
      display="flex"
      flexDirection="column"
    >
      <Button onClick={refresh}>Refresh</Button>
      <AceEditor
        mode="html"
        theme="monokai"
        value={htmlText}
        onChange={(e) => handleChange(e, setHtmlText)}
        name="html_editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
  );
}
