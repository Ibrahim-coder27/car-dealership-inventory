
import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ErrorMessage from "../components/ui/ErrorMessage";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {};

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Register
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <div>
            <label htmlFor="name" className="mb-2 block font-medium">
              Name
            </label>

            <Input
              id="name"
              type="text"
              className="w-full rounded-md border px-3 py-2"
              {...register("name", {
                required: "Name is required",
              })}
            />

            <ErrorMessage>
  {errors.name?.message}
</ErrorMessage>
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block font-medium">
              Email
            </label>

            <Input
              id="email"
              type="email"
              className="w-full rounded-md border px-3 py-2"
              {...register("email", {
                required: "Email is required",
              })}
            />

           <ErrorMessage>
  {errors.email?.message}
</ErrorMessage>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block font-medium">
              Password
            </label>

            <Input
              id="password"
              type="password"
              className="w-full rounded-md border px-3 py-2"
              {...register("password", {
                required: "Password is required",
              })}
            />

            <ErrorMessage>
  {errors.password?.message}
</ErrorMessage>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block font-medium"
            >
              Confirm Password
            </label>

            <Input
              id="confirmPassword"
              type="password"
              className="w-full rounded-md border px-3 py-2"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
            />

            <ErrorMessage>
  {errors.confirmPassword?.message}
</ErrorMessage>
          </div>

          <Button type="submit">
  Register
</Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;