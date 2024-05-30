require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const refreshToken = async () => {
  const refreshUrl = "http://20.244.56.144/test/auth";
  const response = await fetch(refreshUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      companyName: "goMart",
      clientID: "3ad87f82-c508-4271-b1dd-f61522057130",
      clientSecret: "ZfZwICEkxKNJANqb",
      ownerName: "Iniyan",
      ownerEmail: "927621bit036@mkce.ac.in",
      rollNo: "927621BIT036",
    }),
  });

  const data = await response.json();
  console.log("Refresh token response:", data);
  if (data.access_token) {
    accesstoken = data.access_token;
  } else {
    console.error("Failed to refresh access token");
  }
};
let accesstoken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MDUxMjU5LCJpYXQiOjE3MTcwNTA5NTksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjNhZDg3ZjgyLWM1MDgtNDI3MS1iMWRkLWY2MTUyMjA1NzEzMCIsInN1YiI6IjkyNzYyMWJpdDAzNkBta2NlLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiIzYWQ4N2Y4Mi1jNTA4LTQyNzEtYjFkZC1mNjE1MjIwNTcxMzAiLCJjbGllbnRTZWNyZXQiOiJaZlp3SUNFa3hLTkpBTnFiIiwib3duZXJOYW1lIjoiSW5peWFuIiwib3duZXJFbWFpbCI6IjkyNzYyMWJpdDAzNkBta2NlLmFjLmluIiwicm9sbE5vIjoiOTI3NjIxQklUMDM2In0.VTKfHmdEF295SDszQYFmonShXqPFf8LE3laoglnIB7M";
const getProducts = async (company, categoryName, n, minPrice, maxPrice) => {
  try {
    const response = await fetch(
      `http://20.244.56.144/test/companies/${company}/categories/${categoryName}/products?top=${n}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );
    const data = await response.json();
    console.log(`Products for ${company} - ${categoryName}:`, data);
    return data;
  } catch (error) {
    console.error(
      `Error fetching products for ${company} - ${categoryName}:`,
      error
    );
  }
};
app.get("/categories/:categoryname/products", async (req, res) => {
  const categoryName = req.params.categoryname || "Phone";
  const minPrice = req.query.minPrice || 1;
  const maxPrice = req.query.maxPrice || 1000;

  const n = req.query.top || 10;
  await refreshToken();
  const products = [];
  try {
    for (const company of companies) {
      const productsData = await getProducts(
        company,
        categoryName,
        n,
        minPrice,
        maxPrice
      );
      products.push(...productsData);
    }
    return res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  res.send("Products fetched successfully");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
