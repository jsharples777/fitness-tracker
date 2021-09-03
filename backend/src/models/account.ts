import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/connection';



class Account extends Model {}

Account.init({

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        username: {
            type: DataTypes.TEXT
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    });


export = Account;

