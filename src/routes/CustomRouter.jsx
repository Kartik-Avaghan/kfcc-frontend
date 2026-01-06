
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";

import UserInitializer from "../Redux/UserInitializer";
import Auth from "../Auth/Auth";
import Dashboard from "../pages/Dashboard";
import MembershipForm from "../pages/user/MembershipForm";
import TitleRegistrationDashboard from "../pages/staff/TitleRegistrationDashboard";

import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ONMMembershipDashboard from "../pages/onmcommitte-leader/ONMMembershipDashboard";
import ONMMemberList from "../pages/onmcommitte-leader/ONMMemberList";


import MembershipVotingDashboard from "../pages/onm-committe/MembershipVotingDashboard";

import ONMMeeting from "../pages/manager/ONMMeeting";
import TitleRegistrationForm from "../pages/user/TitleRegistrationForm";
import TitleCommitteMeeting from "../pages/manager/TitleCommitteMeeting";
import KFCCMemberList from "../pages/titlecommitte-leader/KFCCMemberList";
import TitleRegistrationCommitteDashboard from "../pages/titlecommitte-leader/TitleRegistrationCommitteDashboard";
import TitleRegistrationVotingDashboard from "../pages/title-committe/TitleRegistrationVotingDashboard";
import ECTitleRegistrationDashboard from "../pages/ec-members/ECTitleRegistrationDashboard";
import SecretryTitleRegistrationDashboard from "../pages/secretry/SecretryTitleRegistrationDashboard";
import PublicityClearenceDashboard from "../pages/user/PublicityClearenceDashboard";
import Signup from "../pages/Signup";

import MembershipRequests from "../pages/MembershipRequests";
import TitleRegistrationRequests from "../pages/TitleRegistrationRequests";

function CustomRouter() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup/>}/>
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
          <Route path="producer/publicityClearenceform" element={<PublicityClearenceDashboard/>}/>

          {/* Comman membership requests */}
          <Route
            path="/membership/requests"
            element={<MembershipRequests />}
          />
            <Route
            path="/title/requests"
            element={<TitleRegistrationRequests />}
          />
          

          
          {/* staff */}
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
          <Route path="ecmember/titleRegistrationDashboard" element={<ECTitleRegistrationDashboard/>}/>

          {/* secretry */}
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
