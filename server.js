const express=require('express');

const {graphqlHTTP}=require('express-graphql');
const mygraphQLschema=require('./schema')
const app=express();

app.use('/graphql',graphqlHTTP({
    schema:mygraphQLschema,
    graphiql:true
}))

app.listen(4000,()=>{

    console.log('4000.portta server calisiyor');
})