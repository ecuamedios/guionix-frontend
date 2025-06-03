// app/dev-login/page.tsx - Development login (server-side)
import { Film } from "lucide-react";

export default function DevLoginPage() {
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

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <Film className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Dev Login</h1>
          <p className="text-gray-400 mt-2">Development authentication bypass</p>
        </div>

        <form action="/api/dev-auth" method="POST" className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue="admin@guionix.com"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="DIRECTOR">Director</option>
              <option value="SUPERVISOR">Supervisor</option>
              <option value="EDITOR">Editor</option>
              <option value="VIEWER">Viewer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
          >
            Login as Dev User
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-amber-400 hover:text-amber-300 text-sm"
          >
            ← Back to normal login
          </a>
        </div>
      </div>
    </div>
  );
}
