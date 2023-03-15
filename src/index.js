// React
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Styled components
import "media/styles/index.css";

// Pages
import Register from "components/pages/usrSignup/signupView";
import Login from "components/pages/usrLogin/loginView";
import Connector from "components/pages/connector/connectorView";
import Seller from "components/pages/seller/sellerView";
import Buyer from "components/pages/buyer/buyerView";
import ErrorPage from "components/pages/error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
<<<<<<< HEAD
    element: <Connector/>,
    errorElement: <ErrorPage/>,
=======
    element: <Register />,
    errorElement: <ErrorPage />,
>>>>>>> 5dff410df01f8df49012b8f7a296e21ae2375de0
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
