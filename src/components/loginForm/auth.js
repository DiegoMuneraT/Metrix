import { writeUserData, readUserData } from "services/database/firebaseCalls";

const isEmail = () => {
    const reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return reg.test(string)
}

const email = (value) => {
    return value && !isEmail(value.trim()) ? 'Email invalido' : null;    
}

const validate = (values) => {
    const errors = required(['userId','firstName', 'lastName', 'email', 'userType', 'password'], values);
    if(errors.email){
        return errors;
    }
    const emailError = email(values.email);
};

const auth = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        email: data.get('email'),
        password: data.get('password'),
    });
};

export default auth;