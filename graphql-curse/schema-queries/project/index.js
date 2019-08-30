const {ApolloServer, gql} = require('apollo-server')

const typeDefs = gql`
    # Point of entry of API
    type Query{
        hello: String
    }
`

const resolvers = {
    Query:{
        hello(){
            return "Hello GraphQL"
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