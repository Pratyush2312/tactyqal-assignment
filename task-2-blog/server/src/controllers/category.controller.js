import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const slug = name.split(" ").join("_");
        const category = await Category.create({
            name,
            slug,
            description
        })
        return res.status(201).json({
            message: "Category created successfully",
            data: category
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getAllCategory = async (req, res) => {
    try {
        const category = await Category.find();
        return res.status(200).json({
            message: "Category fetched",
            data: category
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


export const updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await Category.findByIdAndUpdate(req.params.id,
            { $set: { name, description } },
            {
                returnDocument: "after",
                runValidators: true
            }
        );
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }
        return res.status(200).json({
            message: "Category updated successfully",
            data: category
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({
                message:"Category not found"
            })
        }
        return res.status(200).json({
            message:"Category deleted"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}