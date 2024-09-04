import React from "react";
import { User } from "../_interfaces/usersInterface"; // Asegúrate de actualizar la ruta si es necesario
import styled from "styled-components";

const Td = styled.td`
  padding: 5px;
  border: 1px solid #ddd;
  text-align: center;
`;

// Estilos para las imágenes en la tabla
const Img = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%; /* Opcional: para un estilo circular en las imágenes de perfil */
`;

const EditButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid orange;
  margin: 5px;
  color: orange;
  border-radius: 10px;
  padding: 5px 10px;

  &:hover {
    background-color: orange;
    color: white;
  }
`;

const DeleteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid red;
  margin: 5px;
  color: red;
  border-radius: 10px;
  padding: 5px 10px;

  &:hover {
    background-color: red;
    color: white;
  }
`;

const Tr = styled.tr`
  text-align: center;

  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

interface TableRowProps {
  user: User;
  setDataToEdit: (user: User) => void;
  deleteData: (userId: number) => void;
}

const TableRowUser: React.FC<TableRowProps> = ({ user, setDataToEdit, deleteData }) => {
  const { id, name, email, role, avatar } = user;
  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{email}</Td>
      <Td>{role}</Td>
      <Td>
        {avatar && (
          <Img 
            src={avatar} 
            alt={`Avatar of ${name}`} 
          />
        )}
      </Td>
      <Td>
        <EditButton onClick={() => setDataToEdit(user)}>Editar</EditButton>
        <DeleteButton onClick={() => deleteData(id)}>Eliminar</DeleteButton>
      </Td>
    </Tr>
  );
};

export default TableRowUser;
