import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },

    excerpt: String,

    content: {
        type: String,
        required: true
    },

    featuredImage: {
        url: String,
        publicId: String
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    status: {
        type: String,
        enum: ["draft", "published", "archived"],
        default: "draft"
    },

    seo: {
        metaTitle: String,
        metaDescription: String
    },

    publishedAt: Date,
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;