import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Questions from './pages/Questions'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Questions />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
