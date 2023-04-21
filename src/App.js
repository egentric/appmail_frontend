import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/layouts/Home";
import Login from "./pages/layouts/Login";
import Register from "./pages/layouts/Register";
import Noaccess from "./pages/layouts/Noaccess";

import DashboardAppmail from "./pages/layouts/DashboardAppmail";

import AppmailCategories from "./pages/appmail_categories/AppmailCategories";
import AddAppmailCategory from "./pages/appmail_categories/AddAppmailCategory";
import EditAppmailCategory from "./pages/appmail_categories/EditAppmailCategory";

import AppmailContacts from "./pages/appmail_contacts/AppmailContacts";
import AddAppmailContact from "./pages/appmail_contacts/AddAppmailContact";
import EditAppmailContact from "./pages/appmail_contacts/EditAppmailContact";
import ShowAppmailContact from "./pages/appmail_contacts/ShowAppmailContact";

import Users from "./pages/users/Users";
import ShowUser from "./pages/users/ShowUser";
import EditUser from "./pages/users/EditUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/dashboardAppmail" element={<DashboardAppmail />} />

        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Noaccess" element={<Noaccess />} />

        <Route path="/appmail_categories" element={<AppmailCategories />} />
        <Route
          path="/appmail_categories/add"
          element={<AddAppmailCategory />}
        />
        <Route
          path="/appmail_categories/edit/:appmail_category"
          element={<EditAppmailCategory />}
        />

        <Route path="/appmail_contacts" element={<AppmailContacts />} />

        <Route path="/appmail_contacts/add" element={<AddAppmailContact />} />
        <Route
          path="/appmail_contacts/edit/:appmail_contact"
          element={<EditAppmailContact />}
        />
        <Route
          path="/appmail_contacts/show/:appmail_contact"
          element={<ShowAppmailContact />}
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/edit/:user" element={<EditUser />} />
        <Route path="/users/show/:user" element={<ShowUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
