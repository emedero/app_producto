const express = require('express');
const  app = express();
const morgan = require('morgan');
const rules = require('./rules/rules');
const products = require('./data/products.json')

app.set('port', process.env.PORT || 3001);
app.set('json spaces', 2);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use('/api/products',require('./routes/products'));

app.use('/api/products/sales',require('./routes/productsSales'));



//Al final del dia, el sistema debe disminuir los valores de price y sellIn para cada producto.
setInterval(() => {
	const time = new Date().toLocaleString("en-US", {timeZone: "America/Santiago"}).split(',')[1].replace('PM', '').replace(' ', '');
	const currentDay = new Date().toLocaleString().split(',')[0].trim()
	if (time.trim() === new Date(`${currentDay}, 22:00:00`).toLocaleTimeString().replace('PM', '').trim()){
		rules.updateProducts(products);
	}
}, 1000);


app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);
})