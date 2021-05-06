export const sortMoviesAndSeries = (list, searchObject) => {
    const {
        searchName,
        orderBy,
        sortGenres
    } = searchObject;
    let returnedList = list;

    if (sortGenres && sortGenres.length > 0) {
        returnedList = sortMoviesAndSeriesByGenres(returnedList, sortGenres);
    }

    if (searchName) {
        returnedList = sortMoviesAndSeriesByName(returnedList, searchName);
    }

    if (orderBy) {
        returnedList = sortMoviesAndSeriesOrderBy(returnedList, orderBy);
    }

    return returnedList;
}

const sortMoviesAndSeriesByGenres = (list, sortGenres) => {
    let returnedList = [];

    if (sortGenres.includes("All")) {
        return list;
    }

    sortGenres.forEach(sortGenre => {
        list.forEach(item => {
            if (item.genres.includes(sortGenre)) {
                if (!returnedList.includes(item)) {
                    returnedList.push(item);
                }
            }
        })
    })

    return returnedList;
}

const sortMoviesAndSeriesByName = (list, searchName) => {
    let ans = [];

    for (let index = 0; index < list.length; index++) {
        const item = list[index];
        const {name, genres} = item;
        let imdbMovie = item.imdbMovie || item.imdbSeries;
        const {Actors, Director} = imdbMovie;

        if (name.toLowerCase().includes(searchName.toLowerCase())) {
            ans.push(item);
            continue;
        }

        if (Actors.toLowerCase().includes(searchName.toLowerCase())) {
            ans.push(item);
            continue;
        }

        if (Director.toLowerCase().includes(searchName.toLowerCase())) {
            ans.push(item);
            continue;
        }

        if (genres.join("").toLowerCase().includes(searchName.toLowerCase())) {
            ans.push(item);
            continue;
        }
    }

    return ans;
}

const sortMoviesAndSeriesOrderBy = (list, orderBy) => {
    let returnedList = list;

    switch (orderBy) {
        case "AtoZ":
            returnedList = list.sort((a, b) => a.name.localeCompare(b.name))
            break;
        case "ZtoA":
            returnedList = list.sort((a, b) => b.name.localeCompare(a.name))
            break;
        case "ratingUp":
            returnedList = list.sort((a, b) => a.rating - b.rating)
            break;
        case "ratingDown":
            returnedList = list.sort((a, b) => b.rating - a.rating)
            break;
        default:
            break;
    }

    return returnedList;
}

export const getHighestRating = (list) => {
    let returnedList = list;

    returnedList = returnedList.sort((a, b) => {
        return b.rating - a.rating;
    })

    return returnedList;
}