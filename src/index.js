import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Forgot from './pages/auth/forgot';
import NotFound from './pages/error/404';
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Layout from "./layouts";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Profile from "./pages/account";
import Detail from "./pages/dashboard/detail";
import Admin from "./layouts/Admin/admin";
import Dashboard from "./pages/admin/dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        {/* Auth Start */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forgot />} />
        {/* Auth End */}

        {/* error page */}
        <Route path="*" element={<NotFound />} />

        {/* layouts */}
        <Route path="/" element={<Layout />} />
        <Route index element={<App />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/detail" element={<Detail/>} />
        <Route path="/user" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />


      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
