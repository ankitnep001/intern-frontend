import AdminDashboard from "@components/admin/AdminDashboard"
import AdminTable from "@components/admin/AdminTable"
import ChangePassword from "@components/admin/ChangePassword"
import About from "@pages/About"
import Home from "@pages/Home"
import Login from "@pages/Login"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AdminTemplate from "templates/AdminTemplate"
import Templates from "templates/Templates"

const router = createBrowserRouter([{
  path: '/',
  element: <Templates />,
  children: [
    { index: true, element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/login', element: <Login /> }
  ]
},
{
  path: '/admin',
  element: <AdminTemplate />,
  children: [
    { index: true, element: <AdminDashboard /> },
    { path: 'admintable', element: <AdminTable /> },
    { path: 'changepassword', element: <ChangePassword /> },
  ]
},
])
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
