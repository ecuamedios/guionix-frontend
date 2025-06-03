"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function SimpleLoginForm() {
  const [email, setEmail] = useState("test@guionix.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("🚀 Form submitted");
    console.log("📧 Email:", email);
    console.log("🔑 Password:", password);
    
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log("🔐 Calling signIn...");
      console.log("📧 Email to send:", email);
      console.log("🔑 Password to send:", password);
      
      // Test the credentials manually first
      console.log("🧪 Testing credentials format...");
      
      const result = await signIn("credentials", {
        email: email.trim(),
        password: password,
        redirect: false,
      });
      
      console.log("📋 SignIn result:", result);
      
      if (result?.error) {
        console.error("❌ SignIn error:", result.error);
        setError("Credenciales incorrectas");
      } else if (result?.ok) {
        console.log("✅ Login successful!");
        window.location.href = "/projects";
      } else {
        console.log("⚠️ Unexpected result:", result);
        setError("Error inesperado");
      }
    } catch (error) {
      console.error("💥 Catch error:", error);
      setError("Error al conectar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-2xl p-8 space-y-6 border border-gray-800">
      <h2 className="text-2xl font-bold text-white text-center">Simple Login Test</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-1">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="bg-gray-800 text-white border-gray-700"
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-1">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="bg-gray-800 text-white border-gray-700"
          />
        </div>
        
        {error && (
          <div className="bg-red-900 text-red-300 rounded p-2 text-center text-sm">
            {error}
          </div>
        )}
        
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
      
      <div className="text-center text-gray-400 text-sm">
        <p>Test credentials:</p>
        <p>Email: test@guionix.com</p>
        <p>Password: password123</p>
      </div>
    </div>
  );
}
