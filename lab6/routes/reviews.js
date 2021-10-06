const express = require('express');
const router = express.Router();
const data = require('./../data');
const reviewData = data.reviews;
const bookData = data.books;

router.get('/:id',async (req,res) => { //GET /reviews/{bookId}
    try {
        const book = await bookData.getBookById(req.params.id);
        const reviews = book.reviews;
        res.json(reviews);
    } catch(e) {
        res.status(404).json({ message: 'Book not found' });
    }
});
router.post('/:id',async (req,res) => { //POST /reviews/{bookId}
    try {
        await bookData.getBookById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }
    const reviewInfo = req.body;
    if (!reviewInfo.title) {
        res.status(400).json({ error: 'You must provide review title' });
        return;
    }
    if (!reviewInfo.reviewer) {
        res.status(400).json({ error: 'You must provide reviewer' });
        return;
    }
    if (!reviewInfo.rating) {
        res.status(400).json({ error: 'You must provide rating' });
        return;
    }
    if (!reviewInfo.dateOfReview) {
        res.status(400).json({ error: 'You must provide dateOfReview' });
        return;
    }
    if (!reviewInfo.review) {
        res.status(400).json({ error: 'You must provide review' });
        return;
    }
    try {
        const { title, reviewer, rating, dateOfReview, review } = reviewInfo;
        const newReview = await reviewData.createReview(title, reviewer, rating, dateOfReview, review);
        
        const oldBook = await bookData.getBookById(req.params.id);
        oldBook.reviews.push(newReview);
        let updatedBook = await bookData.updateBook(req.params.id,
            oldBook.title,
            oldBook.author,
            oldBook.genre,
            oldBook.datePublished,
            oldBook.summary,
            oldBook.reviews
        )
        res.json(updatedBook);
    } catch(e) {
        res.status(500).send();
    }
});
router.get('/review/:id',async (req,res) => { //GET /reviews/review/{reviewId)
    try {
        const review = await reviewData.getReviewById(req.params.id);
        res.json(review);
    } catch(e) {
        res.status(404).json({ message: 'Review not found' });
    }
});
router.delete('/:id',async (req,res) => { //DELETE /reviews/{reviewId)
    try {
        await reviewData.getReviewById(req.params.id);
    } catch(e) {
        res.status(404).json({ message: 'Review not found' });
    }
    try {
        const bookList = await bookData.getAllBooks();
        let book = {};
        let bookFound = false;
        let i = 0;
        let reviewList = [];
        while(i < bookList.length && !bookFound)
        {
            reviewList = bookList[i].reviews;
            for(j = 0; j < reviewList.length; j++)
            {
                if(reviewList[j]._id === req.params.id)
                {
                    book = bookList[i];
                    bookFound = true;
                    reviewList.splice(j,1);
                }
            }
            i++;
        }
        
        await bookData.updateBook(
            book._id,
            book.title,
            book.author,
            book.genre,
            book.datePublished,
            book.summary,
            reviewList
        )
        await reviewData.deleteReview(req.params.id);
        res.json( {"reviewId": req.params.id, "deleted": true}) ;
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
});

module.exports = router;