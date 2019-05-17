const graphql = require('graphql');
const _= require('lodash');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

//dummy data
let books = [
    {name:"skdjfsbdfk", genre: "ssdfsfd", id: "1",authorId:"1"},
    {name:"skdjfsbdfl", genre: "ssdfsfe", id: "2",authorId:"2"},
    {name:"skdjfsbdfm", genre: "ssdfsff", id: "3",authorId:"3"}
]

let authors = [
    {name:"guy q", age: 12, id: "1"},
    {name:"guy 2", age: 34, id: "2"},
    {name:"guy 6", age: 43, id: "3"}
]

//Define schema types
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:() => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:() => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: BookType,
            resolve(parent, args) {
                return _.find(books, {authorId: parent.id})
            }
        }
    })
});

//Define root queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book : {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                //write code to retrieve data from db or other sources
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                return _.find(authors, {id:args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

