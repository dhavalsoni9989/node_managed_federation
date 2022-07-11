const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const {
    ApolloServerPluginInlineTrace,
    ApolloServerPluginLandingPageGraphQLPlayground,
  } = require('apollo-server-core');
const { loadFile } = require('graphql-import-files');

const schemaGql = loadFile('./schema/users-schema.graphql');
const typeDefs = gql(schemaGql);

const resolvers = {
    Query: {
      me() {
        return users[0];
      }
    },
    User: {
      __resolveReference(object) {
        return users.find(user => user.id === object.id);
      }
    }
  };
  
  const server = new ApolloServer({
    schema: buildSubgraphSchema([
      {
        typeDefs,
        resolvers
      }
    ]),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginInlineTrace(),
    ],
  });
  
  server.listen({ port: 4001 }).then(({ url }) => {
    console.log(`ðŸš€ Server ready at ${url}`);
  });
  
  const users = [
    {
      id: "1",
      name: "Ada Lovelace",
      birthDate: "1815-12-10",
      username: "@ada"
    },
    {
      id: "2",
      name: "Alan Turing",
      birthDate: "1912-06-23",
      username: "@complete"
    }
  ];
  