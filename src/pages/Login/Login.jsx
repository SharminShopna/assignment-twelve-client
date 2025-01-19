import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import logInLottie from "../../assets/lottie/login.json";
import useAuth from "../../hooks/useAuth";
// import { auth } from "../../firebase/firebase.config";
import Lottie from "react-lottie";
import auth from "../../firebase/firebase.config";
import axios from "axios";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { userLogin, setUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            // Login with Firebase (email and password)
            const result = await userLogin(email, password);
            const user = result.user;
            setUser(user);

            // Send credentials to the backend to get JWT token
            const response = await axios.post("http://localhost:5000/jwt", { email, password });
            const { token } = response.data;

            // Store JWT token in localStorage
            localStorage.setItem("token", token);

            Swal.fire({
                title: "Good job!",
                text: "Login successfully",
                icon: "success",
                didClose: () => {
                    navigate(location?.state ? location.state : "/");
                }
            });
        } catch (error) {
            console.error("Login failed", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    const provider = new GoogleAuthProvider();
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
            const response = await axios.post("http://localhost:5000/jwt", { email: user.email });

            // Get JWT token and store it in localStorage
            const { token } = response.data;
            localStorage.setItem("token", token);

            Swal.fire({
                title: "Logged in successfully!",
                text: `Welcome ${user.displayName || "User"}!`,
                icon: "success",
                didClose: () => navigate("/"),
            });
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.message,
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>House Box | Login</title>
                <meta name="description" content="Login page for TutorBooking" />
            </Helmet>

            <div className="min-h-screen flex justify-center items-center bg-lime-50 my-24" data-aos="zoom-in">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left w-96 lg:w-full ml-20">
                        <Lottie options={{ animationData: logInLottie }} />
                    </div>
                    <div className="card max-w-2xl w-full rounded-none p-10 shadow-lg bg-white">
                        <h2 className="text-2xl text-center font-semibold">Login Your Account</h2>
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-900">Email</span>
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text text-gray-900">Password</span>
                                </label>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="input input-bordered"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="btn btn-xs absolute right-2 top-12"
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            <div className="form-control mt-6 space-y-2">
                                <button
                                    type="submit"
                                    className="btn bg-lime-600 text-white"
                                >
                                    Login
                                </button>
                                <div className="divider">OR</div>
                                <button
                                    type="button"
                                    onClick={handleGoogleSignIn}
                                    className="btn hover:bg-lime-600 hover:text-white flex items-center"
                                >
                                    <FcGoogle size={20} className="mr-2" />
                                    Login with Google
                                </button>
                            </div>
                        </form>

                        <p className="text-center font-semibold">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-red-600">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
