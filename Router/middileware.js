const bcrypt = require('bcryptjs');

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
})

let checkpassword = (req,res,next)=>{
    user_email = req.headers.email
    console.log(user_email);
    user_password = req.headers.password
    knex.select('*').from('user')
        .where('email',user_email)
        .then((data)=>{
                if (bcrypt.compareSync(user_password,data[0].password)) {
                    next()
                } else {
                    res.send("You havn't login \n First login your account")
                }
        }).catch((err)=>{
            console.log(err);
        })
    
}

module.exports = checkpassword
