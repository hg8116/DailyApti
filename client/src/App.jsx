import './App.css'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import Questions from './pages/Questions'

function App() {
  return (
    <Router>
      <div className='App'>
        <h1>DailyApti</h1>
        <Link to="/questions">Questions</Link>
        <Switch>
          <Route path='/questions' component={Questions} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
