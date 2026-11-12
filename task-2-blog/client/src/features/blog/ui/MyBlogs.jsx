import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  LuPlus,
  LuSearch,
  LuFileText,
  LuPencil,
  LuTrash2,
  LuCalendarDays,
} from "react-icons/lu";
import { useBlog } from "../hooks/useBlog";
import { useSelector } from "react-redux";

const MyBlogs = () => {
  const [search, setSearch] = useState("");
  const myBlogs = useSelector((state) => state.blog.myBlogs);
  const { fetchBlogByUser, handleDelete, onEditClick } = useBlog();

  useEffect(() => {
    fetchBlogByUser();
  }, []);

  const filteredBlogs = useMemo(() => {
    return myBlogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.category.name.toLowerCase().includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [search, myBlogs]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8f8f6] px-4 py-6 text-[#252a26] sm:px-6 sm:py-8 lg:px-12 lg:py-10">
      {/* Header */}
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-6">
        <div>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#a77b3c] sm:mb-3 sm:text-xs sm:tracking-[0.22em]">
            Workspace / My Blogs
          </p>

          <h1 className="font-serif text-3xl text-[#252a26] sm:text-4xl">
            My Articles
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage and keep track of your articles.
          </p>
        </div>

        <Link
          to="/dashboard/blogs/create"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#252a26] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3a403b] sm:w-auto sm:px-6">
          <LuPlus size={18} />
          New article
        </Link>
      </header>

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row">
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-[#e7e5df] bg-white px-4">
          <LuSearch className="shrink-0 text-gray-400" size={19} />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your articles..."
            className="w-full min-w-0 bg-transparent py-4 text-sm outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Articles container */}
      <section className="mt-6 overflow-hidden rounded-xl border border-[#e7e5df] bg-white sm:mt-7 sm:rounded-2xl">
        {/* Section header */}
        <div className="flex items-center justify-between border-b border-[#eae8e2] px-4 py-5 sm:px-7 sm:py-6">
          <div>
            <h2 className="text-base font-semibold text-[#252a26]">
              Your articles
            </h2>

            <p className="mt-1 text-xs text-gray-400 sm:text-sm">
              {filteredBlogs.length} articles found
            </p>
          </div>

          <LuFileText
            size={20}
            className="shrink-0 text-[#ad8a4c] sm:size-[22px]"
          />
        </div>

        {filteredBlogs.length > 0 ? (
          <>
            {/* Mobile article cards */}
            <div className="divide-y divide-[#eeede8] md:hidden">
              {filteredBlogs.map((blog) => (
                <article key={blog._id} className="p-4 sm:p-5">
                  <div className="flex min-w-0 gap-3">
                    <img
                      src={blog.featuredImage.url}
                      alt=""
                      className="h-16 w-16 shrink-0 rounded-lg object-cover sm:h-20 sm:w-20"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-sm font-semibold text-[#252a26]">
                        {blog.title}
                      </h3>

                      <p className="mt-1 break-all text-xs text-gray-400">
                        {blog.slug}
                      </p>

                      <span className="mt-2 inline-block rounded-full bg-[#f5f3ed] px-3 py-1 text-[11px] font-medium text-[#a77b3c]">
                        {blog.category.name}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#f0efe9] pt-3">
                    <span className="flex items-center gap-2 text-xs text-gray-500">
                      <LuCalendarDays size={14} />
                      {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => onEditClick(blog._id)}
                        type="button"
                        title="Edit"
                        aria-label={`Edit ${blog.title}`}
                        className="text-gray-400 transition hover:text-[#a77b3c]">
                        <LuPencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(blog._id)}
                        type="button"
                        title="Delete"
                        aria-label={`Delete ${blog.title}`}
                        className="text-gray-400 transition hover:text-red-500">
                        <LuTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[750px] text-left">
                <thead className="border-b border-[#eae8e2] bg-[#fbfbf9]">
                  <tr className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
                    <th className="px-5 py-5 lg:px-7">Article</th>
                    <th className="px-5 py-5">Category</th>
                    <th className="px-5 py-5">Date</th>
                    <th className="px-5 py-5 text-right lg:px-7">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBlogs.map((blog) => (
                    <tr
                      key={blog._id}
                      className="border-b border-[#eeede8] last:border-0 hover:bg-[#fcfcfa]">
                      <td className="px-5 py-5 lg:px-7">
                        <div className="flex items-center gap-4">
                          <img
                            src={blog.featuredImage.url}
                            alt=""
                            className="h-12 w-14 shrink-0 rounded-lg object-cover"
                          />

                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#252a26]">
                              {blog.title}
                            </p>

                            <p className="mt-1 break-all text-xs text-gray-400">
                              {blog.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5 text-sm text-gray-500">
                        {blog.category.name}
                      </td>

                      <td className="px-5 py-5 text-sm text-gray-500">
                        <span className="flex items-center gap-2 whitespace-nowrap">
                          <LuCalendarDays size={15} />
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </td>

                      <td className="px-5 py-5 lg:px-7">
                        <div className="flex justify-end gap-4">
                          <button
                            onClick={() => onEditClick(blog._id)}
                            type="button"
                            title="Edit"
                            aria-label={`Edit ${blog.title}`}
                            className="text-gray-400 transition hover:text-[#a77b3c]">
                            <LuPencil size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(blog._id)}
                            type="button"
                            title="Delete"
                            aria-label={`Delete ${blog.title}`}
                            className="text-gray-400 transition hover:text-red-500">
                            <LuTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center px-5 py-16 text-center sm:px-6 sm:py-20">
            <div className="mb-4 rounded-full bg-[#f4f3ef] p-4">
              <LuFileText size={25} className="text-gray-400" />
            </div>

            <h3 className="text-base font-semibold text-[#252a26]">
              No articles found
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Try changing your search filter.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyBlogs;
