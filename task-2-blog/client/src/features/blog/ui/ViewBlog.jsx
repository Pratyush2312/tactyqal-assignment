import { Link, useParams } from "react-router";
import { FiArrowLeft, FiCalendar, FiClock, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { viewBlog } from "../state/blogAction";
import { useBlog } from "../hooks/useBlog";

const ViewBlog = () => {
    const { slug } = useParams();
  const { viewingBlog, isLoading } = useSelector((state) => state.blog);
  const { dispatch } = useBlog();useEffect(() => {
    if (slug) {
      dispatch(viewBlog(slug));
    }
  }, [dispatch, slug]);
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-4">
        <p className="text-sm text-[#777d78]">Loading article...</p>
      </div>
    );
  }

  if (!viewingBlog) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f7f5] px-4 text-center">
        <h2 className="text-xl font-semibold text-[#252a26]">Blog not found</h2>
        <p className="mt-2 text-sm text-[#777d78]">
          The article you're looking for doesn't exist.
        </p>
        <Link
          to="/dashboard/blogs"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#8b7040]">
          <FiArrowLeft size={16} />
          Back to blogs
        </Link>
      </div>
    );
  }

  const category =
    typeof viewingBlog.category === "object"
      ? viewingBlog.category?.name
      : viewingBlog.category;

  const author =
    typeof viewingBlog.author === "object"
      ? viewingBlog.author?.name
      : viewingBlog.author;

  const featuredImage =
    typeof viewingBlog.featuredImage === "object"
      ? viewingBlog.featuredImage?.url
      : viewingBlog.featuredImage;

  const date = viewingBlog.createdAt
    ? new Date(viewingBlog.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : viewingBlog.date;



  return (
    <div className="min-h-screen w-full bg-[#f7f7f5] px-4 py-5 sm:px-6 sm:py-8 lg:px-10">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          to="/dashboard/blogs"
          className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-[#777d78] transition hover:text-[#252a26] sm:mb-8 sm:text-sm">
          <FiArrowLeft size={16} />
          Back to blogs
        </Link>

        <header className="mb-7 sm:mb-10">
          {category && (
            <span className="mb-4 inline-flex rounded-full bg-[#eee9df] px-3 py-1.5 text-[11px] font-medium text-[#8b7040] sm:mb-5 sm:text-xs">
              {category}
            </span>
          )}

          <h1 className="max-w-4xl break-words text-[clamp(1.8rem,5vw,3.5rem)] font-semibold leading-[1.15] tracking-tight text-[#252a26]">
            {viewingBlog.title}
          </h1>

          {viewingBlog.excerpt && (
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#777d78] sm:mt-5 sm:text-base sm:leading-8 lg:text-lg">
              {viewingBlog.excerpt}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-[#e5e5df] py-4 text-xs text-[#777d78] sm:mt-7 sm:gap-x-7 sm:text-sm">
            {author && (
              <span className="flex items-center gap-2">
                <FiUser className="shrink-0" size={15} />
                {author}
              </span>
            )}

            {date && (
              <span className="flex items-center gap-2">
                <FiCalendar className="shrink-0" size={15} />
                {date}
              </span>
            )}
          </div>
        </header>

        {featuredImage && (
          <div className="mb-9 aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#e9e8e2] sm:mb-12 sm:aspect-video sm:rounded-2xl lg:mb-14">
            <img
              src={featuredImage}
              alt={viewingBlog.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <article className="mx-auto w-full max-w-3xl">
          <div className="space-y-5 sm:space-y-6">
            {(viewingBlog.content || "")
              .split("\n\n")
              .map((paragraph, index) => {
                const content = paragraph.trim();

                if (!content) return null;

                if (content.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="break-words pt-5 text-xl font-semibold leading-snug tracking-tight text-[#252a26] sm:pt-7 sm:text-2xl lg:text-3xl">
                      {content.replace(/^## /, "")}
                    </h2>
                  );
                }

                if (content.startsWith("### ")) {
                  return (
                    <h3
                      key={index}
                      className="break-words pt-2 text-lg font-semibold leading-snug text-[#333832] sm:text-xl">
                      {content.replace(/^### /, "")}
                    </h3>
                  );
                }

                return (
                  <p
                    key={index}
                    className="break-words text-sm leading-7 text-[#626862] sm:text-base sm:leading-8">
                    {content}
                  </p>
                );
              })}
          </div>

          <div className="mt-10 border-t border-[#e5e5df] pt-6 sm:mt-14 sm:pt-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#999d96] sm:text-xs">
              End of article
            </p>

            <Link
              to="/dashboard/blogs"
              className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[#8b7040] transition-all hover:gap-3 sm:text-sm">
              <FiArrowLeft size={15} />
              Back to all blogs
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ViewBlog;
