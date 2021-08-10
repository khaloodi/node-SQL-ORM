// app.js file should now contain only code related to syncing models, querying data and CRUD operations

const db = require('./db');
const { Movie, Person } = db.models;

(async() => {
    await db.sequelize.sync({ force: true });

    try {
        // const movie = await Movie.create({
        //     title: 'Toy Story'
        // });
        // console.log(movie.toJSON());

        // const movie2 = await Movie.create({
        //     title: 'The Incredibles'
        // });
        // console.log(movie2.toJSON());
        const movie = await Movie.create({
            title: 'Toy Story',
            runtime: 81,
            releaseDate: '1995-11-22',
            isAvailableOnVHS: true,
        });
        console.log(movie.toJSON());

        const movie2 = await Movie.create({
            title: 'The Incredibles',
            runtime: 115,
            releaseDate: '2004-04-14',
            isAvailableOnVHS: true,
        });
        console.log(movie2.toJSON());
        // New Person record
        const person = await Person.create({
            firstName: 'Tom',
            lastName: 'Hanks',
        });
        console.log(person.toJSON());

        // New instance
        const movie3 = await Movie.build({
            title: 'Toy Story 3',
            runtime: 103,
            releaseDate: '2010-06-18',
            isAvailableOnVHS: false,
        });
        // The build() method builds a non-persistent model instance. It returns an unsaved object, which you explicitly have to save to the database. Creating a record with build() is a two-step process: you build an instance, then save it.
        await movie3.save(); // save the record
        console.log(movie3.toJSON());
    } catch (error) {
        // console.error('Error connecting to the database: ', error);
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            console.error('Validation errors: ', errors);
        } else {
            throw error;
        }
    }
})();