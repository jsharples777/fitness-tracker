"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const account_1 = __importDefault(require("./account"));
class BoardGame extends sequelize_1.Model {
}
BoardGame.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    gameId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    thumb: {
        type: sequelize_1.DataTypes.STRING,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER
    },
    minPlayers: {
        type: sequelize_1.DataTypes.INTEGER
    },
    maxPlayers: {
        type: sequelize_1.DataTypes.INTEGER
    },
    minPlayTime: {
        type: sequelize_1.DataTypes.INTEGER
    },
    maxPlayTime: {
        type: sequelize_1.DataTypes.INTEGER
    },
    minAge: {
        type: sequelize_1.DataTypes.INTEGER
    },
    designers: {
        type: sequelize_1.DataTypes.TEXT
    },
    artists: {
        type: sequelize_1.DataTypes.TEXT
    },
    publisher: {
        type: sequelize_1.DataTypes.STRING
    },
    categories: {
        type: sequelize_1.DataTypes.TEXT
    },
    numOfRaters: {
        type: sequelize_1.DataTypes.INTEGER
    },
    rank: {
        type: sequelize_1.DataTypes.INTEGER
    },
    averageScore: {
        type: sequelize_1.DataTypes.INTEGER
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: account_1.default,
            key: "id"
        }
    },
}, {
    sequelize: connection_1.default,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'boardgame',
});
module.exports = BoardGame;
//# sourceMappingURL=boardgame.js.map