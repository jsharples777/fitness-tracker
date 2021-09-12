import express from 'express';
import {MongoDataSource} from "../../db/MongoDataSource";
const router = express.Router();
import debug from 'debug';
import {DeleteResult, Document, UpdateResult} from 'mongodb';
import {DataMessage} from "../../socket/SocketTypes";
import socketManager from "../../socket/SocketManager";

const logger = debug('api-users');

// The `/api/users types` endpoint

router.get('/', (req, res) => {
    // find all exercise types
    const collection = process.env.DB_COLLECTION_ACCOUNTS || 'accounts';
    const projection = { projection: {
            _id: 1,
            username:1,
        }
    };

    MongoDataSource.getInstance().getDatabase().collection(collection).find({},projection).toArray().then((results:Document[]) => {
          logger(results.length);
          res.json(results);
        })
        .catch((err) => {
            logger(err);
            res.status(400).json(err);
        });
});


export = router;
