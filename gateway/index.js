const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "posts", url: "http://localhost:4001" },
    { name: "comments", url: "http://localhost:4002" },
  ],
});

(async () => {
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({ schema, executor });

  server.listen(4000).then(({ url }) => {
    console.log(`🚀  Gateway ready at ${url}`);
  });
})();
