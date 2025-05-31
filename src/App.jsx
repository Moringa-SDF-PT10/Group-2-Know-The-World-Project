import './App.css'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router'

function App() {

  return (
    <>
      <header>
        <NavBar></NavBar>
      </header>
      <Outlet />
    </>
  )
}

export default App
