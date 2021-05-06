import axios from "axios";

export const getDaysDiff = (date) => {
    const dateMili = dateToMili(date);
    const dateNowMili = dateToMili(Date.now());
    const diffTime = Math.abs(dateNowMili - dateMili);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays; 
}

const dateToMili = date => {
    const cdate = new Date(date);
    return cdate.getTime();
}

export const measureDeviceWidth = () => {
    let device;
    let screenWidth = document.documentElement.clientWidth;
    let screenHeight = document.documentElement.clientHeight;
    device = indicateDeviceType(screenWidth, screenHeight);
    /*
    window.addEventListener("resize", (e) => {
        screenWidth = document.documentElement.clientWidth;
        screenHeight = document.documentElement.clientWidth;
        device = indicateDeviceType(screenWidth, screenHeight);
    })
    */
    return device;
}

export const indicateDeviceType = (screenWidth, screenHeight) => {
    if (screenWidth >= 320 && screenWidth <= 767) {
        return "mobile";
    } 
    /*
    else if (screenHeight >= 320 && screenHeight <= 767) {
        return "mobile";
    } 
    */
    else if (screenWidth >= 768 && screenWidth <= 1024) {
        return "tablet";
    } 
    /*
    else if (screenHeight >= 768 && screenHeight <= 1024) {
        return "tablet";
    } 
    */
    else if (screenWidth > 1024 || screenHeight > 1024) {
        return "desktop";
    }
}

export const shuffleArray = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

export const detectLeavePage = () => {
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
    });
   
    document.addEventListener('visibilitychange', e=>{
        if (document.visibilityState === 'visible') {
        } else {
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