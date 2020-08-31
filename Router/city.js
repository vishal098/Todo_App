module.exports = function(city,Knex){
    city.post('/addCity',(req,res)=>{
        let name = {
            city_name:req.body.city_name
        }
        Knex.select('city_name').from('cities')
        .where('city_name',name.city_name)
        .then((data)=>{
            if(data.length==0){
                Knex('cities').insert(name)
                .then((id)=>{
                    Knex.select('*').from('cities')
                    .where('city_id',id[0])
                    .then((city_data)=>{
                        res.send(city_data[0])
                    })
                }).catch((err)=>{
                    console.log(err);
                })
            }else{
                res.send('This city is available')
            }
        }).catch((err)=>{
            console.log(err);
        })
    })
}