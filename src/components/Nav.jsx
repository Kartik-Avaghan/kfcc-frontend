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
  MessageSquare,
  File,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../Redux/Reducer";
import logo from "../assets/logo.jpeg";

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  


 

 
  useEffect(() => {
    if (isAuth === false) {
      navigate("/");
    }
  }, [isAuth, navigate, ]);

  
  const roleMenus = {

     USER: [
      // { name: "Dashboard", icon: BarChart3, path: "/user/dashboard" },
      { name: "Membership", icon: FileText, path: "/user/membershipform" },
    ],
    STAFF: [
      { name: "Membership", icon: FileText, path: "/staff/membershipdashboard" },
      { name: "Title Registration", icon: CreditCard, path: "/staff/titleregistrationdashboard" },
      { name: "Public Clearance", icon: Globe, path: "/staff/publiclearence" },
    ],

    PRODUCER: [
      { name: "Dashboard", icon: BarChart3, path: "/producer/dashboard" },
      { name: "Title Registration", icon: CreditCard, path: "/producer/projects" },
      { name: "Public Clearance", icon: Globe, path: "/producer/projects" }
    ],

    ONM_COMMITTEE: [
      { name: "Title Registration", icon: CreditCard, path: "/om/dashboard" },
      { name: "Remarked Titles", icon: MessageSquare, path: "/om/meetings" },
      { name: "Public Clearance", icon: Globe, path: "/om/meetings" },

    ],

     ONM_COMMITTEE_VOTER: [
      {name:"Vote" , icon:Globe, path: "/onm/membershipform/voting"},
      { name: "Title Registration", icon: CreditCard, path: "/om/dashboard" },
      { name: "Remarked Titles", icon: MessageSquare, path: "/om/meetings" },
      { name: "Public Clearance", icon: Globe, path: "/om/meetings" },

    ],

    EC_MEMBER: [
      { name: "Title Registration", icon: CreditCard, path: "/ec/dashboard" },
      { name: "Remarked Titles", icon: MessageSquare, path: "/ec/meetings" },
      { name: "Public Clearance", icon: Globe, path: "/ec/meetings" },
    ],

    ONM_COMMITTEE_LEADER: [
      { name: "Membership Request", icon: FileText, path: "/onmleader/onmleaderdashboard" }, 
      { name: "Manage Voters", icon: Users, path: "/onmleader/memberslist" },
    ],

    SECRETARY: [
      { name: "Secretary Dashboard", icon: BarChart3, path: "/secretary/dashboard" },
      { name: "Applications", icon: FileText, path: "/secretary/applications" },
    ],

    MANAGER: [
      { name: "Manager Dashboard", icon: BarChart3, path: "manager/managerdashboard" },
      { name: "ONM Meetings", icon: Users, path: "/manager/memberslist" },
    ],

    PRESIDENT: [
      { name: "President Dashboard", icon: BarChart3, path: "/president/dashboard" },
      { name: "Final Approvals", icon: Settings, path: "/president/approvals" },
    ],
  };

  // const menuItems = roleMenus[user?.roles] || [];
  // const menuItems = user?.roles
  // ?.flatMap((role) => roleMenus[role] || [])
  // .filter(
  //   (item, index, self) =>
  //     index === self.findIndex((i) => i.path === item.path)
  // );

  const roles = Array.isArray(user?.roles) ? user.roles : [];

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
    <div className="fixed h-screen">
      <div className=" w-72 h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white flex flex-col shadow-2xl">

        {/* Header */}
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="KFCC" className="size-14 rounded-full" />
            <div>
              <h1 className="text-2xl font-bold">KFCC</h1>
              <p className="text-xs text-blue-200">Karnataka Film Chamber</p>
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
                <>              <p className="font-medium">
                Welcome {user?.name}
              </p>

              <p className="text-xs text-blue-200 capitalize">
  {user?.roles?.join(", ")}
</p>

              {/* <p className="text-xs text-blue-200 capitalize">
                {user?.roles?.toLowerCase()}
              </p> */}

              
              </>

              )}
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 p-6 overflow-y-auto  scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-900">
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
         
        </div>

        {/* Logout */}
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl hover:bg-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
