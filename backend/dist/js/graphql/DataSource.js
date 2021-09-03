"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BGGDataSourceDelegate_1 = __importDefault(require("./BGGDataSourceDelegate"));
const debug_1 = __importDefault(require("debug"));
const fs_1 = __importDefault(require("fs"));
const apollo_server_express_1 = require("apollo-server-express");
const MySQLDataSourceDelegate_1 = __importDefault(require("./MySQLDataSourceDelegate"));
const dsLogger = debug_1.default('data-source');
class DataSource {
    constructor(serverApp) {
        this.bggDelegate = new BGGDataSourceDelegate_1.default();
        this.mysqlDelegate = new MySQLDataSourceDelegate_1.default();
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
        const typeDefBuffer = fs_1.default.readFileSync(process.env.QL_SCHEMA, "utf-8");
        dsLogger(typeDefBuffer);
        const isDevelopment = (process.env.MODE === 'Development');
        this.apolloServer = new apollo_server_express_1.ApolloServer({
            playground: isDevelopment,
            typeDefs: typeDefBuffer.toString(),
            resolvers: resolvers
        });
        this.apolloServer.applyMiddleware({ app: serverApp, path: "/graphql" });
    }
}
module.exports = DataSource;
//# sourceMappingURL=DataSource.js.map