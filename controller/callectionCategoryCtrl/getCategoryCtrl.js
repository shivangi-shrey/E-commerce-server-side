const Category = require("../../models/categoryModel");

const getCategory = async (req, res) => {
    try {
        // Fetching all categories from the database
        const categories = await Category.find(); 

        // If no categories are found, return a message
        // if (!categories || categories.length === 0) {
        //      return res.status(404).json({ msg: "No categories found 89" });
        //  }

        // Sending the fetched categories as a response
        res.status(200).json({ categories });
    } catch (err) {
        // If there is an error during the fetching process
        res.status(500).json({ msg: err.message });
    }
};

module.exports = { getCategory };
