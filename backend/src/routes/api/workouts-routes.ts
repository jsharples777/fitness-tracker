import express from 'express';
import {MongoDataSource} from "../../db/MongoDataSource";
import debug from 'debug';
import {DeleteResult, Document} from 'mongodb';
import {DB, SearchItem, SearchItemComparison, SortOrderType} from "file-system-database";

const router = express.Router();

const logger = debug('api-workouts');

// The `/api/workouts` endpoint

router.get('/', (req, res) => {
    // find all exercise types
    const collection = process.env.DB_COLLECTION_WORKOUTS || 'workouts';
    let filter:SearchItem;
    let username = '';
    if (req.user) {
        // @ts-ignore
        username = req.user.username;
    }
    logger(`Getting workouts for current user ${username}`);
    if (req.user) {
        // @ts-ignore
        filter = { field:'createdBy', value: req.user.username, comparison: SearchItemComparison.equals};
        const results = DB.getInstance().collection(collection).findBy([filter]).sort([{field:'createdOn',order:SortOrderType.ascending}]).toArray();
        logger(results.length);
        res.json(results);

    }
    else {
        const results = DB.getInstance().collection(collection).find().sort([{field:'createdOn',order:SortOrderType.ascending}]).toArray();
        logger(results.length);
        res.json(results);

    }
});

router.get('/:id', (req, res) => {
    const collection = process.env.DB_COLLECTION_WORKOUTS || 'workouts';
    const result = DB.getInstance().collection(collection).findByKey(req.params.id);
        logger(result);
        res.json(result);
});

router.post('/', (req, res) => {
    const collection = process.env.DB_COLLECTION_WORKOUTS || 'workouts';
    const value = DB.getInstance().collection(collection).insertObject(req.body._id, req.body);
        logger(value);
        res.json(req.body);
});

router.put('/', (req, res) => {
    const collection = process.env.DB_COLLECTION_WORKOUTS || 'workouts';
    const result = DB.getInstance().collection(collection).updateObject(req.body._id, req.body);
        logger(result);
        res.json(req.body);
});

router.delete('/:id', (req, res) => {
    const collection = process.env.DB_COLLECTION_WORKOUTS || 'workouts';
    const result = DB.getInstance().collection(collection).removeObject(req.params.id);
    logger(result);
    res.json(result);
});

export = router;
