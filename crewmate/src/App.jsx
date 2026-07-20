import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreateCrewmate from './pages/CreateCrewmate'
import Gallery from './pages/Gallery'
import CrewmateDetail from './pages/CrewmateDetail'
import EditCrewmate from './pages/EditCrewmate'
import './App.css'

function App (){
  return(
  <BrowserRouter>
  <div className="app-layout">
    <Navbar/>
    <div className="page-content">
      <Routes>
      <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/crewmate/:id" element={<CrewmateDetail />} />
            <Route path="/crewmate/:id/edit" element={<EditCrewmate />} />
      </Routes>
    </div>
    </div> 
  </BrowserRouter>
  )
}
export default App