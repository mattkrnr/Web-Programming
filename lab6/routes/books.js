const express = require('express');
const router = express.Router();
const data = require('./../data');
const bookData = data.books;

router.get('/',async (req,res) => { //GET /books
    try {
        const bookList = await getBooks();
        res.json(bookList);
    } catch(e) {
        res.status(500).send();
    }
});
router.post('/',async (req,res) => { //POST /books
    const bookInfo = req.body;
    
    if (!bookInfo) {
        res.status(400).json({ error: 'You must provide data to create a book' });
        return;
    }
    if (!bookInfo.title) {
        res.status(400).json({ error: 'You must provide book title' });
        return;
    }
    if (!bookInfo.author) {
        res.status(400).json({ error: 'You must provide book author' });
        return;
    }
    if (!bookInfo.genre) {
        res.status(400).json({ error: 'You must provide book genre' });
        return;
    }
    if (!bookInfo.datePublished) {
        res.status(400).json({ error: 'You must provide book datePublished' });
        return;
    }
    if (!bookInfo.summary) {
        res.status(400).json({ error: 'You must provide book summary' });
        return;
    }
    try {
        const { title, author, genre, datePublished, summary } = bookInfo;
        const newBook = await bookData.createBook(title, author, genre, datePublished, summary);
        res.json(newBook);
    } catch(e) {
        res.status(500).send();
    }
});
router.get('/:id',async (req,res) => { //GET /books/{id}
    if (!req.params.id) {
        res.status(400).json({ error: 'You must supply an ID to get' });
        return;
    }
    try {
        const book = await bookData.getBookById(req.params.id);
        res.json(book);
    } catch(e) {
        res.status(404).json({ message: 'Book not found' });
    }
});
router.put('/:id',async (req,res) => { //PUT /books/{id}
    if (!req.params.id) {
        res.status(400).json({ error: 'You must supply an ID to update' });
        return;
    }
    const bookInfo = req.body;
    if (!bookInfo.title) {
        res.status(400).json({ error: 'You must provide book title' });
        return;
    }
    if (!bookInfo.author) {
        res.status(400).json({ error: 'You must provide book author' });
        return;
    }
    if (!bookInfo.genre) {
        res.status(400).json({ error: 'You must provide book genre' });
        return;
    }
    if (!bookInfo.datePublished) {
        res.status(400).json({ error: 'You must provide book datePublished' });
        return;
    }
    if (!bookInfo.summary) {
        res.status(400).json({ error: 'You must provide book summary' });
        return;
    }
    try {
        await bookData.getBookById(req.params.id);
      } catch (e) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }
    try {
        const { title, author, genre, datePublished, summary } = bookInfo;
        const oldBook = await bookData.getBookById(req.params.id);
        let reviews = oldBook.reviews;

        const updatedBook = await bookData.updateBook(req.params.id, title, author, genre, datePublished, summary, reviews);
        res.json(updatedBook);
    } catch(e) {
        res.status(500).send();
    }
});
router.patch('/:id', async (req, res) => { //PATCH /books/{id}
    if (!req.params.id) {
        res.status(400).json({ error: 'You must supply an ID to get' });
        return;
    }
    const requestBody = req.body;
    let updatedObject = {};
    try {
        await bookData.getBookById(req.params.id);
    } catch(e) {
        res.status(404).json({ error: "Book not found" });
        return;
    }
    try {
        const oldBook = await bookData.getBookById(req.params.id);
        updatedObject = oldBook;
        if (requestBody.title && requestBody.title !== oldBook.title)
            updatedObject.title = requestBody.title;
        if (requestBody.author && requestBody.author !== oldBook.author)
            updatedObject.author = requestBody.author;
        if (requestBody.genre)
        {
            for(i=0;i<requestBody.genre.length;i++)
            {
                if(oldBook.genre.includes(requestBody.genre[i]))
                {
                    requestBody.genre.splice(i,1);
                    i--;
                }
            }
            updatedObject.genre = oldBook.genre.concat(requestBody.genre);
        }
        if (requestBody.datePublished && requestBody.datePublished !== oldBook.datePublished)
            updatedObject.datePublished = requestBody.datePublished;
        if (requestBody.summary && requestBody.summary !== oldBook.summary)
            updatedObject.summary = requestBody.summary;
        updatedObject.reviews = oldBook.reviews;
    } catch (e) {
        res.status(404).json({ error: e });
        return;
    }
    if (Object.keys(updatedObject).length !== 0) {
        try {
            const updatedBook = await bookData.updateBook(
                req.params.id,
                updatedObject.title,
                updatedObject.author,
                updatedObject.genre,
                updatedObject.datePublished,
                updatedObject.summary,
                updatedObject.reviews
        );
            res.json(updatedBook);
      } catch (e) {
            console.log(e);
            res.status(500).json({ error: e });
      }
    } else {
        res.status(400).json({
        error:
          'No fields have been changed from their inital values, so no update has occurred'
      });
    }
  });
router.delete('/:id',async (req,res) => { //DELETE /books/{id}
    if (!req.params.id) {
        res.status(400).json({ error: 'You must supply and\ ID to delete' });
        return;
    }
    try {
        await bookData.getBookById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }
    try {
        await bookData.deleteBook(req.params.id);
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e });
    }
});

async function getBooks()
{
    const bookList = await bookData.getAllBooks();
    titleList = [];
    for(i = 0; i < bookList.length; i++)
    {
        titleList.push(
            {_id : bookList[i]._id,
            title : bookList[i].title });
    }
    return titleList;
}

module.exports = router;
