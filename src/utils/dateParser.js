import moment from 'moment';

export const parseDateNormal = (date) => {
    var currentdate = new Date(date); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return datetime;
}

export const parseDateMoment = (date) => {
    return moment(date).format('MMM Do YYYY');
}

export const parseDateMomentWithTime = (date) => {
    return moment(date).format('MMM Do YYYY, hh:mm');
}

export const parseDateMomentSecToDate = (secs) => {
    var currentdate = new Date(1970, 0, 1); 
    currentdate.setSeconds(secs);
    return moment(currentdate).format('MMM Do YYYY');
}