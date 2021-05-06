import axios from "axios";

const getOMDBURL = (IMDB_ID) => {
    return `https://www.omdbapi.com/?i=${IMDB_ID}&apikey=a8ef1841`
}

export const getOMDBMovie = async (IMDB_ID) => {
    const res = await axios.get(getOMDBURL(IMDB_ID));

    return res.data;
}
