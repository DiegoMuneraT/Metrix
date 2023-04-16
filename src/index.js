// React
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

// Styled components
import "media/styles/index.css";

// Pages
//import Home from "components/pages/home/homePage";
//import Register from "components/pages/usrSignup/signupView";
//import Login from "components/pages/usrLogin/loginView";
//import Connector from "components/pages/connector/connectorView";
//import Seller from "components/pages/seller/sellerView";
//import Buyer from "components/pages/buyer/buyerView";
//import ErrorPage from "components/pages/error/ErrorPage";
//import { AuthContextProvider } from "context/authContext";
import App from "components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
