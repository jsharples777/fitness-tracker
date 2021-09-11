import {MongoClient,Db} from 'mongodb';
import debug from 'debug';

const logger = debug('mongo-data-source');

export class MongoDataSource {
    private static _instance: MongoDataSource;

    public static getInstance(): MongoDataSource {
        if (!MongoDataSource._instance) {
            MongoDataSource._instance = new MongoDataSource();
        }
        return MongoDataSource._instance;
    }


    // @ts-ignore
    private client:MongoClient;
    // @ts-ignore
    private db:Db;

    private constructor() {
        const initialise = async() => {
            let url = process.env.DB_URL || 'mongodb://localhost/default';
            this.client = new MongoClient(url);
            await this.client.connect();
            logger("Mongo DB connected");
            this.db = this.client.db();
        }
        initialise();
    }


    async getNextId(name:string) {
        logger("Getting next id with name " + name);
        const collection = process.env.DB_COLLECTION_ITEM_IDS || 'identifier';
        const result = await this.db.collection(collection).findOneAndUpdate(
            {_id: name},
            {$inc: {current: 1}},
        );
        // @ts-ignore
        logger(result.value.current);
        // @ts-ignore
        return result.value.current;
    }

    getDatabase() {
        return this.db;
    }

}
