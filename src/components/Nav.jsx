import { useEffect } from "react";
import {
  FileText,
  LogOut,
  ChevronRight,
  User,
  BarChart3,
  Users,
  Settings,
  Globe,
  CreditCard,
  IdCard,
  Dot,
  Film,
  Users2,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../Redux/Reducer";
import logo from "../assets/logo.png";

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const roleMenus = {
    USER: [
      // { name: "Dashboard", icon: BarChart3, path: "/user/dashboard" },
      { name: "Membership", icon: FileText, path: "/user/membershipdashboard"},
    ],
    STAFF: [
      {
        name: "Membership",
        icon: FileText,
        path: "/membership/requests",
      },
      {
        name: "Title Registration",
        icon: Film,
        path: "/title/requests",
      },
      {
        name: "Public Clearance",
        icon: Globe,
        path: "/publicityClearence/requests",
      },
      {
        name: "ID Card Requests",
        icon: IdCard,
        path: "/idcard/requests",
      },
    ],

    PRODUCER: [
      {
        name: "Title Registration",
        icon: Film,
        path: "/producer/titleregistrationDashboard",
      },
      {
        name: "Public Clearance",
        icon: Globe,
        path: "/producer/publicityClearenceform",
      },
      {
        name: "Apply For ID",
        icon: IdCard,
        path: "/applyforIdCard",
      },
    ],

    DISTRIBUTOR: [
      {
        name: "Apply For ID",
        icon: IdCard,
        path: "/applyforIdCard",
      },
    ],

    EXHIBITOR: [
      {
        name: "Apply For ID",
        icon: IdCard,
        path: "/applyforIdCard",
      },
    ],
    STUDIO: [
      {
        name: "Apply For ID",
        icon: IdCard,
        path: "/applyforIdCard",
      },
    ],
    HONORARY_MEMBER: [
      {
        name: "Apply For ID",
        icon: IdCard,
        path: "/applyforIdCard",
      },
    ],
    TEMPORARY_MEMBER: [
      {
        name: "Apply For ID",
        icon: IdCard,
        path: "/applyforIdCard",
      },
    ],

    VP_PRODUCER: [
      {
        name: "Public Clearance",
        icon: Globe,
        path: "/publicityClearence/requests",
      },
    ],

    // ONM_COMMITTEE: [
    //   { name: "Title Registration", icon: CreditCard, path: "/om/dashboard" },
    //   { name: "Remarked Titles", icon: MessageSquare, path: "/om/meetings" },
    //   { name: "Public Clearance", icon: Globe, path: "/om/meetings" },
    // ],

    ONM_COMMITTEE_VOTER: [
      { name: "Vote", icon: Globe, path: "/onm/voting/membershipDashboard" },
      // { name: "A Category Request", icon: CreditCard, path: "/om/dashboard" },
    ],

    ONM_COMMITTEE_LEADER: [
      {
        name: "Membership Request",
        icon: FileText,
        path: "/onmleader/membershipDashboard",
      },
      { name: "Manage Voters", icon: Users, path: "/onmleader/memberslist" },
    ],

    TITLE_COMMITTEE_VOTER: [
      {
        name: "Title Requests",
        icon: Film,
        path: "/titleCommittee/voting/titleRegistrationDashboard",
      },
    ],

    TITLE_COMMITTEE_LEADER: [
      {
        name: "Title Requests ",
        icon: Film,
        path: "/titleCommitteLeader/titleRegistrationDashboard",
      },
      {
        name: "Manage Voters",
        icon: Users,
        path: "/titleCommitteLeader/memberslist",
      },
    ],

    EC_MEMBER: [
      {
        name: "Membership Request",
        icon: FileText,
        path: "/membership/requests",
      },
      {
        name: "Title Request",
        icon: Film,
        path: "/title/requests",
      },
      { name: "Public Clearance", icon: Globe, path: "/ec/meetis" },
      // { name: "A Category Request", icon: MessageSquare, path: "/ec/meetings" },
    ],

    SECRETARY: [
      {
        name: "Membership Request",
        icon: FileText,
        path: "/membership/requests",
      },
      {
        name: "Title Request",
        icon: Film,
        path: "/title/requests",
      },
      {
        name: "Public Clearance",
        icon: Globe,
        path: "/publicityClearence/requests",
      },
    ],

    MANAGER: [
      // {
      //   name: "Manager Dashboard",
      //   icon: BarChart3,
      //   path: "manager/managerdashboard",
      // },
      { name: "ONM Meetings", icon: Users, path: "/manager/onmMeeting" },
      {
        name: "Title Meetings",
        icon: Users,
        path: "/manager/titlecommitteMeeting",
      },
      {
        name: "Public Clearance",
        icon: Globe,
        path: "/publicityClearence/requests",
      },
    ],

    SUPER_ADMIN: [
      {
        name: "Dashboard",
        icon: BarChart3,
        path: "/admin/dashboard",
      },
      {
        name: "Manage All Users",
        icon: Users2,
        path: "/manage/users/all",
      },
    ],

    PRESIDENT: [
      {
        name: "President Dashboard",
        icon: BarChart3,
        path: "/president/dashboard",
      },
      { name: "Final Approvals", icon: Settings, path: "/president/approvals" },
    ],
  };

  const ROLE_CATEGORIES = {
    Management: [
      "PRESIDENT",
      "MANAGER",
      "SECRETARY",
      "EC_MEMBER",
      "VP_PRODUCER",
      "VP_EXHIBITOR",
      "VP_DISTRIBUTOR",
      "STAFF",
    ],

    Committees: [
      "ONM_COMMITTEE_LEADER",
      "ONM_COMMITTEE_VOTER",
      "TITLE_COMMITTEE_LEADER",
      "TITLE_COMMITTEE_VOTER",
    ],

    Members: [
      "PRODUCER",
      "DISTRIBUTOR",
      "EXHIBITOR",
      "STUDIO",
      "HONORARY_MEMBER",
      "TEMPORARY_MEMBER",
      "USER",
    ],
  };

  const roles = Array.isArray(user?.roles) ? user.roles : [];

  const isSuperAdmin = roles.includes("SUPER_ADMIN");

  const menuItems = roles
    .flatMap((role) => roleMenus[role] || [])
    .filter(
      (item, index, self) =>
        index === self.findIndex((i) => i.path === item.path)
    );

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/login");
  };

  return (
    <div className="fixed inset-y-0 left-0 w-72">
      <div className="h-full bg-linear-to-b from-blue-950 via-blue-900 to-blue-950 text-white flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="KFCC" className="size-14 rounded-full" />
            <div>
              <h1 className="text-2xl font-bold">KFCC</h1>
              {/* <p className="text-xs text-blue-200">Karnataka Film Chamber</p> */}
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-10 bg-blue-700 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              {user && (
                <>
                  <p className="font-medium">Welcome {user?.name}</p>
                  <p className="text-xs text-blue-200 capitalize">
                    {user?.roles?.join(", ")}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Menu */}
        {/* <div className="flex-1 p-6 overflow-y-auto  scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-900"> */}
        <div className="flex-1 p-6 overflow-y-auto scrollbar-modern">
          <p className="text-xs font-semibold text-blue-300 uppercase mb-4">
            Main Menu
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center justify-between p-4 rounded-xl transition-all
                    ${isActive ? "bg-blue-800" : "hover:bg-blue-900"}`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-blue-300 group-hover:text-white" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </NavLink>
              );
            })}
          </nav>

          {isSuperAdmin && (
            <div className="mt-8">
              <p className="text-xs font-semibold text-blue-300 uppercase mb-4">
                Role Management
              </p>

              {Object.entries(ROLE_CATEGORIES).map(([category, roles]) => (
                <div key={category} className="mb-5">
                  {/* Category title */}
                  <p className="text-[11px] font-semibold text-blue-400 uppercase mb-2 tracking-wider">
                    {category}
                  </p>

                  {/* Roles */}
                  <nav className="space-y-1">
                    { roles.map((role) => (
                      <nav className="flex items-center justify-start" key={role}>
                        <NavLink
                        key={role}
                        to={`/manage/users/${role}`}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 rounded-lg text-sm transition w-full
                          ${ isActive ? "bg-blue-800 text-white" : "text-blue-200 hover:bg-blue-900 hover:text-white" }`}
                      >
                        <Dot/>
                        <span className="capitalize">
                          {role.replaceAll("_", " ")}
                        </span>
                      </NavLink>

                      </nav>
          
                      
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="p-4 flex flex-col justify-center items-center ">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl hover:bg-red-600 transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>

          <p className="text-xs text-gray-400 mt-2">© Developed By thincnext</p>
        </div>
      </div>
    </div>
  );
}

export default Nav;
