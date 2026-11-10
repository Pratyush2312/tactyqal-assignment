import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  LuPlus,
  LuSearch,
  LuFileText,
  LuPencil,
  LuTrash2,
  LuArrowUpRight,
  LuChevronDown,
} from "react-icons/lu";
import { axiosInstance } from "../../../config/axiosInstance";
import { useBlog } from "../hooks/useBlog";
import { useSelector } from "react-redux";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [error, setError] = useState("");

  const { fetchAllBlogs,} = useBlog();
  const { blogs, isLoading } = useSelector(state => state.blog);
    console.log(blogs)

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = blog.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = status === "all" || blog.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [blogs, search, status]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmed) return;

    // try {
    //   await axiosInstance.delete(`/blogs/${id}`);
    //   setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    // } catch (err) {
    //   alert(err.response?.data?.message || "Unable to delete blog.");
    // }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-6 py-8 text-[#252a26] md:px-10 md:py-10">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#a18a5b]">
            Workspace / Blogs
          </p>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Articles
          </h1>

          <p className="mt-3 text-sm text-[#777b76]">
            Create, edit and manage your published content.
          </p>
        </div>

        <Link
          to="/dashboard/blogs/create"
          className="inline-flex items-center gap-2 rounded-md bg-[#252a26] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3b423d]">
          <LuPlus size={17} />
          New article
        </Link>
      </header>

      <section className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <LuSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92958f]"
          />

          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[#e7e6e0] bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#b58b36]"
          />
        </div>

        <div className="relative">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full appearance-none rounded-lg border border-[#e7e6e0] bg-white px-4 py-3 pr-10 text-sm outline-none focus:border-[#b58b36] sm:w-44">
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <LuChevronDown
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#92958f]"
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-[#e7e6e0] bg-white">
        <div className="flex items-center justify-between border-b border-[#e7e6e0] px-6 py-5">
          <div>
            <h2 className="font-semibold">All articles</h2>
            <p className="mt-1 text-xs text-[#92958f]">
              {filteredBlogs.length} articles found
            </p>
          </div>

          <LuFileText size={20} className="text-[#a18a5b]" />
        </div>

        {isLoading ? (
          <div className="px-6 py-16 text-center text-sm text-[#92958f]">
            Loading articles...
          </div>
        ) : error ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={fetchBlogs}
              className="mt-3 text-sm font-medium text-[#a18a5b]">
              Try again
            </button>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <LuFileText size={30} className="mx-auto text-[#b8b8b0]" />
            <h3 className="mt-4 font-medium">No articles found</h3>
            <p className="mt-2 text-sm text-[#92958f]">
              Try changing your search or create a new article.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-[#e7e6e0] bg-[#fafaf8] text-[11px] uppercase tracking-wider text-[#92958f]">
                  <th className="px-6 py-4 font-medium">Article</th>
                  <th className="px-6 py-4 font-medium">Author</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Status</th> 
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="border-b border-[#efeee9] last:border-0 transition hover:bg-[#fafaf8]">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        {blog.featuredImage?.url ? (
                          <img
                            src={blog.featuredImage.url}
                            alt=""
                            className="h-12 w-14 rounded-md object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-14 items-center justify-center rounded-md bg-[#f5f1e7] text-[#a18a5b]">
                            <LuFileText size={20} />
                          </div>
                        )}

                        <div className="max-w-xs">
                          <p className="truncate text-sm font-medium">
                            {blog.title}
                          </p>
                          <p className="mt-1 truncate text-xs text-[#92958f]">
                            {blog.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-[#777b76]">
                      { blog.author.name}
                    </td>
                    <td className="px-6 py-5 text-sm text-[#777b76]">
                      {blog.category?.name || "Uncategorised"}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-medium capitalize ${
                          blog.status === "published"
                            ? "bg-[#edf5ed] text-[#47784c]"
                            : blog.status === "draft"
                              ? "bg-[#f5f1e7] text-[#98772e]"
                              : "bg-[#f0efed] text-[#777b76]"
                        }`}>
                        {blog.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-[#777b76]">
                      {formatDate(blog.publishedAt || blog.createdAt)}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          to={`/dashboard/blogs/edit/${blog._id}`}
                          title="Edit article"
                          className="text-[#92958f] transition hover:text-[#a18a5b]">
                          <LuPencil size={17} />
                        </Link>

                        <button
                          onClick={() => handleDelete(blog._id)}
                          title="Delete article"
                          className="text-[#92958f] transition hover:text-red-600">
                          <LuTrash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default Blogs;
