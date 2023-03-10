import React, { useState } from 'react'
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';

export default (props) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const firebase = useFirebaseApp();
    const user = useUser;

    const submit = async () => {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
    }
}