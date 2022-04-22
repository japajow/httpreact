## React com http

> instalando o json server

npm i json-server

Criamos uma pasta data/db.json

```json
{
  "products": [
    {
      "id": 1,
      "name": "Camisa",
      "price": 59.9
    },
    {
      "id": 2,
      "name": "Calça Vermelha",
      "price": 90
    },
    {
      "id": 3,
      "name": "Boné  aba reta",
      "price": 29.9
    },
    {
      "id": 4,
      "name": "Calça Jeans",
      "price": 159.9
    }
  ]
}
```

Criando um scripts no package.json para iniciar nosso db

```json

 "scripts": {
    // "start": "react-scripts start",
    // "build": "react-scripts build",
    // "test": "react-scripts test",
    // "eject": "react-scripts eject",
    "server":"json-server --watch data/db.json"
  },

```

Agora damos um npm run server


