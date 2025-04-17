"use client";
import { useState } from "react";
import { supabase } from "@/config/supabaseClient";
import styles from './login.module.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error("Error en login:", authError.message);
      setErrorMsg(authError.message);
      setLoading(false);
      return;
    }

    const user = authData.user;

    if (!user) {
      console.error("No se pudo obtener el usuario.");
      setErrorMsg("No se pudo obtener el usuario.");
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
      setErrorMsg("Error al obtener perfil de usuario.");
      setLoading(false);
      return;
    }

    console.log("Usuario logueado con éxito:", profileData);
    setLoading(false);
    alert("Inicio de sesión exitoso.");
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.inputField}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.inputField}
      />
      {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className={styles.loginButton}
      >
        {loading ? <span className={styles.loadingDots}>Ingresando</span> : "Ingresar"}
      </button>

      <p className={styles.registerPrompt}>
        ¿No tienes una cuenta? <a href="/login/registro" className={styles.registerLink}>Regístrate</a>
      </p>
      {/* <p className={styles.forgotPasswordPrompt}>
        ¿Olvidaste tu contraseña? <a href="/forgot-password" className={styles.forgotPasswordLink}>Recuperar</a>
      </p>
      <p className={styles.termsPrompt}>
        Al iniciar sesión, aceptas nuestros <a href="/terms" className={styles.termsLink}>Términos de Servicio</a> y <a href="/privacy" className={styles.privacyLink}>Política de Privacidad</a>.
      </p>
    <p className={styles.supportPrompt}>
        Si necesitas ayuda, contacta a nuestro <a href="/support" className={styles.supportLink}>Soporte Técnico</a>.
      </p> */}

    </div>
  );
}