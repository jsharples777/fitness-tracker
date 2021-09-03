"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreSheet = exports.BoardGame = exports.Account = void 0;
const Account = require("./account");
exports.Account = Account;
const BoardGame = require("./boardgame");
exports.BoardGame = BoardGame;
const ScoreSheet = require("./scoresheet");
exports.ScoreSheet = ScoreSheet;
//import BlogEntry = require('./blogentry');
//import Comment = require('./comment');
// Account.hasMany(BlogEntry,{foreignKey: 'createdBy'});
// Account.hasMany(Comment,{foreignKey: 'createdBy'});
// BlogEntry.hasMany(Comment, {foreignKey: 'commentOn', onDelete:'cascade'});
//
// BlogEntry.belongsTo(Account,{foreignKey: 'createdBy'})
Account.hasMany(BoardGame, { foreignKey: 'createdBy' });
BoardGame.hasMany(ScoreSheet, { foreignKey: 'scoreFor', onDelete: 'cascade' });
//
BoardGame.belongsTo(Account, { foreignKey: 'createdBy' });
//# sourceMappingURL=index.js.map