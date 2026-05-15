
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";


export default function Login() {
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
    <div className="min-h-[80vh] flex items-center justify-center bg-rich-base py-12 px-4">
      <motion.div
        className="w-full max-w-[420px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#f0e6d0] tracking-tight mb-2">
            Login now!
          </h1>
          <p className="text-sm text-[#7a9ab5]">
            Access your account to manage your orders and wishlist.
          </p>
        </div>

        {/* Card */}
        <motion.div
          className="bg-[#142233] border border-[#1e3247] rounded-2xl px-8 py-8"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <button
            type="button"
            // onClick={handleGoogleLogin}
            className="
              w-full flex items-center justify-center gap-3 py-2.5 rounded-lg
              bg-white hover:bg-gray-100 active:scale-[0.98]
              text-gray-700 text-sm font-semibold
              transition-all duration-200 cursor-pointer"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>
        </motion.div>
      </motion.div >
    </div >
  );
}
