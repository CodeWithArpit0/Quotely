import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import { AtSign } from "lucide-react";

// * Components
import InputField from "../../components/UI/InputFields/TextInputField/InputField";
import Loader from "../../components/UI/Loader/Loader";

// * APIs and API Handler
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/services/auth";

//  * Utilities
import { validateEmail, validatePassword } from "../../utils/validators";
import { setItem } from "../../utils/localStorage";

// * Contexts
import { useAuth } from "../../context/authContext";

export default function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/notes");
    }
  }, [isLoggedIn, navigate]);

  const initialState = {
    email: "",
    password: "",
  };
  const [state, setState] = useState(initialState);
  const { email, password } = state;

  const initialErrorState = {
    error: false,
    type: "",
    message: "",
  };
  const [error, setError] = useState(initialErrorState);

  const loginUserAPI = useMutation({
    mutationFn: (payload) => login(payload),
    onSuccess: (data) => handleLoginSuccess(data),
    onError: (error) => handleLoginError(error),
  });
  const handleLoginSuccess = (data) => {
    toast.success(data.message);

    setIsLoggedIn(true);
    setItem("isLoggedIn", true);
    const user = {
      username: data.username,
      email: data.email,
    };
    setItem("user", user);
  };
  const handleLoginError = (error) => {
    console.log("ERROR : ", error);
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong, please try again.");
    }
  };
  const loginUser = () => loginUserAPI.mutate(state);

  const handleSubmit = (event) => {
    event.preventDefault();

    let hasError = false;
    for (const fieldName in state) {
      hasError = validateFields(fieldName, state[fieldName]);
      if (hasError) {
        setError(() => ({
          error: true,
          type: fieldName,
          message: hasError,
        }));

        break;
      }
    }

    if (!hasError) loginUser();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));

    const hasError = validateFields(name, value);
    if (hasError) {
      setError(() => ({
        error: true,
        type: name,
        message: hasError,
      }));
    } else if (!hasError && error.error) {
      setError(initialErrorState);
    }
  };

  const validateFields = (name, value) => {
    let isValid = false;

    switch (name) {
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
    }

    return isValid;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="block text-primary">
            <span className="sr-only">Home</span>
            <svg
              className="h-8 sm:h-10"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <InputField
                label="Email"
                id="email"
                type="email"
                name="email"
                placeholder="arpit@quotely.com"
                tabIndex={1}
                value={email}
                icon={<AtSign size={18} />}
                handler={handleChange}
                errorType="email"
                error={error}
              />
            </div>

            <div>
              <InputField
                label="Password"
                id="password"
                type="password"
                name="password"
                tabIndex={2}
                value={password}
                handler={handleChange}
                errorType="password"
                error={error}
              />
            </div>

            <div className="space-y-4">
              <button
                tabIndex={3}
                type="submit"
                disabled={error.error || loginUserAPI.isPending}
                className="w-full flex justify-center rounded-md border border-primary bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-blue-500"
              >
                {loginUserAPI.isPending ? (
                  <Loader theme="light" size="small" />
                ) : (
                  "Login"
                )}
              </button>
              <p className="text-center text-sm text-gray-500 sm:mt-0">
                Don't have an account?{" "}
                <Link
                  tabIndex={4}
                  to="/register"
                  className="text-primary underline"
                >
                  Register
                </Link>
              </p>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm leading-5">
                <Link
                  tabIndex={5}
                  to="/forgotPassword"
                  className="font-medium text-primary hover:text-primary focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
