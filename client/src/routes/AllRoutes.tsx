import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Blog from "../pages/Blog";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import LogIn from '../pages/LogIn';
import CreateBlog from '../pages/CreateBlog';
import SignUp from '../pages/SignUp';
import Footer from '../components/Footer';
import PrivateRoutes from './PrivateRoutes';
import EditProfile from '../pages/EditProfile';


const AllRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/create' element={<CreateBlog />}></Route>
          <Route path='/profile/:id' element={<Profile />}></Route>
          <Route path='/editprofile/:id' element={<EditProfile />}></Route>
        </Route>
        <Route path='/blogs/:id' element={<Blog></Blog>} />
        <Route path='/login' element={<LogIn></LogIn>} />
        <Route path='/signup' element={<SignUp></SignUp>} />
        <Route path='/' element={<Home></Home>} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default AllRoutes;