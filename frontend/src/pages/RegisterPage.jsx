import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import authService from "../services/authService";
import { ROUTES } from "../routes/routePaths";

function RegisterPage() {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (formData) => {
    setServerError("");
    setIsSubmitting(true);

    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      toast.success("Account created! Please sign in.");
      navigate(ROUTES.LOGIN, { replace: true });
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClass = (hasError) =>
    `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 bg-white/90 ${
      hasError
        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        : "border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
    }`;

  return (
    <div className="auth-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mx-auto mb-3 shadow-xl">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-white font-extrabold text-xl tracking-tight">AutoVault</h2>
          <p className="text-white/70 text-xs mt-0.5">Car Dealership Inventory System</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-3xl p-8 shadow-2xl backdrop-blur-xl bg-white/85">
          <h1 className="text-2xl font-bold text-surface-800 text-center mb-1">
            Register
          </h1>
          <p className="text-sm text-surface-400 text-center mb-6">
            Register to start managing dealership inventory
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {serverError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-600 flex items-center gap-2 animate-slide-down">
                <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {serverError}
              </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className={inputBaseClass(errors.name)}
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" },
                })}
              />
              {errors.name && (
                <p role="alert" className="mt-1.5 text-xs text-red-500 font-medium">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={inputBaseClass(errors.email)}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                })}
              />
              {errors.email && (
                <p role="alert" className="mt-1.5 text-xs text-red-500 font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${inputBaseClass(errors.password)} pr-10`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 text-xs font-semibold px-1"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p role="alert" className="mt-1.5 text-xs text-red-500 font-medium">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-1.5">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={inputBaseClass(errors.confirmPassword)}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p role="alert" className="mt-1.5 text-xs text-red-500 font-medium">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Role Selector */}
            <div>
              <label htmlFor="role" className="block text-xs font-bold uppercase tracking-wider text-surface-500 mb-1.5">
                Account Role
              </label>
              <select
                id="role"
                className={inputBaseClass(errors.role)}
                {...register("role", { required: "Role is required" })}
              >
                <option value="customer">Customer (Standard User)</option>
                <option value="admin">Admin (Restock & Delete Access)</option>
              </select>
              {errors.role && (
                <p role="alert" className="mt-1.5 text-xs text-red-500 font-medium">{errors.role.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full !py-3 text-sm !mt-6 shadow-md hover:shadow-indigo-500/25"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-surface-400">
              Already have an account?{" "}
              <Link
                to={ROUTES.LOGIN}
                className="font-bold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;