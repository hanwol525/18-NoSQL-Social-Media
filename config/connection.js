const { connect, connection } = require('mongoose');

// add your connection string to connect
connect('mongodb+srv://hannahwolfson05:p8SD9gdMyQk8ewE6@cluster0.qbbci2g.mongodb.net/fullnameVirtual');

module.exports = connection;