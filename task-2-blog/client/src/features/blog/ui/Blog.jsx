import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  LuPlus,
  LuSearch,
  LuFileText,
  LuPencil,
  LuTrash2,
} from "react-icons/lu";
import { useBlog } from "../hooks/useBlog";
import { useSelector } from "react-redux";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const { fetchAllBlogs, handleDelete } = useBlog();
  const { blogs = [], isLoading } = useSelector((state) => state.blog);

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = blog.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [blogs, search]);

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-4 py-6 text-[#252a26] sm:px-6 sm:py-8 md:px-10 md:py-10">
      <header className="mb-8 flex flex-col items-start justify-between gap-5 sm:mb-10 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#a18a5b]">
            Workspace / Blogs
          </p>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Articles
          </h1>

          <p className="mt-2 text-sm text-[#777b76] sm:mt-3">
            Create, edit and manage your published content.
          </p>
        </div>

        <Link
          to="/dashboard/blogs/create"
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[#252a26] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3b423d] sm:w-auto">
          <LuPlus size={17} />
          New article
        </Link>
      </header>

      <section className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative w-full flex-1">
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
      </section>

      <section className="overflow-hidden rounded-xl border border-[#e7e6e0] bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-[#e7e6e0] px-4 py-5 sm:px-6">
          <div>
            <h2 className="font-semibold">All articles</h2>
            <p className="mt-1 text-xs text-[#92958f]">
              {filteredBlogs.length} articles found
            </p>
          </div>

          <LuFileText size={20} className="shrink-0 text-[#a18a5b]" />
        </div>

        {isLoading ? (
          <div className="px-4 py-16 text-center text-sm text-[#92958f] sm:px-6">
            Loading articles...
          </div>
        ) : error ? (
          <div className="px-4 py-16 text-center sm:px-6">
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={fetchAllBlogs}
              className="mt-3 text-sm font-medium text-[#a18a5b]">
              Try again
            </button>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="px-4 py-16 text-center sm:px-6">
            <LuFileText size={30} className="mx-auto text-[#b8b8b0]" />
            <h3 className="mt-4 font-medium">No articles found</h3>
            <p className="mt-2 text-sm text-[#92958f]">
              Try changing your search or create a new article.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile layout */}
            <div className="divide-y divide-[#efeee9] md:hidden">
              {filteredBlogs.map((blog) => (
                <article key={blog._id} className="p-4">
                  <div className="flex min-w-0 gap-3">
                    {blog.featuredImage?.url ? (
                      <img
                        src={blog.featuredImage.url}
                        alt=""
                        className="h-14 w-16 shrink-0 rounded-md object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-16 shrink-0 items-center justify-center rounded-md bg-[#f5f1e7] text-[#a18a5b]">
                        <LuFileText size={21} />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {blog.title}
                      </p>
                      <p className="mt-1 truncate text-xs text-[#92958f]">
                        {blog.slug}
                      </p>
                      <p className="mt-2 text-xs text-[#777b76]">
                        {blog.category?.name || "Uncategorised"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0 text-xs text-[#92958f]">
                      <p>{blog.author?.name || "Unknown author"}</p>
                      <p className="mt-1">
                        {formatDate(blog.publishedAt || blog.createdAt)}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-4">
                      <Link
                        to={`/dashboard/blogs/edit/${blog._id}`}
                        title="Edit article"
                        aria-label="Edit article"
                        className="text-[#92958f] transition hover:text-[#a18a5b]">
                        <LuPencil size={18} />
                      </Link>

                      <button
                        onClick={() => handleDelete(blog._id)}
                        title="Delete article"
                        aria-label="Delete article"
                        className="text-[#92958f] transition hover:text-red-600">
                        <LuTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Tablet and desktop layout */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="border-b border-[#e7e6e0] bg-[#fafaf8] text-[11px] uppercase tracking-wider text-[#92958f]">
                    <th className="px-4 py-4 font-medium lg:px-6">Article</th>
                    <th className="px-4 py-4 font-medium lg:px-6">Author</th>
                    <th className="px-4 py-4 font-medium lg:px-6">Category</th>
                    <th className="px-4 py-4 font-medium lg:px-6">Date</th>
                    <th className="px-4 py-4 text-right font-medium lg:px-6">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBlogs.map((blog) => (
                    <tr
                      key={blog._id}
                      className="border-b border-[#efeee9] transition last:border-0 hover:bg-[#fafaf8]">
                      <td className="px-4 py-5 lg:px-6">
                        <div className="flex items-center gap-3">
                          {blog.featuredImage?.url ? (
                            <img
                              src={blog.featuredImage.url}
                              alt=""
                              className="h-12 w-14 shrink-0 rounded-md object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-14 shrink-0 items-center justify-center rounded-md bg-[#f5f1e7] text-[#a18a5b]">
                              <LuFileText size={20} />
                            </div>
                          )}

                          <div className="max-w-xs min-w-0">
                            <p className="truncate text-sm font-medium">
                              {blog.title}
                            </p>
                            <p className="mt-1 truncate text-xs text-[#92958f]">
                              {blog.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-5 text-sm text-[#777b76] lg:px-6">
                        {blog.author?.name || "Unknown author"}
                      </td>

                      <td className="px-4 py-5 text-sm text-[#777b76] lg:px-6">
                        {blog.category?.name || "Uncategorised"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-5 text-sm text-[#777b76] lg:px-6">
                        {formatDate(blog.publishedAt || blog.createdAt)}
                      </td>

                      <td className="px-4 py-5 lg:px-6">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            to={`/dashboard/blogs/edit/${blog._id}`}
                            title="Edit article"
                            aria-label="Edit article"
                            className="text-[#92958f] transition hover:text-[#a18a5b]">
                            <LuPencil size={17} />
                          </Link>

                          <button
                            onClick={() => handleDelete(blog._id)}
                            title="Delete article"
                            aria-label="Delete article"
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
          </>
        )}
      </section>
    </main>
  );
};

export default Blogs;
