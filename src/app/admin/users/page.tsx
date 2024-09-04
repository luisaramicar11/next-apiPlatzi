"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createUser, deleteUser, readUsers, updateUser } from "../../redux/slices/usersSlice";
import { RootState } from "../../redux/store";
import { User } from "../../_interfaces/usersInterface"; 
import CreateForm from "../../_components/FormUser";
import Table from "../../_components/TableUser";
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

const Users: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();

  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("https://api.escuelajs.co/api/v1/users");
        dispatch(readUsers(response.data));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleCreateUser = async (newUser: Omit<User, 'id'>) => { 
    try {
      const response = await axios.post<User>("https://api.escuelajs.co/api/v1/users", newUser);
      dispatch(createUser(response.data));
      toast.success("Usuario creado exitosamente!");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error creating user:", error.response.data);
        toast.error(`Error al crear el usuario: ${error.response.data.message}`);
      } else {
        console.error("Error creating user:", error);
        toast.error("Error al crear el usuario.");
      }
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      await axios.put<User>(`https://api.escuelajs.co/api/v1/users/${updatedUser.id}`, updatedUser);
      dispatch(updateUser(updatedUser));
      setEditedUser(null);
      toast.success("Usuario actualizado exitosamente!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error al actualizar el usuario.");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await axios.delete(`https://api.escuelajs.co/api/v1/users/${userId}`);
      dispatch(deleteUser(userId));
      toast.success("Usuario eliminado exitosamente!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error al eliminar el usuario.");
    }
  };

  return (
    <>
      <Title>Formulario Usuarios</Title>

      <CreateForm
        createData={handleCreateUser}
        updateData={handleUpdateUser}
        dataToEdit={editedUser}
        setDataToEdit={setEditedUser}
      />

      <Title>Lista de usuarios</Title>
      <Table 
        data={users}
        setDataToEdit={setEditedUser}
        deleteData={handleDeleteUser} 
      />
    </>
  );
};

export default Users;

