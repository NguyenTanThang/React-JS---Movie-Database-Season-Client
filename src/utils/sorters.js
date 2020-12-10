export const sortMoviesAndSeries = (list, searchObject) => {
    const {
        searchName,
        orderBy,
        sortGenres
    } = searchObject;
    let returnedList = list;

    if (searchName) {
        returnedList = sortMoviesAndSeriesByName(returnedList, searchName);
    }

    if (orderBy) {
        returnedList = sortMoviesAndSeriesOrderBy(returnedList, orderBy);
    }

    if (sortGenres && sortGenres.length > 0) {
        returnedList = sortMoviesAndSeriesByGenres(returnedList, sortGenres);
    }

    return returnedList;
}

const sortMoviesAndSeriesByGenres = (list, sortGenres) => {
    let returnedList = [];

    /*
    sortGenres.forEach(sortGenre => {
        list.forEach(item => {
            if (item.genres.includes(sortGenre)) {
                if (!returnedList.includes(item)) {
                    returnedList.push(item);
                }
            }
        })
    })
    */

    /*
    list.forEach(item => {
        if (item.genres.sort().join("").includes(sortGenres.sort().join(""))) {
            if (!returnedList.includes(item)) {
                returnedList.push(item);
            }
        }
    })
    */

    list.forEach(item => {
        let matchCounter = 0;
        sortGenres.forEach(sortGenre => {
            if (item.genres.includes(sortGenre)) {
                matchCounter++;
                if (!returnedList.includes(item) && matchCounter === sortGenres.length) {
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
        //console.log(item);
        const {name, genres} = item;
        let imdbMovie = item.imdbMovie || item.imdbSeries;
        const {Actors, Director} = imdbMovie;
        console.log(imdbMovie);

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