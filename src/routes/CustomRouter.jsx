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
import TitleRegistrationForm from "../pages/user/TitleRegistrationForm";
import TitleCommitteMeeting from "../pages/manager/TitleCommitteMeeting";
import KFCCMemberList from "../pages/titlecommitte-leader/KFCCMemberList";
import TitleRegistrationCommitteDashboard from "../pages/titlecommitte-leader/TitleRegistrationCommitteDashboard";
import TitleRegistrationVotingDashboard from "../pages/title-committe/TitleRegistrationVotingDashboard";
import ECTitleRegistrationDashboard from "../pages/ec-members/ECTitleRegistrationDashboard";
import SecretryTitleRegistrationDashboard from "../pages/secretry/SecretryTitleRegistrationDashboard";
import Register from "../pages/Register";
import PublicityClearenceForm from "../pages/user/PublicityClearenceForm";



function CustomRouter() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
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
          <Route path="producer/titleRegistrationform" element={<TitleRegistrationForm/>}/>
          <Route path="producer/publicityClearenceform" element={<PublicityClearenceForm/>}/>


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
          <Route path="manager/managerdashboard" element={<ManagerDashboard/>}/>
          <Route path="manager/onmMeeting" element={<ONMMeeting/>}/>
          <Route path="manager/titlecommitteMeeting" element={<TitleCommitteMeeting/>}/>
          


          {/* onm-leader */}
          <Route path="onmleader/membershipDashboard" element={<ONMMembershipDashboard/>}/>
          <Route path="onmleader/memberslist" element={<ONMMemberList/>}/>


          {/* onmcommitte-voter */}
          <Route path="onm/voting/membershipDashboard" element={<MembershipVotingDashboard/>}/>

          {/* ec-member */}
          <Route path="ecmember/membershipDashboard" element={<ECMembershipDashboard/>}/>
          <Route path="ecmember/titleRegistrationDashboard" element={<ECTitleRegistrationDashboard/>}/>

          {/* secretry */}
          <Route path="secretry/membershipDashboard" element={<SecretryMembershipDashboard/>}/>
          <Route path="secretry/titleRegistrationDashboard" element={<SecretryTitleRegistrationDashboard/>}/>


          {/* titlecommitte-leader */}
          <Route path="titleCommitteLeader/memberslist" element={<KFCCMemberList/>} />
          <Route path="titleCommitteLeader/titleRegistrationDashboard" element={<TitleRegistrationCommitteDashboard/>}/>

          {/* titlecommitte-voter */}
          <Route path="titleCommittee/voting/titleRegistrationDashboard" element={<TitleRegistrationVotingDashboard/>}/>

        </Route>
      </Routes>
    </div>
  );
}

export default CustomRouter;
