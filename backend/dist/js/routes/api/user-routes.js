"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const debug_1 = __importDefault(require("debug"));
const file_system_database_1 = require("file-system-database");
const logger = debug_1.default('api-users');
// The `/api/users types` endpoint
router.get('/', (req, res) => {
    // find all exercise types
    const collection = process.env.DB_COLLECTION_ACCOUNTS || 'accounts';
    const results = file_system_database_1.DB.getInstance().collection(collection).find().toArray();
    logger(results.length);
    res.json(results);
});
module.exports = router;
//# sourceMappingURL=user-routes.js.map