const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "My Weather App",
        name: "Daniel Williams"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: "Daniel on About"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: 'Daniel on Help',
        helpMessage: "This is a help page message."
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'An address must be provided.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {    
            if (error) {
                return res.send({ error })
            }
                        
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })     
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help article not found.",
        errorMessage: 'This help article does not exist.'
    })
})

app.get('*', (req, res) => {    
    res.render('404', {
        title: "404 page",
        name: 'Daniel on 404',
        errorMessage: 'This page does not exist.'
    })
})

app.listen(3000, () => {
    console.log('Server started')
})