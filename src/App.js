import {Switch, Route} from 'react-router-dom'
import './App.css'
// import Header from './components/Header'
import About from './components/About'
// import Footer from './components/Footer'
import NotFound from './components/NotFound'
import Home from './components/Home'
import StateSpecificData from './components/StateSpecificData'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/state/:id" component={StateSpecificData} />
      <Route exact path="/about" component={About} />
      <Route path="/bad-path" component={NotFound} />
    </Switch>
  </>
)

export default App
