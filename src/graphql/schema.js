const {buildSchema} = require('graphql');

module.exports = buildSchema(`
    type Name {
      title: String!
      first: String!
      last: String !
    }

    type Coordinates {
      latitude: String!
      longitude: String!
    }

    type Timezone {
      offset: String!
      description: String!
    }

    type Location {
      coordinates: Coordinates!
      timezone: Timezone!
      street: String!
      city: String!
      state: String!
      postcode: Int!
    }

    type Login {
      uuid: String!
      username: String!
      password: String!
      salt: String!
      md5: String!
      sha1: String!
      sha256: String!
    }

    type DOB {
      date: String!
      age: Int!
    }

    type Registered {
      date: String!
      age: Int!
    }

    type ContactID {
      name: String!
      value: String
    }

    type Picture {
      large: String!
      medium: String!
      thumbnail: String!
    }

    type Contact {
      _id: ID!
      name: Name!
      location: Location!
      login: Login!
      dob: DOB!
      registered: Registered!
      contactId: ContactID!
      picture: Picture!
      gender: String!
      email: String!
      phone: String!
      cell: String!
    }

    type ContactListData {
      contacts: [Contact!]!
      totalCount: Int!
    }

    type RootQuery {
      contacts(page: Int, count: Int): ContactListData!
      contact(id: ID!): Contact!
      searchContact(name: String!, page: Int, count: Int): ContactListData!
    }

    type RootMutation {
      updateEmail(id: ID!, email: String!): Contact!
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
`);
