const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const data = require("./posts.data");

const typeDefs = gql`
  type Post @key(fields: "id") {
    id: ID!
    title: String!
    content: String!
  }

  extend type Query {
    posts: [Post]
    post(id: ID!): Post
  }
`;

const resolvers = {
  Query: {
    posts: () => data.posts,
    post: (root, { id }) => data.posts.find((post) => id === post.id),
  },
  Post: {
    __resolveReference: reference => data.posts.find(post => post.id === reference.id)
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema({ typeDefs, resolvers }),
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
