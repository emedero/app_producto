#app_producto

#Pasos para probar:

1- Clonar del repositorio la aplicación
2- Ejecutar los comandos de docker-compose up

#Apis a probar en POSTMAN:

#Usando método GET:

#Listar prductos:
http://localhost:3001/api/products/

#Listar productos vendidos:
http://localhost:3001/api/sale/products/

#Usando método POST:

#Agregar productos:
http://localhost:3000/api/products/

#Agregar productos venidos:
http://localhost:3000/api/products/sales

#Parametros para agregar en el body:
{
  "name": "Baja cobertura",
  "sellIn": 6,
  "price": 12
}

#Usando metodo delete en POSTMAN:

#vender un producto segun {:id}

http://localhost:3000/api/products/:id

#eliminar un producto vendido {:id}

http://localhost:3000/api/products/sales/:id


#Ver simulación api:
http://localhost:3001/api/products/evaluateProducts/{days}





