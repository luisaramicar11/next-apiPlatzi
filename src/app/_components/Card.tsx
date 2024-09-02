"use client";
import React from "react";
import styled from "styled-components";
import { CardProps } from "../_interfaces/productsInterfaces";

const CardContainer = styled.div`
    border: 1px solid #e0e0e0;
    border-radius: 15px;
    padding: 15px;
    width: 20%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction:column;
    margin: 5px;
`;

const ProductImage = styled.img`
    width:100%;
    height:250px;
    border-radius:15px;
    text-align: center;
    object-fit: cover;
`;

const ProductTitle = styled.p`
    font-size: 1rem;
    color: black;
    font-weight: bold;
    margin: 10px 0;
    text-align: center;
`;

const ProductDescription = styled.p`
    font-size: 1rem;
    color: black;
    font-weight: 300;
`;

const ProductPrice = styled.p`
    margin-top: 5px;
    margin-right: 10px;
    font-size: 12px;
    color: black;
    text-align: right;
    font-weight: bolder;
`;

const Card: React.FC<CardProps> = ({product}) => {
return(
    <CardContainer>
        <ProductImage src={product.images[0]} alt={product.title}/>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductPrice>${product.price}</ProductPrice>
    </CardContainer>
    );
};  
export default Card;