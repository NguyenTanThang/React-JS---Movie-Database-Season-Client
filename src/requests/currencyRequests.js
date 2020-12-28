import axios from "axios";
import {message} from "antd"

const CURRENCY_API = `https://openexchangerates.org/api/latest.json?app_id=0681618640d74ff18ed919c39bbb5649`;

/*
export const USDtoEuro = async (usd) => {
    try {
        const res = await axios.get(CURRENCY_API);
        const data = res.data;

        if (!data.success) {
            message.error("Failed when trying to get currency rates");
        } 

        const usdRate = data.rates.USD;
        
        return usd / usdRate;
    } catch (error) {
        console.log(error);
        //message.error(error.message);
    }
}

export const EurotoVND = async (euro) => {
    try {
        const res = await axios.get(CURRENCY_API);
        const data = res.data;

        if (!data.success) {
            message.error("Failed when trying to get currency rates");
        } 

        const vndRate = data.rates.VND;
        let vnd = euro * vndRate;
        vnd = vnd.toFixed(0);
        
        return parseInt(vnd);
    } catch (error) {
        console.log(error);
        //message.error(error.message);
    }
}
*/

export const getVNDRate = async () => {
    try {
        const res = await axios.get(CURRENCY_API);

        const rates = res.data.rates;
        const vndRate = rates.VND;
        return vndRate;
    } catch (error) {
        console.log(error);
        message.error(error.message);
    }
}

export const USDtoVND = async (usd) => {
    try {
        const res = await axios.get(CURRENCY_API);

        const rates = res.data.rates;
        const vndRate = rates.VND;
        let vnd = usd * vndRate;
        vnd = vnd.toFixed(0);
        return vnd;
    } catch (error) {
        console.log(error);
        message.error(error.message);
    }
}

export const USDtoVNDWithRate = (usd, vndRate) => {
    usd = parseFloat(usd);
    let vnd = usd * vndRate;
    vnd = vnd.toFixed(0);
    return vnd; 
}