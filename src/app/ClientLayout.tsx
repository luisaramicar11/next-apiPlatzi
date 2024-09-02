'use client';
import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, GlobalTheme } from "./GlobalStyling";
import HeaderComponent from "./_components/Header";
import Footer  from "./_components/Footer";

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider theme={GlobalTheme}>
            <GlobalStyle />
            <div>
                <HeaderComponent/>
                {children}
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default ClientLayout;
