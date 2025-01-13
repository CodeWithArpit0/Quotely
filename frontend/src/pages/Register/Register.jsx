import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// * Components
import InputField from "../../components/UI/InputFields/TextInputField/InputField";

// * Icons
import { AtSign } from "lucide-react";

//  * Utilities
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validators";

// * APIs and API Handler
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/services/auth";
import { useAuth } from "../../context/authContext";

export default function Register() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/notes");
    }
  }, [isLoggedIn, navigate]);

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [state, setState] = useState(initialState);
  const { firstName, lastName, email, password, confirmPassword } = state;

  const initialErrorState = {
    error: false,
    type: "",
    message: "",
  };
  const [error, setError] = useState(initialErrorState);

  const registerUserAPI = useMutation({
    mutationFn: (payload) => register(payload),
    onSuccess: () => navigate("/login"),
    onError: (error) => handleRegisterError(error),
  });
  const handleRegisterError = (error) => {
    console.log("ERROR : ", error);
  };
  const registerUser = () => {
    console.log("Registering User");
    registerUserAPI.mutate(state);
  };

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

    if (!hasError) registerUser();
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
      case "firstName":
        isValid = validateName(value, "First name");
        break;
      case "lastName":
        isValid = validateName(value, "Last name");
        break;
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      case "confirmPassword":
        isValid = validateConfirmPassword(value, password);
        break;
    }

    return isValid;
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <Link to="/" className="block text-primary" href="#">
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

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Quotely 🦑
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Your thoughts matter. With Quotely, capture fleeting ideas, record
              meaningful quotes, and stay inspired, wherever you are.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-5"
            >
              <div className="col-span-6 sm:col-span-3">
                <InputField
                  label="First Name"
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  handler={handleChange}
                  tabIndex={1}
                  errorType="firstName"
                  error={error}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputField
                  label="Last Name"
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder=""
                  value={lastName}
                  handler={handleChange}
                  tabIndex={2}
                  errorType="lastName"
                  error={error}
                />
              </div>
              <div className="col-span-6">
                <InputField
                  label="Email"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="arpit@quotely.com"
                  icon={<AtSign size={18} />}
                  value={email}
                  handler={handleChange}
                  tabIndex={3}
                  errorType="email"
                  error={error}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputField
                  label="Password"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  handler={handleChange}
                  tabIndex={4}
                  errorType="password"
                  error={error}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputField
                  label="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="text"
                  value={confirmPassword}
                  handler={handleChange}
                  tabIndex={5}
                  errorType="confirmPassword"
                  error={error}
                />
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our
                  <a href="#" className="text-gray-700 underline">
                    {" "}
                    terms and conditions{" "}
                  </a>
                  and
                  <a href="#" className="text-gray-700 underline">
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  className="inline-block w-full sm:w-auto shrink-0 rounded-md border border-primary bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-primary"
                  type="submit"
                  disabled={error.error}
                  tabIndex={6}
                >
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary underline">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
