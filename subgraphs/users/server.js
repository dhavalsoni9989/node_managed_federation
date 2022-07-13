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
      getUser(_, args) {
        const userid = parseInt(args.id) - 1;
        return users[userid];
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
    console.log(`🚀 Server ready at ${url}`);
  });
  
  const users = [
    {
      id: "1",
      name: "Steven Tyler",
      birthDate: "1948-01-10",
      username: "@steven"
    },
    {
      id: "2",
      name: "Vin Diesel",
      birthDate: "1984-05-13",
      username: "@vind"
    }
  ];
  