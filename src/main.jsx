import { createBrowserRouter, RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './routes'
import { UserProvider } from './context/UserProvider'

const router = createBrowserRouter(routes);
createRoot(document.getElementById('root')).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
)
