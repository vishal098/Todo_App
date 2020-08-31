const bcrypt = require('bcryptjs');
// const auth =  require('./middileware')

module.exports = function(router, knex,auth){

    router.post('/POST/users', (req, res) => {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            console.log(hash);
            var user_details = {
                'user_name': req.body.user_name,
                'email': req.body.email,
                'password': hash,
                'age': req.body.age,
                'city_id': req.body.city_id
            }
            console.log(user_details);
            knex.select('email').from('user').where('email', user_details.email)
                .then((data) => {
                    if (data.length == 0) {
                        knex('user').insert(user_details)
                            .then((id) => {
                                console.log(id);
                                res.send('You have created your account succesfully')
                            }).catch((err) => {
                                console.log(err);
                            })
                    } else {
                        res.send('This Email has already exists')
                    }
                }).catch((err) => {
                    console.log(err);
                })
        })
    })


    router.post('/userlogin',(req,res)=>{
            knex.select('*').from('user')
            .where('email',req.body.email)
            .then((data)=>{
                if(data.length>0){
                    if(bcrypt.compareSync(req.body.password,data[0].password)) {
                        res.send('Login Succesfull')
                    } else {
                        res.send('Invalid password')
                    }
                }else{
                    res.send("This user doesn't exists \n First signup")
                }
            }).catch((err)=>{
                console.log(err);
            })
    })


    router.put('/userUpdate',auth,(req,res)=>{
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            knex('user')
                .update(req.body)
                .where('email', req.headers.email)
                .then((id)=>{
                    console.log(id);
                    res.send('Succesfully updated')
                }).catch((err)=>{
                    console.log(err);
                })
        })
    })

    router.put('/userDelete',auth,(req,res)=>{
        knex('student_details')
        .where("email",req.headers.email).del()
        .then((result)=>{
            res.send("Your account has been deleted")
        })
        .catch((err)=>{console.log(err)})
    })
}