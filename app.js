const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite', // version of SQL you're using
    storage: 'movies.db' // specify the file path or the storage engine for SQLite
});

// Movie model
class Movie extends Sequelize.Model {} // extending sequelize model to create Movie model subclass
Movie.init({
    title: Sequelize.STRING
}, { sequelize }); // initialize, define a new table in the DB with the name Movie

// sequelize: sequelize (above ^), can set a number of options in your model definition; for example, a custom name for your model and a timestamp. The only required option is a sequelize property that defines the sequelize instance to attach to the model

// Test the Connection
(async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database successful!');
    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
})();