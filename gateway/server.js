require('dotenv').config();
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    if (context?.token) {
      request.http.headers.set('Authorization', context.token);
    }
  }
}

const gateway = new ApolloGateway({
  buildService({ name, url }) {
    return new AuthenticatedDataSource({ url });
  },
  __exposeQueryPlanExperimental: true,
});

(async () => {
  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  server.listen({ port: 4005 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
