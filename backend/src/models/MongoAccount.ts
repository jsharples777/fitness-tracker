import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
let Schema = mongoose.Schema;

let MongoAccount = new Schema({
   username: String,
   password: String
});

MongoAccount.plugin(passportLocalMongoose);

export = mongoose.model('Account',MongoAccount);