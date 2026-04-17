import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex-col w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Access your account to manage your orders and wishlist.</p>
        </div>
        <div className="card w-full shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email" 
                placeholder="email" 
                className="input input-bordered" 
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-error text-sm mt-1">Email is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input 
                type="password" 
                placeholder="password" 
                className="input input-bordered" 
                {...register("password", { required: true })}
              />
              {errors.password && <span className="text-error text-sm mt-1">Password is required</span>}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">Login</button>
            </div>
            <p className="text-center text-sm mt-4">
              Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
