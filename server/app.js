const express = require('express');
const graphqlHTTP =require('express-graphql');
const schema = require('./schema/schema');

const app = express();

//setting middleware
app.use('/graphql',graphqlHTTP({
    schema
}))

app.listen(3000,()=> {
    console.log(`Now listening for request on port 3000`)
})
