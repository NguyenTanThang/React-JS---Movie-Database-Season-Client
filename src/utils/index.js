import {notification} from "antd";
import queryString from "query-string";

export const extractQueryString = (props) => {
    const parsed = queryString.parse(props.location.search);
    return parsed;
}

export const createSearchTitleString = (searchString) => {
    localStorage.setItem("searchTitleString", searchString);
}

export const createSearchGenreString = (genreString) => {
    localStorage.setItem("genreTitleString", genreString);
}

export const createNotification = (type, config) => {
    return notification[type]({
        ...config,
        placement: "bottomRight",
        className: 'custom-notification-class',
        style: {
            backgroundColor: "#2b2b31",
            color: "#FFF"
        },
        duration: 5,
    });
}