import { getAuth } from "firebase/auth";

const auth_get_user_profile = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if(user !== null){
        const displayName = user.displayName;
        const photoURL = user.photoURL;
        // UID Unico
        const uid = user.uid;
    }
};

export default auth_get_user_profile;
