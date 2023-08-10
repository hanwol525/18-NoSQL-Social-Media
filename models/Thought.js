const { Schema, model, default: mongoose } = require('mongoose');
const dayjs = require('dayjs');

// getter for formatting date
const formatDate = (date) => {
    return dayjs(date).format('M/DD/YYYY');
};

// reactions schema
const reactionSchema = new Schema({
    reactionId: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
    },
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
})

// thought schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;