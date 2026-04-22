import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";

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
    <div className="min-h-[80vh] flex items-center justify-center bg-rich-base py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="flex-col w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold">Sign Up</h1>
          <p className="py-6">Create an account to start shopping.</p>
        </div>
        <motion.div
          className="card w-full shadow-2xl bg-rich-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="input input-bordered bg-rich-base border-rich-card-hover text-rich-text" 
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
                className="input input-bordered bg-rich-base border-rich-card-hover text-rich-text" 
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
                className="input input-bordered bg-rich-base border-rich-card-hover text-rich-text" 
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password?.type === 'required' && <span className="text-error text-sm mt-1">Password is required</span>}
              {errors.password?.type === 'minLength' && <span className="text-error text-sm mt-1">Password must be at least 6 characters</span>}
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-rich-accent text-white border-none shadow-none hover:bg-rich-accent-hover" type="submit">Sign Up</button>
            </div>
            <p className="text-center text-sm mt-4">
              Already have an account? <Link to="/login" className="text-rich-accent font-bold hover:underline">Login</Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
