const  router = require('express').Router()
const { createProduct} = require ('../controller/productcontroller/createProductCtrl')
const {getproduct} = require('../controller/productcontroller/getProductCtrl')
const {updateProduct} = require('../controller/productcontroller/updateProductCtrl')
const {deleteProduct} = require('../controller/productcontroller/deleteProductCtrl')
const upload = require("../config/multer")
const cloudinary = require('../config/cloudinary')





router.get('/',getproduct)
// Route to get a single product by its ID
// router.get('/product/:id', getproduct);  // This will use the same controller to get a single product


 router.post('/products', upload.single("image"),createProduct)
 

 router.put('/products/:id',updateProduct)


 router.delete('/products/:id',deleteProduct)
module.exports = router