import { createNotification } from "./index";

export const isObjectEmpty = obj => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export const validatePassword = password => {
    var minNumberofChars = 8;
    
    if(password.length < minNumberofChars){
        createNotification("error", {
            message: "Password",
            description: "A password must be at least 8 characters in length"
        });
        return false;
    }

    let patt = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    let res = patt.test(password);

    if (!res) {
        createNotification("error", {
            message: "Password",
            description: `A password must have minimum eight characters, at least one uppercase letter (A-Z), one lowercase letter (a-z), one number (0-9) and one special character (@, $, !, %, *, ?, &)`
        });
        return false;
    }
    
    return true;
}