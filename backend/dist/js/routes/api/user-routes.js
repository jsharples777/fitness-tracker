"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const MongoDataSource_1 = require("../../db/MongoDataSource");
const router = express_1.default.Router();
const debug_1 = __importDefault(require("debug"));
const logger = debug_1.default('api-users');
// The `/api/users types` endpoint
router.get('/', (req, res) => {
    // find all exercise types
    const collection = process.env.DB_COLLECTION_ACCOUNTS || 'accounts';
    const projection = { projection: {
            _id: 1,
            username: 1,
        }
    };
    MongoDataSource_1.MongoDataSource.getInstance().getDatabase().collection(collection).find({}, projection).toArray().then((results) => {
        logger(results.length);
        res.json(results);
    })
        .catch((err) => {
        logger(err);
        res.status(400).json(err);
    });
});
module.exports = router;
//# sourceMappingURL=user-routes.js.map