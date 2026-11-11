import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { LuArrowLeft, LuImagePlus, LuSave, LuTag } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { useBlog } from "../hooks/useBlog";

const categories = [
  { name: "Technology" },
  { name: "Artificial Intelligence" },
  { name: "Startups" },
  { name: "Business" },
  { name: "Marketing" },
  { name: "Product Management" },
  { name: "Innovation" },
  { name: "Leadership" },
];

const EditBlog = () => {
  const { id } = useParams();

  const { editingBlog, isLoading } = useSelector((state) => state.blog);
  const { register, handleSubmit, watch, reset, errors, handleEdit } =
    useBlog();

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
    return <div className="p-8">Loading blog...</div>;
  }

  if (!editingBlog || editingBlog._id !== id) {
    return (
      <div className="p-8">
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
    <div className="min-h-screen bg-[#f8f8f6] px-8 py-10 lg:px-12">
      <div className="mb-10">
        <Link
          to="/dashboard/my-blogs"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#a77b3c]">
          <LuArrowLeft size={16} />
          Back to my blogs
        </Link>

        <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[#a77b3c]">
          Workspace / My Blogs / Edit
        </p>

        <h1 className="font-serif text-4xl text-[#252a26]">Edit Article</h1>

        <p className="mt-2 text-sm text-gray-500">
          Refine your article and update its publishing details.
        </p>
      </div>

      <form onSubmit={handleSubmit((data) => handleEdit(id, data))}>
        <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[1fr_320px]">
          <section className="rounded-2xl border border-[#e7e5df] bg-white p-7 lg:p-9">
            <div className="mb-8 border-b border-[#eeede8] pb-6">
              <h2 className="text-base font-semibold text-[#252a26]">
                Article content
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Edit the content of your article.
              </p>
            </div>
            <div className="mb-7">
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
                className="w-full rounded-xl border border-[#e7e5df] px-4 py-4 text-sm outline-none focus:border-[#b58b36]"
              />

              {errors.title && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Excerpt */}
            <div className="mb-7">
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
                className="w-full resize-none rounded-xl border border-[#e7e5df] px-4 py-4 text-sm outline-none transition focus:border-[#b58b36]"
              />

              {errors.excerpt && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.excerpt.message}
                </p>
              )}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
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
                className="w-full resize-y rounded-xl border border-[#e7e5df] px-5 py-4 text-sm leading-7 outline-none transition focus:border-[#b58b36]"
              />

              {errors.content && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.content.message}
                </p>
              )}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-7">
            {/* Publishing */}
            <section className="rounded-2xl border border-[#e7e5df] bg-white p-6">
              <h2 className="mb-5 text-base font-semibold text-[#252a26]">
                Publishing
              </h2>

              <div className="mt-7 flex flex-col gap-3">
                <section className="rounded-2xl border border-[#e7e5df] bg-white p-6">
                  <div className="mb-5 flex items-center gap-2">
                    <LuTag size={18} className="text-[#a77b3c]" />
                    <h2 className="text-base font-semibold text-[#252a26]">
                      Category
                    </h2>
                  </div>

                  <select
                    {...register("category", {
                      required: "Please select a category",
                    })}
                    className="w-full rounded-xl border border-[#e7e5df] bg-white px-4 py-3 text-sm outline-none focus:border-[#b58b36]">
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
                </section>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#252a26] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3a403b]">
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
            <section className="rounded-2xl border border-[#e7e5df] bg-white p-6">
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
                  className="h-44 w-full rounded-xl object-cover"
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
    </div>
  );
};

export default EditBlog;
