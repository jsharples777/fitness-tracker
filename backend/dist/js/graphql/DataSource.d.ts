import BGGDataSourceDelegate from "./BGGDataSourceDelegate";
import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import MySQLDataSourceDelegate from "./MySQLDataSourceDelegate";
declare class DataSource {
    protected apolloServer: ApolloServer;
    protected bggDelegate: BGGDataSourceDelegate;
    protected mysqlDelegate: MySQLDataSourceDelegate;
    constructor(serverApp: Express);
}
export = DataSource;
