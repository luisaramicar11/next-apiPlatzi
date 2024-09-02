"use client";
import React, { FormEvent, MouseEvent, useState, useEffect } from 'react';
import { Product, Category } from "../_interfaces/productsInterfaces"
import styled from "styled-components";

const Form = styled.form`
padding: 15px;
  border-radius: 20px;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-shadow: 1px 2px 4px 3px rgba(0, 0, 0, 0.2);
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5em;
  font-size: 1em;
  color: #333;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 4px;
  appearance: none; /* Esto elimina el icono por defecto en algunos navegadores */
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }`
;

const Option = styled.option`
  padding: 0.5em;
  font-size: 1em;
  color: #333;
  background-color: #fff;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }`;

const Div = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;`
  ;

const Title = styled.h2`
  margin-top: 15px;
  text-align: center;
  margin-bottom: 20px;
  color: black;
  font-weight: bold;
  font-size: 15pt;`
;

const Input = styled.input`
  border-radius: 10px;
  border: 1px #ccc solid;
  padding: 7px;
  font-size: small;
  color: black;`
;

const Button = styled.button`
  margin-top: 5px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  border: 1px green solid;
  color: green;
  cursor: pointer;
  background: none;
  padding: 5px 10px;

  &:hover {
    background-color: green;
    color: white;
  }`
;

interface CreateFormProps { 
    createData: (product: Product) => void;
    updateData: (product: Product) => void;
    dataToEdit: Product | null;
    setDataToEdit: (data: Product | null) => void;
    categories: Category[]; // Nueva prop para categorías
}

const initialForm: Product = {
    id: 0,  
    title: "",
    description: "",
    price: 0,
    images: [ "https://example.com/image.jpg" ],  
    category: { id: 0, name: "", image: "" }
};

const CreateForm: React.FC<CreateFormProps> = ({ createData, updateData, dataToEdit, setDataToEdit, categories }) => {
    const [form, setForm] = useState<Product>(initialForm);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
  
    useEffect(() => {
      if (dataToEdit) {
        setForm(dataToEdit);
        setSelectedCategory(dataToEdit.category.name || "");
      } else {
        setForm(initialForm);
        setSelectedCategory("");
      }
    }, [dataToEdit]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };
  
    const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const newImages = form.images.map((image, i) => i === index ? e.target.value : image);
      setForm({ ...form, images: newImages });
    };
  
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const categoryName = e.target.value;
      const selectedCategory = categories.find(cat => cat.name === categoryName);
      
      if (selectedCategory) {
          setSelectedCategory(categoryName);
          setForm({
              ...form,
              category: selectedCategory // Guardar solo la categoría seleccionada
          });
      }
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      if (!form.id) {
          form.id = Date.now(); 
          createData(form);
      } else {
          updateData(form);
      }
      handleReset(e);
    };
  
    const handleReset = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setForm(initialForm);
      setDataToEdit(null);
      setSelectedCategory("");
    };
  
    return (
      <main>
        <Title>{dataToEdit ? "Editar Producto" : "Agregar Producto"}</Title>
        <Div>
          <Form onSubmit={handleSubmit}>
            <Input   
              type="text"
              name="title"
              placeholder="Escribe el nombre del producto"
              onBlur={handleChange}
              onChange={handleChange}
              value={form.title}
              required
            />
            <Input
              type="text"
              name="description"
              placeholder="Escribe la descripción del producto"
              onBlur={handleChange}
              onChange={handleChange}
              value={form.description}
              required
            />
            <Input
              type="number"
              name="price"
              placeholder="Precio"
              onBlur={handleChange}
              onChange={handleChange}
              value={form.price}
              required
            />
            {form.images.map((image, index) => (
              <Input
                key={index}
                type="text"
                name={`image-${index}`}
                placeholder="URL de la imagen"
                onBlur={(e) => handleImageChange(index, e)}
                onChange={(e) => handleImageChange(index, e)}
                value={image}
              />
            ))} <br />
            <Select name="category" value={selectedCategory} onChange={handleCategoryChange}>
              <Option value="">Seleccione una categoría</Option>
              {categories.map(category => (
                <Option key={category.id} value={category.name}>{category.name}</Option>
              ))}
            </Select>
            <Div>
              <Button type="submit">Enviar</Button>
              <Button type="reset" onClick={handleReset}>Limpiar</Button>
            </Div>
          </Form>
        </Div>
      </main>
    );
  };

  export default CreateForm;