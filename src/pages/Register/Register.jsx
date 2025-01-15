import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../../firebase/firebase.config";
import useAuth from "../../hooks/useAuth";
import Lottie from "react-lottie";
import registerLottie from "../../assets/lottie/register.json";
import auth from "../../firebase/firebase.config";

const Register = () => {
  const PasswordValid = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, setUser, updateUserProfile, isDarkMode } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");

    if (!PasswordValid.test(password)) {
      Swal.fire({
        title: "Error!",
        text: "Password is invalid. It should be at least 6 characters, with at least one uppercase letter.",
        icon: "error",
      });
      return;
    }
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          title: "Good job!",
          text: "Successfully Registered",
          icon: "success",
        });

        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ displayName: name, photoURL: photo });
            navigate("/");
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: `Failed to update profile: ${err.message}`,
              icon: "error",
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      });
  };

  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        Swal.fire({
          title: "Success!",
          text: "Successfully Google SignIn",
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: `Google login failed: ${error.message}`,
          icon: "error",
        });
      });
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: registerLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Helmet>
        <title>House Box | Register</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div
        className={`min-h-screen mt-24 flex justify-center items-center ${
          isDarkMode ? "bg-gray-800" : "bg-lime-50"
        }`}
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left w-96 lg:w-full">
            <Lottie options={lottieOptions} height={400} width={400} />
          </div>
          <div
            className={`card max-w-2xl w-full rounded-none p-10 ${
              isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-2xl text-center font-semibold">
              Register Your Account
            </h2>
            <form onSubmit={handleSubmit} className="card-body w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="name"
                  className={`input input-bordered ${
                    isDarkMode ? "text-white bg-gray-700" : "text-black"
                  }`}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  name="photo"
                  type="text"
                  placeholder="Photo-url"
                  className={`input input-bordered ${
                    isDarkMode ? "text-white bg-gray-700" : "text-black"
                  }`}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className={`input input-bordered ${
                    isDarkMode ? "text-white bg-gray-700" : "text-black"
                  }`}
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className={`input input-bordered ${
                    isDarkMode ? "text-white bg-gray-700" : "text-black"
                  }`}
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
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn bg-lime-700 text-white"
                >
                  Register
                </button>
                <div className="divider">OR</div>
                <Link
                  to="#"
                  onClick={handleGoogleSignIn}
                  className="btn hover:bg-lime-700 hover:text-white"
                >
                  <FcGoogle size={20} /> Login with Google
                </Link>
              </div>
            </form>
            <p className="text-center font-semibold">
              Already Have An Account?{" "}
              <Link to="/logIn" className="text-red-600">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Tooltip id="my-tooltip" />
    </>
  );
};

export default Register;
