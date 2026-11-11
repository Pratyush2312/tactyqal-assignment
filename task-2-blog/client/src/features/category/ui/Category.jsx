import React, { useEffect, useMemo, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiX,
  FiFolder,
  FiAlertCircle,
} from "react-icons/fi";
import useCategory from "../hooks/useCategory";
import { useSelector } from "react-redux";

const initialCategories = [
  {
    _id: "1",
    name: "Technology",
    description: "Latest technology, innovations and digital trends.",
    slug: "technology",
  },
  {
    _id: "2",
    name: "Development",
    description: "Programming, software engineering and development.",
    slug: "development",
  },
  {
    _id: "3",
    name: "Business",
    description: "Business strategies, startups and entrepreneurship.",
    slug: "business",
  },
  {
    _id: "4",
    name: "Design",
    description: "UI/UX, graphic design and creative inspiration.",
    slug: "design",
  },
];

const emptyForm = {
  name: "",
  description: "",
};

const createSlug = (name) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function Category() {
  //   const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { fetchCategories } = useCategory();
    useEffect(() => {
        fetchCategories();
    }, []);
    const categories = useSelector(state => state.category.categories);
    console.log(categories);
  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      `${category.name} ${category.description}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [categories, search]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (category) => {
    setEditingId(category._id);
    setForm({
      name: category.name,
      description: category.description,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.description.trim()) return;

    if (editingId) {
      
    } else {
      
    }

    setIsModalOpen(false);
    setForm(emptyForm);
  };

  const handleDelete = () => {
   
  };

  return (
    <div className="space-y-8 text-[#292824]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#a18b60] mb-2">
            Content management
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">Categories</h1>

          <p className="text-sm text-[#85837c] mt-2">
            Organize and manage your blog categories.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 bg-[#292824] text-white px-5 py-3 rounded-xl text-sm hover:bg-[#45433c] transition">
          <FiPlus size={17} />
          Add category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-[#eae8e1] rounded-2xl p-5">
          <p className="text-sm text-[#85837c]">Total categories</p>
          <p className="text-3xl font-semibold mt-2">{categories.length}</p>
        </div>

        <div className="bg-white border border-[#eae8e1] rounded-2xl p-5">
          <p className="text-sm text-[#85837c]">Matching results</p>
          <p className="text-3xl font-semibold mt-2">
            {filteredCategories.length}
          </p>
        </div>
      </div>

      {/* Category List */}
      <section className="bg-white border border-[#eae8e1] rounded-2xl overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#eeece6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold">All categories</h2>
            <p className="text-xs text-[#99968e] mt-1">
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
              className="w-full pl-9 pr-4 py-2.5 bg-[#faf9f6] border border-[#eae8e1] rounded-xl text-sm outline-none focus:border-[#b58b36]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-[#faf9f6] text-xs uppercase tracking-wider text-[#99968e]">
              <tr>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Slug</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eeece6]">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <tr
                    key={category._id}
                    className="hover:bg-[#fcfbf8] transition">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#f5f1e8] flex items-center justify-center text-[#a18b60]">
                          <FiFolder size={17} />
                        </div>

                        <span className="font-medium text-sm">
                          {category.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-[#85837c] max-w-xs">
                      <p className="truncate">{category.description}</p>
                    </td>

                    <td className="px-6 py-5">
                      <span className="text-xs text-[#85837c] bg-[#f7f6f2] px-2.5 py-1.5 rounded-md">
                        {category.slug}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(category)}
                          title="Edit category"
                          className="p-2 rounded-lg text-[#77746b] hover:bg-[#f5f1e8] hover:text-[#a18b60] transition">
                          <FiEdit2 size={16} />
                        </button>

                        <button
                          onClick={() => setDeleteId(category._id)}
                          title="Delete category"
                          className="p-2 rounded-lg text-[#77746b] hover:bg-red-50 hover:text-red-600 transition">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-16 text-center">
                    <FiFolder
                      size={28}
                      className="mx-auto text-[#c5c1b7] mb-3"
                    />
                    <p className="font-medium text-sm">No categories found</p>
                    <p className="text-xs text-[#99968e] mt-1">
                      Try another search or create a new category.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-[#eeece6]">
              <div>
                <h2 className="text-lg font-semibold">
                  {editingId ? "Edit category" : "Create category"}
                </h2>

                <p className="text-xs text-[#99968e] mt-1">
                  Add details for your blog category.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg hover:bg-[#f5f4f0] text-[#77746b]">
                <FiX size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Technology"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#e7e5df] bg-white text-sm outline-none focus:border-[#b58b36]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe what this category covers..."
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#e7e5df] bg-white text-sm outline-none focus:border-[#b58b36] resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#eeece6]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#e7e5df] text-sm hover:bg-[#faf9f6] transition">
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#292824] text-white text-sm hover:bg-[#45433c] transition">
                  {editingId ? "Save changes" : "Create category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl">
            <div className="w-11 h-11 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <FiAlertCircle size={22} />
            </div>

            <h2 className="font-semibold text-lg">Delete category?</h2>

            <p className="text-sm text-[#85837c] mt-2">
              Are you sure you want to delete this category? This action cannot
              be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2.5 rounded-xl border border-[#e7e5df] text-sm hover:bg-[#faf9f6]">
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
