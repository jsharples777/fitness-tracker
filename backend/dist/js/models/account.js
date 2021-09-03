"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Account extends sequelize_1.Model {
}
Account.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    username: {
        type: sequelize_1.DataTypes.TEXT
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: connection_1.default,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
});
module.exports = Account;
//# sourceMappingURL=account.js.map