import {app} from './app.js';
const port = process.env.NODE_PORT || 3001;

app.listen(port, () => {
    console.log(`Application running on port ${port}`)
})