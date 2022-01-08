import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import OrderList from "./components/OrdersTable";
import ProductForm from "./components/ProductForm";
import ProductsTable from "./components/ProductsTable";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";

export default function App() {
  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />}>
        <Route
          index
          element={
            <main className="full-view flex-center">
              <p style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                Welcome to Admin Panel
              </p>
            </main>
          }
        />
        <Route path="orders" element={<OrderList />} />
        <Route path="archive" element={<OrderList isArchive={true} />} />
        <Route path="products" element={<ProductsTable />} />
        <Route path="products/create" element={<ProductForm />} />
        <Route path="products/edit/:productId" element={<ProductForm />} />
        <Route path="bios/" element={<></>} />
        <Route path="bios/edit/:bioId" element={<></>} />
        <Route path="contactInfo/" element={<></>} />
        <Route path="contactInfo/edit" element={<></>} />
      </Route>
    </Routes>
  );
}
