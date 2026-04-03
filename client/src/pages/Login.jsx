import React from "react";
import fl1 from "../assets/fl1.jpeg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../shared/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../lib/axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      setUser(res.data.user);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.log("login error", error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex h-screen p-5">
      {/* left side */}
      <section className="w-1/2 rounded-2xl flex flex-col justify-center items-center">
        <div className="w-96">
          <div className="mb-4 space-y-4">
            <h1 className="text-4xl ">Welcome Back 👋</h1>
            <p className="text-sm my-6 text-gray-800">
              Today is a new day. It's your day. You shape it. Sign in to start
              managing your projects
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email">Email</label> <br />
              <input
                className="py-2 px-4 rounded-md border-gray-200 bg-blue-50 w-full"
                type="email"
                name="email"
                id="email"
                placeholder="Example@gmail.com"
                {...register("email")}
              />{" "}
              {errors.email && (
                <p className="text-red-500 text-sm ">*{errors.email.message}</p>
              )}
              <br />
              <br />
              <label htmlFor="password">Password</label> <br />
              <input
                className="py-2 px-4 rounded-md border-gray-200 bg-blue-50 w-full"
                type="password"
                name="password"
                id="password"
                placeholder="At least 6 characters"
                {...register("password")}
              />{" "}
              {errors.password && (
                <p className="text-red-500 text-sm">
                  *{errors.password.message}
                </p>
              )}
              <br />
              <p className="text-violet-600 float-end my-4 cursor-pointer">
                Forget Password ?
              </p>{" "}
              <br />
              <button
                className="bg-black text-white px-4 py-2 rounded-lg w-full cursor-pointer hover:bg-gray-800 transition-all duration-300"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
          <div className="my-4">
            <span className="flex items-center justify-center">
              <hr className="w-full text-gray-400" />
              <p className="mx-2 text-gray-400">Or</p>
              <hr className="w-full text-gray-400" />
            </span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col gap-4 w-full">
              <button className="py-2 cursor-pointer px-4 w-full border-gray-200 bg-blue-50 flex items-center rounded-lg gap-4 justify-center">
                <FcGoogle size={24} />
                Log in with Google
              </button>

              <button className="py-2  cursor-pointer px-4 w-full border-gray-200 bg-blue-50 flex items-center rounded-lg gap-4 justify-center">
                <FaFacebook size={24} />
                Log in with Facebook
              </button>
            </div>
            <p>
              Don't you have an account ?{" "}
              <Link className="text-violet-600 cursor-pointer" to="/register">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
      {/* Right side */}
      <section className=" w-1/3 rounded-2xl overflow-hidden">
        <img
          src={fl1}
          alt="login"
          className="w-full h-full object-cover object-top"
        />
      </section>
    </div>
  );
};

export default Login;
