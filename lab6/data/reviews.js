const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;
let { ObjectId } = require('mongodb');

module.exports = {
    async createReview(title,reviewer,rating,dateOfReview,review)
    {
        if(typeof(title) !== "string" || title.trim() === "") throw new Error("title must be a non-empty string");
        if(typeof(reviewer) !== "string" || reviewer.trim() === "") throw new Error("reviewer must be a non-empty string");
        if(typeof(rating) !== "number") throw new Error("rating must be a number from 1 to 5");
        if(rating < 1 || rating > 5) throw new Error("rating must be a number from 1 to 5");
        if(typeof(dateOfReview) !== "string" || dateOfReview.trim() === "") throw new Error("dateOfReview must be a non-empty string");
        if(typeof(review) !== "string" || review.trim() === "") throw new Error("review must be a non-empty string");

        const reviewCollection = await reviews();
        
        let newReview = {
            title: title,
            reviewer: reviewer,
            rating: rating,
            dateOfReview: dateOfReview,
            review: review
        };

        const insertInfo = await reviewCollection.insertOne(newReview);
        if(insertInfo.insertedCount === 0) throw new Error("Could not add review");
        
        //const newId = insertInfo.insertedId;
        let x = insertInfo.insertedId.toString();

        const returnReview = await this.getReviewById(x);
        
        return returnReview;
    },
    async getAllReviews()
    {
        const reviewCollection = await reviews();
        const reviewList = await reviewCollection.find({}).toArray();
        for(i=0;i<reviewList.length;i++)
        {
            reviewList[i]._id = `${reviewList[i]._id}`;
        }
        return reviewList;
    },
    async getReviewById(id)
    {
        if (!id) throw new Error('You must provide an id to search for');
        if(typeof(id) !== "string" || id.trim() === "") throw new Error("You must provide a non-empty string");

        let parsedId = ObjectId(id);
        const reviewCollection = await reviews();
        const review = await reviewCollection.findOne({ _id: parsedId });
        if (review === null) throw new Error(`No review with id ${id}`);

        review._id = `${review._id}`;
        return review;
    },
    async deleteReview(id)
    {
        if (!id) throw new Error('You must provide an id for a review to remove');
        if(typeof(id) !== "string" || id.trim() === "") throw new Error("You must provide a non-empty string");

        let parsedId = ObjectId(id);

        const reviewCollection = await reviews();
        const review = await reviewCollection.findOne({ _id: parsedId });
        const deletionInfo = await reviewCollection.deleteOne({ _id: parsedId });

        if (deletionInfo.deletedCount === 0) throw new Error(`Could not delete review with id '${id}'`);
        
        return `${review.title} has been successfully deleted`;
    }
}
