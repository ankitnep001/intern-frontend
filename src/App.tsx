import Header from "@components/header/Header"
import About from "@pages/About"
import Home from "@pages/Home"
import Login from "@pages/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
