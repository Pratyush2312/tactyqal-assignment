import React, { useEffect, useMemo, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiTrash2,
  FiX,
  FiFolder,
  FiAlertCircle,
} from "react-icons/fi";
import useCategory from "../hooks/useCategory";
import { useSelector } from "react-redux";

export default function Category() {
  const [search, setSearch] = useState("");

  const {
    register,
    errors,
    handleSubmit,
    handleDelete,
    fetchCategories,
    handleCreateCategory,
    isModalOpen,
    setIsModalOpen,
    deleteId,
    setDeleteId,
  } = useCategory();

  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories?.filter((category) =>
      `${category.name} ${category.description}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [categories, search]);

  const openCreate = () => {
    setIsModalOpen(true);
  };

  return (
    <main className="min-w-0 space-y-6 text-[#292824] sm:space-y-8">
      {/* Header */}
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end sm:gap-4">
        <div>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#a18b60] sm:text-xs sm:tracking-[0.2em]">
            Content management
          </p>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Categories
          </h1>

          <p className="mt-2 text-sm text-[#85837c]">
            Organize and manage your blog categories.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#292824] px-5 py-3 text-sm text-white transition hover:bg-[#45433c] sm:w-auto">
          <FiPlus size={17} />
          Add category
        </button>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[#eae8e1] bg-white p-4 sm:rounded-2xl sm:p-5">
          <p className="text-sm text-[#85837c]">Total categories</p>
          <p className="mt-2 text-2xl font-semibold sm:text-3xl">
            {categories.length}
          </p>
        </div>

        <div className="rounded-xl border border-[#eae8e1] bg-white p-4 sm:rounded-2xl sm:p-5">
          <p className="text-sm text-[#85837c]">Matching results</p>
          <p className="mt-2 text-2xl font-semibold sm:text-3xl">
            {filteredCategories.length}
          </p>
        </div>
      </section>

      {/* Category List */}
      <section className="min-w-0 overflow-hidden rounded-xl border border-[#eae8e1] bg-white sm:rounded-2xl">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#eeece6] p-4 sm:flex-row sm:items-center sm:p-6">
          <div>
            <h2 className="font-semibold">All categories</h2>
            <p className="mt-1 text-xs text-[#99968e]">
              Manage your existing categories
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <FiSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#99968e]"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full rounded-xl border border-[#eae8e1] bg-[#faf9f6] py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-[#b58b36]"
            />
          </div>
        </div>

        {filteredCategories.length > 0 ? (
          <>
            {/* Mobile Category Cards */}
            <div className="divide-y divide-[#eeece6] md:hidden">
              {filteredCategories.map((category) => (
                <article key={category._id} className="p-4 sm:p-5">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f5f1e8] text-[#a18b60]">
                      <FiFolder size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-sm font-medium text-[#292824]">
                        {category.name}
                      </h3>

                      <p className="mt-1 break-words text-xs leading-5 text-[#85837c]">
                        {category.description}
                      </p>

                      <span className="mt-3 inline-block max-w-full break-all rounded-md bg-[#f7f6f2] px-2.5 py-1.5 text-xs text-[#85837c]">
                        {category.slug}
                      </span>
                    </div>

                    <button
                      onClick={() => setDeleteId(category._id)}
                      title="Delete category"
                      aria-label={`Delete ${category.name}`}
                      className="shrink-0 rounded-lg p-2 text-[#77746b] transition hover:bg-red-50 hover:text-red-600">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[600px] text-left">
                <thead className="bg-[#faf9f6] text-xs uppercase tracking-wider text-[#99968e]">
                  <tr>
                    <th className="px-5 py-4 font-medium lg:px-6">Category</th>
                    <th className="px-5 py-4 font-medium lg:px-6">
                      Description
                    </th>
                    <th className="px-5 py-4 font-medium lg:px-6">Slug</th>
                    <th className="px-5 py-4 text-right font-medium lg:px-6">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#eeece6]">
                  {filteredCategories.map((category) => (
                    <tr
                      key={category._id}
                      className="transition hover:bg-[#fcfbf8]">
                      <td className="px-5 py-5 lg:px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f5f1e8] text-[#a18b60]">
                            <FiFolder size={17} />
                          </div>

                          <span className="text-sm font-medium">
                            {category.name}
                          </span>
                        </div>
                      </td>

                      <td className="max-w-xs px-5 py-5 text-sm text-[#85837c] lg:px-6">
                        <p className="truncate">{category.description}</p>
                      </td>

                      <td className="px-5 py-5 lg:px-6">
                        <span className="rounded-md bg-[#f7f6f2] px-2.5 py-1.5 text-xs text-[#85837c]">
                          {category.slug}
                        </span>
                      </td>

                      <td className="px-5 py-5 lg:px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setDeleteId(category._id)}
                            title="Delete category"
                            aria-label={`Delete ${category.name}`}
                            className="rounded-lg p-2 text-[#77746b] transition hover:bg-red-50 hover:text-red-600">
                            <FiTrash2 size={16} />
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
          <div className="px-4 py-14 text-center sm:px-6 sm:py-16">
            <FiFolder size={28} className="mx-auto mb-3 text-[#c5c1b7]" />

            <p className="text-sm font-medium">No categories found</p>

            <p className="mt-1 text-xs text-[#99968e]">
              Try another search or create a new category.
            </p>
          </div>
        )}
      </section>

      {/* Create Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-3 sm:p-4">
          <div className="my-auto max-h-[calc(100dvh-24px)] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl sm:max-h-[calc(100dvh-32px)] sm:rounded-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-[#eeece6] p-4 sm:p-6">
              <div className="min-w-0">
                <h2 className="text-base font-semibold sm:text-lg">
                  Create category
                </h2>

                <p className="mt-1 text-xs text-[#99968e]">
                  Add details for your blog category.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="shrink-0 rounded-lg p-2 text-[#77746b] transition hover:bg-[#f5f4f0]">
                <FiX size={19} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleCreateCategory)}
              className="space-y-5 p-4 sm:p-6">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category name
                </label>

                <input
                  {...register("name")}
                  type="text"
                  placeholder="e.g. Technology"
                  required
                  className="w-full rounded-xl border border-[#e7e5df] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58b36]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  {...register("description")}
                  placeholder="Describe what this category covers..."
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-[#e7e5df] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b58b36]"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-[#eeece6] pt-4 sm:flex-row sm:justify-end sm:pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full rounded-xl border border-[#e7e5df] px-5 py-2.5 text-sm transition hover:bg-[#faf9f6] sm:w-auto">
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#292824] px-5 py-2.5 text-sm text-white transition hover:bg-[#45433c] sm:w-auto">
                  Create category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-3 sm:p-4">
          <div className="my-auto w-full max-w-sm rounded-xl bg-white p-5 shadow-xl sm:rounded-2xl sm:p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
              <FiAlertCircle size={22} />
            </div>

            <h2 className="text-lg font-semibold">Delete category?</h2>

            <p className="mt-2 text-sm leading-6 text-[#85837c]">
              Are you sure you want to delete this category? This action cannot
              be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="w-full rounded-xl border border-[#e7e5df] px-4 py-2.5 text-sm transition hover:bg-[#faf9f6] sm:w-auto">
                Cancel
              </button>

              <button
                onClick={() => handleDelete(deleteId)}
                className="w-full rounded-xl bg-red-600 px-4 py-2.5 text-sm text-white transition hover:bg-red-700 sm:w-auto">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
