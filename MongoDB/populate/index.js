const mongoose = require('mongoose');
const Book = require('./models/book');
const Author = require('./models/author');
require('./config/database'); // Connect to the database

(async function() {
    // Create an author
    const author = new Author({ name: 'J.K. Rowling' });
    await author.save();

    // Create a book with a reference to the author
    const book = new Book({ title: 'Harry Potter', author: author._id });
    await book.save();

    // Retrieve the book and populate the author field
 

    mongoose.connection.close();
})();
