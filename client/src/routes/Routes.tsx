import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import FormComponent from "../components/FormComponent";
import Navbar from "../components/Navbar";
import Blog from "../pages/Blog";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

const Routes = () => {
    return ( <Router>
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
            <Route path='/profile/:id'>
              <Profile/>
            </Route>
            <Route path='/'>
              <Home/>
            </Route>
          </Switch>
         </div>
        </div>
        </Router> );
}
 
export default Routes;