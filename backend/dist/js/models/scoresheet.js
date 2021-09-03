"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const boardgame_1 = __importDefault(require("./boardgame"));
class ScoreSheet extends sequelize_1.Model {
}
ScoreSheet.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.STRING
    },
    createdOn: {
        type: sequelize_1.DataTypes.STRING
    },
    player1: {
        type: sequelize_1.DataTypes.STRING
    },
    score1: {
        type: sequelize_1.DataTypes.INTEGER
    },
    player2: {
        type: sequelize_1.DataTypes.STRING
    },
    score2: {
        type: sequelize_1.DataTypes.INTEGER
    },
    player3: {
        type: sequelize_1.DataTypes.STRING
    },
    score3: {
        type: sequelize_1.DataTypes.INTEGER
    },
    player4: {
        type: sequelize_1.DataTypes.STRING
    },
    score4: {
        type: sequelize_1.DataTypes.INTEGER
    },
    player5: {
        type: sequelize_1.DataTypes.STRING
    },
    score5: {
        type: sequelize_1.DataTypes.INTEGER
    },
    player6: {
        type: sequelize_1.DataTypes.STRING
    },
    score6: {
        type: sequelize_1.DataTypes.INTEGER
    },
    player7: {
        type: sequelize_1.DataTypes.STRING
    },
    score7: {
        type: sequelize_1.DataTypes.INTEGER
    },
    jsonData: {
        type: sequelize_1.DataTypes.TEXT
    },
    scoreFor: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: boardgame_1.default,
            key: "id"
        },
    },
}, {
    sequelize: connection_1.default,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'scoresheet',
});
module.exports = ScoreSheet;
//# sourceMappingURL=scoresheet.js.map