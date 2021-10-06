const mongoCollections = require("../config/mongoCollections");
const books = mongoCollections.books;
let { ObjectId } = require('mongodb');

module.exports = {
    async createBook(title,author,genre,datePublished,summary)
    {
        if(!title || !author || !genre|| !datePublished || !summary) throw new Error("All fields need to have valid values");
        
        if(typeof(title) !== "string" || title.trim() === "") throw new Error("title must be a non-empty string");
        if(typeof(author) !== "object") throw new Error("author must be an object");
        if(typeof(author.authorFirstName) !== "string" || typeof(author.authorLastName) !== "string") throw new Error("authorFirstName and authorLastName must be of type string");
        if(!Array.isArray(genre)) throw new Error("genre must be an array of strings");
        if(genre.length === 0) throw new Error("There must be at least one genre");
        for(i = 0; i < genre.length; i++)
        {
            if(typeof(genre[i]) !== "string") throw new Error("genre must be an array of strings");
        }
        if(typeof(datePublished) !== "string" || datePublished.trim() === "") throw new Error("Date published must be a string of valid date format (MM/DD/YYYY)");
        if(typeof(summary) !== "string" || summary.trim() === "") throw new Error("summary must be a non-empty string");

        const bookCollection = await books();
        
        let newBook = {
            title: title,
            author: author,
            genre: genre,
            datePublished: datePublished,
            summary: summary,
            reviews: []
        };

        const insertInfo = await bookCollection.insertOne(newBook);
        if(insertInfo.insertedCount === 0) throw new Error("Could not add book");
        
        const newId = insertInfo.insertedId;
        let x = insertInfo.insertedId.toString();

        const book = await this.getBookById(x);
        
        return book;
    },
    async getAllBooks()
    {
        const bookCollection = await books();
        const bookList = await bookCollection.find({}).toArray();
        for(i=0;i<bookList.length;i++)
        {
            bookList[i]._id = `${bookList[i]._id}`;
        }
        return bookList;
    },
    async getBookById(id)
    {
        if (!id) throw new Error('You must provide an id to search for');
        if(typeof(id) !== "string" || id.trim() === "") throw new Error("You must provide a non-empty string");

        let parsedId = ObjectId(id);
        const bookCollection = await books();
        const book = await bookCollection.findOne({ _id: parsedId });
        
        if (book === null) throw new Error(`No book with id ${id}`);

        book._id = `${book._id}`;
        return book;
    },
    async updateBook(id,title,author,genre,datePublished,summary,reviews)
    {
        if (!id) throw new Error('You must provide an id for a book to update');
        if(typeof(id) !== "string" || id.trim() === "") throw new Error("Id must be a non-empty string");

        if(!title || !author || !genre|| !datePublished || !summary) throw new Error("All fields need to have valid values");
        
        if(typeof(title) !== "string" || title.trim() === "") throw new Error("title must be a non-empty string");
        if(typeof(author) !== "object") throw new Error("author must be an object");
        if(typeof(author.authorFirstName) !== "string" || typeof(author.authorLastName) !== "string") throw new Error("authorFirstName and authorLastName must be of type string");
        if(!Array.isArray(genre)) throw new Error("genre must be an array of strings");
        if(genre.length === 0) throw new Error("There must be at least one genre");
        for(i = 0; i < genre.length; i++)
        {
            if(typeof(genre[i]) !== "string") throw new Error("genre must be an array of strings");
        }
        if(typeof(datePublished) !== "string" || datePublished.trim() === "") throw new Error("Date published must be a string of valid date format (MM/DD/YYYY)");
        if(typeof(summary) !== "string" || summary.trim() === "") throw new Error("summary must be a non-empty string");
        if(!Array.isArray(reviews)) throw new Error("reviews must be an array of review objects");

        let parsedId = ObjectId(id);

        const bookCollection = await books();
        const book = await bookCollection.findOne({ _id: parsedId });
        if (book === null) throw new Error(`Could not update book with id ${id}`);

        let updatedBook = {
            title: title,
            author: author,
            genre: genre,
            datePublished: datePublished,
            summary: summary,
            reviews: reviews
        };

        const updatedInfo = await bookCollection.updateOne(
            { _id: parsedId },
            { $set: updatedBook }
        );

        if (updatedInfo.modifiedCount === 0) throw 'Could not update book successfully';

        const newUpdates = await this.getBookById(id);
        return newUpdates;
    },
    async deleteBook(id)
    {
        if (!id) throw new Error('You must provide an id for a book to remove');
        if(typeof(id) !== "string" || id.trim() === "") throw new Error("You must provide a non-empty string");

        let parsedId = ObjectId(id);

        const bookCollection = await books();
        const book = await bookCollection.findOne({ _id: parsedId });
        const deletionInfo = await bookCollection.deleteOne({ _id: parsedId });

        if (deletionInfo.deletedCount === 0) throw new Error(`Could not delete book with id '${id}'`);
        
        return `${book.title} has been successfully deleted`;
    }
}
