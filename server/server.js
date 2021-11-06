const express = require("express");
const { ApolloServer, PubSub } = require("apollo-server-express");
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");
// Import `authMiddleware()` function to be configured with the Apollo Server
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const parkRoute = require("./controllers");

const PORT = process.env.PORT || 3001;
const app = express();
const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Add context to our server so data from the `authMiddleware()` function can pass data to our resolver functions
  context: (authMiddleware, { pubsub }),
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(parkRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
