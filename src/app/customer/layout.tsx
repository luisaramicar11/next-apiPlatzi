import HeaderCustomer from "../_components/HeaderCustomer";
export default function AdminLayout({children}:{
    children: React.ReactNode
}){
    return (
    <>
    <HeaderCustomer/>
    <main>
        <section>{children}</section>
    </main>
    </>
    )
}