import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import React, { useRef, useState } from 'react'

export const CodeEditor = () =>
{
    const [codeString,setCodeString]=useState('')
    const editorRef = useRef(null);

    function handleEditorDidMount (editor, monaco)
    {
        editorRef.current = editor;
        console.log(editorRef.current.getValue())
    }
    // console.log(codeString)
    // setCodeString(editorRef.current.getValue())
    return (
        <>
            <Editor height="90vh" defaultLanguage="javascript" defaultValue='//code'
                onMount={handleEditorDidMount}  
            />
        </>
    )
}

