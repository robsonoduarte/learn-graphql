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

    type Product{
        name: String!
        price: Float!
        discount: Float
        discountPrice: Float
    }

    # Point of entry of API
    type Query{
        hello: String
        date: Date
        user: User
        product: Product
    }
`

const resolvers = {
    User: {
        salary(user){
            return user.salary_brl // resolver the salary in user.salary_brl example how resolver properties with differents names
        }
    },
    Product:{
        discountPrice(product){
            return product.price - ( product.price * (product.discount / 100))
        }
    },
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
                salary_brl: 500.00,
                vip: true
            }
        },
        product(){
            return {
                name: 'Computer',
                price: 1000.00,
                discount: 10.0
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