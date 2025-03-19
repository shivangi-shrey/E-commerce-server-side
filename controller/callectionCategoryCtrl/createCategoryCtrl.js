const Category = require('../../models/categoryModel');
const slugify = require('slugify');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Generate a slug for the category
    let slug = slugify(name, { lower: true, strict: true });

    // Check if the slug already exists
    let category = await Category.findOne({ slug });
    if (category) {
      // If slug exists, append a number to make it unique
      let counter = 1;
      let newSlug = `${slug}-${counter}`;

      // Check again if the new slug already exists and increment the counter
      while (await Category.findOne({ slug: newSlug })) {
        counter++;
        newSlug = `${slug}-${counter}`;
      }

      // Use the new unique slug
      slug = newSlug;
    }

    // Create and save the new category
    const newCategory = new Category({ name, slug });
    await newCategory.save();

    res.status(200).json({ msg: 'Category created successfully', Category: newCategory });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { createCategory };
