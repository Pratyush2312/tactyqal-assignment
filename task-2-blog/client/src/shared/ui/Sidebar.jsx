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
    <aside className="fixed bottom-0 left-0 z-50 flex w-full shrink-0 flex-row items-center justify-around border-t border-[#e5e5df] bg-[#f7f7f5] px-2 py-2 md:sticky md:top-0 md:h-screen md:w-64 md:flex-col md:items-stretch md:justify-start md:border-r md:border-t-0 md:px-5 md:py-7">
      <Link
        to="/"
        className="hidden text-xl font-semibold tracking-tight md:block">
        tactyqal<span className="text-[#b58b36]">.</span>
      </Link>

      <div className="hidden md:mt-14 md:block">
        <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#999d96]">
          Workspace
        </p>
      </div>

      <nav className="flex w-full items-center justify-around gap-1 md:flex-col md:items-stretch md:justify-start md:gap-0 md:space-y-1">
        {links.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/dashboard"}
            className={({ isActive }) =>
              `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-md px-1 py-2 text-[10px] transition sm:text-xs md:flex-row md:flex-none md:justify-start md:gap-3 md:px-3 md:py-3 md:text-sm ${
                isActive
                  ? "bg-[#eaeae4] font-medium text-[#252a26]"
                  : "text-[#777d78] hover:bg-[#eeeeea] hover:text-[#252a26]"
              }`
            }>
            <Icon size={19} strokeWidth={1.7} />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}

        <button
          onClick={() => handleLogout()}
          type="button"
          className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-md px-1 py-2 text-[10px] text-[#777d78] transition hover:bg-[#eeeeea] hover:text-[#252a26] sm:text-xs md:mt-auto md:flex-row md:flex-none md:justify-start md:gap-3 md:px-3 md:py-3 md:text-sm">
          <CiLogout size={19} strokeWidth={1.7} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
