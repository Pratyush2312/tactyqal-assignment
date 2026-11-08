import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
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
        fileId: String
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        default:null
    },

    status: {
        type: String,
        enum: ["draft", "published", "archived"],
        default: "draft"
    },

    publishedAt: Date,
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;