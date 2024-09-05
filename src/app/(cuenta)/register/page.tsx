'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice'; // Ajusta la ruta según tu estructura de carpetas
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../../redux/store'; // Importa el tipo correcto para dispatch y state

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
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // Estado para manejar el formulario
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
    avatar: '',
  });

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación básica de campos
    if (!form.email || !form.name || !form.password || !form.avatar) {
      toast.error('Por favor, completa todos los campos.');
      return;
    }

    try {
      await dispatch(registerUser(form)).unwrap();
      toast.success('Registro exitoso!');
      router.push('/login');
    } catch (err: any) {
      if (err?.message) {
        toast.error(`Registro fallido: ${err.message}`);
      } else {
        toast.error('Registro fallido. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <Div>
      <Title>Registro</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="avatar"
          placeholder="Avatar"
          value={form.avatar}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </Button>
      </Form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Div>
  );
}
