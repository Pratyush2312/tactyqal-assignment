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
    <main className="min-h-screen bg-[#f7f7f5] px-6 py-8 text-[#252a26] md:px-10 md:py-10">
      <header className="mb-12 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#a18a5b]">
            Workspace / Dashboard
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Good to see you, {user?.name?.split(" ")[0] || "there"}.
          </h1>
          <p className="mt-3 text-sm text-[#777b76]">
            Here's your space to create and manage content.
          </p>
        </div>

        <Link
          to="/dashboard/blogs/create"
          className="inline-flex items-center gap-2 rounded-md bg-[#252a26] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3b423d]">
          <LuPlus size={17} />
          New article
        </Link>
      </header>
    

      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#a18a5b]">
              Workspace
            </p>
            <h2 className="mt-2 text-xl font-semibold">Quick access</h2>
          </div>

          <span className="text-xs text-[#92958f]">
            {user?.role === "admin" ? "Administrator" : "Author"}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                to={action.link}
                className="group rounded-xl border border-[#e7e6e0] bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-[#c6b17f] hover:shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="rounded-lg bg-[#f5f1e7] p-3 text-[#a18a5b]">
                    <Icon size={20} />
                  </div>

                  <LuArrowUpRight
                    size={18}
                    className="text-[#a6a69f] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#a18a5b]"
                  />
                </div>

                <h3 className="mt-7 text-lg font-semibold">{action.title}</h3>

                <p className="mt-2 text-sm leading-6 text-[#858982]">
                  {action.description}
                </p>

                <p className="mt-6 flex items-center gap-2 text-sm font-medium text-[#a18a5b]">
                  {action.label}
                  <LuArrowUpRight size={15} />
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12 border-t border-[#e7e6e0] pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#92958f]">
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
