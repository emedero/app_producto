#app_producto

#Pasos para probar:

1- Clonar del repositorio la aplicación
2- Ejecutar los comandos de docker-compose up

#Apis a probar en POSTMAN:

#Usando método GET:

#Listar prductos:
http://localhost:3000/api/products/

#Listar productos vendidos:
http://localhost:3000/api/sale/products/

#Usando método POST:

#Listar productos:
http://localhost:3000/api/products/

#Parametros:
{
  "name": "Tennis",
  "sellIn": 6,
  "price": 12.1
}

#Ver simulación api:
http://localhost:3001/api/products/evaluateProducts/{days}



