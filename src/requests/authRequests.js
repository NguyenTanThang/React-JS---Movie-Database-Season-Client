import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";
import {
    authenticationService
} from "../_services";

const USER_URL = `${MAIN_PROXY_URL}/customers`;
const SUB_URL = `${MAIN_PROXY_URL}/subscriptions`;
const CUSTOMER_URL = `${MAIN_PROXY_URL}/customers`;
const SESSION_URL = `${MAIN_PROXY_URL}/sessions`;

export const editCustomer = async (updatedCustomer) => {
    try {
        message.loading("Saving...", 0);

        if (!authenticationService.currentUserValue) {
            return false;
        }

        const customerID = authenticationService.currentUserValue.customerItem._id;

        if (!customerID) {
            return false;
        }

        const res = await axios.put(`${CUSTOMER_URL}/edit-profile/${customerID}`, updatedCustomer);

        const {
            success
        } = res.data;
        const resMessage = res.data.message;

        if (!success) {
            message.destroy();
            return message.error(resMessage, 5);
        }

        const data = res.data;

        message.destroy();
        message.success(resMessage, 5);
        authenticationService.setNewCustomerItem(data.data.customerItem);

        return data;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const resetPasswordToken = async (email) => {
    try {
        const res = await axios.post(`${CUSTOMER_URL}//reset-password-token`, {
            email
        });

        const {
            success
        } = res.data;
        const resMessage = res.data.message;

        if (!success) {
            return message.error(resMessage, 5);
        }

        const data = res.data;

        message.success(resMessage, 5);

        return data;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const resetPassword = async (token, newPassword) => {
    try {
        const res = await axios.put(`${CUSTOMER_URL}/reset-password/${token}`, {
            newPassword
        });

        const {
            success
        } = res.data;
        const resMessage = res.data.message;

        if (!success) {
            return message.error(resMessage, 5);
        }

        const data = res.data;

        message.success(resMessage, 5);

        return data;
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}

export const changePassword = async (userID, updatePasswordObject) => {
    try {
        message.loading("Changing password...", 0);
        const {
            email,
            oldPassword,
            newPassword
        } = updatePasswordObject;
        const res = await axios.put(`${CUSTOMER_URL}/change-password/${userID}`, {
            email,
            oldPassword,
            newPassword
        });

        const {
            success
        } = res.data;
        const resMessage = res.data.message;

        if (!success) {
            message.destroy();
            return message.error(resMessage, 5);
        }

        const data = res.data;

        message.destroy();
        message.success("Successfully changed password", 5);

        return data;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const getAuthStatus = async () => {
    try {
        if (!authenticationService.currentUserValue) {
            return false;
        }

        const customerID = authenticationService.currentUserValue.customerItem._id;

        if (!customerID) {
            return false;
        }

        const res = await axios.get(`${CUSTOMER_URL}/${customerID}`);

        const {
            success
        } = res.data;
        const user = res.data.data;
 
        if (!success) {
            return false;
        }

        if (!user) {
            return false;
        }

        return true;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const getSubStatus = async () => {
    try {
        const currentUser = authenticationService.currentUserValue;

        if (!currentUser) {
            return false;
        }

        const customerID = authenticationService.currentUserValue.customerItem._id;

        if (!customerID) {
            return false;
        }

        const res = await axios.get(`${SUB_URL}/status/customerID/${customerID}`);

        const {
            success
        } = res.data;
        const resMessage = res.data.message;

        if (!success) {
            return message.error(resMessage, 5);
        }

        const status = res.data.data;

        return status;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const getDetailedSubStatus = async () => {
    try {
        const currentUser = authenticationService.currentUserValue;

        if (!currentUser) {
            return false;
        }

        const customerID = authenticationService.currentUserValue.customerItem._id;

        if (!customerID) {
            return false;
        }

        const res = await axios.get(`${SUB_URL}/status/customerID/${customerID}`);

        const {
            success
        } = res.data;
        const resMessage = res.data.message;

        if (!success) {
            return message.error(resMessage, 5);
        }

        const status = res.data.data;
        const subscription = res.data.subscription;

        return {
            subStatus: status,
            subscription
        };
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const logout = () => {
    localStorage.clear();
}

export const setCurrentUser = (user) => {
    localStorage.setItem("userID", user.customerItem._id);
}

export const getCurrentUser = () => {
    return localStorage.getItem("userID")
}

export const signup = async (newUser) => {
    try {
        const {
            username,
            email,
            password
        } = newUser;
        const res = await axios.post(`${USER_URL}/signup`, {
            username,
            email,
            password
        });

        const {
            success
        } = res.data;
        const resMessage = res.data.message;

        if (!success) {
            return message.error(resMessage, 5);
        }

        const data = res.data;

        message.success("Please go to the email to validate the new account to login", 5);

        return data;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const login = async (currentUser) => {
    try {
        const {
            email,
            password
        } = currentUser;

        const res = await axios.post(`${USER_URL}/login`, {
            email,
            password
        });

        const {
            success
        } = res.data;
        const resMessage = res.data.message;

        if (!success) {
            return message.error(resMessage, 5);
        }

        const data = res.data;
        const user = res.data.data;

        message.success("Successfully logged in", 5);
        setCurrentUser(user);

        return data;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const validateSession = async () => {
    try {
        const sessionID = authenticationService.currentUserValue.session._id;

        if (!sessionID) {
            return false;
        }

        const res = await axios.get(`${SESSION_URL}/${sessionID}`);

        const {
            success
        } = res.data;
        const resMessage = res.data.message;

        if (!success) {
            return message.error(resMessage, 5);
        }

        const session = res.data.data;

        if (session && +session.expiry_date > +Date.now()) {
            return true
        }

        return false;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const refreshSession = async () => {
    try {
        const sessionID = authenticationService.currentUserValue.session._id;

        if (!sessionID) {
            return false;
        }

        const res = await axios.put(`${SESSION_URL}/refresh/${sessionID}`);

        const {
            success
        } = res.data;
        const resMessage = res.data.message;

        if (!success) {
            return message.error(resMessage, 5);
        }

        const session = res.data.data;

        return session;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const validatePaidUser = async () => {
    const auth = await getAuthStatus();
    const sub = await getSubStatus();
    const sess = await validateSession();

    return auth && sub && sess;
}

export const validateFreeUser = async () => {
    const auth = await getAuthStatus();
    const sub = await getSubStatus();
    const sess = await validateSession();

    return auth && !sub && sess;
}

export const sessionAutoRefreshMechanic = async () => {
    try {
        setInterval(async () => {
            if (authenticationService.currentUserValue) {
                const currentSession = authenticationService.currentUserValue.session;

                if (!currentSession) {
                    return authenticationService.logout();
                }

                if (+new Date(currentSession.expiry_date) - +Date.now() <= 1000 * 60  * 2 && +new Date(currentSession.expiry_date) - +Date.now() > 0) {
                    const session = await refreshSession();
                    return authenticationService.setNewSession(session);
                } 
                
                if (+new Date(currentSession.expiry_date) - +Date.now() <= 0) {
                    return authenticationService.logout();
                }
            }
        }, 5000);
    } catch (error) {
        message.error(error.message);
    }
}