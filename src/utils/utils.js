import axios from "axios";

export const detectLeavePage = () => {
    console.log("detectLeavePage");
    /*
    window.addEventListener('beforeunload', (event) => {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        console.log(event);
        // Older browsers supported custom message
        event.returnValue = 'DO YOU really want to exit a fun page like this?';
    });
    */

    document.addEventListener('mouseleave', e=>{
        //do some async code
        console.log(e);
    });
   
    document.addEventListener('visibilitychange', e=>{
        if (document.visibilityState === 'visible') {
            console.log(e);
            console.log(document);
        } else {
            console.log(e);
            console.log(document);
        }  
    });
}

export function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

export const encryptVideoURL = (url) => {

}

export const blobFromURL = async (url) => {
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                //"Access-Control-Allow-Origin": "*"
            }
        })

        const base64URL = Buffer.from(response.data, 'binary').toString('base64');

        console.log(response);
        console.log(`data:video/mp4;base64,${base64URL}`);

        return `data:video/mp4;base64,${base64URL}`;
    } catch (error) {
        console.log(error);
    }
}

export const blobFromURLStandard = async (prefix, url) => {
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                //"Access-Control-Allow-Origin": "*"
            }
        })

        const base64URL = Buffer.from(response.data, 'binary').toString('base64');

        console.log(`${prefix}${base64URL}`);

        return `${prefix}${base64URL}`;
    } catch (error) {
        console.log(error);
    }
}

export const filterRecommendationSection = (recommendedGenres, movies) => {
    let recList = [];
    recommendedGenres.forEach(recommendedGenre => {
        let currentArray = [];
        movies.forEach(movieItem => {
            if (movieItem.genres.includes(recommendedGenre) && !currentArray.includes(movieItem)) {
                currentArray.push(movieItem);
            }
        })
        recList.push({
            //movieList: currentArray.slice(0, 6),
            movieList: currentArray,
            currentGenre: recommendedGenre
        })
    })

    return recList;
}