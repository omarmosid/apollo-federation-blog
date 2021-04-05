const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const data = require("./comments.data");

const typeDefs = gql`
  type Comment @key(fields: "id") {
    id: ID!
    title: String!
    content: String!
    postId: String!
    post: Post!
  }

  extend type Query {
    comments: [Comment]
    comment(id: ID!): Comment
  }

  extend type Post @key(fields: "id") {
    id: ID! @external
    postComments: [Comment]!
  }
`;

const resolvers = {
  Query: {
    comments: () => data.comments,
    comment: (root, { id }) =>
      data.comments.find((comment) => id === comment.id),
  },
  Post: {
    postComments: (post) =>
      data.comments.filter((comment) => comment.postId === post.id),
  },
  Comment: {
    post: (comment) => ({ __typename: "Post", id: comment.postId }),
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema({ typeDefs, resolvers }),
});

server.listen(4002).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
