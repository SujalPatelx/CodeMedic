import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Debugger from './pages/Debugger'
import Explainer from './pages/Explainer'
import Navbar from './components/Navbar'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Debugger />} />
        <Route path="/explainer" element={<Explainer />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
