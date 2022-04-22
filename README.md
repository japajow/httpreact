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

## Adicionando dados com React

- Para adicionar um item vamos precisar resgatar os dados form com o **useState()**;
- Reunir eles em uma **função após o submit** e enviar request de POST para nossa API.
- O processo é bem parecido com o de resgate de dados, mas agora estamos **enviando dados**
- Vamos ver na prática

> Adicionando produtos
> Criando uma funcao

```tsx
const handleSubmit = async (e) => {};
```

Primeiramente antes de tudo precisamos resgatar os dados do produto ,vamos setar um estado para guardar eles

```tsx
const [name, setName] = useState("");
const [price, setPrice] = useState("");
```

Criando um formulario para adicionar produtos na API

```tsx
<div className="add-product">
  <form onSubmit={handleSubmit}>
    <label htmlFor="nome"> Nome Produto </label>
    <input
      type="text"
      name="nome"
      id="nome"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <label htmlFor="preco"> Preço </label>
    <input
      type="text"
      name="preco"
      id="preco"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />
  </form>
</div>
```

Estilizando nosso form produtos

```css
.add-product {
  border-top: 1px solid #000;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}

form input {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
```

Preenchendo nosso handleSubmit

```tsx
const handleSubmit = async (e) => {
  e.preventDefault();

  //criando objeto que ira preencher os dados na API

  const product = {
    name,
    price,
  };

  // vamos fazer a requisicao
  // passamos a url e no segundo passamos  o method terceiro e o body
  const res = await fetch(url, {
    method: "POST",
    headers: {
      //aqui passamos a forma json
      "Contet-type": "application/json",
    },
    body: JSON.stringfy(product), // precisamos transformas os dados em json
  });
};
```

Ate aqui conseguimos adicionar na nossa API pelo formulario criado acima

## Carregamento dinâmico de dados

- Se a requisição foi feita com sucesso, podemos **adicionar o item a lista após e rerquest**
- Isso torna nossa aplicação mais performática;
- Utilizaremos o **set do useState** para isso;
- Vamos ver isto na prática;

```tsx
//carregamento dentro do useEffect()
//Criamos uma variavel para recuperar os produtos e json -> string
const addedProduct = await res.json();

// sabemos que temos o estado antigo pelo previous e passando o novo produto
setPtoducts((prevProducts) => [...prevProducts, addedProduct]);

//Resetando o estados dos inputs
setname("");
setPrice(0);
```

## Custom hook para o fetch

- É normal dividr funções que podem ser reaproveitadas em hooks;
- Esta técnica é chamada de custom hook, e vamos criar um para o resgate de dados;
- Os hooks geralmente ficam na pasta hooks;
- Devemos utilizar o padrão useName;
- Basicamente uma função e exportamos ela;
- Vamos ver isto na prática!!

Criando src/hooks/useFetch

```tsx
import { useState, useEffect } from "react";

// Criamos a funcao e criamos nela os estados

export const useFetch = (url) => {
  const [data, setData] = useState(null); // de comeco nao sabemos os dados que vem entao e nulo

  // criamos um request chamando apenas uma vez passando uma depedencia que e a url , se ela atualizar chama noamente

  useEffect(() => {
    // criando uma funcao asyncrona
    const fetchData = async () => {
      const res = await fetch(url);
      const json = res.json();
      setData(json);
    };
    //chamamos a funcao fetchData para executar ela
    fetchData();
  }, [url]);

  // vamos exportar a nosa data
  return { data };
};
```

Vamoltamos no App.js

```tsx

    Comentamos nosso useEffect() que criamos na aula anterios , pois a ideia e usar o nosso custom Hook

    Importamos nosso Hook criado acima useFetch()

    const {data: items } = useFecth(url) // renomeando a data para items

    // Passamos agora o items para listar no map()
    Porem vai dar erro pq inicialmente e nullo os dados

    <ul>
        {items.map((product) => (
          <li key={product.id}>
            {product.name} - R$ {product.price}
          </li>
        ))}
      </ul>

    temos que fazer um ternario para so quando tiver algum dado ele apresente na tela

    <ul>
        {items && items.map((product) => (
          <li key={product.id}>
            {product.name} - R$ {product.price}
          </li>
        ))}
      </ul>



```

