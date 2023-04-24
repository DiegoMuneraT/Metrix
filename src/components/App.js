
// Styled components
import 'media/styles/App.css';
//React
import React from 'react';
import { Route, Routes } from 'react-router-dom';
// Context
import { AuthContextProvider } from 'context/authContext';
import ProtectedRoute from './authListener/protectedRoute';
// Components
import Signin from 'components/pages/usrSignup/signupView';
import Login from 'components/pages/usrLogin/loginView';
import Account from './account/Account';
import Home from "components/pages/home/homePage";
import ErrorPage from "components/pages/error/ErrorPage";
import Connector from "components/pages/connector/connectorView";
import Seller from "components/pages/seller/sellerView";
import Buyer from "components/pages/buyer/buyerView";
import Post from 'components/pages/seller/postProduct';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Home/>} errorElement={<ErrorPage/>} />
        <Route path='/login' element={<Login/>} errorElement={<ErrorPage/>} />
        <Route path='/register' element={<Signin/>} errorElement={<ErrorPage/>} />
        <Route
          path='/account'
          element={
            <ProtectedRoute>
              <Account/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/account/connector'
          element={
            <ProtectedRoute>
              <Connector/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/account/seller'
          element={
            <ProtectedRoute>
              <Seller/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/account/seller/post'
          element={
            <ProtectedRoute>
              <Post/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/account/buyer'
          element={
            <ProtectedRoute>
              <Buyer/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthContextProvider>
  )
}

export default App;