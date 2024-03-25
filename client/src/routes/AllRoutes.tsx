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
import Settings from '../pages/Settings';
import EditBlog from '../pages/EditBlog';
import SearchResult from '../pages/SearchReults';

const AllRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/create' element={<CreateBlog />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/editprofile/:id' element={<EditProfile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/editBlog/:id' element={<EditBlog />} />
        </Route>
        <Route path='/blogs/:post_id' element={<Blog />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/search/:keyword' element={<SearchResult />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AllRoutes;