import { Link } from "react-router";
import useAuthHook from "../hooks/useAuthHook";

export default function Login() {
  const { register, handleLogin, errors, handleSubmit } = useAuthHook();

 

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
            Welcome back
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Sign in to your account
          </h1>

          <p className="mt-2 text-sm text-[#777d78]">
            Enter your credentials to continue.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          noValidate
          className="space-y-5">
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
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-[#777d78] hover:text-[#9b7b39]">
                Forgot password?
              </Link>
            </div>

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

          <button
            type="submit"
            className="w-full rounded-md bg-[#252a26] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#3a403b]">
            Sign in
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#777d78]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-[#252a26] underline underline-offset-4 hover:text-[#9b7b39]">
            Create account
          </Link>
        </p>

        <p className="mt-12 text-center text-xs text-[#a0a39e]">
          © 2026 Tactyqal Labs. All rights reserved.
        </p>
      </div>
    </main>
  );
}
