import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectUser } from "../store/store";

const PrivateRoutes = () => {
    const isAuthenticated = useSelector(selectUser).isLoggedIn;

    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    );
}

export default PrivateRoutes;