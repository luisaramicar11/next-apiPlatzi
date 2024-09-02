'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';

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

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 50%;
  padding: 15px;
  border-radius: 20px;
  box-shadow: 1px 2px 4px 3px rgba(0, 0, 0, 0.2);
`;

const InfoItem = styled.p`
  font-size: medium;
  color: black;
  font-weight: 600;
`;

const Button = styled.button`
  margin-top: 15px;
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

interface Profile {
  name: string;
  email: string;
  avatar: string;
  role: string; // Puede ser 'customer' o 'admin'
}

export default function ProfileAdmin() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');

      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error('Error fetching profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []); // Dependencias vacías para que se ejecute solo una vez

  return (
    <Div>
      <Title>Perfil de Usuario</Title>
      {profile ? (
        <ProfileInfo>
          <InfoItem>Nombre: {profile.name}</InfoItem>
          <InfoItem>Email: {profile.email}</InfoItem>
          <InfoItem>
            <img src={profile.avatar} alt="Avatar" width={100} height={100} />
          </InfoItem>
          <InfoItem>Rol: {profile.role}</InfoItem>
        </ProfileInfo>
      ) : (
        <p>Cargando...</p>
      )}
    </Div>
  );
}
