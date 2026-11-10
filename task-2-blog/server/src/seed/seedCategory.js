import mongoose from "mongoose";
import { config } from "../config/config.js";
import Category from "../models/category.model.js";

const categories = [
    {
        name: "Technology",
        slug: "technology",
        description: "Technology, software development and digital innovation.",
    },
    {
        name: "Artificial Intelligence",
        slug: "artificial-intelligence",
        description: "AI, machine learning and emerging intelligent technologies.",
    },
    {
        name: "Startups",
        slug: "startups",
        description: "Startup journeys, entrepreneurship and founder insights.",
    },
    {
        name: "Business",
        slug: "business",
        description: "Business strategy, operations and industry insights.",
    },
    {
        name: "Marketing",
        slug: "marketing",
        description: "Digital marketing, branding and growth strategies.",
    },
    {
        name: "Product Management",
        slug: "product-management",
        description: "Product strategy, development and management practices.",
    },
    {
        name: "Innovation",
        slug: "innovation",
        description: "Ideas, emerging trends and transformative innovations.",
    },
    {
        name: "Leadership",
        slug: "leadership",
        description: "Leadership, team building and organisational growth.",
    },
];

const seedCategories = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);

        for (const category of categories) {
            await Category.updateOne(
                { slug: category.slug },
                { $setOnInsert: category },
                { upsert: true }
            );
        }

        console.log(`${categories.length} categories seeded successfully.`);
    } catch (error) {
        console.error("Category seeding failed:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

seedCategories();