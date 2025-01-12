import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div class="bg-primary px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <Link
        to="/"
        className="inline-block shrink-0 rounded-md border border-primary px-12 py-3 mt-6 text-sm font-medium text-primary"
      >
        Go Home
      </Link>
    </main>
  );
}
