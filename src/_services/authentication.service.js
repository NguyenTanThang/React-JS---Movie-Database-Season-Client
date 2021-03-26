import { BehaviorSubject } from 'rxjs';
import axios from "axios";
import {createNotification} from "../utils";
import {message} from "antd";
import {MAIN_PROXY_URL} from "../config/config";
import { handleResponse } from '../_helpers';
//import {getSubStatus} from "../requests/authRequests";

const SUB_URL = `${MAIN_PROXY_URL}/subscriptions`;

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    getSubStatus,
    setNewSession,
    setNewCustomerItem,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function getSubStatus() {
    const {currentUserValue} = authenticationService;

    if (!currentUserValue) {
        return false;
    }

    const customerID = currentUserValue.customerItem._id;

    if (!customerID) {
        return false;
    }
    
    axios.get(`${SUB_URL}/status/customerID/${customerID}`)
    .then(res => {
        const {success} = res.data;
        const resMessage = res.data.message;

        if (!success) {
            return createNotification("error", {
                message: "Subscription Status",
                description: resMessage
            });
        }

        const status = res.data.data;

        return status;
    })
    .error(error => {
        return createNotification("error", {
            message: "Subscription Status",
            description: error.message
        });
    })
}

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    fetch(`${MAIN_PROXY_URL}/sessions`)
        .then(handleResponse)
        .then(data => {})

    message.loading("Logging in...", 0);
    return fetch(`${MAIN_PROXY_URL}/customers/login`, requestOptions)
        .then(handleResponse)
        .then(data => {
            message.destroy();
            if (data.success) {
                const user = data.data;
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next(user);

                createNotification("success", {
                    message: "Logged in",
                    description: `Welcome back, ${user.customerItem.username}`
                });
    
                return user;
            } else {
                createNotification("error", {
                    message: "Login",
                    description: data.message
                });
                throw new Error();
            }
        });
}

function setNewSession(session) {
    const {currentUserValue} = authenticationService;

    localStorage.setItem('currentUser', JSON.stringify({
        ...currentUserValue,
        session
    }));
    currentUserSubject.next({
        ...currentUserValue,
        session
    });
}

function setNewCustomerItem(customerItem) {
    const {currentUserValue} = authenticationService;

    localStorage.setItem('currentUser', JSON.stringify({
        ...currentUserValue,
        customerItem
    }));
    currentUserSubject.next({
        ...currentUserValue,
        customerItem
    });
}

function logout() {
    const requestOptions = {
        method: 'DELETE'
    };
    const currentSession = authenticationService.currentUserValue.session;
    if (currentSession) {
        return fetch(`${MAIN_PROXY_URL}/sessions/delete/${currentSession._id}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            if (data && data.success) {
                localStorage.removeItem('currentUser');
                currentUserSubject.next(null);
                window.location.replace("/sign-in");
            } else {
                createNotification("error", {
                    message: "Logout",
                    description: data.message
                });
            }
        });
    } else {
        localStorage.removeItem('currentUser');
        currentUserSubject.next(null);
        window.location.replace("/sign-in");
    }
}