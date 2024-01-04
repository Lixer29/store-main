import AdminPage from "./pages/AdminPage";
import DevicePage from "./pages/DevicePage";
import AuthPage from "./pages/AuthPage";
import ShopPage from "./pages/ShopPage";
import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "./utils";
import BasketPage from "./pages/BasketPage";

export const PublicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },{
        path: REGISTRATION_ROUTE,
        Component: AuthPage
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: SHOP_ROUTE,
        Component: ShopPage
    }
]
export const AuthRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: BASKET_ROUTE,
        Component: BasketPage
    }
]