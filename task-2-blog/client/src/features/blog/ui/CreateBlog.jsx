import { useState } from "react";
import { Link } from "react-router";
import {
  LuArrowLeft,
  LuImagePlus,
  LuX,
  LuFileText,
  LuSave,
  LuSend,
  LuChevronDown,
  LuImage,
} from "react-icons/lu";
import { useBlog } from "../hooks/useBlog";

const CreateBlog = () => {
  const [preview, setPreview] = useState(null);

  const { register, handleSubmit, watch, errors, setValue, createBlog } =
    useBlog();

  const status = watch("status");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setValue("featuredImage", file, { shouldValidate: true });

    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setValue("featuredImage", null, { shouldValidate: true });
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-8 text-[#252a26] md:px-10 md:py-10">
      <header className="mb-10">
        <Link
          to="/dashboard/blogs"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#858982] transition hover:text-[#a18a5b]">
          <LuArrowLeft size={16} />
          Back to articles
        </Link>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#a18a5b]">
              Workspace / Blogs / New article
            </p>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Create an article
            </h1>

            <p className="mt-3 text-sm text-[#777b76]">
              Put your thoughts into words and share your story.
            </p>
          </div>

          <span className="rounded-full border border-[#e7e6e0] bg-white px-4 py-2 text-xs text-[#777b76]">
            New draft
          </span>
        </div>
      </header>

      <form onSubmit={handleSubmit(createBlog)}>
        <div className="grid items-start gap-8 xl:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <section className="rounded-xl border border-[#e7e6e0] bg-white p-6 md:p-8">
              <div className="mb-7 flex items-center gap-3 border-b border-[#efeee9] pb-5">
                <LuFileText size={19} className="text-[#a18a5b]" />
                <h2 className="font-semibold">Article details</h2>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Article title
                  </label>

                  <input
                    type="text"
                    placeholder="Give your article a compelling title..."
                    maxLength={150}
                    {...register("title", {
                      required: "Title is required",
                      minLength: {
                        value: 5,
                        message: "Title must be at least 5 characters",
                      },
                      maxLength: {
                        value: 150,
                        message: "Title cannot exceed 150 characters",
                      },
                    })}
                    className="w-full rounded-lg border border-[#e7e6e0] px-4 py-3 text-sm outline-none transition placeholder:text-[#b4b5af] focus:border-[#b58b36]"
                  />

                  {errors.title && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

              
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Excerpt
                  </label>

                  <textarea
                    placeholder="Write a short introduction to your article..."
                    rows={3}
                    maxLength={100}
                    {...register("excerpt", {
                      required: "Excerpt is required",
                      minLength: {
                        value: 10,
                        message: "Excerpt must be at least 10 characters",
                      },
                      maxLength: {
                        value: 100,
                        message: "Excerpt cannot exceed 100 characters",
                      },
                    })}
                    className="w-full resize-none rounded-lg border border-[#e7e6e0] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#b4b5af] focus:border-[#b58b36]"
                  />

                  {errors.excerpt && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.excerpt.message}
                    </p>
                  )}
                </div>

                {/* Content */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Article content
                  </label>

                  <textarea
                    placeholder="Start writing your article here..."
                    rows={18}
                    {...register("content", {
                      required: "Content is required",
                      minLength: {
                        value: 100,
                        message: "Content must be at least 100 characters",
                      },
                      maxLength: {
                        value: 10000,
                        message: "Content cannot exceed 10000 characters",
                      },
                    })}
                    className="w-full resize-y rounded-lg border border-[#e7e6e0] px-4 py-4 text-sm leading-7 outline-none transition placeholder:text-[#b4b5af] focus:border-[#b58b36]"
                  />

                  {errors.content && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.content.message}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-[#a1a39d]">
                    Minimum 100 characters · Maximum 10,000 characters
                  </p>
                </div>
              </div>
            </section>

            {/* Featured image */}
            <section className="rounded-xl border border-[#e7e6e0] bg-white p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <LuImagePlus size={19} className="text-[#a18a5b]" />
                <div>
                  <h2 className="font-semibold">Featured image</h2>
                  <p className="mt-1 text-xs text-[#92958f]">
                    Choose an image that represents your article.
                  </p>
                </div>
              </div>

              {preview ? (
                <div className="relative overflow-hidden rounded-lg border border-[#e7e6e0]">
                  <img
                    src={preview}
                    alt="Featured image preview"
                    className="h-64 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-3 top-3 rounded-full bg-white p-2 text-[#252a26] shadow-sm transition hover:text-red-600">
                    <LuX size={17} />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#d9d7ce] bg-[#fafaf8] px-5 py-12 text-center transition hover:border-[#b58b36] hover:bg-[#f9f7f1]">
                  <div className="mb-4 rounded-full bg-[#f0eadc] p-4 text-[#a18a5b]">
                    <LuImagePlus size={25} />
                  </div>

                  <span className="text-sm font-medium">
                    Click to upload an image
                  </span>

                  <span className="mt-2 text-xs text-[#92958f]">
                    PNG, JPG or WEBP · Maximum 5MB
                  </span>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </section>
          </div>

          {/* Publishing sidebar */}
          <aside className="space-y-6">
            <section className="rounded-xl border border-[#e7e6e0] bg-white p-6">
              <h2 className="mb-6 font-semibold">Publishing settings</h2>

              <div className="space-y-5">
                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Category
                  </label>

                  <div className="relative">
                    <select
                      {...register("category", {
                        required: "Please select a category",
                      })}
                      className="w-full appearance-none rounded-lg border border-[#e7e6e0] bg-white px-4 py-3 pr-10 text-sm outline-none focus:border-[#b58b36]">
                      <option value="">Select category</option>
                      <option value="technology">Technology</option>
                      <option value="startups">Startups</option>
                      <option value="business">Business</option>
                      <option value="marketing">Marketing</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                    </select>

                    <LuChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#92958f]"
                    />
                  </div>

                  {errors.category && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Publication status
                  </label>

                  <div className="relative">
                    <select
                      {...register("status")}
                      className="w-full appearance-none rounded-lg border border-[#e7e6e0] bg-white px-4 py-3 pr-10 text-sm outline-none focus:border-[#b58b36]">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>

                    <LuChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#92958f]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-7 space-y-3">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#252a26] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#3b423d]">
                  {status === "published" ? (
                    <LuSend size={16} />
                  ) : (
                    <LuSave size={16} />
                  )}

                  {status === "published" ? "Publish article" : "Save draft"}
                </button>

                <Link
                  to="/dashboard/blogs"
                  className="flex w-full items-center justify-center rounded-lg border border-[#e7e6e0] px-4 py-3 text-sm font-medium text-[#777b76] transition hover:bg-[#fafaf8]">
                  Cancel
                </Link>
              </div>
            </section>

            <div className="rounded-xl border border-[#e7e6e0] bg-[#f2efe7] p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#a18a5b]">
                Writing tip
              </p>
              <p className="mt-3 text-sm leading-6 text-[#777b76]">
                A strong headline grabs attention. A clear excerpt gives readers
                a reason to keep reading.
              </p>
            </div>
          </aside>
        </div>
      </form>
    </main>
  );
};

export default CreateBlog;
