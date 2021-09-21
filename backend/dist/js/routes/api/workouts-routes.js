"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const MongoDataSource_1 = require("../../db/MongoDataSource");
const router = express_1.default.Router();
const debug_1 = __importDefault(require("debug"));
const logger = debug_1.default('api-workouts');
// The `/api/workouts` endpoint
router.get('/', (req, res) => {
    // find all exercise types
    const collection = process.env.DB_COLLECTION_WORKOUTS || 'workouts';
    let filter = {};
    let username = '';
    if (req.user) {
        // @ts-ignore
        username = req.user.username;
    }
    logger(`Getting workouts for current user ${username}`);
    if (req.user) {
        // @ts-ignore
        filter = { createdBy: req.user.username };
    }
    MongoDataSource_1.MongoDataSource.getInstance().getDatabase().collection(collection).find(filter).sort({ createdOn: 1 }).toArray().then((results) => {
        logger(results.length);
        res.json(results);
    })
        .catch((err) => {
        logger(err);
        res.status(400).json(err);
    });
});
router.get('/:id', (req, res) => {
    const collection = process.env.DB_COLLECTION_WORKOUTS || 'workouts';
    MongoDataSource_1.MongoDataSource.getInstance().getDatabase().collection(collection).findOne({ _id: req.params.id }).then((result) => {
        logger(result);
        if (!result)
            result = { _id: req.params.id };
        res.json(result);
    })
        .catch((err) => {
        logger(err);
        res.status(400).json(err);
    });
});
router.post('/', (req, res) => {
    const collection = process.env.DB_COLLECTION_WORKOUTS || 'workouts';
    MongoDataSource_1.MongoDataSource.getInstance().getDatabase().collection(collection).insertOne(req.body).then((value) => {
        logger(value);
        res.json(req.body);
    })
        .catch((err) => {
        logger(err);
        res.status(400).json(err);
    });
});
router.put('/', (req, res) => {
    const collection = process.env.DB_COLLECTION_WORKOUTS || 'workouts';
    MongoDataSource_1.MongoDataSource.getInstance().getDatabase().collection(collection).replaceOne({ _id: req.body._id }, req.body).then((result) => {
        logger(result);
        res.json(req.body);
    }).
        catch((err) => {
        logger(err);
        res.status(400).json(err);
    });
});
router.delete('/:id', (req, res) => {
    const collection = process.env.DB_COLLECTION_WORKOUTS || 'workouts';
    MongoDataSource_1.MongoDataSource.getInstance().getDatabase().collection(collection).deleteOne({ _id: req.params.id }).then((result) => {
        logger(result);
        res.json(result);
    })
        .catch((err) => {
        logger(err);
        res.status(400).json(err);
    });
});
module.exports = router;
//# sourceMappingURL=workouts-routes.js.map