import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// this is a top-level await
(async () => {
    // open the database
    const db = await open({
        filename: 'database.db',
        driver: sqlite3.Database
    });

    console.log('Opening the connection')
    await db.open();

    console.log('Running the migration files')
    await db.migrate();

    // let migrations = await db.all('SELECT id, name FROM migrations')
    // console.log(migrations)


    // let todos = await db.all('SELECT * from todo')
    // console.log(todos)

    console.log('Closing the connection')
    await db.close();
})()
