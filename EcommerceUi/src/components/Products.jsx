import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  grid-template-rows: 1fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }
`;
const Products = ({ cat, sort, filter }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    try {
      const getProducts = async () => {
        const res = await axios.get(
          cat
            ? `${process.env.REACT_APP_BASE_API}/products?category=${cat}`
            : `${process.env.REACT_APP_BASE_API}/products/`
        );
        setProducts(res.data);
      };

      getProducts();
    } catch (error) {}
  }, [cat]);
  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filter).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [cat, products, filter]);
  useEffect(() => {
    if (sort === "Newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
