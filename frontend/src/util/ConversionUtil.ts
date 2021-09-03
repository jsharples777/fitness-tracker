// private static convertJSONCommentToComment(jsonComment:any):Comment {
//     let comment:Comment = {
//         id:jsonComment.id,
//         content:jsonComment.content,
//         createdBy:jsonComment.createdBy,
//         changedOn:jsonComment.changedOn,
//         commentOn:jsonComment.commentOn,
//     };
//     return comment;
// }
//
// private static convertJSONUserToUser(jsonUser:any):User {
//     let user:User = {
//         id:jsonUser.id,
//         username:jsonUser.username,
//     }
//     return user;
// }
//
// private static convertJSONEntryToBlogEntry(jsonEntry:any):BlogEntry {
//     let entry:BlogEntry = {
//         id: jsonEntry.id,
//         title:jsonEntry.title,
//         content:jsonEntry.content,
//         createdBy:jsonEntry.createdBy,
//         changedOn:jsonEntry.changedOn,
//         User:null,
//         Comments:[],
//     }
//     const cbUser:User|null = jsonEntry.user;
//     if (cbUser) {
//         entry.User = Controller.convertJSONUserToUser(cbUser);
//     }
//     const cbComments:Comment[]|null = jsonEntry.comments;
//     if (cbComments) {
//         cbComments.forEach((cbComment:any) => {
//             let comment = Controller.convertJSONCommentToComment(cbComment);
//             entry.Comments.push(comment);
//         });
//     }
//     return entry;
// }
let fluffy = {};
export default fluffy;

// let aggregateStateManager:AggregateStateManager = AggregateStateManager.getInstance();
// // store information in local storage, indexeddb, and memory
// aggregateStateManager.addStateManager(MemoryBufferStateManager.getInstance());
// aggregateStateManager.addStateManager(BrowserStorageStateManager.getInstance());
// let objectStores:collection[] = [
//     { name: this.config.stateNames.users, keyField: 'id'},
//     { name: this.config.stateNames.entries, keyField: 'id'},
//     { name: this.config.stateNames.comments, keyField: 'id'},
//
// ];
// let indexedDBStateManager = IndexedDBStateManager.getInstance();
// indexedDBStateManager.initialise(objectStores).then((result) => {
//     cLogger('indexed DB setup');
// });
// aggregateStateManager.addStateManager(indexedDBStateManager,['selectedEntry']);
// let asyncSM = new AsyncStateManagerWrapper(aggregateStateManager,restAPIStateManager); // link the REST API calls to the Aggregate SM
// aggregateStateManager.addStateManager(asyncSM,['selectedEntry']);
