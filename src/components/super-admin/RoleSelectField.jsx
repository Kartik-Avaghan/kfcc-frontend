import { ROLE_STYLE } from "./RolesStyle";

function RoleSelectField({ formData, setFormData }) {
  const ROLE_GROUPS = {
    Basic: ["USER", "STAFF"],

    "Office Bearers": [
      "ONM_COMMITTEE",
      "ONM_COMMITTEE_VOTER",
      "ONM_COMMITTEE_LEADER",
      "TITLE_COMMITTEE",
      "TITLE_COMMITTEE_VOTER",
      "TITLE_COMMITTEE_LEADER",
      "EC_MEMBER",
      "SECRETARY",
      "MANAGER",
      "PRESIDENT",
    ],

    "Vice Presidents": ["VP_PRODUCER", "VP_EXHIBITOR", "VP_DISTRIBUTOR"],

    "Members Category": [
      "PRODUCER",
      "EXHIBITOR",
      "DISTRIBUTOR",
      "STUDIO",
      "HONORARY_MEMBER",
      "TEMPORARY_MEMBER",
    ],

    Admin: ["SUPER_ADMIN"],
  };

  const addRole = (role) => {
    if (!role || formData.roles.includes(role)) return;

    setFormData(prev => ({
      ...prev,
      roles: [...prev.roles, role]
    }));
  };

  const removeRole = (roleToRemove) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.filter(role => role !== roleToRemove)
    }));
  };

  return (
    <div className="space-y-3">

      {/* Selected Roles */}
      {formData.roles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {formData.roles.map(role => (
            <span
              key={role}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm cursor-default ${
                ROLE_STYLE[role] || ROLE_STYLE.DEFAULT
              }`}
            >
              {role.replaceAll("_", " ")}
              <button
                type="button"
                onClick={() => removeRole(role)}
                className="ml-1 font-bold hover:text-red-600 cursor-pointer"
                aria-label={`Remove ${role}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Role Select */}
      <select
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value=""
        onChange={(e) => {
          addRole(e.target.value);
          e.target.value = "";
        }}
      >
        <option value="" disabled>
          Select role to add
        </option>

        {Object.entries(ROLE_GROUPS).map(([group, roles]) => (
          <optgroup key={group} label={group}>
            {roles
              .filter(role => !formData.roles.includes(role))
              .map(role => (
                <option key={role} value={role}>
                  {role.replaceAll("_", " ")}
                </option>
              ))}
          </optgroup>
        ))}
      </select>

    </div>
  );
}

export default RoleSelectField;
