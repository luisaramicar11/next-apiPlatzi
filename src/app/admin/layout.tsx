import Footer from "../_components/Footer";
import HeaderAdmin from "../_components/HeaderAdmin";
export default function AdminLayout({children}:{
    children: React.ReactNode
}){
    return (
    <>
    <HeaderAdmin/>
    <main>
        <section>{children}</section>
    </main>
    </>
    )
}