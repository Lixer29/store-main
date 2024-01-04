import React, {useContext} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthRoutes, PublicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils';
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {user.IsAuth &&
                AuthRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            {PublicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<Navigate to={SHOP_ROUTE} />}
            />
        </Routes>
    );
};

export default AppRouter;
