"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const debug_1 = __importDefault(require("debug"));
const file_system_database_1 = require("file-system-database");
const router = express_1.default.Router();
const logger = debug_1.default('api-workouts');
// The `/api/workouts` endpoint
router.get('/', (req, res) => {
    // find all exercise types
    const collection = process.env.DB_COLLECTION_WORKOUTS || 'workouts';
    let filter;
    let username = '';
    if (req.user) {
        // @ts-ignore
        username = req.user.username;
    }
    logger(`Getting workouts for current user ${username}`);
    if (req.user) {
        // @ts-ignore
        filter = { field: 'createdBy', value: req.user.username, comparison: file_system_database_1.SearchItemComparison.equals };
        const results = file_system_database_1.DB.getInstance().collection(collection).findBy([filter]).sort([{ field: 'createdOn', order: file_system_database_1.SortOrderType.ascending }]).toArray();
        logger(results.length);
        res.json(results);
    }
    else {
        const results = file_system_database_1.DB.getInstance().collection(collection).find().sort([{ field: 'createdOn', order: file_system_database_1.SortOrderType.ascending }]).toArray();
        logger(results.length);
        res.json(results);
    }
});
router.get('/:id', (req, res) => {
    const collection = process.env.DB_COLLECTION_WORKOUTS || 'workouts';
    const result = file_system_database_1.DB.getInstance().collection(collection).findByKey(req.params.id);
    logger(result);
    res.json(result);
});
router.post('/', (req, res) => {
    const collection = process.env.DB_COLLECTION_WORKOUTS || 'workouts';
    const value = file_system_database_1.DB.getInstance().collection(collection).insertObject(req.body._id, req.body);
    logger(value);
    res.json(req.body);
});
router.put('/', (req, res) => {
    const collection = process.env.DB_COLLECTION_WORKOUTS || 'workouts';
    const result = file_system_database_1.DB.getInstance().collection(collection).updateObject(req.body._id, req.body);
    logger(result);
    res.json(req.body);
});
router.delete('/:id', (req, res) => {
    const collection = process.env.DB_COLLECTION_WORKOUTS || 'workouts';
    const result = file_system_database_1.DB.getInstance().collection(collection).removeObject(req.params.id);
    logger(result);
    res.json(result);
});
module.exports = router;
//# sourceMappingURL=workouts-routes.js.map