"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// @ts-ignore
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
        decimalNumbers: true,
    },
});
module.exports = sequelize;
//# sourceMappingURL=connection.js.map