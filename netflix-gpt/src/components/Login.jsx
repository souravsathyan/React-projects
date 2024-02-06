import { useState } from "react";
import { BG_URL } from "../Utils/constants";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BG_URL} alt="background" />
      </div>
      <form className="w-3/12 p-12 bg-black my-36 absolute left-1/2 transform -translate-x-1/2 text-white rounded-lg bg-opacity-80">
        
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign in" : "Sign up"}
        </h1>
        
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full name"
            className="p-4 my-4 bg-gray-700 w-full"
          />
        )}

        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 bg-gray-700 w-full"
        />

        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 bg-gray-700 w-full"
        />

        <button className="p-4 my-6 bg-red-600 w-full rounded-lg">
          {isSignInForm ? "Sign in" : "Sign up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already registered ? Sign In Now."}
        </p>

      </form>
    </div>
  );
};

export default Login;
