import { Editor } from '@monaco-editor/react';
import axios from 'axios';
import React, { useState } from 'react';

const Explainer = () => {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleDebug = async () => {
      if (!code.trim()) {
        setError("Please enter some code to debug");
        return;
      }
      console.log(code);
      setLoading(true);
      setError(null);
      
      try {
        const res = await axios.post("http://localhost:5000/explain", { code });
        console.log(res);
        setOutput(res.data.explanation);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.error || "Error processing code");
        setOutput("");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="p-4 bg-gray-900 text-white min-h-screen">
        <h1 className="text-2xl font-bold mb-4">AI Code Explainer</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg mb-2">Input Code:</h2>
            <Editor 
              height="300px"
              theme="vs-dark"
              defaultLanguage="javascript"
              value={code}
              onChange={setCode}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
              }}
            />
          </div>
  
          <button 
            onClick={handleDebug}
            disabled={loading} 
            className={`px-4 py-2 rounded ${
              loading 
                ? 'bg-blue-700 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Explaining...' : 'Explain Code'}
          </button>
  
          {error && (
            <div className="text-red-500 bg-red-900/20 p-3 rounded">
              {error}
            </div>
          )}
  
          {output && (
            <>
            <div>
              <h2 className="text-lg mb-2">Explain Code:</h2>
              <Editor
           
                height="400px"
                theme="vs-dark"
                defaultLanguage="text"
                value={output}
                options={{
                  wordWrap: "on",
                  readOnly: true,
                  minimap: { enabled: false },
                fontFamily: ' sans-serif',
                  fontSize: 14,
                }}
              />
            </div>

              {/* <h1>
                {output}
              </h1> */}
              </>
          )}
        </div>
      </div>
  );
};

export default Explainer;
