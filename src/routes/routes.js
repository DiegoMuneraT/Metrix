import { Navigate, useRoutes } from "react-router-dom";
// Pages
import Register from "components/pages/usrSignup/signupView";
import auth_login from "components/pages/usrLogin/loginView";
import Connector from "components/pages/connector/connectorView";
import Seller from "components/pages/seller/sellerView";
import Buyer from "components/pages/buyer/buyerView";
import ErrorPage from "components/pages/error/ErrorPage";

// -------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
        {
            path: 'loginView',
            element: <auth_login />,
        },
        {
            path: 'signupView',
            element: <Register />,
        },
        {
            path: 'connectorView',
            element: <Connector />,
        },
        {
            path: 'sellerView',
            element: <Seller />,
        },
        {
            path: 'buyerView',
            element: <Buyer />,
        },
        {
            path: '*',
            element: <ErrorPage/>,
        },
    ]);

    return routes
}