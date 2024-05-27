import About from "@pages/About"
import Home from "@pages/Home"
import Login from "@pages/Login"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Templates from "templates/Templates"


const router = createBrowserRouter([{
  path: '/',
  element: <Templates />,
  children: [
    { index: true, element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/login', element: <Login /> }
  ]
}])
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
