const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const products = require('../data/products.json');
const saleProducts = require('../data/productsSales.json');

//listar los productos que tenemos en venta
router.get('/', (req, res) => {
	res.status(200).json(products);
})

//Agregas a productos vendidos uno de los productos que tenemos
router.post('/', (req, res) => {
	const { name, sellin, price, days } = req.body;
	if(name && sellin && price && days){
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
	if(!products.find(obj => obj.idType === id)){
		res.status(404).json({Warning: `Product with Id: ${id} not found`})
	}
	const { name, sellin, price, days } = req.body;

	if(name && sellin && price && days){
		_.each(products, (product, i) => {
			if (product.idType === id){
				product.name = name;
				product.sellin = sellin;
				product.price = price;
				product.days = days;
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
	if(!products.find(obj => obj.idType === id)){
		res.status(404).json({Warning: `Product with Id: ${id} not found`})
	}
	_.each(products, (product, i) => {
		if (product.idType === id){
			products.splice(i, 1);
			saleProducts.push(product)
			return res.status(200).send(products);
		}
	})
	return res.status(200).send(products);
})

module.exports = router;