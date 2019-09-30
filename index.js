'use strict';

const { ApolloServer } = require('apollo-server');
const typeorm = require("typeorm");
const typeDefs = require('./src/DAL/graphql/schema');
const { getResolvers } = require('./src/DAL/graphql/resolvers');
const ormConfig = require('./src/conf/orm_config');

async function createServer() {
    const connection = await typeorm.createConnection(ormConfig);
    return new ApolloServer({ typeDefs, resolvers: getResolvers(connection) });
}

createServer().then(server => {
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
})
.catch(err => console.error(err));
