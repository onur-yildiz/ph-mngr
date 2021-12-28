import { Route, Routes } from "react-router-dom";
import "./App.css";
import OrderList from "./components/OrderList";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />}>
        <Route
          index
          element={
            <main
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <p style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                Welcome to Admin Panel
              </p>
            </main>
          }
        />
        <Route path="orders" element={<OrderList />} />
        <Route path="archive" element={<OrderList isArchive={true} />} />
      </Route>
    </Routes>
  );
}
