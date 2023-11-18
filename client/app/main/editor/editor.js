'use client';
import { Box, TextField, Button } from '@mui/material';
import AceEditor from 'react-ace';
import { useState } from 'react';
export default function Editor({ html, css, js, setHtml, setCss, setJs }) {
  const [htmlText, setHtmlText] = useState(html);
  const [cssText, setCssText] = useState(css);
  const [jsText, setJsText] = useState(js);

  const handleChange = (newValue, setter) => {
    setter(newValue);
  };

  const refresh = () => {
    setHtml(htmlText);
    setCss(cssText);
    setJs(jsText);
  };

  return (
    <Box
      key='editor'
      backgroundColor='white'
      color='black'
      width='45vw'
      height='80vh'
      margin='5px'
      display='flex'
      flexDirection='column'
    >
      <Button onClick={refresh}>Refresh</Button>
      <AceEditor
        mode='html'
        theme='monokai'
        value={htmlText}
        onChange={e => handleChange(e, setHtmlText)}
        name='html_editor'
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2
        }}
        style={{ width: '100%', height: '50%' }}
      />
      <AceEditor
        mode='css'
        theme='monokai'
        value={cssText}
        onChange={e => handleChange(e, setCssText)}
        name='css_editor'
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2
        }}
        style={{ width: '100%', height: '50%' }}
      />
      {/* <AceEditor
        mode='js'
        theme='monokai'
        value={jsText}
        onChange={e => handleChange(e, setJsText)}
        name='js_editor'
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2
        }}
        style={{ width: '100%', height: '50%' }}
      /> */}
    </Box>
  );
}
