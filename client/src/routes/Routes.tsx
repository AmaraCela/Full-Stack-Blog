import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from "../components/Navbar";
import Blog from "../pages/Blog";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import LogIn from '../pages/LogIn';
import CreateBlog from '../pages/CreateBlog';
import profile from "../assets/profile.png";

const tags = [
  {id:1, name:'blog'},
  {id:2, name:'tag'},
  {id:3, name:'othertag'}
]
const blog = {
  id:1,
  author:'user',
  profilePic: profile,
  date:new Date(),
  title:"Here goes the title",
  description:"Lorem ipsum...",
  tags:tags,
  images:[profile,profile]
}

const Routes = () => {
    return ( <Router>
          <Navbar></Navbar>
          <Switch>
            <Route path='/create'>
              <CreateBlog/>
            </Route>
            <Route path='/blogs/:id'>
              <Blog blog={blog}/>
            </Route>
            <Route path='/profile/:id'>
              <Profile/>
            </Route>
            <Route path='/login'>
                <LogIn/>
            </Route>
            <Route path='/'>
              <Home/>
            </Route>
          </Switch>
        </Router> );
}
 
export default Routes;