import { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

interface RouteProps {
    path: string;
    component: any;
    render?: any;
    rest?: any;
}


const ProtectedRoute: React.FC<RouteProps> = ({ path, component: Component, render, ...rest }) => {
    const emailId = localStorage.getItem("emailId");


    return (
        <Route
            exact
            path={path}
            {...rest}
            render={(props) => {
                if (!emailId) return <Redirect to="/loginPage" />;
                return Component ? <Component {...props} /> : render(props);
            }}
        />
    );
}

export default ProtectedRoute;