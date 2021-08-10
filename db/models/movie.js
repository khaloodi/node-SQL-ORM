// require the 'sequelize' module and export the initialized Movie model
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Movie extends Sequelize.Model {}
    Movie.init({
        // Sequelize adds an id attribute to your model, which generates an 'id' column in your table that assigns each row a unique ID. The ID acts as a 'primary key', or a unique indexable reference for each entry.

        // Instead of the default generated id column, you can set a custom column name for primary keys in your table, using primaryKey: true
        // Set custom primary key column
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false, // disallow null
        },
        runtime: {
            type: Sequelize.INTEGER,
            allowNull: false, // disallow null
        },
        releaseDate: {
            type: Sequelize.DATEONLY,
            allowNull: false, // disallow null
        },
        isAvailableOnVHS: {
            type: Sequelize.BOOLEAN,
            allowNull: false, // disallow null
        },
    }, { sequelize });

    return Movie;
};