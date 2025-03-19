const Products = require("../../models/productModule");
const cloudinary = require("../../config/cloudinary");
const upload = require("../../config/multer");

const updateProduct = async (req, res) => {
    try {
        // Use Multer middleware to handle file upload in the route
        upload.single('image')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ msg: "Error in file upload", error: err.message });
            }

            // Extract fields from the request body
            const { title, price, description, content, category } = req.body;

            // Prepare an object to hold the fields to be updated
            let updatedFields = {};

            // Add fields to be updated
            if (title) updatedFields.title = title.toLowerCase();
            if (price) updatedFields.price = price;
            if (description) updatedFields.description = description;
            if (content) updatedFields.content = content;
            if (category) updatedFields.category = category;

            // If there's a new image, upload to Cloudinary
            if (req.file) {
                try {
                    // Upload image to Cloudinary
                    const result = await cloudinary.uploader.upload(req.file.buffer, {
                        folder: 'product_images', // Folder to store images in Cloudinary
                    });

                    // Save the Cloudinary image URL in the updated fields
                    updatedFields.image = result.secure_url;
                } catch (uploadError) {
                    return res.status(500).json({ msg: "Cloudinary upload failed", error: uploadError.message });
                }
            }

            // If no fields to update, return an error
            if (Object.keys(updatedFields).length === 0) {
                return res.status(400).json({ msg: "No valid fields to update" });
            }

            // Find the product by its ID and update only the provided fields
            const updatedProduct = await Products.findByIdAndUpdate(
                req.params.id,  // The ID from the URL parameter
                { $set: updatedFields },  // Update only the specified fields
                { new: true }  // Return the updated product
            );

            // If product not found, return 404
            if (!updatedProduct) {
                return res.status(404).json({ msg: "Product not found" });
            }

            // Return the updated product
            res.json({
                msg: "Product updated successfully",
                updatedProduct,
            });
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

module.exports = { updateProduct };
