import axios from "axios";
import {message} from "antd"

const CURRENCY_API = `http://data.fixer.io/api/latest?access_key=8979eef7f696eda5b948f4a96a2dbdaa&format=1`;

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
        message.error(error.message);
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
        message.error(error.message);
    }
}

export const USDtoVND = async (usd) => {
    try {
        const euro = await USDtoEuro(usd);
        const vnd = await EurotoVND(euro);

        return vnd;
    } catch (error) {
        console.log(error);
        message.error(error.message);
    }
}