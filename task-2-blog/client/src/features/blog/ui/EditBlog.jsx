import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useForm } from "react-hook-form";
import {
  LuArrowLeft,
  LuImagePlus,
  LuX,
  LuSave,
  LuFileText,
  LuTag,
  LuAlignLeft,
  LuType,
} from "react-icons/lu";

const mockBlog = {
  _id: "1",
  title: "The Future of Artificial Intelligence",
  excerpt:
    "Exploring how artificial intelligence is transforming industries and shaping the future of technology.",
  content:
    "Artificial Intelligence is rapidly transforming the way we interact with technology. From automation to intelligent applications, AI is creating new opportunities across industries.\n\nIn this article, we explore the possibilities of AI, its impact on businesses, and what the future might hold.",
  category: "ai",
  status: "draft",
  featuredImage: {
    url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1000",
  },
};

const categories = [
  { _id: "technology", name: "Technology" },
  { _id: "ai", name: "Artificial Intelligence" },
  { _id: "startups", name: "Startups" },
  { _id: "business", name: "Business" },
  { _id: "marketing", name: "Marketing" },
  { _id: "product", name: "Product Management" },
  { _id: "innovation", name: "Innovation" },
  { _id: "leadership", name: "Leadership" },
];

const EditBlog = () => {
  const { id } = useParams();

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      status: "draft",
      featuredImage: null,
    },
  });

  useEffect(() => {
    // Replace this mock lookup with your fetched blog from Redux.
    const blog = mockBlog._id === id ? mockBlog : null;

    if (blog) {
      reset({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        category: blog.category,
        status: blog.status,
        featuredImage: null,
      });

      setImagePreview(blog.featuredImage?.url || null);
    }
  }, [id, reset]);

  const title = watch("title");
  const content = watch("content");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    const preview = URL.createObjectURL(file);

    setSelectedImage(file);
    setImagePreview(preview);

    setValue("featuredImage", file, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const removeImage = () => {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(null);
    setImagePreview(null);

    setValue("featuredImage", null, {
      shouldDirty: true,
    });
  };

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onSubmit = (data) => {
    console.log("Updated blog:", {
      ...data,
      featuredImage: selectedImage,
    });

  };

  if (mockBlog._id !== id) {
    return (
      <div className="min-h-screen bg-[#f8f8f6] px-8 py-12">
        <h1 className="font-serif text-3xl text-[#252a26]">Blog not found</h1>
        <Link
          to="/dashboard/my-blogs"
          className="mt-5 inline-flex items-center gap-2 text-sm text-[#a77b3c]">
          <LuArrowLeft size={16} />
          Back to my blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f6] px-8 py-10 lg:px-12">
      {/* Header */}
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[1fr_320px]">
          {/* Main editor */}
          <div className="space-y-7">
            <section className="rounded-2xl border border-[#e7e5df] bg-white p-7 lg:p-9">
              <div className="mb-8 border-b border-[#eeede8] pb-6">
                <h2 className="text-base font-semibold text-[#252a26]">
                  Article content
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Edit the content of your article.
                </p>
              </div>

              {/* Title */}
              <div className="mb-7">
                <label className="mb-2 block text-sm font-medium text-[#343a35]">
                  Article title
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-[#e7e5df] px-4 focus-within:border-[#b58b36]">
                  <LuType size={18} className="shrink-0 text-gray-400" />
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
                    className="w-full bg-transparent py-4 text-sm outline-none"
                  />
                </div>

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

              {/* Content */}
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
          </div>

          {/* Sidebar */}
          <aside className="space-y-7">
            {/* Publishing */}
            <section className="rounded-2xl border border-[#e7e5df] bg-white p-6">
              <h2 className="mb-5 text-base font-semibold text-[#252a26]">
                Publishing
              </h2>

              <label className="mb-2 block text-sm font-medium text-[#343a35]">
                Status
              </label>

              <select
                {...register("status", { required: true })}
                className="w-full rounded-xl border border-[#e7e5df] bg-white px-4 py-3 text-sm outline-none focus:border-[#b58b36]">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>

              <div className="mt-7 flex flex-col gap-3">
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

            {/* Category */}
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
                  <option key={category._id} value={category._id}>
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

            {/* Featured image */}
            <section className="rounded-2xl border border-[#e7e5df] bg-white p-6">
              <div className="mb-5 flex items-center gap-2">
                <LuImagePlus size={18} className="text-[#a77b3c]" />
                <h2 className="text-base font-semibold text-[#252a26]">
                  Featured image
                </h2>
              </div>

              {imagePreview ? (
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={imagePreview}
                    alt="Featured"
                    className="h-44 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-3 top-3 rounded-full bg-white p-2 text-gray-600 shadow transition hover:text-red-500">
                    <LuX size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#d9d6ce] bg-[#fbfbf9] px-4 py-10 text-center transition hover:border-[#b58b36]">
                  <LuImagePlus size={25} className="mb-3 text-gray-400" />
                  <span className="text-sm font-medium text-[#343a35]">
                    Upload an image
                  </span>
                  <span className="mt-1 text-xs text-gray-400">
                    PNG, JPG or WEBP
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}

              {imagePreview && (
                <label className="mt-3 block cursor-pointer text-center text-xs font-medium text-[#a77b3c] hover:underline">
                  Replace image
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </section>
          </aside>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
