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

app.get('/', async (req, res, next) => {
    let todoList = await listTodos();
    res.render('index', {todoList: todoList})
});

app.post('/', async (req, res, next) => {
    console.log('req.method', req.method);
    console.log('req.body', req.body);

    let item = {
        todo: req.body?.todo || '',
        completed: req.body?.completed || false,
        userId: req.body?.userId || 1
    };
    console.log('item', item);

    let result = await createTodoItem(item);
    let success =  (result) ? 'true' : 'false';
    res.redirect('/?success='+success);

});



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

