# Federation Example Project

This is an example project to demonstrate how we can use Apollo Federation + Apollo Gateway to create a federated gateway across our microservices.

For the sake of simplicity I've created two services here - **Post** and **Comment**, which sit behind a **Gateway**.

## Setup
1. `cd post` and `yarn start` - Server will run on `http://localhost:4001`
2. `cd comment` and `yarn start` - Server will run on `http://localhost:4002`
3. `cd gateway` and `yarn start` - Gateway will run on `http://localhost:4000`

Go to `http://localhost:4000` (which is the gateway endpoint)

### Access comments from list of posts

```
query {
  posts {
    id
    title
    content
    postComments {
      id
      title
      content
      postId
    }
  }
}
```

### Access parent post from list of comments
```
query {
  comments {
    id
    title
    postId
    post {
      id
      title
    }
  }
}
```
