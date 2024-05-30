import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function App() {
  const products = [
    {
      productName: "Laptop 1",
      price: 499,
      rating: 3.9,
      discount: 20,
      availability: "yes",
    },
    {
      productName: "Laptop 2",
      price: 799,
      rating: 4.5,
      discount: 15,
      availability: "no",
    },
    {
      productName: "Laptop 3",
      price: 1099,
      rating: 4.7,
      discount: 25,
      availability: "yes",
    },
    {
      productName: "Laptop 4",
      price: 699,
      rating: 4.2,
      discount: 18,
      availability: "yes",
    },
    {
      productName: "Laptop 5",
      price: 999,
      rating: 4.6,
      discount: 22,
      availability: "no",
    },
    {
      productName: "Laptop 6",
      price: 1199,
      rating: 4.8,
      discount: 20,
      availability: "yes",
    },
    {
      productName: "Laptop 7",
      price: 1299,
      rating: 4.9,
      discount: 28,
      availability: "yes",
    },
    {
      productName: "Laptop 8",
      price: 899,
      rating: 4.3,
      discount: 15,
      availability: "no",
    },
    {
      productName: "Laptop 9",
      price: 599,
      rating: 4.0,
      discount: 30,
      availability: "yes",
    },
    {
      productName: "Laptop 10",
      price: 1499,
      rating: 4.8,
      discount: 25,
      availability: "yes",
    },
  ];
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
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="mb-4 flex items-center">
        <select
          className="border p-2 rounded mr-2 w-full md:w-auto"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          className="border p-2 rounded mr-2 w-full md:w-auto"
          type="number"
          value={n}
          onChange={(e) => setN(e.target.value)}
        />
        <input
          className="border p-2 rounded mr-2 w-full md:w-auto"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full md:w-auto"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <Button onClick={fetchProducts}>Fetch Products</Button>
      </div>

      {products.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full shadow rounded-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Discount</th>
                <th className="px-4 py-2">Availability</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-4 py-2">{product.productName}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">{product.discount}%</td>
                  <td className="px-4 py-2">{product.availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default App;
