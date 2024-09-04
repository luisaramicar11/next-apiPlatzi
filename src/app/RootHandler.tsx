"use client";
import "./globals.css";
import { usePathname } from 'next/navigation';
import ClientLayout from './ClientLayout';

const RouteHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  // Determina si la ruta actual es /admin o /customer
  const isAdminOrCustomerPage = pathname.startsWith('/admin') || pathname.startsWith('/customer');

  return isAdminOrCustomerPage ? (
    <>
      {children}
    </>
  ) : (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
};

export default RouteHandler;
