import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Blog from "../pages/Blog";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import LogIn from '../pages/LogIn';
import CreateBlog from '../pages/CreateBlog';
import profile from "../assets/profile.png";
import SignUp from '../pages/SignUp';
import Footer from '../components/Footer';
import PrivateRoutes from './PrivateRoutes';
import lake from "../assets/lake.avif";
import personalBlog from "../assets/personal-blog.jpg";

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
  images:[lake,personalBlog]
}

const AllRoutes = () => {
    return ( 
    <Router>
          <Navbar/>
          <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route path='/create' element={<CreateBlog/>}></Route>
              <Route path='/profile/:id' element={<Profile/>}></Route>
            </Route>
            <Route path='/blogs/:id' element={<Blog blog={blog}></Blog>} />
            <Route path='/login' element={<LogIn></LogIn>}/>
            <Route path='/signup' element={<SignUp></SignUp>}/>
            <Route path='/' element={<Home></Home>}/>
          </Routes>
          <Footer/>
        </Router> 
    );
}
export default AllRoutes;