import BGGDataSourceDelegate from "./BGGDataSourceDelegate";

import debug from 'debug';
import fs from 'fs';
import {ApolloServer} from 'apollo-server-express';
import {Express} from 'express';
import MySQLDataSourceDelegate from "./MySQLDataSourceDelegate";

const dsLogger = debug('data-source');


class DataSource {
    protected apolloServer: ApolloServer;
    protected bggDelegate: BGGDataSourceDelegate;
    protected mysqlDelegate: MySQLDataSourceDelegate;


    constructor(serverApp:Express) {
        this.bggDelegate = new BGGDataSourceDelegate();
        this.mysqlDelegate = new MySQLDataSourceDelegate();

        let resolvers = {
            Query: {
                findBoardGames: this.bggDelegate.findBoardGames,
                getBoardGameDetails: this.bggDelegate.getBoardGameDetails,
                findUsers: this.mysqlDelegate.getUsers,
                getMyBoardGameCollection: this.mysqlDelegate.getMyBoardGameCollection
            },
            Mutation: {
                addToMyCollection: this.mysqlDelegate.addToMyCollection,
                removeFromMyCollection: this.mysqlDelegate.removeFromMyCollection,
                addScoreSheetToBoardGame: this.mysqlDelegate.addScoreSheetToBoardGame,
                removeScoreSheet: this.mysqlDelegate.removeScoreSheet
            }
        };

        // @ts-ignore
        const typeDefBuffer:Buffer = fs.readFileSync(process.env.QL_SCHEMA, "utf-8");
        dsLogger(typeDefBuffer);
        const isDevelopment = (process.env.MODE === 'Development');

        this.apolloServer = new ApolloServer({
            playground: isDevelopment,
            typeDefs: typeDefBuffer.toString(),
            resolvers: resolvers
        });
        this.apolloServer.applyMiddleware({app: serverApp, path: "/graphql"});

    }

}

/*
type BoardGame {
    id: Int!
    name:String!
    year: Int
}

input IdInput {
    id:Int!
}

input BoardGameDetailInput {
    id: Int!
    thumb: String!
    image: String!
    name: String!
    description: String!
    year: Int
    minPlayers: Int
    maxPlayers: Int
    minPlayTime: Int
    maxPlayTime: Int
    minAge: Int
    designers: String
    artists: String
    publisher: String
    numOfRaters: Int
    averageScore: Float
    rank: Int
    categories: String
}

type BoardGameDetail {
    id: Int!
    thumb: String!
    image: String!
    name: String!
    description: String!
    year: Int
    minPlayers: Int
    maxPlayers: Int
    minPlayTime: Int
    maxPlayTime: Int
    minAge: Int
    designers: String
    artists: String
    publisher: String
    numOfRaters: Int
    averageScore: Float
    rank: Int
    categories: String
    scores: [ScoreSheet]
}

type ScoreSheet {
    id:Int!
    players: [String],
    scores: [Int],
    jsonData: String
}

input ScoreSheetInput {
    players: [String],
    scores: [Int],
    jsonData: String
}

type User {
    id: Int!,
    username: String!
}

##### top level declarations
type Query {
    findBoardGames(query:String!): [BoardGame]
    getBoardGameDetails(id:IdInput!): BoardGameDetail
    findUsers: [User]
    getMyBoardGameCollection(userId: Int): [BoardGameDetail]
}

type Mutation {
    addToMyCollection(userId: Int, boardGame: BoardGameDetailInput): Boolean
    removeFromMyCollection(userId: Int, boardGameId: Int):Boolean
    addScoreSheetToBoardGame(userId: Int, boardGameId: Int, sheet: ScoreSheetInput): Boolean
}

 */


export = DataSource;