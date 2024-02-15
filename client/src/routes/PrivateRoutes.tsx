import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../store/store";
const PrivateRoutes = () => {
    const isAuth = useSelector((state:RootState)=>state.user.isLoggedIn);
    return ( 
        isAuth ? <Outlet></Outlet> : <Navigate to="/login"/>
    );
}
 
export default PrivateRoutes;