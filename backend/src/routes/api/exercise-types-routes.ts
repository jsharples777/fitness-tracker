import express from 'express';
import debug from 'debug';
import {DataMessage, DataMessageType, SocketManager} from "server-socket-framework-jps";
import {DB} from "file-system-database";

const router = express.Router();


const logger = debug('api-exercise-types');

// The `/api/exercise types` endpoint

router.get('/', (req, res) => {
    // find all exercise types
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    const results = DB.getInstance().collection(collection).find().toArray();
    logger(results.length);
    res.json(results);
});

router.get('/:id', (req, res) => {
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    const result = DB.getInstance().collection(collection).findByKey(req.params.id);
    logger(result);
    res.json(result);
});

router.post('/', (req, res) => {
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    const value = DB.getInstance().collection(collection).insertObject(req.body._id, req.body);
    logger(value);
    // @ts-ignore
    let user;
    if (req.user) {
        // @ts-ignore
        user = req.user.id;
    } else {
        user = "-1"
    }

    const message: DataMessage = {type: DataMessageType.create, stateName: "exerciseType", data: req.body, user: user,}
    SocketManager.getInstance().sendDataMessage(message);

    res.json(req.body);
});

router.put('/', (req, res) => {
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    const result = DB.getInstance().collection(collection).updateObject(req.body._id, req.body);
    logger(result);
    let user;
    if (req.user) {
        // @ts-ignore
        user = req.user.id;
    } else {
        user = "-1"
    }
    // @ts-ignore
    const message: DataMessage = {type: "update", stateName: "exerciseType", data: req.body, user: user,}
    SocketManager.getInstance().sendDataMessage(message);
    res.json(req.body);
});

router.delete('/:id', (req, res) => {
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    const result = DB.getInstance().collection(collection).removeObject(req.params.id);
        let user;
        if (req.user) {
            // @ts-ignore
            user = req.user.id;
        } else {
            user = "-1"
        }
        // @ts-ignore
        const message: DataMessage = {
            type: DataMessageType.delete,
            stateName: "exerciseType",
            data: {_id: req.params.id},
            user: user,
        }
        SocketManager.getInstance().sendDataMessage(message);
        logger(result);
        res.json(result);
});

export = router;
