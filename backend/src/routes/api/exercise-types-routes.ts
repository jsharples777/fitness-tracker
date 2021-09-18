import express from 'express';
import {MongoDataSource} from "../../db/MongoDataSource";
const router = express.Router();
import debug from 'debug';
import {DeleteResult, Document, UpdateResult} from 'mongodb';
import {DataMessage} from "../../socket/SocketTypes";
import socketManager from "../../socket/SocketManager";

const logger = debug('api-exercise-types');

// The `/api/exercise types` endpoint

router.get('/', (req, res) => {
    // find all exercise types
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    MongoDataSource.getInstance().getDatabase().collection(collection).find().sort( { createdOn: 1 } ).toArray().then((results:Document[]) => {
          logger(results.length);
          res.json(results);
        })
        .catch((err) => {
            logger(err);
            res.status(400).json(err);
        });
});

router.get('/:id', (req, res) => {
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    MongoDataSource.getInstance().getDatabase().collection(collection).findOne({_id:req.params.id}).then((result:Document|null) => {
        logger(result);
        if (!result) result = {_id:req.params.id};
        res.json(result);
    })
    .catch((err) => {
        logger(err);
        res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    MongoDataSource.getInstance().getDatabase().collection(collection).insertOne(req.body).then((value) => {
        logger(value);
        // @ts-ignore
        let user;
        if (req.user) {
            // @ts-ignore
            user = req.user.id;
        }
        else { user = "-1"}
        // @ts-ignore
        const message:DataMessage = {type:"create",stateName: "exerciseType",data:req.body, user:user,}
        socketManager.sendDataMessage(message);

        res.json(req.body);
    })
    .catch((err) => {
        logger(err);
        res.status(400).json(err);
    });
});

router.put('/', (req, res) => {
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    MongoDataSource.getInstance().getDatabase().collection(collection).replaceOne({_id:req.body._id},req.body).then((result) => {
        logger(result);
            let user;
            if (req.user) {
                // @ts-ignore
                user = req.user.id;
            }
            else { user = "-1"}
            // @ts-ignore
            const message:DataMessage = {type:"update",stateName: "exerciseType",data:req.body, user:user,}
            socketManager.sendDataMessage(message);
            res.json(req.body);
    })
    .catch((err) => {
        logger(err);
        res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    MongoDataSource.getInstance().getDatabase().collection(collection).deleteOne({_id:req.params.id}).then((result:DeleteResult) => {
        let user;
        if (req.user) {
            // @ts-ignore
            user = req.user.id;
        }
        else { user = "-1"}
        // @ts-ignore
        const message:DataMessage = {type:"delete",stateName: "exerciseType",data:{ _id: req.params.id},user:user,}
        socketManager.sendDataMessage(message);
        logger(result);
        res.json(result);

    })
    .catch((err) => {
        logger(err);
        res.status(400).json(err);
    });
});

export = router;
