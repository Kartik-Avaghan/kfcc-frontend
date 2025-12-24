import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";

import UserInitializer from "../Redux/UserInitializer";
import Auth from "../Auth/Auth";
import Dashboard from "../pages/Dashboard";
import MembershipForm from "../pages/user/MembershipForm";
// import MembershipDashboard from "../pages/staff/StaffMembershipDashboard";
import TitleRegistrationDashboard from "../pages/staff/TitleRegistrationDashboard";

import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ONMMembershipDashboard from "../pages/onmcommitte-leader/ONMMembershipDashboard";
import ONMMemberList from "../pages/onmcommitte-leader/ONMMemberList";

import ECMembershipDashboard from "../pages/ec-members/ECMembershipDashboard";
import StaffMembershipDashboard from "../pages/staff/StaffMembershipDashboard";
import MembershipDashboard from "../pages/onm-committe/MembershipVotingDashboard";
import MembershipVotingDashboard from "../pages/onm-committe/MembershipVotingDashboard";
import SecretryMembershipDashboard from "../pages/secretry/SecretryMembershipDashbord";
import ONMMeeting from "../pages/manager/ONMMeeting";



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
            element={<StaffMembershipDashboard />}
          />
          <Route
            path="staff/titleregistrationdashboard"
            element={<TitleRegistrationDashboard />}
          />


          {/* manager */}
          <Route path="manager/onmMeeting" element={<ONMMeeting/>}/>
          <Route path="manager/managerdashboard" element={<ManagerDashboard/>}/>


          {/* onm-leader */}
          <Route path="onmleader/membershipDashboard" element={<ONMMembershipDashboard/>}/>
          <Route path="onmleader/memberslist" element={<ONMMemberList/>}/>


          {/* onmcommitte-voter */}
          <Route path="onm/voting/membershipDashboard" element={<MembershipVotingDashboard/>}/>

          {/* ec-member */}
          <Route path="ecmember/membershipDashboard" element={<ECMembershipDashboard/>}/>

          <Route path="secretry/membershipDashboard" element={<SecretryMembershipDashboard/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default CustomRouter;
