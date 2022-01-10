import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ArchivedOrdersTable from "./components/ArchivedOrdersTable";
import BioForm from "./components/BioForm";
import BiographiesTable from "./components/BiographiesTable";
import ContactInfoForm from "./components/ContactInfoForm";
import OrderForm from "./components/OrderForm";
import OrdersTable from "./components/OrdersTable";
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
        <Route path="orders" element={<OrdersTable />} />
        <Route path="orders/new" element={<OrderForm />} />
        <Route path="orders/edit/:orderId" element={<OrderForm />} />
        <Route path="archive" element={<ArchivedOrdersTable />} />
        <Route path="products" element={<ProductsTable />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/edit/:productId" element={<ProductForm />} />
        <Route path="bios/" element={<BiographiesTable />} />
        <Route path="bios/new" element={<BioForm />} />
        <Route path="bios/edit/:bioId" element={<BioForm />} />
        <Route path="contactInfo" element={<ContactInfoForm />} />
      </Route>
    </Routes>
  );
}
