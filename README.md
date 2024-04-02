## Serviço de Vendas

Serviço para utilização em um ponto de vendas. Sendo possivel visualizar os end points disponibilizados no serviço através do Swagger na rota `http://localhost:3050/doc`.

Este serviço foi desenvolvido utilizando o Framework NestJs para melhor utilização de padrões e desempenho no desenvolvimento do mesmo.

Também se faz utilização do Docker par virtualização do banco de Dados PostgreSql e do projeto em NodeJs.

## Documentações

* [NestJs](https://docs.nestjs.com/)
* [Docker](https://www.docker.com/)
* [PostgreSQL](https://www.postgresql.org/)


Para inicialização do projeto se faz necessário possuir o Docker instalado na maquina e criar o arquivo `.env` com base no arquivo `.env.exemple`.

### Criando Docker

No projeto existem dois containers separados, um para aplicação em NodeJs e outro para o banco de dados em PostgreSQL.
Primeiramente deve ser criado o docker do banco de dados, para isso é necessário acessar a pasta `src/database` do projeto e executar o comando `docker-compose up -d` em terminal linux ou `docker compose up -d` em terminal windows.
Após a criação do container do banco de dados deve ser criado o container da aplicação, para criar deve ser executado os comandos `docker compose build` e em seguida `docker compose up -d` no terminal na raiz do projeto.

### Extruturando Banco de Dados

Após inicializados os containers para criar as tabelas no banco deve ser utilizado o comando `npm run migrations:run` assim irá executar as migrations criadas no projeto.

### Rotas Dispóniveis

As rotas estão separadas em 5 grupos, sendo `user`, `auth`, `product`, `sales` e `product entries`. Também possivel vizualizar os mesmo ao importar o arquivo `sales-service.postman_collection.json` que se encontra na raiz do projeto no aplicativo Postman.


### user
---------

Method `POST`

URL: `{{service-sales}}/users`

Body:
```JSON
{
    "name": "teste",
    "password": "asdasf145s15"
}
```

---------

Method `GET`

URL: `{{service-sales}}/users`

Body: `none`

---------

Method `GET`

URL: `{{service-sales}}/users/1`

Body: `none`

---------

Method `PATCH`

URL: `{{service-sales}}/users/1`

Body:
```JSON
{
    "name": "teste",
    "password": "asdasf132123"
}
```

---------

Method `DELETE`

URL: `{{service-sales}}/users/1`

Body: `none`

---------

### product
---------

Method `POST`

URL: `{{service-sales}}/products`

Body:
```JSON
{
    "name": "produto teste",
    "value": 15.5
}
```

---------

Method `GET`

URL: `{{service-sales}}/products`

Body: `none`

---------

Method `GET`

URL: `{{service-sales}}/products/1`

Body: `none`

---------

Method `PATCH`

URL: `{{service-sales}}/products/1`

Body:
```JSON
{
    "name": "pizza",
    "value": 45.5
}
```

---------

Method `DELETE`

URL: `{{service-sales}}/products/1`

Body: `none`

---------

### sales
---------

Method `POST`

URL: `{{service-sales}}/sales`

Body:
```JSON
{
  "description": "Teste",
  "totalValue": 100,
  "saleItems": [
    {
      "idProduct": 1,
      "quantity": 4
    }
  ]
}
```

---------

Method `GET`

URL: `{{service-sales}}/sales`

Body: `none`

---------

Method `GET`

URL: `{{service-sales}}/sales/1`

Body: `none`

---------

Method `DELETE`

URL: `{{service-sales}}/sales/1`

Body: `none`

---------

### product entries
---------

Method `POST`

URL: `{{service-sales}}/product-entries`

Body:
```JSON
{
    "idProduct": 1,
    "quantity": 5
}
```

---------

Method `DELETE`

URL: `{{service-sales}}/product-entries/1`

Body: `none`

---------

### auth
---------

Method `POST`

URL: `{{service-sales}}/auth`

Body:
```JSON
{
    "name": "teste",
    "password": "asdasf145s15"
}
```
