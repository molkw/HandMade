const uploadProductPermission = require("../../helpers/permission")
const Product =  require('../../models/productModel');

async function updateProductController(req, res) {
    try {
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission denied");
        }

        const { id, ...resBody } = req.body;

       
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error("Product not found");
        }

        
        await Product.update(resBody, {
            where: { id: id }
        });

       
        const updatedProduct = await Product.findByPk(id);

        res.json({
            message: "Product updated successfully",
            data: updatedProduct,
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

module.exports = updateProductController;
