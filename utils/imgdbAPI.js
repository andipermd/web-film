const { response } = require("express");

// fetch(`https://api.themoviedb.org/3/discover/movie?api_key=26053bc23c76d5711e30f46f1b46c671&primary_release_year=2024&with_original_language=id
// `)

//     .then(response => {
//         if (!response.ok) {
//             throw new Error(response.statusText)
//         }
//         return response.json()
//     })
//     .then(response => {
//         if (response.Response === 'False') {
//             throw new Error(response.Error)
//         }
//         // return updateUi(response.Search)
//         module
//         return response.results
//     })

//     const fetch = require('node-fetch');


async function searchMovie(id) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=26053bc23c76d5711e30f46f1b46c671&language=en-US`);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const movieDetails = await response.json();
        return movieDetails;
    } catch (err) {
        return err.message;
    }
}

async function getTrailer(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=26053bc23c76d5711e30f46f1b46c671&language=en-US`)
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const trailer = await response.json();

        if (trailer.Response === 'False') {
            throw new Error(trailer.Error);
        }

        return trailer.results;
    } catch (err) {
        return err
    }
}


async function getMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=26053bc23c76d5711e30f46f1b46c671&primary_release_year=2024&with_original_language=id`);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();

        if (data.Response === 'False') {
            throw new Error(data.Error);
        }

        return data.results; // Mengembalikan hasil response.results
    } catch (error) {
        console.error('Error:', error);
        return []; // Mengembalikan array kosong jika ada error
    }
}

// Mengekspor fungsi getMovies untuk digunakan di modul lain
module.exports = { getMovies, getTrailer, searchMovie };







