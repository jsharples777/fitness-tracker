import { Model, DataTypes }  from 'sequelize';
import sequelize from '../db/connection';
import Account from './account';

class BoardGame extends Model {}

BoardGame.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    gameId: {
        type: DataTypes.INTEGER
    },

    thumb: {
        type: DataTypes.STRING,
    },

    image: {
        type: DataTypes.STRING,
    },
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        description: {
            type: DataTypes.TEXT,
        },
        year: {
            type: DataTypes.INTEGER
        },
        minPlayers: {
            type: DataTypes.INTEGER
        },
        maxPlayers: {
            type: DataTypes.INTEGER
        },
        minPlayTime: {
            type: DataTypes.INTEGER
        },
        maxPlayTime: {
            type: DataTypes.INTEGER
        },
        minAge: {
            type: DataTypes.INTEGER
        },
        designers: {
            type: DataTypes.TEXT
        },
        artists: {
            type: DataTypes.TEXT
        },
        publisher: {
            type: DataTypes.STRING
        },
        categories: {
            type: DataTypes.TEXT
        },
        numOfRaters: {
            type: DataTypes.INTEGER
        },
        rank: {
            type: DataTypes.INTEGER
        },
        averageScore: {
            type: DataTypes.INTEGER
        },

    createdBy: {
        type: DataTypes.INTEGER,
        references: {
            model:Account,
            key:"id"
        }
    },
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'boardgame',
    });

export = BoardGame;
