const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRouters')

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://grishma:grishma@nodetuts.pyew6.mongodb.net/node-tuts?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log('err'));

// Register view engine
app.set('view engine', 'ejs');

//Middleware and static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
// app.use(morgan('dev'));


// routes
app.get('/', (req, res) => {;
  res.redirect('/blogs')
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
});

// blog router
app.use('/blogs',blogRoutes);

// 404 page
// it has to put in last as express match from the top to bottom
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});