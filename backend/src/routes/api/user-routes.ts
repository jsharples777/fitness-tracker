import express from 'express';
const router = express.Router();
import debug from 'debug';
import {DB} from "file-system-database";


const logger = debug('api-users');

// The `/api/users types` endpoint

router.get('/', (req, res) => {
    const view = DB.getInstance().getView('users');
    let results:any[] = [];
    if (view) {
        results = view.content().toArray();
    }
    logger(results.length);
    res.json(results);
});


export = router;
