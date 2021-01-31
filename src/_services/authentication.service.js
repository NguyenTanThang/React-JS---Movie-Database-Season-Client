import { BehaviorSubject } from 'rxjs';
import axios from "axios";
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
            return message.error(resMessage, 5);
        }

        const status = res.data.data;

        return status;
    })
    .error(error => {
        message.error(error.message, 5);
    })
}

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${MAIN_PROXY_URL}/customers/login`, requestOptions)
        .then(handleResponse)
        .then(data => {
            const user = data.data;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
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

function logout() {
    const requestOptions = {
        method: 'DELETE'
    };
    const currentSession = authenticationService.currentUserValue.session;
    return fetch(`${MAIN_PROXY_URL}/sessions/delete/${currentSession._id}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            localStorage.removeItem('currentUser');
            currentUserSubject.next(null);
            window.location.replace("/sign-in");
        });
}