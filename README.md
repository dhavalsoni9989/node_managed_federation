## Node Apollo Managed Federation Demo

This repository is a demo of using Apollo Managed Federation V1 to build a single schema on top of multiple services. The microservices are located under the [`./subgraphs`](./subgraphs/) folder and the gateway that composes the overall schema is in the [`gateway.js`](./gateway.js) file.

### Installation

To run this demo locally, pull down the repository then run the following commands:

```sh
npm install
```

This will install all of the dependencies for the gateway and each underlying service.

```sh
npm run start-services
```

This command will run all of the microservices at once. They can be found at http://localhost:4001, http://localhost:4002.

In another terminal window, run the gateway by running this command:

```sh
npm run start-gateway
```

This will start up the gateway and serve it at http://localhost:4005

### Rover

In managed federation need to push the subgraph graphql using rover [docs](https://www.apollographql.com/docs/rover/commands/subgraphs/).

#### Installation rover

```sh
npm i @apollo/rover
```

#### rover Publish Subgraph

```sh
rover subgraph publish XXXXXX@current --name users --schema ./users-schema.graphql --routing-url http://localhost:4001/
```
```sh
rover subgraph publish XXXXXX@current --name reviews --schema ./reviews-schema.graphql --routing-url http://localhost:4002/
```

### Sample Query

```sh
query getUser {
  getUser(id:"1"){
    id
    name
    reviews{
      author{
        id
        name
      }
      body
      id
    }
    username
  }
}
```

### What is this?

This demo showcases 2 partial schemas running as managed federated microservices. Each of these schemas can be accessed on their own and form a partial shape of an overall schema. The gateway fetches the service capabilities from the running services to create an overall composed schema which can be queried. 

To see the query plan when running queries against the gateway, click on the `Query Plan` tab in the bottom right hand corner of [GraphQL Playground](http://localhost:4005)

To learn more about Apollo Federation, check out the [docs](https://www.apollographql.com/docs/apollo-server/federation/introduction)

