"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {readProducts } from "../../redux/slices/productsSlice";
import { RootState } from "../../redux/store";
import { Product, Category } from "../../_interfaces/productsInterfaces";
import Card from "../../_components/Card"
import styled from "styled-components";

interface EditedProductState {
  category: Category;
  product: Product;
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin: 40px;
`;

const H2 = styled.h2`
  margin-top: 25px;
  text-align: center;
  color: black;
`

const Products: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  const [editedProduct, setEditedProduct] = useState<EditedProductState | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("https://api.escuelajs.co/api/v1/products");
        dispatch(readProducts(response.data));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);



  

  
  return (
    <div>
      <H2>Productos</H2>
      <Div>
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} product={product} />
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </Div>
    </div>
  );
};

export default Products;
