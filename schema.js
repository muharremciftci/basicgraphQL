const axios=require('axios');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull

}=require('graphql');

// var personeller=[
//     {id:'1',isim:'Muharrem',yas:'28',email:'muharremciftci34@gmail.com'},
//     {id:'2',isim:'Muharrem2',yas:'29',email:'muharremciftci34@gmail.com'},
//     {id:'3',isim:'Muharrem3',yas:'30',email:'muharremciftci34@gmail.com'},
//     {id:'4',isim:'Muharrem4',yas:'31',email:'muharremciftci34@gmail.com'}
// ]

const PersonelType=new GraphQLObjectType({
    name:'Personel',
    fields:()=>({
        id:{type:GraphQLString},
        isim:{type:GraphQLString},
        email:{type:GraphQLString},
        yas:{type:GraphQLInt}
    })
});

const RootQuery=new GraphQLObjectType({
    name:'RootQuery',
    fields:{
        personel:{
            type:PersonelType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                //veriye erisim

                // for(let i=0; i<personeller.length;i++){
                //     if(personeller[i].id===args.id){
                //         return personeller[i];
                //     }
                // }

                return axios.get('http://localhost:3000/personeller'+args.id).then(res=>res.data);
            }
        },

        personeller:{
            type:new GraphQLList(PersonelType),
            resolve(parents,args){
                return axios.get('http://localhost:3000/personeller').then(res=>res.data);;
            }

        }
    }
});

const mutation= new GraphQLObjectType({
    name:'Mutation',
    fields:{
        personelEkle:{
            type:PersonelType,
            args:{
                isim:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)},
                yas:{type:new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parents,args){
                return axios.post('http://localhost:3000/personeller',{
                    isim:args.isim,
                    email:args.email,
                    yas:args.yas
                }).then(res=>res.data);
            }
        }
    }
})



module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:mutation
})