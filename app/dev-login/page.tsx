// app/dev-login/page.tsx - Development login (remove in production)
"use client";
import { useState } from "react";
import { Film, User } from "lucide-react";

export default function DevLoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Only show in development
  if (process.env.NODE_ENV === "production") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Not Available</h1>
          <p>This page is only available in development mode.</p>
        </div>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/dev-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setResult(data);

      if (data.success) {
        setTimeout(() => {
          window.location.href = "/dev-dashboard";
        }, 1500);
      }
    } catch (error: any) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Film className="w-12 h-12 text-yellow-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Dev Login</h1>
            <p className="text-gray-400">Development authentication bypass</p>
          </div>

          {/* Quick Access Buttons */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">Quick Login Options:</h3>
            <div className="space-y-2">
              <button
                onClick={() => setEmail("admin@guionix.com")}
                className="w-full text-left px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded border border-gray-600 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Admin User (admin@guionix.com)</span>
              </button>
              <button
                onClick={() => setEmail("editor@guionix.com")}
                className="w-full text-left px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded border border-gray-600 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Editor User (editor@guionix.com)</span>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-yellow-400 focus:outline-none"
                placeholder="Enter user email..."
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 text-black font-bold py-2 px-4 rounded transition-colors"
            >
              {loading ? "Authenticating..." : "Dev Login"}
            </button>
          </form>

          {/* Result Display */}
          {result && (
            <div className={`mt-4 p-4 rounded-lg ${
              result.success 
                ? "bg-green-900/50 border border-green-600 text-green-200" 
                : "bg-red-900/50 border border-red-600 text-red-200"
            }`}>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
              {result.success && (
                <p className="mt-2 text-green-300">
                  ✅ Redirecting to dashboard...
                </p>
              )}
            </div>
          )}

          {/* Warning */}
          <div className="mt-6 p-4 bg-orange-900/50 border border-orange-600 rounded-lg">
            <p className="text-orange-200 text-sm">
              🚧 <strong>Development Only:</strong> This authentication bypass is automatically disabled in production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
