import React, { useState } from "react";
import { Field, UploadImage, Loader } from "../components";
import { signin, signup } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Connect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [error, seterror] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    image: null,
  });
  const { errors } = useSelector((state) => state.auth);
  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Constants for error messages
  const errorMessages = {
    EMPTY_FIELDS: "Please fill in all fields",
    EMPTY_FIELDS_WITH_IMAGE: "Please fill in all fields or choose an image",
    PASSWORD_TOO_SHORT: "Password must be at least 6 characters long",
  };

  // Function to handle form validation
  const handleErrors = () => {
    // Check if any of the required fields are empty
    if (isSignIn) {
      if (!formData.email || !formData.password) {
        // Set error message if any field is empty
        seterror(errorMessages.EMPTY_FIELDS);
        return true;
      }
    } else {
      if (
        !formData.email ||
        !formData.password ||
        !formData.username ||
        !formData.image
      ) {
        // Set error message if any field is empty
        seterror(errorMessages.EMPTY_FIELDS_WITH_IMAGE);
        return true;
      }
      // Check if the password length is less than 6 characters
      if (formData.password.length < 6) {
        // Set error message if password is too short
        seterror(errorMessages.PASSWORD_TOO_SHORT);
        return true;
      }
    }

    // Return true if all validations pass
    seterror("");
    return false;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    // Validate form data
    if (handleErrors()) {
      setisLoading(false);
    } else {
      if (isSignIn) {
        dispatch(signin(formData, navigate));
      } else {
        dispatch(signup(formData, navigate));
      }
      seterror(errors);
      setisLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-2 ">
      <div className="w-full max-w-md bg-gray-900 shadow-lg rounded-lg p-8">
        <div className="text-2xl font-bold mb-2 text-white text-center">
          Welcome {isSignIn && "back"} to
          <span className="bg-gradient-to-r from-[#3886fe] via-orange-300 to-[#fb6307] inline-block text-transparent bg-clip-text ml-1 uppercase">
            mernify
          </span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-white">
          {isSignIn ? "Log in to your account" : "Create an account"}
        </div>
        <form>
          {!isSignIn && (
            <UploadImage setFormData={setFormData} formData={formData} />
          )}
          {!isSignIn && (
            <Field
              type="text"
              label="username"
              handleChange={handleOnChange}
              formData={formData}
            />
          )}

          <Field
            type="email"
            label="email"
            handleChange={handleOnChange}
            formData={formData}
          />
          <Field
            type="password"
            label="password"
            handleChange={handleOnChange}
            formData={formData}
          />
          {/* {errors && <p className="text-red-600 py-2 ">{errors}</p>} */}
          {error !== "" && <p className="text-red-600 py-2 ">{error}</p>}
          <div className="flex  items-center justify-between">
            {isLoading ? (
              <Loader />
            ) : (
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-[#7747ff]  w-fit px-6  py-2 rounded text-white text-sm font-normal"
              >
                {isSignIn ? "Sign In" : "Sign Up"}
              </button>
            )}
            <button
              type="button"
              onClick={toggleForm}
              className="inline-block align-baseline font-medium text-sm text-gray-400"
            >
              {isSignIn ? (
                <p>
                  Need an account?
                  <span className="text-[#7747ff] ml-1">Sign Up</span>
                </p>
              ) : (
                <p>
                  {" "}
                  Have an account?
                  <span className="text-[#7747ff] ml-1">Sign In</span>
                </p>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Connect;
