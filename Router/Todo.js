// const auth = require('./middileware')
module.exports = function(router,knex,moment,auth){
    router.post('/POST/todos',auth,(req,res)=>{
        knex.select('*').from('user')
            .where('email',req.headers.email)
            .then((id)=>{
                let task = {
                    user_id:id[0].user_id,
                    text:req.body.text,
                    assignedTo:req.body.assignedId,
                    // dueDate:moment().format('YYYY-MM-DD')
                    dueDate:req.body.date
                }
                console.log(task.dueDate);
                knex('Todo_task').insert(task)
                .then((indx)=>{
                    res.send(`Task added succesfull to ${task.assignedTo} by you!`)
                }).catch((err)=>{
                    console.log(err);
                })
        })
    })
}