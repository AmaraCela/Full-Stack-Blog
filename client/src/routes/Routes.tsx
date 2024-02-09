import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from "../components/Navbar";
import Blog from "../pages/Blog";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import LogIn from '../pages/LogIn';
import CreateBlog from '../pages/CreateBlog';
import profile from "../assets/profile.png";
import SignUp from '../pages/SignUp';
import Footer from '../components/Footer';

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
  description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut leo elementum, scelerisque justo eget, consequat leo. Nam eget aliquet sapien, vitae varius augue. Etiam commodo auctor turpis sit amet facilisis. Fusce sagittis, ipsum non faucibus cursus, purus magna ultrices dui, sed maximus odio urna eget lorem. Fusce cursus sodales magna at malesuada. Donec suscipit arcu sit amet turpis gravida, nec vulputate lacus iaculis. Curabitur vitae urna ut elit pharetra tincidunt. Aliquam sollicitudin nulla pulvinar egestas ullamcorper. Fusce neque lectus, sagittis sit amet tempus id, mollis sed neque. Fusce pulvinar leo ac ex euismod, sit amet pretium nibh scelerisque. Fusce ligula ante, congue sed libero sed, feugiat egestas odio. Donec fringilla vehicula ipsum, nec ornare velit. Curabitur pulvinar fringilla nibh quis efficitur.",
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
            <Route path='/signup'>
              <SignUp/>
            </Route>
            <Route path='/'>
              <Home/>
            </Route>
          </Switch>
          <Footer/>
        </Router> );
}
 
export default Routes;