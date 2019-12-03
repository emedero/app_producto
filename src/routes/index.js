const { Router } = require('express');

const router = Router();

router.get('/product', (req, res) => {
	const data = {
		"name": "producto 1",
		"price": 23.4
	}
	res.json(data);
})

module.exports = router;