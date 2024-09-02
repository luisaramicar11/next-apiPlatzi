import React from "react";
import { useRouter } from 'next/navigation';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice"; 

const Button = styled.button`
  color: #000;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  return <Button onClick={handleLogout}>Salir del Perfil</Button>;
};

export default LogoutButton;
