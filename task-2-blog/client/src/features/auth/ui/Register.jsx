import { Link } from "react-router";
import useAuthHook from "../hooks/useAuthHook";

export default function Register() {
  const { register, handleSubmit, watch, errors, handleRegister } =
    useAuthHook();

  const password = watch("password", "");

  const inputClassName = (fieldName) =>
    `w-full rounded-md border bg-white px-4 py-3 text-sm outline-none transition ${
      errors[fieldName]
        ? "border-red-300 focus:border-red-500"
        : "border-[#dedfda] focus:border-[#9b7b39]"
    }`;

  return (
    <main className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-5 py-12 text-[#202321]">
      <div className="w-full max-w-md">
        <Link to="/" className="text-xl font-semibold tracking-tight">
          tactyqal<span className="text-[#b58b36]">.</span>
        </Link>

        <div className="mt-12 mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#858984]">
            Get started
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-[#777d78]">
            Join us and start exploring.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleRegister)}
          noValidate
          className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              aria-invalid={errors.name ? "true" : "false"}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className={inputClassName("name")}
            />
            {errors.name && (
              <p className="mt-2 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email address",
                },
              })}
              className={inputClassName("email")}
            />
            {errors.email && (
              <p className="mt-2 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="role" className="mb-2 block text-sm font-medium">
              Register as
            </label>

            <select
              id="role"
              defaultValue="author"
              {...register("role", {
                required: "Please select a role",
              })}
              className="w-full rounded-md border border-[#dedfda] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#9b7b39]">
              <option value="author">Author</option>
              <option value="admin">Admin</option>
            </select>

            {errors.role && (
              <p className="mt-2 text-xs text-red-500">{errors.role.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className={inputClassName("password")}
            />
            {errors.password && (
              <p className="mt-2 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={inputClassName("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-[#252a26] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#3a403b]">
            Create account
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#777d78]">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-medium text-[#252a26] underline underline-offset-4 hover:text-[#9b7b39]">
            Sign in
          </Link>
        </p>

        <p className="mt-12 text-center text-xs text-[#a0a39e]">
          © 2026 Tactyqal Labs. All rights reserved.
        </p>
      </div>
    </main>
  );
}
