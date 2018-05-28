var mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt-nodejs');
SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  email: {type: String, required: true, unique: true, lowercase: true},
  username: {type: String, required: true, unique: true, lowercase: true},
  password: {type: String, required: true},
  creationDate: {type: Date, required: false}  
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next(); 

        // hash the password along with our new salt
        bcrypt.hash(user.password, null,null, function(err, hash) {
            if (err) return next(err);
 
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
 
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};


module.exports = mongoose.model('User', UserSchema, 'users');