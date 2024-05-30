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
      `http://localhost:3000/categories/${category}/products`
    );
    const data = await response.json();
    console.log(data);
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <h1>Products</h1>

      <select
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
        type="number"
        value={n}
        onChange={(e) => {
          setN(e.target.value);
        }}
      />
      <input
        type="number"
        value={minPrice}
        onChange={(e) => {
          setMinPrice(e.target.value);
        }}
      />
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => {
          setMaxPrice(e.target.value);
        }}
      />
      {/* {products.map((product, idx) => (
        <div key={idx}>
          {product.productName}
          {product.price}
          {product.discount}
        </div>
      ))} */}
    </>
  );
}
export default App;

// <motion.div className="flex justify-center items-center text-red-600">
//   <p>Click on the Vite and React logos to learn more</p>
//   <Button variant="ghost" color="secondary" onBlurCapture={12}>
//     hello
//   </Button>
// </motion.div>

// {
//   productName: 'Phone 1',
//   price: 429,
//   rating: 2.95,
//   discount: 28,
//   availability: 'yes'
// },
