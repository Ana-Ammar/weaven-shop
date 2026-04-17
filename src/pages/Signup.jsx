import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await createUser(data.email, data.password);
      await updateUserProfile(data.name);
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error.message);
      alert("Signup failed. " + error.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex-col w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold">Sign Up</h1>
          <p className="py-6">Create an account to start shopping.</p>
        </div>
        <div className="card w-full shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="input input-bordered" 
                {...register("name", { required: true })}
              />
              {errors.name && <span className="text-error text-sm mt-1">Name is required</span>}
            </div>
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
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password?.type === 'required' && <span className="text-error text-sm mt-1">Password is required</span>}
              {errors.password?.type === 'minLength' && <span className="text-error text-sm mt-1">Password must be at least 6 characters</span>}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">Sign Up</button>
            </div>
            <p className="text-center text-sm mt-4">
              Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
