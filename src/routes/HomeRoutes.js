import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import HomeSearch from 'views/pages/home-search/HomeSearch';
import MainLayout from 'layout/MainLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const HomeRoutes = {
    path: '/',
    element: <MainLayout showToggle={false} showSidebar={false} showSearchBar={false} showNotification={false} />,
    children: [
        {
            path: '/pages/search-home',
            element: <HomeSearch />
        }
    ]
};

export default HomeRoutes;
