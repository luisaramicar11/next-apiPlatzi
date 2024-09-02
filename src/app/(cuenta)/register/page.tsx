'use client';
import { FormEvent} from 'react';
import { useRouter } from 'next/navigation'; 
import { toast } from "react-toastify";
import { BodyRequestRegister, BodyResponseRegister } from "../../_interfaces/interfaces"
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

export default function RegisterPage() {
  const domain = 'https://api.escuelajs.co';
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const password = formData.get('password') as string;
    const avatar = formData.get('avatar') as string;

    if (!email || !name || !password || !avatar) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

      const userData: BodyRequestRegister = {
        email,
        name,
        password,
        avatar: avatar,
      };

      const headers: Record<string, string> = {
        'accept': '*/*',
        'Content-Type': 'application/json',
      };

      const reqOptions: RequestInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(userData),
      };

      try {
        const response: Response = await fetch(`${domain}/api/v1/users`, reqOptions);
        const responseBodyRegister: BodyResponseRegister = await response.json();

        if (response.ok) {
          console.log('Registro exitoso:', responseBodyRegister);
          toast.success("Registro exitoso!");
          router.push('/login');
        } else {
          toast.error("Registro fallido. Inténtalo de nuevo.");
        }
      } catch (error) {
        toast.error("Error al intentar registrarse.");
        console.error("Error:", error);
      }
    };

  return (
    <Div>
      <Title>Registro</Title>
      <Form onSubmit={handleSubmit}>
      <Input type="email" name="email" placeholder="Email" required />
      <Input type="text" name="name" placeholder="Nombre" required />
      <Input type="password" name="password" placeholder="Password" required />
      <Input type="text" name="avatar" placeholder="Avatar" required />
      <Button type="submit">Register</Button>
    </Form>
    </Div>
    
  );
}
