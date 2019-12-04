const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const products = require('../data/products.json');
const saleProducts = require('../data/productsSales.json');
const productSimulator = require('../data/productSimulator.json');

const rules = require('./../rules/rules');

//listar los productos que tenemos en venta
router.get('/', (req, res) => {
	res.status(200).json(products);
})

let array = [];

router.get('/evaluateProducts/:days', async (req, res) => {
	const { days } = req.params;
	array.length = 0;
	let i = 0;
	while(i < days){
		let val = await rules.getData(productSimulator)
		const obj = {
			days: i,
			data: val,
		}
		array.push(obj);
		i++;
	}

	//


	res.status(200).json(array);
})

//Agregas a productos vendidos uno de los productos que tenemos
router.post('/', (req, res) => {
	const { name, sellIn, price } = req.body;

	if(name && sellIn && price){
		console.log('Hola: ', req.body)
		const idType = products.length + 1;
		const newProduct = { ...req.body, idType };
		products.push(newProduct)
		res.send(products);
	} else {
		res.status(500).json({error: 'Failed insert'});
	}
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	if(!products.find(obj => obj.idType === Number(id))){
		res.status(404).json({Warning: `Product with Id: ${id} not found`})
	}
	const { name, sellIn, price } = req.body;

	if(name && sellIn && price){
		_.each(products, (product, i) => {
			if (product.idType === Number(id)){
				product.name = name;
				product.sellIn = sellIn;
				product.price = price;
				return res.status(200).json(products);
			}
		})
	} else {
		return res.status(500).json({error: 'There was an error'})
	}

})

//vender un producto de los tipos definidos
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	if(!products.find(obj => obj.idType === Number(id))){
		res.status(404).json({Warning: `Product with Id: ${id} not found`})
	}
	_.each(products, (product, i) => {
		if (product.idType === Number(id)){
			products.splice(i, 1);
			saleProducts.push(product)
			return res.status(200).send(products);
		}
	})
	return res.status(200).send(products);
})

module.exports = router;