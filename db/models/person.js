const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    // Define a new model
    class Person extends Sequelize.Model {}

    // Set the model attributes
    Person.init({
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            // Add validators. The notNull validator prevents null values, and notEmpty does not allow empty string values. The msg property is used to set a custom error message when validation fails
            validate: {
                notNull: {
                    msg: 'Please provide a value for "firstName"',
                },
                notEmpty: {
                    msg: 'Please provide a value for "firstName"',
                },
            },
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "lastName"',
                },
                notEmpty: {
                    msg: 'Please provide a value for "lastName"',
                },
            },
        },
    }, { sequelize });

    return Person;
};