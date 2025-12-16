import { useEffect } from "react";
import {
  FileText,
  LogOut,
  ChevronRight,
  User,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../reducer/userSlice";
import logo from "../assets/logo.jpeg";

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const authReady = useSelector((state) => state.user.authReady);

 
  useEffect(() => {
    if (authReady && isAuth === false) {
      navigate("/");
    }
  }, [isAuth, navigate, authReady]);

  
  const roleMenus = {
    STAFF: [
      { name: "Dashboard", icon: BarChart3, path: "/staff/dashboard" },
      { name: "Membership", icon: FileText, path: "/staff/membership" },
    ],

    PRODUCER: [
      { name: "Dashboard", icon: BarChart3, path: "/producer/dashboard" },
      { name: "My Projects", icon: FileText, path: "/producer/projects" },
    ],

    OM_COMMITTEE: [
      { name: "O&M Dashboard", icon: BarChart3, path: "/om/dashboard" },
      { name: "Meetings", icon: Users, path: "/om/meetings" },
    ],

    EC_MEMBER: [
      { name: "EC Dashboard", icon: BarChart3, path: "/ec/dashboard" },
      { name: "Voting", icon: Users, path: "/ec/voting" },
    ],

    SECRETARY: [
      { name: "Secretary Dashboard", icon: BarChart3, path: "/secretary/dashboard" },
      { name: "Applications", icon: FileText, path: "/secretary/applications" },
    ],

    MANAGER: [
      { name: "Manager Dashboard", icon: BarChart3, path: "/manager/dashboard" },
      { name: "User Control", icon: Users, path: "/manager/users" },
    ],

    PRESIDENT: [
      { name: "President Dashboard", icon: BarChart3, path: "/president/dashboard" },
      { name: "Final Approvals", icon: Settings, path: "/president/approvals" },
    ],
  };

  const menuItems = roleMenus[user?.role] || [];

  
  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/login");
  };

  
  return (
    <div className="h-screen">
      <div className="w-72 h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white flex flex-col shadow-2xl">

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
            <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              {user && (
                <>              <p className="font-medium">
                Welcome {user?.name}
              </p>
              <p className="text-xs text-blue-200 capitalize">
                {user?.role?.toLowerCase()}
              </p>

              {/* <p className="text-xs text-blue-200 capitalize">
  {user.roles.map(role => role.replace("_", " ")).join(", ").toLowerCase()}
</p> */}

              </>

              )}
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 p-6">
          <p className="text-xs font-semibold text-blue-300 uppercase mb-4">
            Main Menu
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
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
