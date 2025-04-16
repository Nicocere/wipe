"use client";
import { useState } from "react";
import { supabase } from "@/config/supabaseClient";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error("Error en login:", authError.message);
      setLoading(false);
      return;
    }

    const user = authData.user;

    if (!user) {
      console.error("No se pudo obtener el usuario.");
      setLoading(false);
      return;
    }

    // Obtener el perfil del usuario
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id, user_id, role, tenant_id")
      .eq("user_id", user.id)
      .single();

    if (profileError) {
      console.error("Error al obtener perfil:", profileError.message);
      setLoading(false);
      return;
    }

    console.log("Usuario logueado con éxito:", profileData);

    alert("Inicio de sesión exitoso.");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded"
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className="p-2 bg-green-500 text-white rounded"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </div>
  );
}
