import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [n, setN] = useState(10);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const categories = [
    "Phone",
    "Computer",
    "TV",
    "Earphone",
    "Tablet",
    "Charger",
    "Mouse",
    "Keypad",
    "Bluetooth",
    "Pendrive",
    "Remote",
    "Speaker",
    "Headset",
    "Laptop",
    "PC",
  ];
  const [category, setCategory] = useState(categories[0]);
  const fetchProducts = async () => {
    const response = await fetch(
      `http://localhost:3000/categories/${category}/products/top=${n}?minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    const data = await response.json();
    console.log(data);
    setProducts(data.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="mb-4">
        <select
          className="border p-2 rounded mr-2"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {categories.map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          className="border p-2 rounded mr-2"
          type="number"
          value={n}
          onChange={(e) => {
            setN(e.target.value);
          }}
        />
        <input
          className="border p-2 rounded mr-2"
          type="number"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
          }}
        />
        <input
          className="border p-2 rounded"
          type="number"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, idx) => (
          <div key={idx} className="border p-4 rounded shadow">
            <div>
              <p className="text-lg font-bold">{product.productName}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="font-bold">Price:</p>
              <p>{product.price}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="font-bold">Discount:</p>
              <p>{product.discount}%</p>
            </div>
            <div className="mt-2">Stock: {product.availability}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
