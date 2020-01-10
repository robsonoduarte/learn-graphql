const { ApolloServer, gql } = require('apollo-server')


const users = [{
    id: 1,
    name: 'Robson',
    email: 'robson@gmail.com',
    age: 43
}, {
    id: 2,
    name: 'Ana',
    email: 'ana.d@gmail.com',
    age: 43
}, {
    id: 3,
    name: 'Cida',
    email: 'cida@gmail.com',
    age: 64
}]


const profiles =[{
    id: 1,
    name: "Common"
},{
    id: 2,
    name: "Administrator"
}]


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
    
    type Profile{
        id: Int
        name: String
    }

    # Point of entry of API
    type Query{
        hello: String
        date: Date
        user: User
        product: Product
        numbers:[Int!]!
        users: [User]
        findUser(id: ID): User
        profiles: [Profile]
        findProfile(id: Int): Profile
    }
`

const resolvers = {
    User: {
        salary(user) {
            return user.salary_brl // resolver the salary in user.salary_brl example how resolver properties with differents names
        }
    },
    Product: {
        discountPrice(product) {
            return product.price - (product.price * (product.discount / 100))
        }
    },
    Query: {
        hello() {
            return "Hello GraphQL"
        },
        date() {
            return new Date
        },
        user() {
            return {
                id: 1,
                name: 'Robson Duarte',
                email: 'robson.o.d@gmail.com',
                age: 42,
                salary_brl: 500.00,
                vip: true
            }
        },
        product() {
            return {
                name: 'Computer',
                price: 1000.00,
                discount: 10.0
            }
        },
        numbers() {
            return Array(6).fill(0)
                .map(n => parseInt(Math.random() * 60 + 1))
                .sort((a, b) => a - b)
        },
        users(){
            return users;
        },
        findUser(_, {id}){
            const selected = users.filter(u => u.id == id)
            return selected ? selected[0] : null
        },
        profiles(){
            return profiles
        },
        findProfile(_, {id}){
            const selected = profiles.filter(p => p.id == id)
            return selected ? selected[0] : null
        }

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Running Server in ${url}`)
})