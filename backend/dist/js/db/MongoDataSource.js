"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDataSource = void 0;
const mongodb_1 = require("mongodb");
const debug_1 = __importDefault(require("debug"));
const logger = debug_1.default('mongo-data-source');
class MongoDataSource {
    constructor() {
        const initialise = () => __awaiter(this, void 0, void 0, function* () {
            let url = process.env.DB_URL || 'mongodb://localhost/default';
            this.client = new mongodb_1.MongoClient(url);
            yield this.client.connect();
            logger("Mongo DB connected");
            this.db = this.client.db();
        });
        initialise();
    }
    static getInstance() {
        if (!MongoDataSource._instance) {
            MongoDataSource._instance = new MongoDataSource();
        }
        return MongoDataSource._instance;
    }
    getNextId(name) {
        return __awaiter(this, void 0, void 0, function* () {
            logger("Getting next id with name " + name);
            const collection = process.env.DB_COLLECTION_ITEM_IDS || 'identifier';
            const result = yield this.db.collection(collection).findOneAndUpdate({ _id: name }, { $inc: { current: 1 } });
            // @ts-ignore
            logger(result.value.current);
            // @ts-ignore
            return result.value.current;
        });
    }
    getDatabase() {
        return this.db;
    }
}
exports.MongoDataSource = MongoDataSource;
//# sourceMappingURL=MongoDataSource.js.map