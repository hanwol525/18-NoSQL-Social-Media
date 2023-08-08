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
    }
)

// need: friendCount virtual