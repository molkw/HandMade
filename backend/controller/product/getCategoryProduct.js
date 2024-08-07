const Product =  require('../../models/productModel');

const getCategoryProduct = async (req, res) => {
    try {
        
        const categories = await Product.findAll({
            attributes: ['category'],
            group: ['category']
        });

        
        const productCategory = categories.map(c => c.category);

        console.log("category", productCategory);

        
        const productByCategory = [];

        for (const category of productCategory) {
            const product = await Product.findOne({ where: { category } });

            if (product) {
                productByCategory.push(product);
            }
        }

        res.json({
            message: "category product",
            data: productByCategory,
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
}

module.exports = getCategoryProduct;
