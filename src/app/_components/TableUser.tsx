import React from "react";
import TableRowUser from "./TableRowUser"
import {TableDataUsers } from "../_interfaces/usersInterface"; 
import styled from "styled-components";
import TableHeaderUser from "./TableHeadUser"

const TableContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: white;
`;

const Title = styled.h3`
  text-align: center;
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
`;

const TableStyle = styled.table`
  box-shadow: 1px 2px 4px 3px rgba(0, 0, 0, 0.2);
  width: 100%;
  border-collapse: collapse;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const TableUser: React.FC<TableDataUsers> = ({ data, setDataToEdit, deleteData }) => {

  return (
    <TableContainer>
            <Title>Tabla de productos</Title>
            <TableStyle>
            <TableHeaderUser/>
                <tbody>
                    {data.length > 0 ? (
                        data.map((user) => (
                          <TableRowUser
                          key={user.id}
                          user={user}
                          setDataToEdit={setDataToEdit}
                          deleteData={deleteData}
                        />
                        ))
                    ) : (
                        <Tr>
                            <Td colSpan={5}>Sin datos</Td>
                        </Tr>
                    )}
                </tbody>
            </TableStyle>
        </TableContainer>
  );
};

export default TableUser;
