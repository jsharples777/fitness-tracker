"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const debug_1 = __importDefault(require("debug"));
const server_socket_framework_jps_1 = require("server-socket-framework-jps");
const file_system_database_1 = require("file-system-database");
const router = express_1.default.Router();
const logger = debug_1.default('api-exercise-types');
// The `/api/exercise types` endpoint
router.get('/', (req, res) => {
    // find all exercise types
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    const results = file_system_database_1.DB.getInstance().collection(collection).find().toArray();
    logger(results.length);
    res.json(results);
});
router.get('/:id', (req, res) => {
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    const result = file_system_database_1.DB.getInstance().collection(collection).findByKey(req.params.id);
    logger(result);
    res.json(result);
});
router.post('/', (req, res) => {
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    const value = file_system_database_1.DB.getInstance().collection(collection).insertObject(req.body._id, req.body);
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
    const message = { type: server_socket_framework_jps_1.DataMessageType.create, stateName: "exerciseType", data: req.body, user: user, };
    server_socket_framework_jps_1.SocketManager.getInstance().sendDataMessage(message);
    res.json(req.body);
});
router.put('/', (req, res) => {
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    const result = file_system_database_1.DB.getInstance().collection(collection).updateObject(req.body._id, req.body);
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
    server_socket_framework_jps_1.SocketManager.getInstance().sendDataMessage(message);
    res.json(req.body);
});
router.delete('/:id', (req, res) => {
    const collection = process.env.DB_COLLECTION_EXERCISE_TYPES || 'exercise-types';
    const result = file_system_database_1.DB.getInstance().collection(collection).removeObject(req.params.id);
    let user;
    if (req.user) {
        // @ts-ignore
        user = req.user.id;
    }
    else {
        user = "-1";
    }
    // @ts-ignore
    const message = {
        type: server_socket_framework_jps_1.DataMessageType.delete,
        stateName: "exerciseType",
        data: { _id: req.params.id },
        user: user,
    };
    server_socket_framework_jps_1.SocketManager.getInstance().sendDataMessage(message);
    logger(result);
    res.json(result);
});
module.exports = router;
//# sourceMappingURL=exercise-types-routes.js.map