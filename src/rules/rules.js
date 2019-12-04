
const getData = async (products) => {
	return Promise.all(products.map(obj => {
		let degrada = 1;
		if(obj.sellIn < 0){
			degrada *= 2;
		}
		//El precio de un producto, nunca es negativo.
		let price = 1;
		if(obj.price === 0) {
			price = 0;
		}
		//El producto "Super avance" dismuniye su precio el doble de rapido que un producto normal.
		if (obj.name === 'Super avance') {
			obj.sellIn -= degrada;
			if(obj.price > 1) {
				obj.price -= 2 * price;
			}
		}
		//el producto "Full cobertura Super duper", tal como el "Full Cobertura",
		// incrementa su precio a medida que se acerca su fecha de vencimiento
		//El precio se incrementa en 2 cuando quedan 10 dias o menos y se incrementa en 3, cuando quedan 5 dias o menos.
		else if (obj.name === 'Full cobertura Super duper') {
			if(obj.price < 100){
				if(obj.sellIn < 1){
					obj.price = 0;
					obj.sellIn -= degrada;
				}
				else if(obj.sellIn <= 5){
					obj.price += 3 * price;
					obj.sellIn -= degrada;
				}
				else if(obj.sellIn <= 10){
					obj.price += 2 * price;
					obj.sellIn -= degrada;
				}
				else {
					obj.price += price;
					obj.sellIn -= degrada;
				}
			}
		}
		//el producto "Full cobertura" incrementa su precio a medida que pasa el tiempo.
		else if (obj.name === 'Full cobertura') {
			obj.sellIn -= degrada;
			//el precio de un producto nunca supera los 100.
			if(obj.price < 100){
				obj.price += 1;
			}
		}
		//Una vez que la fecha de venta ha pasado, sellIn < 0 , los precios de cada producto, se degradan el doble de rapido.
		else if(obj.sellIn < 0){
			obj.price -= 2 * price;
			obj.sellIn -= degrada;
		}
		else {
			obj.price -= price;
			obj.sellIn -= degrada;
		}
		return obj;
	}));
}

module.exports = {
	getData,
};