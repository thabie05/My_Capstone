import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Overview from "./components/Overview"



const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
