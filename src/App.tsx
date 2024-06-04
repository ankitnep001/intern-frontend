import AdminDashboard from "@components/admin/AdminDashboard"
import AdminTable from "@components/admin/AdminTable"
import ChangePassword from "@components/admin/ChangePassword"
import CreateAdmin from "@components/admin/CreateAdmin"
import ViewDetails from "@components/admin/ViewDetails"
import About from "@pages/About"
import Home from "@pages/Home"
import Login from "@pages/Login"
import ProtectedRoute from "ProtectedRoute"
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
},
{
  path: '/admin',
  element: <ProtectedRoute />,
  children: [
    { index: true, element: <AdminDashboard /> },
    { path: 'admintable', element: <AdminTable /> },
    { path: 'changepassword', element: <ChangePassword /> },
    { path: 'createAdmin', element: <CreateAdmin /> },
    { path: 'admintable/viewdetails/:id', element: <ViewDetails /> },
  ]
},
])
function App() {

  return (
    <>
      <div id="toast-container-main"></div>
      <RouterProvider router={router} />
    </>
  )
}

export default App
