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
import UserTitleRegistrationDashboard from "../pages/user/UserTitleRegistrationDashboard";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoutes from "../Auth/ProtectedRoutes";
import ManageUsers from "../pages/Super-admin/ManageUsers";

function CustomRouter() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

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
          <Route
            path="user/membershipdashboard"
            element={
              <ProtectedRoutes allowedRoles={["USER"]}>
                <UserMembershipDasboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="producer/titleregistrationDashboard"
            element={
              <ProtectedRoutes allowedRoles={["USER", "PRODUCER"]}>
                <UserTitleRegistrationDashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="producer/publicityClearenceform"
            element={
              <ProtectedRoutes allowedRoles={["USER", "PRODUCER"]}>
                <PublicityClearenceDashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="applyforIdCard"
            element={
              <ProtectedRoutes allowedRoles={["PRODUCER"]}>
                <ApplyForIdCard />
              </ProtectedRoutes>
            }
          />

          {/* Comman membership requests */}
          <Route
            path="membership/requests"
            element={
              <ProtectedRoutes
                allowedRoles={[
                  "STAFF",
                  "ONM_COMMITTEE_VOTER",
                  "ONM_COMMITTEE_LEADER",
                  "EC_MEMBER",
                  "SECRETARY",
                ]}
              >
                <MembershipRequests />
              </ProtectedRoutes>
            }
          />
          <Route
            path="title/requests"
            element={
              <ProtectedRoutes
                allowedRoles={[
                  "STAFF",
                  "TITLE_COMMITTEE_VOTER",
                  "TITLE_COMMITTEE_LEADER",
                  "EC_MEMBER",
                  "SECRETARY",
                ]}
              >
                <TitleRegistrationRequests />
              </ProtectedRoutes>
            }
          />
          <Route
            path="publicityClearence/requests"
            element={
              <ProtectedRoutes
                allowedRoles={["STAFF", "VP_PRODUCER", "SECRETARY", "MANAGER"]}
              >
                <PublicityClearenceRequests />
              </ProtectedRoutes>
            }
          />

          {/* staff */}
          <Route
            path="idcard/requests"
            element={
              <ProtectedRoutes allowedRoles={["STAFF"]}>
                <IdCardRequests />
              </ProtectedRoutes>
            }
          />

          {/* manager */}
          <Route
            path="manager/managerdashboard"
            element={
              <ProtectedRoutes allowedRoles={["MANAGER"]}>
                <ManagerDashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="manager/onmMeeting"
            element={
              <ProtectedRoutes allowedRoles={["MANAGER"]}>
                <ONMMeeting />
              </ProtectedRoutes>
            }
          />
          <Route
            path="manager/titlecommitteMeeting"
            element={
              <ProtectedRoutes allowedRoles={["MANAGER"]}>
                <TitleCommitteMeeting />
              </ProtectedRoutes>
            }
          />

          {/* onm-leader */}
          <Route
            path="onmleader/membershipDashboard"
            element={
              <ProtectedRoutes allowedRoles={["ONM_COMMITTEE_LEADER"]}>
                <ONMMembershipDashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="onmleader/memberslist"
            element={
              <ProtectedRoutes allowedRoles={["ONM_COMMITTEE_LEADER"]}>
                <ONMMemberList />
              </ProtectedRoutes>
            }
          />

          {/* onmcommitte-voter */}
          <Route
            path="onm/voting/membershipDashboard"
            element={
              <ProtectedRoutes allowedRoles={["ONM_COMMITTEE_VOTER"]}>
                <MembershipVotingDashboard />
              </ProtectedRoutes>
            }
          />

          {/* titlecommitte-leader */}
          <Route
            path="titleCommitteLeader/memberslist"
            element={
              <ProtectedRoutes allowedRoles={["TITLE_COMMITTEE_LEADER"]}>
                <KFCCMemberList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="titleCommitteLeader/titleRegistrationDashboard"
            element={
              <ProtectedRoutes allowedRoles={["TITLE_COMMITTEE_LEADER"]}>
                <TitleRegistrationCommitteDashboard />
              </ProtectedRoutes>
            }
          />

          {/* titlecommitte-voter */}
          <Route
            path="titleCommittee/voting/titleRegistrationDashboard"
            element={
              <ProtectedRoutes allowedRoles={["TITLE_COMMITTEE_VOTER"]}>
                <TitleRegistrationVotingDashboard />
              </ProtectedRoutes>
            }
          />

          {/* ec-member */}

          {/* secretry */}

          {/* super admin */}
          <Route
            path="manage/users/:role"
            element={
              <ProtectedRoutes allowedRoles={["SUPER_ADMIN"]}>
                <ManageUsers />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default CustomRouter;
