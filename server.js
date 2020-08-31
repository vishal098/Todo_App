const express = require('express')
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();
const auth = require('./Router/middileware')
var moment = require('moment');

const app = express()


const router = express.Router()



var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
})

app.use(express.json())

app.use('/', router);
require('./Router/user')(router,knex,auth);
require('./Router/city')(router,knex);
require('./Router/Todo')(router,knex,moment,auth);
require('./Router/getUser')(router,knex,auth);
require('./Router/getTodos')(router,knex,auth);

// require('./try')(router,knex);

const port = 4000
app.listen(port,()=>{
    console.log(`${port} is working`);
}) 