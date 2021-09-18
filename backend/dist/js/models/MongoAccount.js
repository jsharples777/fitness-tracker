"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
let Schema = mongoose_1.default.Schema;
let MongoAccount = new Schema({
    username: String,
    password: String
});
MongoAccount.plugin(passport_local_mongoose_1.default);
module.exports = mongoose_1.default.model('Account', MongoAccount);
//# sourceMappingURL=MongoAccount.js.map