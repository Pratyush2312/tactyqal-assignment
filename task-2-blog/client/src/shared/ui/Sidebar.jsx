import { NavLink, Link } from "react-router";
import { CiLogout, CiUser } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { FaFolder } from "react-icons/fa";
import useAuthHook from "../../features/auth/hooks/useAuthHook";
const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: MdDashboard,
  },
  {
    label: "Blogs",
    path: "/dashboard/blogs",
    icon: FiFileText,
  },
  {
    label: "My Blogs",
    path: "/dashboard/my-blogs",
    icon: CiUser,
  },
];

export default function Sidebar({ isAdmin = false }) {
  const { handleLogout } = useAuthHook();
  const links = isAdmin
    ? [
        ...navigation,
        {
          label: "Categories",
          path: "/dashboard/categories",
          icon: FaFolder,
        },
      ]
    : navigation;

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-[#e5e5df] bg-[#f7f7f5] px-5 py-7">
      <Link to="/" className="text-xl font-semibold tracking-tight">
        tactyqal<span className="text-[#b58b36]">.</span>
      </Link>

      <div className="mt-14">
        <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#999d96]">
          Workspace
        </p>

        <nav className="space-y-1">
          {links.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-3 text-sm transition ${
                  isActive
                    ? "bg-[#eaeae4] font-medium text-[#252a26]"
                    : "text-[#777d78] hover:bg-[#eeeeea] hover:text-[#252a26]"
                }`
              }>
              <Icon size={17} strokeWidth={1.7} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-[#e5e5df] pt-5">
        <button
          onClick={() => handleLogout()}
          type="button"
          className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm text-[#777d78] transition hover:bg-[#eeeeea] hover:text-[#252a26]">
          <CiLogout size={17} strokeWidth={1.7} />
          Logout
        </button>
      </div>
    </aside>
  );
}
