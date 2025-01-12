import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import ProfileMenu from "../../components/Layout/Header/ProfileMenu/ProfileMenu";

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <header className="mb-4 flex items-center justify-between py-4 md:py-8">
            <Link to="/" className="block text-primary">
              <div className="flex items-center gap-x-2">
                <span className="sr-only">Home</span>
                <svg
                  className="h-8"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                    fill="currentColor"
                  />
                </svg>

                <h1 className="text-gray-900 font-semibold md:text-2xl">
                  Quotely
                </h1>
              </div>
            </Link>

            <nav className="hidden gap-12 lg:flex">
              <a href="#" className="text-lg font-semibold text-primary">
                Home
              </a>
              <a
                href="#"
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary active:text-indigo-700"
              >
                Features
              </a>
              <a
                href="#"
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary active:text-indigo-700"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary active:text-indigo-700"
              >
                About
              </a>
            </nav>

            <div className="space-x-3">
              {isLoggedIn ? (
                <ProfileMenu />
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-block rounded-lg bg-primary px-8 py-3 text-center text-sm font-semibold text-white outline-none border border-white ring-indigo-300 transition duration-100 hover:bg-primaryDark focus-visible:ring active:bg-indigo-700 md:text-base"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="inline-block rounded-lg bg-tranparent px-8 py-3 text-center text-sm font-semibold text-primary outline-none border-2 border-primary ring-indigo-300 transition duration-100 hover:border-transparent focus-visible:ring active:bg-indigo-700 md:text-base"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Menu
            </button>
          </header>

          <section className="min-h-96 relative flex flex-1 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-gray-100 py-16 shadow-lg md:py-20 xl:py-48">
            <img
              src="https://images.unsplash.com/photo-1618004652321-13a63e576b80?auto=format&q=75&fit=crop&w=1500"
              loading="lazy"
              alt="Photo by Fakurian Design"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-primary mix-blend-multiply"></div>

            <div className="relative flex flex-col items-center p-4 sm:max-w-2xl">
              <p class="mb-4 text-center text-lg text-indigo-200 sm:text-xl md:mb-8">
                The smart way to capture, organize, and share your ideas
              </p>
              <h1 className="mb-8 text-center text-4xl font-bold text-white sm:text-5xl md:mb-12 md:text-6xl">
                Your thoughts, beautifully organized
              </h1>

              <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
                {isLoggedIn ? (
                  <Link
                    to="/notes"
                    className="inline-block rounded-lg bg-transparent px-8 py-3 text-center text-sm font-semibold text-white outline-none border-2 border-white ring-indigo-300 transition duration-100 hover:border-transparent focus-visible:ring active:bg-indigo-700 md:text-base"
                  >
                    Go to Notes
                  </Link>
                ) : (
                  <Link
                    to="/register"
                    className="inline-block rounded-lg bg-transparent px-8 py-3 text-center text-sm font-semibold text-white outline-none border-2 border-white ring-indigo-300 transition duration-100 hover:border-transparent focus-visible:ring active:bg-indigo-700 md:text-base"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
