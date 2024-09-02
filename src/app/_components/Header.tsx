"use client";
import styled from 'styled-components';

const Header = styled.header`
  background-color: #ffff;
  box-shadow: 1px 2px 4px 3px rgba(0, 0, 0, 0.1);
`
const Nav = styled.nav`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const H1 = styled.h1`
  color: black;
  font-size: 30px;
`
const Links = styled.div`
  display: flex;
  gap: 60px;
`

const A = styled.a`
  text-decoration: none;
  color: black;
  font-size: large;
  
  &:hover {
    border-bottom: 1px solid lightgray;
  }
`

const HeaderComponent: React.FC = () => (
  <Header>
        <Nav>
            <div>
                <H1>Tienda Riwi</H1>
            </div>
            <Links>
                <A href="/">Inicio</A>
                <A href="/login">Ingresar</A>
                <A href="/register">Registrarte</A>
            </Links>
        </Nav>
    </Header>
);

export default HeaderComponent;