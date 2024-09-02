"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, readProducts, updateProduct } from "../../redux/slices/productsSlice";
import { RootState } from "../../redux/store";
import { Product, Category } from "../../_interfaces/productsInterfaces";
import CreateForm from "../../_components/Form";
import Table from "../../_components/Table";
import styled from "styled-components";
import { toast } from "react-toastify";

const Title = styled.h2`
  margin-top: 15px;
  text-align: center;
  margin-bottom: 20px;
  color: black;
  font-weight: bold;
  font-size: 15pt;
`;

interface EditedProductState {
  category: Category;
  product: Product;
}

const Products: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<Category[]>([]);
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

    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>("https://api.escuelajs.co/api/v1/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [dispatch]);

  const handleCreateProduct = async (newProduct: Product) => {
    try {
      // Ajustar el producto para que envíe categoryId en lugar de category
      const productToSend = {
        ...newProduct,
        categoryId: newProduct.category.id, // Enviar solo el ID de la categoría
        category: undefined // Opcional: si no se necesita en el cuerpo de la solicitud
      };
  
      const response = await axios.post("https://api.escuelajs.co/api/v1/products", productToSend);
      dispatch(createProduct(response.data));
      toast.success("Producto creado exitosamente!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Detalles del error:", error.response?.data);
      } else {
        console.error("Error inesperado:", error);
      }
      toast.error("Error al crear el producto.");
    }
  };
  
  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      // Preparar el producto para enviar solo el categoryId en lugar de la categoría completa
      const productToUpdate = {
        ...updatedProduct,
        categoryId: updatedProduct.category.id, // Enviar solo el ID de la categoría
        category: undefined // Opcional: si no se necesita en el cuerpo de la solicitud
      };
  
      const response = await axios.put(
        `https://api.escuelajs.co/api/v1/products/${updatedProduct.id}`,
        productToUpdate
      );
  
      // Actualizar el producto en el estado global
      dispatch(updateProduct(response.data)); // Usar los datos actualizados recibidos de la API
  
      // Limpiar el producto editado
      setEditedProduct(null);
      toast.success("Producto actualizado exitosamente!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Detalles del error:", error.response?.data);
      } else {
        console.error("Error inesperado:", error);
      }
      toast.error("Error al actualizar el producto.");
    }
  };
  

  const handleDeleteProduct = async (productId: number) => {
    try {
      await axios.delete(`https://api.escuelajs.co/api/v1/products/${productId}`);
      dispatch(deleteProduct(productId));
      toast.success("Producto eliminado exitosamente!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error al eliminar el producto.");
    }
  };

  return (
    <>
      <Title>Productos CRUD</Title>

      {/* Renderizar el formulario para crear o editar un producto */}
      <CreateForm
        createData={handleCreateProduct}
        updateData={handleUpdateProduct}
        dataToEdit={editedProduct?.product || null}
        setDataToEdit={(product: Product | null) => 
          setEditedProduct(product ? { category: { id: 0, name: "", image: "" }, product } : null)}
        categories={categories} // Asegúrate de que CreateForm acepte esta prop
      />

      <Title>Lista de Productos</Title>
      <Table 
        data={products}
        setDataToEdit={(product: Product | null) => 
          setEditedProduct(product ? { category: { id: 0, name: "", image: "" }, product } : null)}
        deleteData={handleDeleteProduct} 
      />
    </>
  );
};

export default Products;

