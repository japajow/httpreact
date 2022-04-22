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

## Resgatando dados da API

Importando os use que vamos utilizar

App.js

```tsx
import { useEffect, useState } from "react";

//Criando uma variavel url para guardar nossa URL da API
const url = "http://localhost:3000/products";

// Criando o estado que salve os dados vindop da API

const [products, setProducts] = useState([]);

//Restagando os dados usando useEffect() para ser acioanda apenas uma vez
useEffect(() => {

    // criamos uma variavel que faz a busca com fetch() passando a url da API
    const res = await fetch(url)

    // Como ele vem em string precisamos transformar ele em json()
    const data = await res.json()

    // Agora setamos o nosso setProducts() para armazenar esse data
    setProducts(data)

}, [] // Nesse array deixamos vazio pq nao a nenhuma depedencia nesse useEffect que precisamos setar);
```

No useEffetc() nao podemos usar async nele , pois gera um warning ou erro , para solucionar esse erro
vamos criar uma funcao que pega nosso dados da API e chame essa funcao criada no useEffect()

```tsx
useEffect(() => {
  dadosAPI();
}, []);

const dadosAPI = async () => {
  const res = await fetch(url);
  const data = await res.json();
  setProducts(data);
};
```

Beleza , agora vamos fazer um looping para percorrer cada dados resgatado pela API

```tsx
<ul>
  {products.map((product) => (
    <li key={product.id}>
      {product.name} - R$ {product.price}
    </li>
  ))}
</ul>
```
