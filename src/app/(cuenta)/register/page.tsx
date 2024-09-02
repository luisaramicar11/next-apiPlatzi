'use client';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks'; // Ajusta la ruta según tu estructura de carpetas
import { registerUser } from '../../redux/slices/authSlice'; // Ajusta la ruta según tu estructura de carpetas
import { toast } from 'react-toastify';
import styled from 'styled-components';

// Estilos con styled-components
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

const Button = styled.button<{ disabled?: boolean }>`
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
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: green;
    color: white;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error } = useAppSelector((state) => state.auth);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const password = formData.get('password') as string;
    const avatar = formData.get('avatar') as string;

    if (!email || !name || !password || !avatar) {
      toast.error('Por favor, completa todos los campos.');
      return;
    }

    const userData = {
      email,
      name,
      password,
      avatar,
    };

    try {
      // Despacha la acción registerUser y usa unwrap para manejar el resultado
      await dispatch(registerUser(userData)).unwrap();

      toast.success('Registro exitoso!');
      router.push('/login');
    } catch (err: any) {
      // Maneja los errores provenientes del thunk
      if (err && err.message) {
        toast.error(`Registro fallido: ${err.message}`);
      } else {
        toast.error('Registro fallido. Inténtalo de nuevo.');
      }
      console.error('Error en el registro:', err);
    }
  }

  return (
    <Div>
      <Title>Registro</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="Email" required />
        <Input type="text" name="name" placeholder="Nombre" required />
        <Input type="password" name="password" placeholder="Password" required />
        <Input type="text" name="avatar" placeholder="Avatar" required />
        <Button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </Button>
      </Form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Div>
  );
}
