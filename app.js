const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const { getMovies, getTrailer, searchMovie } = require('./utils/imgdbAPI')

const app = express()
const port = 3000



//SETUP METHOD-OVERRIDE
app.use(methodOverride('_method'))

//SETUP EJS
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//FLASH DLL
const flash = require('connect-flash')


// Routes dan logika lainnya
app.use(flash())

// HALAMAN HOME
app.get('/', async (req, res) => {
    const data = getMovies()
    const movies = await data

    const search = searchMovie()


    res.render('home', {
        title: "Landing Page",
        layout: 'layouts/main-layout',
        movies,
        search
    })
})


app.get('/movie/:id', async (req, res) => {
    try {
        const data = getMovies()
        const movies = await data

        const findMovie = movies.find(movie => movie.id === Number(req.params.id));

        const trailer = getTrailer(req.params.id)
        const movieTrailer = await trailer

        res.render('details', {
            title: "Details Movie",
            layout: 'layouts/main-layout',
            findMovie,
            movieTrailer
        })

    } catch (err) {
        return err
    }
})
app.get('/search/:id', async (req, res) => {
    try {
        const findMovie = await searchMovie(req.params.id)
        const movieTrailer = await getTrailer(req.params.id)

        res.render('search', {
            title: "Search Result",
            layout: 'layouts/main-layout',
            findMovie,
            movieTrailer
        })

    } catch (err) {
        return err
    }
})







app.use('/', (req, res) => {
    res.sendStatus(404)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})