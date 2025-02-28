import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

export const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleDebug = async () => {
    try {
      const res = await axios.post("http://localhost:5000/debug", { code });
      setOutput(res.data.correctedCode);
    console.log(code)
    } catch (error) {
      setOutput("Error processing code");
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-xl font-bold">AI Code Debugger</h1>
      <Editor 
        height="50vh" 
        theme="vs-dark" 
        defaultLanguage="javascript" 
        value={code} 
        onChange={setCode} 
      />
      <button 
        onClick={handleDebug} 
        className="mt-4 px-4 py-2 bg-blue-500 rounded"
      >
        Debug Code
      </button>
      <pre className="mt-4 p-2 bg-gray-800">{output}</pre>
    </div>
  );
};

 
