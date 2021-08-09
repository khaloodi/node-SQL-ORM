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
    // try {
    // TEST THE CONNECTION, step 1
    // await sequelize.authenticate();
    // console.log('Connection to the database successful!');

    // SYNCHRONIZE MODELS WITH THE DB, step 2a
    // Sync 'Movies' table
    //await Movie.sync(); // creates or updates tables based on model definition, here we are synchonizing an individual table

    // Sync *all* tables instead of just one, step 2b
    await sequelize.sync({ force: true }); //synch all models at once instead of one at a time

    // NOTE : ^sync() issues a CREATE TABLE IF NOT EXISTS

    // {force: true}, refresh your database tables each time you start your app

    // Calling sync({ force: true }) issues a DROP TABLE IF EXISTS statement, which completely deletes the table, before issuing the CREATE TABLE IF NOT EXISTS statement. In other words, it will drop a table that exists, each time you start your app, and recreate it from the model definition.
    try {
        // Instance of the Movie class represents a database row
        const movie = await Movie.create({
            title: 'Toy Story',
        });

        /*
        Movie.create() builds a new model instance, which represents a database row, and automatically stores the instance's data. It returns a Promise object, which resolves or rejects based on the successful or failed interaction with your database.

        create() requires an object with properties that map to the model attributes (the ones defined in Movie.init(), for example). Our Movie model currently has one attribute, title, so let's create a new row with a movie title.
        */
        console.log(movie.toJSON());

    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
})();