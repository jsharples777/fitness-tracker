import {Model,DataTypes} from "sequelize";

import sequelize from '../db/connection';
import BoardGame from './boardgame';

class ScoreSheet extends Model {}

ScoreSheet.init({
        id: {
            primaryKey: true,
            type: DataTypes.STRING
        },
        createdOn: {
            type: DataTypes.STRING
        },
        player1: {
            type: DataTypes.STRING
        },
        score1: {
            type: DataTypes.INTEGER
        },
        player2: {
            type: DataTypes.STRING
        },
        score2: {
            type: DataTypes.INTEGER
        },
        player3: {
            type: DataTypes.STRING
        },
        score3: {
            type: DataTypes.INTEGER
        },
        player4: {
            type: DataTypes.STRING
        },
        score4: {
            type: DataTypes.INTEGER
        },
        player5: {
            type: DataTypes.STRING
        },
        score5: {
            type: DataTypes.INTEGER
        },
        player6: {
            type: DataTypes.STRING
        },
        score6: {
            type: DataTypes.INTEGER
        },
        player7: {
            type: DataTypes.STRING
        },
        score7: {
            type: DataTypes.INTEGER
        },
        jsonData: {
            type: DataTypes.TEXT
        },

        scoreFor: {
            type: DataTypes.INTEGER,
            references: {
                model: BoardGame,
                key: "id"
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'scoresheet',
    });

export = ScoreSheet;
