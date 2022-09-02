import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

// project imports
import Loadable from 'ui-component/Loadable';
import HomeSearch from 'views/pages/home-search/HomeSearch';
// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const HomeRoutes = {
    path: '/',
    element: <MainLayout showToggle={false} showSidebar={false} showSearchBar={false} showNotification={false} />,
    children: [
        {
            path: '/',
            element: <Navigate to="/search" />
        },
        {
            path: 'search',
            element: <HomeSearch />
        }
    ]
};

export default HomeRoutes;
