// require the 'sequelize' module and export the initialized Movie model
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Movie extends Sequelize.Model {}
    Movie.init({
        title: {
            type: Sequelize.STRING
        },
        runtime: {
            type: Sequelize.INTEGER
        },
        releaseDate: {
            type: Sequelize.DATEONLY
        },
        isAvailableOnVHS: {
            type: Sequelize.BOOLEAN
        },
    }, { sequelize });

    return Movie;
};