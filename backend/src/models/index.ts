import Account = require('./account');
import BoardGame = require('./boardgame');
import ScoreSheet = require('./scoresheet');

//import BlogEntry = require('./blogentry');
//import Comment = require('./comment');

// Account.hasMany(BlogEntry,{foreignKey: 'createdBy'});
// Account.hasMany(Comment,{foreignKey: 'createdBy'});
// BlogEntry.hasMany(Comment, {foreignKey: 'commentOn', onDelete:'cascade'});
//
// BlogEntry.belongsTo(Account,{foreignKey: 'createdBy'})

Account.hasMany(BoardGame,{foreignKey: 'createdBy'});
BoardGame.hasMany(ScoreSheet, {foreignKey: 'scoreFor', onDelete:'cascade'});
//
BoardGame.belongsTo(Account,{foreignKey: 'createdBy'})

export {Account,BoardGame,ScoreSheet};