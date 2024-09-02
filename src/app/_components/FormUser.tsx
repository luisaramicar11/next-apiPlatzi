"use client";
import React, { FormEvent, MouseEvent, useState, useEffect } from 'react';
import { User } from "../_interfaces/usersInterface"; 
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

const Input = styled.input`
  border-radius: 10px;
  border: 1px #ccc solid;
  padding: 7px;
  font-size: small;
  color: black;
`;

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
  }
`;

const Div = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin-top: 15px;
  text-align: center;
  margin-bottom: 20px;
  color: black;
  font-weight: bold;
  font-size: 15pt;
`;

interface CreateUserFormProps {
  createData: (user: User) => void;
  updateData: (user: User) => void;
  dataToEdit: User | null;
  setDataToEdit: (data: User | null) => void;
}

const initialForm: User = {
  id: 0,
  email: "",
  password: "",
  name: "",
  role: "",
  avatar: "",
};

const CreateUserForm: React.FC<CreateUserFormProps> = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState<User>(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!form.id) {
      form.id = Date.now(); // O usa una lógica de ID diferente
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
  };

  return (
    <main>
      <Title>{dataToEdit ? "Editar Usuario" : "Agregar Usuario"}</Title>
      <Div>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Nombre del usuario"
            onBlur={handleChange}
            onChange={handleChange}
            value={form.name}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            onBlur={handleChange}
            onChange={handleChange}
            value={form.email}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            onBlur={handleChange}
            onChange={handleChange}
            value={form.password}
            required
          />
          <Input
            type="text"
            name="role"
            placeholder="Rol del usuario"
            onBlur={handleChange}
            onChange={handleChange}
            value={form.role}
            required
          />
          <Input
            type="text"
            name="avatar"
            placeholder="URL del avatar"
            onBlur={handleChange}
            onChange={handleChange}
            value={form.avatar}
          />
          <Div>
            <Button type="submit">Enviar</Button>
            <Button type="reset" value="Limpiar" onClick={handleReset}>Limpiar</Button>
          </Div>
        </Form>
      </Div>
    </main>
  );
};

export default CreateUserForm;
