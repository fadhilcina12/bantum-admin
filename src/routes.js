import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import UsersPages from "./pages/users/UsersPages";
import AddUsers from "./pages/users/AddUsers";
import EditUsers from "./pages/users/EditUsers";
import TypesPages from "./pages/types/TypesPages";
import AddTypes from "./pages/types/AddTypes";
import EditTypes from "./pages/types/EditTypes";
import NeedyPeoplesPages from "./pages/needy-peoples/NeedyPeoplesPages";
import AddNeedyPeople from "./pages/needy-peoples/AddNeedyPeople";
import EditNeedyPeople from "./pages/needy-peoples/EditNeedyPeople";
import Item from "./pages/item/Item";
import AddItem from "./pages/item/AddItem";
import EditItem from "./pages/item/EditItem";
import Fund from "./pages/fund/Fund";
import AddFund from "./pages/fund/AddFund";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },

        { path: 'user', element: <UsersPages /> },
        { path: 'add-user', element: <AddUsers/>},
        { path: 'edit-user/:id', element: <EditUsers/>},

        {path: 'type', element: <TypesPages/>},
        {path: 'add-type', element: <AddTypes/>},
        {path: 'edit-type/:id', element: <EditTypes/>},

        {path: 'needy-people', element: <NeedyPeoplesPages/>},
        {path: 'add-needy-people', element: <AddNeedyPeople/>},
        {path: 'edit-needy-people/:id', element: <EditNeedyPeople/>},

        {path: 'item', element: <Item/>},
        {path: 'add-item', element: <AddItem/>},
        {path: 'edit-item/:id', element: <EditItem/>},

        {path: 'fund', element: <Fund/>},
        {path: 'add-fund', element: <AddFund/>},

        { path: 'products', element: <ProductsPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
