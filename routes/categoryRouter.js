const { getCategory } = require('../controller/callectionCategoryCtrl/getCategoryCtrl');
const { createCategory } = require('../controller/callectionCategoryCtrl/createCategoryCtrl');
// const createCategoryCtrl = require('../controller/callectionCategoryCtrl/createCategoryCtrl')
const { deleteCategory } = require('../controller/callectionCategoryCtrl/deleteCategoryCtrl');
const { slugCategory } = require('../controller/callectionCategoryCtrl/getSlugCategoryCtrl');
const { updateCategory } = require('../controller/callectionCategoryCtrl/updateCategoryCtrl');

const router = require('express').Router();

const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

// Route to fetch all categories
router.get('/category', getCategory);

// Route to create a new category (requires authentication and admin privileges)
router.post('/category', auth,authAdmin, createCategory);
// router.post('/category',auth,authAdmin,createCategoryCtrl.createCategory);

// Route to delete a category by ID (requires authentication and admin privileges)
router.delete('/:id', auth, authAdmin, deleteCategory);

// Route to get category by slug
router.get('/:slug', slugCategory);

// Route to update a category by ID (requires authentication and admin privileges)
router.put('/:id', auth, authAdmin, updateCategory);

module.exports = router;
