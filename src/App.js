import {Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import CourseDetails from './components/CourseDetials'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseDetails} />
      <NotFound />
    </Switch>
  </>
)

export default App
