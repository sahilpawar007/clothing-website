import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";
import { useAppSelector } from "../../redux/hooks";

const ProtectedRoute: React.FC = () => {
    const { loading, isAuthenticated } = useAppSelector((state) => state.user);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <Outlet />
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProtectedRoute;
