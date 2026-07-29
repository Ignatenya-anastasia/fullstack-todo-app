const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'mott4565',
    database: 'new_todo-list',
    port: 5432,
    host: 'localhost'
})

export {pool}