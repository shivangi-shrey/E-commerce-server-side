const Products = require("../../models/productModule")
const cloudinary = require('../../config/cloudinary.js')
const fs = require("fs")
const upload = require('../../config/multer')

const createProduct = async (req, res) => {
    try {
        const { product_id, title, price, description, content, category } = req.body
        if (!req.file) {
            return res.status(400).json({ msg: "no image available" })
        }
         const result = await cloudinary.uploader.upload(req.file.path)
         // Safely delete the image from the local server after uploading to Cloudinary
        try {
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);  // This deletes the file locally
                console.log("File deleted from local server.");
            }
        } catch (err) {
            console.error("Error deleting the local file:", err);
            // If deletion fails, you can still proceed with the Cloudinary upload, 
            // but log the error for debugging.
        }
        const product = await Products.findOne({ product_id })
        if (product) {
            return res.status(400).json({ msg: "this product is already exists" })
        }
        // res.status(404).json({ msg: "product not found" })
        // Handle the title safely, ensuring it's not undefined
        const formattedTitle = title ? title.toLowerCase() : '';

        const newProduct = new Products({
            product_id, title: formattedTitle, price, description, content, image: result.secure_url,
            category,

        })
        await newProduct.save();
        res.status(201).json({ msg: "Create a product" })
    } catch (error) {
        return res.status(500).json({ msg: error.message })

    }
}


module.exports = { createProduct }