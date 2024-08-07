const Product = require('../../models/productModel');

const getCategoryWiseProduct = async (req, res) => {
    try {
        // Access category from req.body
        const { category } = req.body;

        // Check if category is provided
        if (!category) {
            return res.status(400).json({
                message: "Category parameter is required",
                error: true,
                success: false
            });
        }

        // Fetch products by category
        const products = await Product.findAll({
            where: { category }
        });

        res.json({
            data: products,
            message: "Products retrieved successfully",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = getCategoryWiseProduct;
