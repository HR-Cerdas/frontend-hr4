import { Route, Routes } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Dashboard from "../../pages/admin/dashboard";

const Admin = () => {
  return (
    <>
      <Sidebar />
      <div className="relativ md:ml-64 bg-blueGray-100">
        <Navbar />
        <div className="px-md:px-10 mx-auto w-full-m-24">
          <Routes>
            <Route path="admin/dashboard" element={(<Dashboard />)} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Admin;
