// Iteration 1: All directors? - Get the array of all directors.
function getAllDirectors(moviesArray) {
    return moviesArray.map(movie => movie.director);
}

// Bonus - Iteration 1.1: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectorsClean(moviesArray) {
    return [...new Set(moviesArray.map(movie => movie.director))];
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    const filteredMovies = moviesArray.filter(movie => 
        movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
    );

    if (filteredMovies.length === 0) return 0;

    return filteredMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {

    let scoredMovies = moviesArray.filter(movie => typeof movie.score === "number");

    if (scoredMovies.length === 0) return 0;

    let totalScore = scoredMovies.reduce((acc, movie) => acc + movie.score, 0);

    let averageScore = totalScore / scoredMovies.length;

    return Number(averageScore.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    const dramaMovies = moviesArray.filter(movie => 
        movie.genre.includes("Drama")
    );

    if (dramaMovies.length === 0) return 0;

    let totalDramaScore = dramaMovies.reduce((acc, movie) => acc + movie.score, 0);

    let averageDramaScore = totalDramaScore / dramaMovies.length;

    return Number(averageDramaScore.toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {

    let moviesByYear = [...moviesArray];

    moviesByYear.sort((a, b) => {
        if (a.year !== b.year) {
            return a.year - b.year;
        }
        return a.title.localeCompare(b.title);
    });

    return moviesByYear; 
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {

    let moviesOrderedAlphabetically = [...moviesArray];

    moviesOrderedAlphabetically.sort((a, b) => a.title.localeCompare(b.title));

    return moviesOrderedAlphabetically.map(movie => movie.title).slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function convertToMinutes(duration) {
    let hours = 0, minutes = 0;

    // Extract hours if they exist
    let hoursMatch = duration.match(/(\d+)h/);
    if (hoursMatch) {
        hours = parseInt(hoursMatch[1]) * 60; // We convert hours to minutes
    }

    // Extract minutes if they exist
    let minutesMatch = duration.match(/(\d+)min/);
    if (minutesMatch) {
        minutes = parseInt(minutesMatch[1]); // We convert minutes to number
    }

    return hours + minutes;
}

function turnHoursToMinutes(moviesArray) {

    let moviesConvertedToMinutes = moviesArray.map(movie => ({ ...movie }));

    moviesConvertedToMinutes.forEach(movie => {
        movie.duration = convertToMinutes(movie.duration);
    });

    return moviesConvertedToMinutes;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) return null;

    if (moviesArray.length === 1) {
        const movie = moviesArray[0];
        return `The best year was ${movie.year} with an average score of ${movie.score.toFixed(1)}`;
    }

    // Movies grouped by year
    const years = moviesArray.reduce((acc, movie) => {
        if (!acc[movie.year]) {
            acc[movie.year] = [];
        }
        acc[movie.year].push(movie.score);
        return acc;
    }, {});

    let bestYear = null;
    let bestAvg = 0;

    // Calculate the average
    for (let year in years) {
        const avg = years[year].reduce((sum, score) => sum + score, 0) / years[year].length;

        if (avg > bestAvg || (avg === bestAvg && year < bestYear)) {
            bestAvg = avg;
            bestYear = year;
        }
    }

    return `The best year was ${bestYear} with an average score of ${bestAvg.toFixed(1)}`;
}