const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/`([a-z0-9_\.]+)@([a-z0-9-\.]+)\.([a-z\.]{2, 6})$/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts'
            }
        ],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'users'
        }]
    },
    {
        toJSON: {
          virtuals: true
        },
        id: false
    }
)

// get friend count
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('users', userSchema);

module.exports = User;