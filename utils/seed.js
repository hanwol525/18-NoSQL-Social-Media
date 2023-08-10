const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getUsers, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connection successful!');
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length){
        await connection.dropCollection('users')
    };

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length){
        await connection.dropCollection('thoughts')
    };

    const users = getUsers();
    const thoughts = getRandomThoughts(15);

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.log('Successfully seeded');
    process.exit(0);
});