const { map } = require("async")

module.exports = function(router,knex,auth){

    router.get('/GET/users',auth,(req,res)=>{
        let agelessthen = req.query.agelessthen || 999
        let agemorethen = req.query.agemorethen || 0
        let cityId = req.query.cityId || 0
        let userId=req.query.id || 0
        // console.log(userId);
        knex.select("*").from('user')
        .join('cities','user.city_id','=','cities.city_id')
        .whereBetween('age',[agemorethen,agelessthen])
        .andWhere(function(){
            if(cityId!=0){
                this.where('user.city_id',cityId)
            }else{
                this.whereNotNull('user.city_id')
            }
        })
        .then((data)=>{
            let users=[] 
            data.map(x => {
                let user_details = {
                    id: x.user_id,
                    name: x.user_name,
                    email: x.email,
                    age: x.age,
                    city: {
                        name:x.city_name, 
                        id: x.city_id,
                        }
                }
                if(userId != 0){
                    if(user_details.id==userId){
                        users.push(user_details)
                    }
                }else{
                    users.push(user_details)
                }
            })
            res.send(users)
        }).catch((err)=>{
            console.log(err);
        })
    })
}