"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const MongoDataSource_1 = require("../../db/MongoDataSource");
const router = express_1.default.Router();
const debug_1 = __importDefault(require("debug"));
const SocketManager_1 = __importDefault(require("../../socket/SocketManager"));
const logger = debug_1.default('api-exercise-types');
// The `/api/exercise types` endpoint
router.get('/', (req, res) => {
    // find all exercise types
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    MongoDataSource_1.MongoDataSource.getInstance().getDatabase().collection(collection).find().sort({ createdOn: 1 }).toArray().then((results) => {
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
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    MongoDataSource_1.MongoDataSource.getInstance().getDatabase().collection(collection).insertOne(req.body).then((value) => {
        logger(value);
        // @ts-ignore
        let user;
        if (req.user) {
            // @ts-ignore
            user = req.user.id;
        }
        else {
            user = "-1";
        }
        // @ts-ignore
        const message = { type: "create", stateName: "exerciseType", data: req.body, user: user, };
        SocketManager_1.default.sendDataMessage(message);
        res.json(req.body);
    })
        .catch((err) => {
        logger(err);
        res.status(400).json(err);
    });
});
router.put('/', (req, res) => {
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    MongoDataSource_1.MongoDataSource.getInstance().getDatabase().collection(collection).replaceOne({ _id: req.body._id }, req.body).then((result) => {
        logger(result);
        let user;
        if (req.user) {
            // @ts-ignore
            user = req.user.id;
        }
        else {
            user = "-1";
        }
        // @ts-ignore
        const message = { type: "update", stateName: "exerciseType", data: req.body, user: user, };
        SocketManager_1.default.sendDataMessage(message);
        res.json(req.body);
    })
        .catch((err) => {
        logger(err);
        res.status(400).json(err);
    });
});
router.delete('/:id', (req, res) => {
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    MongoDataSource_1.MongoDataSource.getInstance().getDatabase().collection(collection).deleteOne({ _id: req.params.id }).then((result) => {
        let user;
        if (req.user) {
            // @ts-ignore
            user = req.user.id;
        }
        else {
            user = "-1";
        }
        // @ts-ignore
        const message = { type: "delete", stateName: "exerciseType", data: { _id: req.params.id }, user: user, };
        SocketManager_1.default.sendDataMessage(message);
        logger(result);
        res.json(result);
    })
        .catch((err) => {
        logger(err);
        res.status(400).json(err);
    });
});
module.exports = router;
//# sourceMappingURL=exercise-types-routes.js.map