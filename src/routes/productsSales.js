const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const saleProducts = require('../data/productsSales.json');

//Muestras la lista de productos vendidos que tenemos actualmente.
router.get('/', (req, res) => {
	res.json(saleProducts);
})


router.post('/', (req, res) => {
	const { name, sellin, price, days } = req.body;
	if(name && sellin && price && days){
		const idType = saleProducts.length + 1;
		const newProduct = { ...req.body, idType };
		saleProducts.push(newProduct)
		res.send(saleProducts);
	} else {
		res.status(500).json({error: 'Failed insert'});
	}
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	if(!saleProducts.find(obj => obj.idType == id)){
		res.status(404).json({Warning: `Product with Id: ${id} not found`})
	}
	const { name, sellin, price, days } = req.body;
	if(name && sellin && price && days){
		_.each(saleProducts, (product, i) => {
			if (product.idType == id){
				product.name = name;
				product.sellin = sellin;
				product.price = price;
				product.days = days;
			}
		})
	}

})

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	if(!saleProducts.find(obj => obj.idType === id)){
		res.status(404).json({Warning: `Product with Id: ${id} not found`})
	}
	_.each(saleProducts, (product, i) => {
		if (product.idType === id){
			saleProducts.splice(i, 1);
			return res.status(200).send(saleProducts);
		}
	})
	return res.status(200).send(saleProducts);
})

module.exports = router;