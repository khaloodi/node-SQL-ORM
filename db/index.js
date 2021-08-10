// configure the Sequelize instance and require (or load) the Movie model defined in the models/movie.js

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'movies.db',
    logging: false,
    // global options
    define: {
        freezeTableName: true,
        timestamps: false,
    },
});

const db = {
    sequelize,
    Sequelize,
    models: {},
};

db.models.Movie = require('./models/movie.js')(sequelize);

module.exports = db;

// The file exports the db object, which holds the Sequelize and database configurations, as well as the models. Exposing the Sequelize package wherever you import models into your code means that you'll have all of Sequelize's methods and functionality to use.