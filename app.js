// app.js file should now contain only code related to syncing models, querying data and CRUD operations
const db = require('./db');
const { Movie, Person } = db.models;
const { Op } = db.Sequelize; // extract the property Op from db.Sequelize

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
                isAvailableOnVHS: true,
                releaseDate: {
                    [Op.gte]: '2004-01-01' // greater than or equal to the date
                },
                runtime: {
                    [Op.gt]: 95, // greater than 95
                },
            }
        });
        // SELECT * FROM Movies WHERE runtime = 92 AND isAvailableOnVHS = true;
        console.log(movies.map(movie => movie.toJSON()));

        const ordering = await Movie.findAll({
            attributes: ['id', 'title'],
            where: {
                title: {
                    [Op.endsWith]: 'story' // return all movies with a title that ends with 'story'
                },
            },
            order: [
                    ['id', 'DESC'] // specify the order of the returned results, 'ASC' for ascending order
                ] // IDs in descending order
        });
        console.log(ordering.map(movie => movie.toJSON()));

        // Update a Record with save():
        const toyStory3 = await Movie.findByPk(3);
        toyStory3.isAvailableOnVHS = true; // updates the isAvailableOnVHS value of the toyStory3 instance using dot notation
        await toyStory3.save();

        console.log(toyStory3.get({ plain: true })); // Note: When converting an instance or collection of instances to JSON, calling get({ plain: true}) returns the same as calling .toJSON() – a plain object with just the model attributes and values.

        // Update a Record with update():
        const toyStory3_ = await Movie.findByPk(3);
        await toyStory3_.update({
            title: 'Trinket Tale 3', // this will be ignored
            isAvailableOnVHS: true,
        }, { fields: ['isAvailableOnVHS'] }); // an options object as a second argument (optional), allow/disallow (or whitelist) columns to update is useful when you want to ensure that users cannot pass objects with columns that should not be updated via a form, for example)

        console.log(toyStory3_.get({ plain: true }));

        // Delete a Movie

        // Find a record
        const toyStory = await Movie.findByPk(1);

        // Delete a record
        await toyStory.destroy();

        // Find and log all movies
        const movies1 = await Movie.findAll();
        console.log(movies1.map(movie => movie.toJSON()));

        // Logical / "Soft" Deletes vs. Physical Deletes


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