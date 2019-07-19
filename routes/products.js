var express = require('express');
var Product = require('../model/product')
var router = express.Router();

/* GET users listing. */
router.get('/b', function(req, res, next) {
    console.log('hiiiii====');
    Product.find({}, function(err, products) {
        if (err) res.json({});
        else {  
            console.log('hiiiii');
            var productMap = {};
        
            products.forEach(function(product) {
                productMap[product._id] = product;
            });
        
            res.json(productMap);  
        }
    });
    //res.render('main/add-product');
});
router.get('/a', async (request, response) => {
    try {
        var result = await Product.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})


router.post('/', function(req, res, next) {
    var product = new Product()

    //res.send('contact');
    
    product.category = req.body.category_name
    product.name = req.body.product_name
    product.price = req.body.product_price
    //product.cover = faker.image.image()
    console.log(product);

    product.save(function(err) {
        if (err) console.log ('error', err.message, err.stack)
        res.send('contact');
    })
})

module.exports = router;