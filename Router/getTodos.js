
// module.exports = function(router,knex,auth){
//     router.get('/GET/mytodos',auth,(req,res)=>{
//         knex.select("*").from('user')
//         .where('email',req.headers.email)
//         .then((id)=>{
//             knex.select('*').from('Todo_task')
//                 .join('user','Todo_task.user_id','=','user.user_id')
//                 .join('cities','user.city_id','=','cities.city_id')
//                 .where('Todo_task.assignedTo',id[0].user_id)
//                 .then((data)=>{
//                     let alltodos = {}
//                     let todos = []
//                     data.map(x=>{
//                         var dict={
//                             "todo":{
//                                 "text":x.text,
//                                 "assignedTo":{
//                                     "id": x.user_id,
//                                     "name":x.Name,
//                                     "email":x.email,
//                                     "age":x.age,
//                                     "city": {
//                                         "name":x.name, 
//                                         "id":x.city_id,
//                                     }
//                                 },
//                                 "dueDate":x.dueDate
//                             }
//                         }
//                         todos.push(dict)
//                     })
//                     alltodos['todos']=todos
//                     res.send(alltodos)
//                 }).catch((err)=>{
//                     console.log(err);
//                 })
//         }).catch((err)=>{
//             console.log(err);
//         })
//     })
// }


module.exports = function(router,knex,auth){
    router.get('/GET/mytodos',auth,(req,res)=>{
        knex.select("*").from('user')
        .join('cities','user.city_id','=','cities.city_id')
        .where('email',req.headers.email)
        .then((id)=>{
            knex.select('*').from('Todo_task')
                .where('Todo_task.assignedTo',id[0].user_id)
                .then((data)=>{
                    let alltodos = {}
                    let todos = []
                    data.map(x=>{
                        let date = x.dueDate
                        let Date = date.toLocaleString().slice(0,10)
                        var dict={
                            "todo":{
                                "text":x.text,
                                "assignedTo":{
                                    "id": id[0].user_id,
                                    "name":id[0].user_name,
                                    "email":id[0].email,
                                    "age":id[0].age,
                                    "city": {
                                        "name":id[0].city_name, 
                                        "id":id[0].city_id,
                                    }
                                },
                                "dueDate":Date
                            }
                        }
                        todos.push(dict)
                    })
                    alltodos['todos']=todos
                    res.send(alltodos)
                }).catch((err)=>{
                    console.log(err);
                })
        }).catch((err)=>{
            console.log(err);
        })
    })


    router.get('/GET/todos',auth,(req,res)=>{
        let id = req.query.id || " "
        let cnvrt = id.split(',')
        let cityId = req.query.cityId || 0
        let fromDueDate = req.query.fromDueDate || " "
        let toDueDate = req.query.toDueDate || " "
        knex.select('*').from('Todo_task')
            .join('user','Todo_task.user_id','=','user.user_id')
            .join('cities','user.city_id','=','cities.city_id')
            .andWhere(function(){
                if(id!=" "){
                    this.whereIn('Todo_task.assignedTo',cnvrt)
                }else{
                    this.whereNotNull('Todo_task.assignedTo')
                }
            })
            .andWhere(function(){
                if(fromDueDate!=" " && toDueDate!=" "){
                    this.whereBetween('dueDate',[fromDueDate,toDueDate])
                }else if(fromDueDate!=" "){
                    this.where('dueDate',fromDueDate)
                }else if(toDueDate!=" "){
                    this.where('dueDate',toDueDate)
                }else{
                    this.whereNotNull('dueDate')
                }
            })
            .andWhere(function(){
                if(cityId!=0){
                    this.where('user.city_id',cityId)
                }else{
                    this.whereNotNull('user.city_id')
                }
            })
            .then((data)=>{
                let alltodos = {}
                let todos = []
                data.map(x=>{
                    let date = x.dueDate
                    let Date = date.toLocaleString().slice(0,10)
                    var dict={
                        "todo":{
                            "text":x.text,
                            "assignedTo":{
                                "id": x.user_id,
                                "name":x.user_name,
                                "email":x.email,
                                "age":x.age,
                                "city": {
                                    "name":x.city_name, 
                                    "id":x.city_id,
                                }
                            },
                            "dueDate":Date
                        }
                    }
                    todos.push(dict)
                })
                alltodos['todos']=todos
                res.send(alltodos)
            }).catch((err)=>{
                console.log(err);
            })
    })
}