const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString , GraphQLSchema } = graphql;

//Define schema types
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:() => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

//Define root queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book : {
            type: BookType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                //write to retrieve data from db or other sources

            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

