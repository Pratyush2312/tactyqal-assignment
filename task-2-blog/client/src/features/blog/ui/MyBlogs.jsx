import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  LuPlus,
  LuSearch,
  LuFileText,
  LuPencil,
  LuTrash2,
  LuEye,
  LuCalendarDays,
} from "react-icons/lu";
import { useBlog } from "../hooks/useBlog";
import { useSelector } from "react-redux";

const MyBlogs = () => {
  const [search, setSearch] = useState("");
  const myBlogs = useSelector((state) => state.blog.myBlogs);
  const { fetchBlogByUser, handleDelete, navigate } = useBlog();
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
    <div className="min-h-screen bg-[#f8f8f6] px-8 py-10 lg:px-12">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[#a77b3c]">
            Workspace / My Blogs
          </p>

          <h1 className="font-serif text-4xl text-[#252a26]">My Articles</h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage and keep track of your articles.
          </p>
        </div>

        <Link
          to="/dashboard/blogs/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#252a26] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3a403b]">
          <LuPlus size={18} />
          New article
        </Link>
      </div>

      {/* Filters */}
      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-3 rounded-xl border border-[#e7e5df] bg-white px-4">
          <LuSearch className="shrink-0 text-gray-400" size={19} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your articles..."
            className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="mt-7 overflow-hidden rounded-2xl border border-[#e7e5df] bg-white">
        <div className="flex items-center justify-between border-b border-[#eae8e2] px-7 py-6">
          <div>
            <h2 className="text-base font-semibold text-[#252a26]">
              Your articles
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              {filteredBlogs.length} articles found
            </p>
          </div>

          <LuFileText size={22} className="text-[#ad8a4c]" />
        </div>

        {filteredBlogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="border-b border-[#eae8e2] bg-[#fbfbf9]">
                <tr className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
                  <th className="px-7 py-5">Article</th>
                  <th className="px-5 py-5">Category</th>
                  <th className="px-5 py-5">Date</th>
                  <th className="px-7 py-5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="border-b border-[#eeede8] last:border-0 hover:bg-[#fcfcfa]">
                    <td className="px-7 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={blog.featuredImage.url}
                          alt=""
                          className="h-12 w-14 rounded-lg object-cover"
                        />

                        <div>
                          <p className="text-sm font-semibold text-[#252a26]">
                            {blog.title}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {blog.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5 text-sm text-gray-500">
                      {blog.category.name}
                    </td>

                    <td className="px-5 py-5 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <LuCalendarDays size={15} />
                        {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    <td className="px-7 py-5">
                      <div className="flex justify-end gap-4">
                        <button
                          onClick={() => navigate(`/blogs/edit/${blog._id}`)}
                          type="button"
                          title="Edit"
                          className="text-gray-400 transition hover:text-[#a77b3c]">
                          <LuPencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(blog._id)}
                          type="button"
                          title="Delete"
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
        ) : (
          <div className="flex flex-col items-center px-6 py-20 text-center">
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
      </div>
    </div>
  );
};

export default MyBlogs;
