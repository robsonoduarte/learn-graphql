const {ApolloServer, gql} = require('apollo-server')

const typeDefs = gql`
    scalar Date

    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
        salary: Float
        vip: Boolean
    }

    # Point of entry of API
    type Query{
        hello: String
        date: Date
        user: User
    }
`

const resolvers = {
    Query:{
        hello(){
            return "Hello GraphQL"
        },
        date(){
           return new Date
        },
        user(){
            return {
                id: 1,
                name: 'Robson Duarte',
                email:'robson.o.d@gmail.com',
                age: 42,
                salary: 500.00,
                vip: true
            }
        }
        
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Running Server in ${url}`)
})