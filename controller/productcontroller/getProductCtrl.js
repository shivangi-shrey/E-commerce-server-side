const Products = require('../../models/productModule');

const getproduct = async (req, res) => {
    try {
        console.log('Fetching products...');  // Add a log to confirm the function is called
        const products = await Products.find();
        console.log('Products:', products);  // Log the result

        if (products.length === 0) {
            return res.status(404).json({ msg: 'No products found' });
        }

        // If products exist, return them with status 200
        res.status(200).json(products);
    } catch (error) {
        // Handle errors (e.g., database connection issues)
        res.status(500).json({ msg: error.message });
    }
};

module.exports = { getproduct };
