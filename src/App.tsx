import React, { useEffect } from "react"
import { Routes, Route, HashRouter } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import IndexPage from "@page/IndexPage"
import SecondPage from "@page/SecondPage"
import AboutPage from "@page/AboutPage"

function App() {
  return (
    <>
      <HashRouter>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<IndexPage/>}/>
            <Route path="/characters" element={<IndexPage/>}/>
            <Route path="/digits" element={<SecondPage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
          </Routes>
        </AnimatePresence>
      </HashRouter>
    </>
  )
}

export default App
