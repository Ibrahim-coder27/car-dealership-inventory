import { useForm } from "react-hook-form";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ErrorMessage from "../components/ui/ErrorMessage";

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = () => { };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <Card>
                <h1 className="mb-6 text-center text-3xl font-bold">Login</h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
                >
                    <div>
                        <label htmlFor="email" className="mb-2 block font-medium">
                            Email
                        </label>

                        <Input
                            id="email"
                            type="email"
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
  {...register("password", {
    required: "Password is required",
  })}
/>

                        <ErrorMessage>
  {errors.password?.message}
</ErrorMessage>
                    </div>

                    <Button type="submit">
                        Login
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default LoginPage;