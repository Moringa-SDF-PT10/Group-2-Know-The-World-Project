import { createBrowserRouter, RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './routes'
import { UserProvider } from './context/UserProvider'
import { LoginStatusProvider } from './context/LoginStatusProvider'

const router = createBrowserRouter(routes);
createRoot(document.getElementById('root')).render(
  <LoginStatusProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </LoginStatusProvider>
)
