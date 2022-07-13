const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const {
    ApolloServerPluginInlineTrace,
    ApolloServerPluginLandingPageGraphQLPlayground,
  } = require('apollo-server-core');
const { loadFile } = require('graphql-import-files');

const schemaGql = loadFile('./schema/reviews-schema.graphql');
const typeDefs = gql(schemaGql);

const resolvers = {
  Review: {
    author(review) {
      return { __typename: "User", id: review.authorID };
    }
  },
  User: {
    reviews(user) {
      return reviews.filter(review => review.authorID === user.id);
    },
    numberOfReviews(user) {
      return reviews.filter(review => review.authorID === user.id).length;
    },
    username(user) {
      const found = usernames.find(username => username.id === user.id);
      return found ? found.username : null;
    }
  },
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

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const usernames = [
  { id: "1", username: "@steven" },
  { id: "2", username: "@vind" }
];
const reviews = [
  {
    id: "1",
    authorID: "1",
    body: "Too Good!"
  },
  {
    id: "2",
    authorID: "1",
    body: "Too Cheaper."
  },
  {
    id: "3",
    authorID: "2",
    body: "Could be better."
  },
  {
    id: "4",
    authorID: "2",
    body: "Not Good."
  }
];
