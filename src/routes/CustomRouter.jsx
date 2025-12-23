import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Nav from "../components/Nav";
import UserInitializer from "../Redux/UserInitializer";
import Auth from "../Auth/Auth";
import Dashboard from "../pages/Dashboard";
import MembershipForm from "../pages/user/MembershipForm";
import MembershipDashboard from "../pages/staff/MembershipDashboard";
import TitleRegistrationDashboard from "../pages/staff/TitleRegistrationDashboard";
import MembersList from "../pages/manager/MembersList";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ONMMembershipDashboard from "../pages/onmcommitte-leader/ONMMembershipDashboard";
import ONMMemberList from "../pages/onmcommitte-leader/ONMMemberList";
import ONMMembershipVoting from "../pages/onm-committe/ONMMembershipVoting";



function CustomRouter() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/nav" element={<Nav/>}/> */}

        <Route
          path="/"
          element={
            <UserInitializer>
              <Auth />
            </UserInitializer>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          {/*user  */}
          <Route path="user/membershipform" element={<MembershipForm />} />
          {/* staff */}
          <Route
            path="staff/membershipdashboard"
            element={<MembershipDashboard />}
          />
          <Route
            path="staff/titleregistrationdashboard"
            element={<TitleRegistrationDashboard />}
          />


          {/* manager */}
          <Route path="manager/memberslist" element={<MembersList/>}/>
          <Route path="manager/managerdashboard" element={<ManagerDashboard/>}/>


          {/* onm-leader */}
          <Route path="onmleader/onmleaderdashboard" element={<ONMMembershipDashboard/>}/>
          <Route path="onmleader/memberslist" element={<ONMMemberList/>}/>


          {/* onm-voter */}
          <Route path="onm/membershipform/voting" element={<ONMMembershipVoting/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default CustomRouter;
