const dotenv = require('dotenv').config();


var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
})

knex.schema.hasTable('cities').then((exist) => {
    if (!exist) {
        return knex.schema.createTable('cities', function (table) {
            table.increments('city_id').primary();
            table.string('city_name',100);
        })
    } else {
        console.log('This table is already exits');
    }
}).catch((err) => {
    console.log(err);
})


knex.schema.hasTable('user').then((exist) => {
    if (!exist) {
        return knex.schema.createTable('user', function (table) {
            table.increments('user_id').primary();
            table.string('user_name',100);
            table.string('email',40);
            table.string('password',80)
            table.integer('age',2);
            table.integer('city_id').unsigned().references('cities.city_id')
        })
    } else {
        console.log('This table is already exits');
    }
}).catch((err) => {
    console.log(err);
})


knex.schema.hasTable('Todo_task').then((exist) => {
    if (!exist) {
        return knex.schema.createTable('Todo_task', function (table) {
            table.integer('user_id').unsigned().references('user.user_id')
            table.string('text',100);
            table.string('assignedTo',100);
            table.date('dueDate');
        })
    } else {
        console.log('This table is already exits');
    }
}).catch((err) => {
    console.log(err);
})