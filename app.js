if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');

const MongoStore = require('connect-mongo');

const dbUrl = 'mongodb://127.0.0.1:27017/LoloCakes';
// const dbUrl = process.env.DB_URL;

const products = require('./routes/products');

//'mongodb://127.0.0.1:27017/LoloCakes' 
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/LoloCakes');
    console.log('Database connected!')
}
main().catch(err => console.log(err));

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionCOnfig = {
    secret: 'thisismysacredsecret',
    resave: false,
    saveUninitialized: true
}

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    }
});

app.use(session(sessionCOnfig))
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/products', products)

app.get('/', (req, res) => {
    res.render('home')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('PAGE NOT FOUND', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong'
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})