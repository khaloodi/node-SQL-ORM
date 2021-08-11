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
        await movie3.save(); // save the record, save() validates the instance, and if the validation passes, it persists it to the database. save() also saves changed fields only -- it will do nothing if no fields changed
        console.log(movie3.toJSON());

        const movieById = await Movie.findByPk(1); //findByPk() (or 'find by primary key') retrieves a single instance by its primary key (or id) value
        console.log(movieById.toJSON());

        const movieByRuntime = await Movie.findOne({ where: { runtime: 115 } }); // findOne() finds and retrieves one specific element in a table. For example, find one movie with a runtime of 115 minutes
        console.log(movieByRuntime.toJSON());

        const people = await Person.findAll({
            where: {
                lastName: 'Hanks'
            }
        });
        // SELECT * FROM People WHERE lastName = 'Hanks';
        console.log(people.map(person => person.toJSON())); // findAll method retrieves a collection of all records, instead of a single record

        const movies = await Movie.findAll({
            attributes: ['id', 'title'], // return only id and title
            where: {
                // runtime: 92,
                isAvailableOnVHS: true
            }
        });
        // SELECT * FROM Movies WHERE runtime = 92 AND isAvailableOnVHS = true;
        console.log(movies.map(movie => movie.toJSON()));

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