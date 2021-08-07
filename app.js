const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite', // version of SQL you're using
    storage: 'movies.db' // specify the file path or the storage engine for SQLite
});

// Test the Connection
(async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database successful!');
    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
})();