import sqlite3 from 'sqlite3';
import express from 'express';
import { open } from 'sqlite';
import bodyParser from 'body-parser';

const db = await open({
    filename: 'database.db',
    driver: sqlite3.Database
});

sqlite3.verbose();

export const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');



async function createTodoItem(item) {
    await db.open()

    const result = await db.run(
        'INSERT INTO todo (todo, completed, user_id) VALUES (?, ?, ?)',
        [item.todo, item.completed ? 1 : 0, item.userId]
    )

    await db.close();
    return result;
}

async function listTodos() {
    await db.open()

    let result = [];
    const todoList = await db.all('SELECT * FROM todo');
    if (todoList) {
        result = todoList;
    }

    await db.close();
    return result;
}

app.get('/', async (req, res, next) => {
    res.render('products');
});

app.get('/login', async (req, res, next) => {
    res.render('login');
});

app.get('/wishlist', async (req, res, next) => {
    res.render('wishlist');
});

app.get('/products', async (req, res, next) => {
    res.render('products');
});

app.get('/product-detail', async (req, res, next) => {
    res.render('product-detail');
});


app.get('/cart', async (req, res, next) => {
    res.render('cart');
});

app.get('/checkout', async (req, res, next) => {
    res.render('checkout');
});

app.get('/order-details', async (req, res, next) => {
    res.render('order-details');
});

app.get('/order-invoice', async (req, res, next) => {
    res.render('order-invoice');
});
app.post('/api/todo', async (req, res, next) => {

    let item = {
        todo: req.body?.todo || '',
        completed: req.body?.completed || false,
        userId: req.body?.userId || 1
    };

    let result = await createTodoItem(item);
    let status = 201;
    let jsonBody = {
        "error": "Unable to save"
    };
    if (result) {
        console.log(`Inserted with id: ${result.lastID}`);
        jsonBody = {
            id: result.lastID,
            ...item
        };
    } else {
        status = 500;
    }

    res.status(status).json(jsonBody);
});

app.get('/api/todo', async (req, res, next) => {

    let result = await listTodos();

    res.json(result);
});