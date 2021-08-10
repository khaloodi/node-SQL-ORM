const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    // Define a new model
    class Person extends Sequelize.Model {}

    // Set the model attributes
    Person.init({
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, { sequelize });

    return Person;
};