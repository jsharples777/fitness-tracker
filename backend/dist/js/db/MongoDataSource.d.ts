import { Db } from 'mongodb';
export declare class MongoDataSource {
    private static _instance;
    static getInstance(): MongoDataSource;
    private client;
    private db;
    private constructor();
    getNextId(name: string): Promise<any>;
    getDatabase(): Db;
}
