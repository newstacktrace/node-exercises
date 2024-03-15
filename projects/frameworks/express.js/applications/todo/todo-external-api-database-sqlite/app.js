import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
export const app = express();

//https://dummyjson.com/todos/
const host = "http://localhost:3001";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');



async function createTodoItem(item) {
    // Envia uma requisição post
    const response =  await axios.post(`${host}/todo`, item);
    let result = null;
    if (response?.status === 201) {
        console.log('response', response.data);
        result = {
            lastID: response?.id || 0,
            ...response.data
        }
    }

    return result;
}

async function listTodos() {
    // Envia uma requisição get
    const response = await axios.get(`${host}/todo`);
    let result = [];
    if (response?.status === 200) {
        console.log('response', response.data);
        result = response.data
    }

    return result;
}

app.get('/', async (req, res, next) => {
    res.render('index');
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
