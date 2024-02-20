import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../store/store";
const PrivateRoutes = () => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isLoggedIn);
    return (
        isAuthenticated ? <Outlet></Outlet> : <Navigate to="/login" />
    );
}

export default PrivateRoutes;