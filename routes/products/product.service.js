const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../helpers/db');
const Product = db.Product;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
    return await Product.find().select('-hash');
}

async function create(params) {
    // validate
    if (await Product.findOne({ name: params.name })) {
        throw 'Product name "' + params.name + '" is already taken';
    }

    const product = new Product(params);

    // save product
    await product.save();
}

async function getById(id) {
    return await Product.findById(id).select('-hash');
}

async function create(param) {
    // validate
    if (await Product.findOne({ name: param.name })) {
        throw 'Name "' + param.name + '" is already taken';
    }

    const product = new Product(param);

    // save product
    await product.save();
}

async function update(id, param) {
    const product = await Product.findById(id);

    // validate
    if (!product) throw 'Product not found';
    if (product.name !== param.name && await Product.findOne({ name: param.name })) {
        throw 'Product "' + param.name + '" is already taken';
    }


    // copy productParam properties to product
    Object.assign(product, param);

    await product.save();
}

async function _delete(id) {
    await Product.findByIdAndRemove(id);
}