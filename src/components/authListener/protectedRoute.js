import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from 'context/authContext';
import { getDatabase, ref, onValue } from "firebase/database";


const readUserData = (userEmail) => {
    const db = getDatabase();
    // userEmail no esta entrando deberia entrar como "users/?id?/userEmail"
    const getInfo = ref(db, "users/");
    let userData;
    onValue(getInfo, (snapshot) => {
      if (snapshot.exists()) {
        userData = snapshot.val();
      } else {
        console.log("No data available");
      }
    });
    return userData;
};

const ProtectedRoute = ({ children }) => {
    const { user } = UserAuth();

    if(!user) {
        return <Navigate to='/' />
    }
    return children;
};

export default ProtectedRoute;