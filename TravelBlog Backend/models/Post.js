import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    cost: {
        type: String,
        required: true,
    },
    culturPlaces: {
        type: String,
    },
    toVisitPlaces: {
        type: String,
    },
    tags: {
        type: Array,
        default: [],
    },
    rating: {
        type: String,
        required: true,
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    imageUrl: String,
},
{
    timestamps: true,
},
);
PostSchema.set('validateBeforeSave', true);
//PostsSchema.set(validateBeforeSave);

export default mongoose.model('Post', PostSchema);