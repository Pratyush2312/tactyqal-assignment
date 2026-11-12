import { Link } from "react-router";
import { useSelector } from "react-redux";
import {
  LuFileText,
  LuPlus,
  LuFolder,
  LuArrowUpRight,
  LuPenLine,
} from "react-icons/lu";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const actions = [
    {
      title: "All Blogs",
      description: "View and manage all your blog posts.",
      icon: LuFileText,
      link: "/dashboard/blogs",
      label: "Manage blogs",
    },
    {
      title: "Create Blog",
      description: "Write and publish a new article.",
      icon: LuPlus,
      link: "/dashboard/blogs/create",
      label: "Start writing",
    },
    ...(user?.role === "admin"
      ? [
          {
            title: "Categories",
            description: "Organise your articles into categories.",
            icon: LuFolder,
            link: "/dashboard/categories",
            label: "Manage categories",
          },
        ]
      : []),
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f7f5] px-4 py-6 text-[#252a26] sm:px-6 sm:py-8 md:px-10 md:py-10">
      {/* Header */}
      <header className="mb-9 flex flex-col items-start justify-between gap-5 sm:mb-12 sm:flex-row sm:items-center sm:gap-4">
        <div className="min-w-0">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#a18a5b] sm:text-xs sm:tracking-[0.2em]">
            Workspace / Dashboard
          </p>

          <h1 className="break-words text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Good to see you, {user?.name?.split(" ")[0] || "there"}.
          </h1>

          <p className="mt-3 text-sm text-[#777b76]">
            Here's your space to create and manage content.
          </p>
        </div>

        <Link
          to="/dashboard/blogs/create"
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[#252a26] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3b423d] sm:w-auto">
          <LuPlus size={17} />
          New article
        </Link>
      </header>

      {/* Quick Access */}
      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#a18a5b] sm:text-xs sm:tracking-[0.18em]">
              Workspace
            </p>

            <h2 className="mt-2 text-lg font-semibold sm:text-xl">
              Quick access
            </h2>
          </div>

          <span className="text-xs text-[#92958f]">
            {user?.role === "admin" ? "Administrator" : "Author"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                to={action.link}
                className="group min-w-0 rounded-xl border border-[#e7e6e0] bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-[#c6b17f] hover:shadow-sm sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="rounded-lg bg-[#f5f1e7] p-3 text-[#a18a5b]">
                    <Icon size={20} />
                  </div>

                  <LuArrowUpRight
                    size={18}
                    className="text-[#a6a69f] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#a18a5b]"
                  />
                </div>

                <h3 className="mt-6 text-lg font-semibold sm:mt-7">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#858982]">
                  {action.description}
                </p>

                <p className="mt-5 flex items-center gap-2 text-sm font-medium text-[#a18a5b] sm:mt-6">
                  {action.label}
                  <LuArrowUpRight size={15} />
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <section className="mt-9 border-t border-[#e7e6e0] pt-5 sm:mt-12 sm:pt-6">
        <div className="flex flex-col gap-3 text-xs text-[#92958f] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>TACTYQAL LABS · CONTENT MANAGEMENT</p>

          <p className="flex items-center gap-2">
            <LuPenLine size={13} />
            Create something worth reading.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
