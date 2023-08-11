const connection = require('../config/connection');
const { User } = require('../models');
const { getUsers } = require('./data');

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

    await User.collection.insertMany(users);

    console.log('Successfully seeded!');
    process.exit(0);
});