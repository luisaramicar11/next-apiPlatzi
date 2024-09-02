import React from "react";
import { useRouter } from 'next/navigation'; 
import styled from "styled-components";

const Button = styled.button`
  color: #000;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
`;

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    router.push("/login");
  };

  return <Button onClick={handleLogout}>Salir del Perfil</Button>;
};

export default LogoutButton;
