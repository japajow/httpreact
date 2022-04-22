import { useState } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);
  const { data: items, httpConfig } = useFetch(url);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  // useEffect(() => {
  //   dadosAPI();
  // }, []);

  // const dadosAPI = async () => {
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   setProducts(data);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(product),
    // });

    // const addedProduct = await res.json();

    // setProducts((prevProducts) => [...prevProducts, addedProduct]);

    httpConfig(product, "POST");
    setName("");
    setPrice(0);
  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {items &&
          items.map((product) => (
            <li key={product.id}>
              {product.name} - R$ {product.price}
            </li>
          ))}
      </ul>
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
          <input type="submit" value={"Criar Produto"} />
        </form>
      </div>
    </div>
  );
}

export default App;
