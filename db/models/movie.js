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
            validate: {
                // notEmpty: true, // prevent a value from being set to an empty string
                notNull: {
                    msg: 'Please provide a value for "title"',
                },
                notEmpty: {
                    msg: 'Please provide a value for "title"',
                },
            },
        },
        runtime: {
            type: Sequelize.INTEGER,
            allowNull: false, // disallow null
            validate: {
                notNull: {
                    msg: 'Please provide a value for "runtime"',
                },
                min: {
                    args: 1, // args represents the value (argument) passed to the validator. The value you specify is used to check if a column value is valid or invalid
                    // In this case, if the runtime number value is less than the number defined in args (1), it will throw a validation error
                    // The max property, on the other hand, checks if a value is less than or equal to the value specified in args.
                    msg: 'Please provide a value greater than "0" for "runtime"',
                },
            },
        },
        releaseDate: {
            type: Sequelize.DATEONLY,
            allowNull: false, // disallow null
            validate: {
                notNull: {
                    msg: 'Please provide a value for "releaseDate"',
                },
                isAfter: { // allow only a releaseDate value that is after a specific date
                    args: '1895-12-27',
                    msg: 'Please provide a value on or after "1895-12-28" for "releaseDate"',
                },
            },
        },
        isAvailableOnVHS: {
            type: Sequelize.BOOLEAN,
            allowNull: false, // disallow null,
            defaultValue: false, // set default value
        },
    }, { sequelize });

    return Movie;
};