import React from 'react'
import { CodeEditor } from './components/Editor'
import Navbar from './components/Navbar'
import { BrowserRouter  , Route, Routes, Link } from 'react-router-dom';
import Debugger from './pages/Debugger';
import Explainer from './pages/Explainer';
import Commenter from './pages/Commenter';

export const App = () =>
{
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Debugger />} />
        <Route path="/explainer" element={<Explainer />} />
        <Route path="/comment" element={<Commenter />} />
      </Routes>
    </BrowserRouter>
   </>
  )
}


