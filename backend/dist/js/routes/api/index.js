"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const exercise_types_routes_1 = __importDefault(require("./exercise-types-routes"));
const workouts_routes_1 = __importDefault(require("./workouts-routes"));
const user_routes_1 = __importDefault(require("./user-routes"));
const router = express_1.default.Router();
router.use('/exercise-types', exercise_types_routes_1.default);
router.use('/workouts', workouts_routes_1.default);
router.use('/users', user_routes_1.default);
module.exports = router;
//# sourceMappingURL=index.js.map