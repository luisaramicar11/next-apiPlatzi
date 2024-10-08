"use client"
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { AppDispatch } from '../../redux/store'; 

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

export default function LoginPage() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch(); // Tipado correcto de dispatch
  const { loading } = useSelector((state: any) => state.auth);

  // State para manejar el formulario
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { email, password } = form;

    if (!email || !password) {
      toast.error('Por favor, completa todos los campos.');
      return;
    }

    // Despachar la acción asíncrona de login
    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      const token = resultAction.payload?.access_token;
      if (token) {
        toast.success('Login exitoso!');

        localStorage.setItem('authToken', token);
        router.push('/profile');
      }
    } else {
      if (resultAction.payload) {
        toast.error(`Login fallido: ${resultAction.payload}`);
      } else {
        toast.error('Error al intentar iniciar sesión.');
      }
    }
  }

  return (
    <Div>
      <Title>Ingresar</Title>
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
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Login'}
        </Button>
      </Form>
    </Div>
  );
}
