const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
        companyName: {
            type: String,
            required: true,
            trim: true
        },
        contactEmail: {
            type: String,
            required: true,
            unique: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum : ['merchant','admin'],
            default: 'merchant',
        }
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

UserSchema.pre('save',async function(){
    if(this.isModified('passwordHash')){
        this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    }
    return;
})

UserSchema.pre("findOneAndUpdate", async function() {
    if(this._update.passwordHash) {
        this._update.passwordHash = await bcrypt.hash(this._update.passwordHash, 10);
    }
    return;
})


UserSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.passwordHash);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};

UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.passwordHash;
    return user;
};

module.exports = mongoose.model('User', UserSchema);
