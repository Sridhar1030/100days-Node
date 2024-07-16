export const typeDefs = `#graphql
    type Game{
        id: ID!,
        title: String!,
        platform: [String!]!,
        reviews: [Review!]
    }
    type Review{
        id: ID!,
        rating: Int!,
        content: String!,
        game: Game!
        author:Author!
    }
    type Author{
        id: ID!,
        name: String!,
        verified:Boolean!
        reviews: [Review!] #no exclamation mark outside as if there is a review its compulsory but its not compuslory for every author to have a review
    }
    type Query{
        games: [Game],
        game(id:ID!):Game
        reviews: [Review],
        review(id: ID!): Review,
        authors: [Author]
        author(id:ID!):Author
    }

    type Mutation {
        deleteGame(id: ID!):[Game],
        addGame(game:AddGameInput!):Game
        updateGame(id:ID!, edits:EditGameInput!):Game

    }

    input AddGameInput {
        title: String!,
        platform: [String!]!
    }

    
    input EditGameInput {
        title: String,
        platform: [String!]
    }
`;
