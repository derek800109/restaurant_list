// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// setting static files
app.use(express.static('public'))

// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes setting
app.get('/', (req, res) => {
  // create a variable to store movies
  
  // past the movie data into 'index' partial template
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  console.log("keyword", keyword , req.query.keyword)
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || 
            restaurant.name_en.toLowerCase().includes(keyword)
  })
  
  res.render('index', { restaurants: restaurants, keyword: keyword})
})


app.get('/restaurants/:restaurant_id', (req, res) => {
  
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id) 
  res.render('show', { restaurant: restaurant })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on  http://localhost:${port}`)
})