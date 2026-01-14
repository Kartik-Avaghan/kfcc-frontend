
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";

import UserInitializer from "../Redux/UserInitializer";
import Auth from "../Auth/Auth";
import Dashboard from "../pages/Dashboard";


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


import PublicityClearenceDashboard from "../pages/user/PublicityClearenceDashboard";

import Signup from "../pages/Signup";

import MembershipRequests from "../pages/MembershipRequests";
import TitleRegistrationRequests from "../pages/TitleRegistrationRequests";
import PublicityClearenceRequests from "../pages/PublicityClearenceRequests";
import ApplyForIdCard from "../pages/user/ApplyForIdCard";
import IdCardRequests from "../pages/staff/IdCardRequests";
import UserMembershipDasboard from "../pages/user/UserMembershipDasboard";

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
          <Route path="user/membershipdashboard" element={<UserMembershipDasboard/>}/>
          <Route path="producer/titleRegistrationform" element={<TitleRegistrationForm/>}/>
          <Route path="producer/publicityClearenceform" element={<PublicityClearenceDashboard/>}/>
         

          {/* Comman membership requests */}
          <Route
            path="membership/requests"
            element={<MembershipRequests />}
          />
            <Route
            path="title/requests"
            element={<TitleRegistrationRequests />}
          />
          <Route path="publicityClearence/requests" element={<PublicityClearenceRequests/>}/>
          <Route path="applyforIdCard" element={<ApplyForIdCard/>}/>
          
          

          
          {/* staff */}
          <Route path="idcard/requests" element={<IdCardRequests/>}/>
          


          {/* manager */}
          <Route path="manager/managerdashboard" element={<ManagerDashboard/>}/>
          <Route path="manager/onmMeeting" element={<ONMMeeting/>}/>
          <Route path="manager/titlecommitteMeeting" element={<TitleCommitteMeeting/>}/>
          


          {/* onm-leader */}
          <Route path="onmleader/membershipDashboard" element={<ONMMembershipDashboard/>}/>
          <Route path="onmleader/memberslist" element={<ONMMemberList/>}/>


          {/* onmcommitte-voter */}
          <Route path="onm/voting/membershipDashboard" element={<MembershipVotingDashboard/>}/>

       

  
          {/* titlecommitte-leader */}
          <Route path="titleCommitteLeader/memberslist" element={<KFCCMemberList/>} />
          <Route path="titleCommitteLeader/titleRegistrationDashboard" element={<TitleRegistrationCommitteDashboard/>}/>

          {/* titlecommitte-voter */}
          <Route path="titleCommittee/voting/titleRegistrationDashboard" element={<TitleRegistrationVotingDashboard/>}/>


          {/* ec-member */}
 

          {/* secretry */}

        </Route>
      </Routes>
    </div>
  );
}

export default CustomRouter;
