import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import React from 'react'

export const CodeEditor = () =>
{
    return (

        <>
            <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />
        </>
    )
}
 
