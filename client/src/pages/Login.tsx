import { useState } from "react";

const API = import.meta.env.VITE_API_URL as string;

export default function Login() {
  const [loading] = useState(false);

  const goGoogle = () => {
    window.location.href = `${API}/auth/google`;
  };

  return (
    <div className="min-h-screen relative">
      {/* <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/bg-login.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-white-0 backdrop-blur" />
      </div> */}
      <div className="absolute inset-0 bg-[url('/bg-login.png')] bg-cover bg-center opacity-10" />

      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-2xl border border-gray-200 shadow-xl bg-white">
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <img
                src="/logo-lenart-text-black.png"
                alt="SEOTracker"
                className="h-8"
              />
            </div>

            <h1 className="text-xl font-semibold">
              Sign in with your Google Search Console
            </h1>
            <p className="text-gray-500 mt-1">
              to access your sites&apos; performance data.
            </p>

            <ul className="text-left text-sm text-gray-600 space-y-2 mt-6 mx-auto max-w-md">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✔</span>
                We do not store any of your site data.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✔</span>
                You can revoke access at any time.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✔</span>
                You can connect multiple GSC accounts.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✔</span>
                Free to signup, no credit card needed.
              </li>
            </ul>

            <button
              onClick={goGoogle}
              disabled={loading}
              className="mt-8 inline-flex items-center justify-center gap-2 px-5 h-11 rounded-lg bg-[#1a73e8] text-white font-medium hover:bg-[#1766c6] disabled:opacity-60"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                className="h-6 w-6 p-1 bg-white rounded-4xl"
                alt="Google"
              />
              {loading ? "Signing in..." : "Sign in with Google Search Console"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