## Refatorando o POST

- Podemos utilizar o mesmo hook para incluir uma etapa de POST;
- Vamos criar um novo useEffect que mapeia uma outra mudança de estado;
- Após ela ocorrer executamos a adição de produto;
- Obs nem sempre reutilizar um hook é a melhor estratégia;

useFetch.js

```tsx
// /Criamos uma variavel de estado que configura quais method ,headres etc
const [config, setConfig] = useState(null);

// Criamos um estado que selecioa o method
const [method, setMethod] = useState(null);

// E por ultimo criamos um callFetch booleano
const [callFetch, useCallFetch] = useState(false);
```

Colocamos o callFetch como depedencia no useEffect()
sempre que ele for alterado , chamamos o useEffect() novamente

```tsx
// useEffect(() => {
//   const fetchData = async () => {
//     const res = await fetch(url);
//     const json = await res.json();
//     setData(json);
//   };

//   fetchData();
}, [url, callFetch]);
```

Criamos um novo useEffect() para controlar nosso POST , nelle passamos o config como depedente

```tsx
useEffect(() => {
  // fazemos uma checagem ,se for POST

  const httpRequest = async () => {
    // criamos uma variavel fetchOptions aonde ele recebe um array da url e configuracoes
    if (method === "POST") {
      let fetchOptions = [url, config]; // url e config e dinamico sempre muda

      const res = await fetch(...fetchOptions);

      const json = await res.json();

      setCallfetch(json);
    }
  };

  httpRequest(); // com isso sabemos se e um POST , GEt, UPDATE etc
}, [config, method, url]);
```

Criamos uma funcao que controla o config

```tsx
// recebe dados e o metodo da requisicao
const httpConfig = (data, method) => {
  //fazemos um if verificando se e POST
  if (method === "POST") {
    //aqui fazemos a configuracao
    setConfig({
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringfy(data),
    });
  }
};
```

Retornamos no nosso return do useFetch()

```tsx
return { data, httpConfig };
```

Agora no App.js

```tsx
const { data: items, httpConfig } = useFetch(url);
```

Vamos agora comentar o useEffect que estava usando o POST e no lugar usar a nossa nova forma de chamar o POST

```tsx
httpConfig(product, "POST"); //passando o produtos e o metodo
```

## Estado de Loading

- Quando fizermos requisições para APIs é normal que haja um intervalo de loading entre a requisição e o recebimento da resposta;
- Podemos fazer isso no nosso hook tambem;
- Identificar quando começa e termina este estado;

No nosso useFetch.js

```tsx
//Vamos setar mais um estado de loading
const [loading, setLoading] = useState(false);

// Agora temo que colocar aonde comeca e aonde termina ???
//Colocamos o useEffect fecthData

//   useEffect(() => {
//     const fetchData = async () => {
setLoading(true); // comeca
//   const res = await fetch(url);
//   const json = await res.json();
//   setData(json);
setLoading(false); // termina
// };

// retornamos nosso loading

return { data, httpConfig, loading };
```

App.js

```tsx
//passamos nosso loading

const { data: items, httpConfig, loading } = useFetch(url);

// agora usamos ele no HTML apresentendo ou nao com ternario

<ul>
  {!loading &&
    items &&
    items.map((product) => (
      <li key={product.id}>
        {product.name} - R$ {product.price}
      </li>
    ))}
</ul>;
```

## Loading no POST

- Podemos bloquear ações indevidas em outras request também, como no POST;
- Uma ação interessante é remover a ação de adicionar outro item enqquanto o request ainda não finalizou;

colocamos um ternario no submit do post para que o usuario nao envie dados incorretos

```tsx
{
  loading && <input type="submit" disable value={"Aguarde..."} />;
}
{
  !loading && <input type="submit" value={"Criar Produto"} />;
}
```
