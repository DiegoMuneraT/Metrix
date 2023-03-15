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
    element: <Connector />,
    errorElement: <ErrorPage />,
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
