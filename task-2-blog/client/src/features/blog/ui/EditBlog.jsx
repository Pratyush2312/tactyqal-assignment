import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import { LuArrowLeft, LuImagePlus, LuSave, LuTag } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useBlog } from "../hooks/useBlog";

const EditBlog = () => {
  const { id } = useParams();

  const { editingBlog, isLoading } = useSelector((state) => state.blog);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    errors,
    handleEdit,
    categories,
  } = useBlog();

  useEffect(() => {
    if (editingBlog && editingBlog._id === id) {
      reset({
        title: editingBlog.title || "",
        excerpt: editingBlog.excerpt || "",
        content: editingBlog.content || "",
        category: editingBlog.category?.name || "",
      });
    }
  }, [editingBlog, id, reset]);

  const content = watch("content");

  if (isLoading && !editingBlog) {
    return (
      <div className="min-h-screen bg-[#f8f8f6] p-5 text-sm text-gray-500 sm:p-8">
        Loading blog...
      </div>
    );
  }

  if (!editingBlog || editingBlog._id !== id) {
    return (
      <div className="min-h-screen bg-[#f8f8f6] p-5 text-sm text-[#252a26] sm:p-8">
        Blog not found. Please go back and try again.
        <Link
          to="/dashboard/my-blogs"
          className="ml-2 text-[#a77b3c] underline">
          My Blogs
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8f8f6] px-4 py-6 sm:px-6 sm:py-8 lg:px-12 lg:py-10">
      <header className="mb-8 sm:mb-10">
        <Link
          to="/dashboard/my-blogs"
          className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#a77b3c] sm:mb-6">
          <LuArrowLeft size={16} />
          Back to my blogs
        </Link>

        <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-[#a77b3c] sm:mb-3 sm:tracking-[0.22em]">
          Workspace / My Blogs / Edit
        </p>

        <h1 className="font-serif text-3xl text-[#252a26] sm:text-4xl">
          Edit Article
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Refine your article and update its publishing details.
        </p>
      </header>

      <form onSubmit={handleSubmit((data) => handleEdit(id, data))}>
        <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Article content */}
          <section className="min-w-0 rounded-xl border border-[#e7e5df] bg-white p-4 sm:rounded-2xl sm:p-6 lg:p-9">
            <div className="mb-6 border-b border-[#eeede8] pb-5 sm:mb-8 sm:pb-6">
              <h2 className="text-base font-semibold text-[#252a26]">
                Article content
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Edit the content of your article.
              </p>
            </div>

            {/* Title */}
            <div className="mb-6 sm:mb-7">
              <label className="mb-2 block text-sm font-medium text-[#343a35]">
                Article title
              </label>

              <input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must have at least 5 characters",
                  },
                  maxLength: {
                    value: 150,
                    message: "Title cannot exceed 150 characters",
                  },
                })}
                placeholder="Enter article title"
                className="w-full min-w-0 rounded-lg border border-[#e7e5df] px-4 py-3 text-sm outline-none transition focus:border-[#b58b36] sm:rounded-xl sm:py-4"
              />

              {errors.title && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Excerpt */}
            <div className="mb-6 sm:mb-7">
              <label className="mb-2 block text-sm font-medium text-[#343a35]">
                Short description
              </label>

              <textarea
                {...register("excerpt", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must have at least 10 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Description cannot exceed 100 characters",
                  },
                })}
                rows={3}
                placeholder="Write a short description..."
                className="w-full min-w-0 resize-none rounded-lg border border-[#e7e5df] px-4 py-3 text-sm outline-none transition focus:border-[#b58b36] sm:rounded-xl sm:py-4"
              />

              {errors.excerpt && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.excerpt.message}
                </p>
              )}
            </div>

            {/* Article body */}
            <div>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <label className="text-sm font-medium text-[#343a35]">
                  Article body
                </label>

                <span className="text-xs text-gray-400">
                  {content?.length || 0} characters
                </span>
              </div>

              <textarea
                {...register("content", {
                  required: "Article content is required",
                  minLength: {
                    value: 100,
                    message: "Content must have at least 100 characters",
                  },
                  maxLength: {
                    value: 10000,
                    message: "Content cannot exceed 10000 characters",
                  },
                })}
                rows={18}
                placeholder="Write your article here..."
                className="w-full min-w-0 resize-y rounded-lg border border-[#e7e5df] px-4 py-4 text-sm leading-7 outline-none transition focus:border-[#b58b36] sm:rounded-xl sm:px-5"
              />

              {errors.content && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.content.message}
                </p>
              )}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="min-w-0 space-y-5 sm:space-y-7">
            {/* Publishing */}
            <section className="rounded-xl border border-[#e7e5df] bg-white p-4 sm:rounded-2xl sm:p-6">
              <h2 className="mb-5 text-base font-semibold text-[#252a26]">
                Publishing
              </h2>

              {/* Category */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <LuTag size={18} className="text-[#a77b3c]" />
                  <h3 className="text-sm font-semibold text-[#252a26]">
                    Category
                  </h3>
                </div>

                <select
                  {...register("category", {
                    required: "Please select a category",
                  })}
                  className="w-full rounded-lg border border-[#e7e5df] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58b36] sm:rounded-xl">
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {errors.category && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="mt-7 flex flex-col gap-3">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#252a26] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3a403b] active:scale-[0.99]">
                  <LuSave size={17} />
                  Save changes
                </button>

                <Link
                  to="/dashboard/my-blogs"
                  className="rounded-lg border border-[#e7e5df] px-5 py-3 text-center text-sm font-medium text-gray-600 transition hover:bg-[#f8f8f6]">
                  Cancel
                </Link>
              </div>
            </section>

            {/* Featured image */}
            <section className="rounded-xl border border-[#e7e5df] bg-white p-4 sm:rounded-2xl sm:p-6">
              <div className="mb-5 flex items-center gap-2">
                <LuImagePlus size={18} className="text-[#a77b3c]" />
                <h2 className="text-base font-semibold text-[#252a26]">
                  Featured image
                </h2>
              </div>

              {editingBlog.featuredImage?.url ? (
                <img
                  src={editingBlog.featuredImage.url}
                  alt="Featured"
                  className="h-44 w-full rounded-lg object-cover sm:rounded-xl"
                />
              ) : (
                <p className="text-sm text-gray-400">
                  No featured image available.
                </p>
              )}
            </section>
          </aside>
        </div>
      </form>
    </main>
  );
};

export default EditBlog;
