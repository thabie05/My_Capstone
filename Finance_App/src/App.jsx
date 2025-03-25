import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./components/Home"
import Navbar from "./components/Navbar"



const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
