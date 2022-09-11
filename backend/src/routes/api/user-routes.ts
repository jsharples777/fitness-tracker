import express from 'express';
const router = express.Router();
import debug from 'debug';
import {DB} from "file-system-database";


const logger = debug('api-users');

// The `/api/users types` endpoint

router.get('/', (req, res) => {
    // find all exercise types
    const collection = process.env.DB_COLLECTION_ACCOUNTS || 'accounts';
    const results = DB.getInstance().collection(collection).find().toArray();

    logger(results.length);
    res.json(results);
});


export = router;
