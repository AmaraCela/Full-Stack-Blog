import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FormComponent from './components/FormComponent';
import Blog from './pages/Blog';
function App() {
  return (
    <Router>
    <div className="App">
      <Navbar></Navbar>
     <div className="content">
      <Switch>
        <Route path='/create'>
          <FormComponent/>
        </Route>
        <Route path='/blogs/:id'>
          <Blog/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
     </div>
    </div>
    </Router>
  );
}

export default App;
