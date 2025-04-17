"use client";
import { useState, useEffect, type ChangeEvent, type SetStateAction } from "react";
import { supabase } from "@/config/supabaseClient";
import styles from "./registro.module.css";
import { FiAlertCircle, FiCheckCircle, FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [barName, setBarName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isBarNameAvailable, setIsBarNameAvailable] = useState(true);
  const [isCheckingBarName, setIsCheckingBarName] = useState(false);
  const [formErrors, setFormErrors] = useState({
    barName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Validar disponibilidad del nombre del negocio con debounce
  useEffect(() => {
    if (!barName || barName.length < 3) return;

    const checkBarNameAvailability = async () => {
      setIsCheckingBarName(true);
      
      try {
        // Verificar si el nombre ya existe en la base de datos
        const { data, error } = await supabase
          .from("empresas")
          .select("id")
          .eq("nombre", barName.trim())
          .single();
        
        if (error && error.code === "PGRST116") {
          // El error PGRST116 significa que no encontró resultados, lo que es bueno
          setIsBarNameAvailable(true);
          setFormErrors(prev => ({ ...prev, barName: "" }));
        } else if (data) {
          setIsBarNameAvailable(false);
          setFormErrors(prev => ({ ...prev, barName: "Este nombre de negocio ya está registrado" }));
        }
      } catch (error) {
        console.error("Error al verificar el nombre:", error);
      } finally {
        setIsCheckingBarName(false);
      }
    };

    // Implementar debounce para evitar demasiadas consultas mientras el usuario escribe
    const timeoutId = setTimeout(checkBarNameAvailability, 600);
    return () => clearTimeout(timeoutId);
  }, [barName]);

  // Validar campos en tiempo real
  const validateField = (field: any, value: string) => {
    let errors = { ...formErrors };

    switch (field) {
      case "barName":
        if (!value.trim()) {
          errors.barName = "El nombre del negocio es obligatorio";
        } else if (value.length < 3) {
          errors.barName = "El nombre debe tener al menos 3 caracteres";
        } else {
          errors.barName = "";
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          errors.email = "El correo electrónico es obligatorio";
        } else if (!emailRegex.test(value)) {
          errors.email = "Ingresa un correo electrónico válido";
        } else {
          errors.email = "";
        }
        break;
      case "password":
        if (!value) {
          errors.password = "La contraseña es obligatoria";
        } else if (value.length < 6) {
          errors.password = "La contraseña debe tener al menos 6 caracteres";
        } else {
          errors.password = "";
        }
        
        // También validar confirmPassword si ya tiene valor
        if (confirmPassword && confirmPassword !== value) {
          errors.confirmPassword = "Las contraseñas no coinciden";
        } else if (confirmPassword) {
          errors.confirmPassword = "";
        }
        break;
      case "confirmPassword":
        if (!value) {
          errors.confirmPassword = "Confirma tu contraseña";
        } else if (value !== password) {
          errors.confirmPassword = "Las contraseñas no coinciden";
        } else {
          errors.confirmPassword = "";
        }
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: { (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (arg0: any): void; }) => {
    const { name, value } = e.target;
    setter(value);
    validateField(name, value);
  };

  const isFormValid = () => {
    // Verificar si hay errores en el formulario
    return (
      barName.trim() !== "" && 
      email.trim() !== "" && 
      password.trim() !== "" && 
      confirmPassword.trim() !== "" &&
      password === confirmPassword &&
      isBarNameAvailable &&
      !formErrors.barName &&
      !formErrors.email &&
      !formErrors.password &&
      !formErrors.confirmPassword
    );
  };

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    
    if (!isFormValid()) {
      setErrorMessage("Por favor corrige los errores en el formulario");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Verificar nuevamente si el nombre del negocio está disponible
      const { data: existingBusiness } = await supabase
        .from("empresas")
        .select("id")
        .eq("nombre", barName.trim());

      if (existingBusiness && existingBusiness.length > 0) {
        setErrorMessage("Este nombre de negocio ya está registrado. Por favor, elige otro nombre.");
        setIsBarNameAvailable(false);
        setFormErrors(prev => ({...prev, barName: "Este nombre de negocio ya está registrado"}));
        setLoading(false);
        return;
      }
      
      // 2️⃣ Registrar usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            business_name: barName.trim(),
          }
        }
      });

      if (authError) {
        throw new Error(authError.message);
      }

      const user = authData.user;
      if (!user) {
        throw new Error("No se pudo obtener el usuario después del registro.");
      }

      // 3️⃣ Crear una empresa en la tabla `empresas`
      const { data: empresaData, error: empresaError } = await supabase
        .from("empresas")
        .insert([{ 
          nombre: barName.trim(),
          propietario_id: user.id,
          creado_en: new Date().toISOString(),
          page_name: barName.trim().toLowerCase().replace(/\s+/g, '-'),

          // created_by: user.id
        }])
        .select()
        .single();

      if (empresaError) {
        throw new Error(empresaError.message);
      }

      const tenantId = empresaData.id;

      // 4️⃣ Crear perfil en la tabla `profiles`
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          user_id: user.id,
          role: "admin",
          tenant_id: tenantId,
          email: email,
          display_name: barName.trim(),
          created_at: new Date().toISOString()
        },
      ]);

      if (profileError) {
        throw new Error(profileError.message);
      }

      setSuccessMessage("¡Registro exitoso! Verifica tu correo para confirmar la cuenta.");
      
      // Resetear el formulario
      setBarName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      
    } catch (error) {
      console.error("Error durante el registro:", error);
      setErrorMessage(
       error instanceof Error ? error.message : "Ocurrió un error durante el registro. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className={styles.registerContainer}>

            <div className={styles.heroSection}>
              <motion.div 
                className={styles.heroContent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1 
                  className={styles.mainTitle}
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Soluciones digitales para mejorar la experiencia de tus clientes
                </motion.h1>
                
                <motion.p 
                  className={styles.mainDescription}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Impulsa el crecimiento comercial con herramientas digitales personalizadas que 
                  cautivan a tus clientes, perfeccionan tu operación y maximizan tus resultados. 
                  Aprovecha cada punto de contacto como una vía hacia el éxito.
                </motion.p>
      
                <motion.div 
                  className={styles.scrollIndicator}
                  animate={{ 
                    y: [0, 10, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5, 
                    ease: "easeInOut"
                  }}
                >
                  <span>Descubre cómo</span>
                  <span className={styles.arrow}>↓</span>
                </motion.div>
              </motion.div>
      
              <div className={styles.heroBackground}>
                <div className={styles.overlay}></div>
                <div className={styles.gradientShape}></div>
              </div>
            </div>
      <div className={styles.formWrapper}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Crea tu cuenta en Wipe</h2>
            <p className={styles.formSubtitle}>Comienza a agilizar la dinámica comercial de tu negocio</p>
          </div>
          
          <form onSubmit={handleRegister} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="barName" className={styles.label}>
                Nombre del Negocio
                {isCheckingBarName && (
                  <span className={styles.checkingIndicator}>
                    <FiLoader className={styles.spinnerIcon} />
                    Verificando...
                  </span>
                )}
              </label>
              <input
                type="text"
                id="barName"
                name="barName"
                placeholder="Ej: Bar Rodríguez"
                value={barName}
                onChange={(e) => handleInputChange(e, setBarName)}
                className={`${styles.input} ${formErrors.barName ? styles.inputError : ''} ${isBarNameAvailable && barName.length > 2 && !isCheckingBarName ? styles.inputSuccess : ''}`}
                required
                minLength={3}
              />
              {formErrors.barName && (
                <p className={styles.fieldError}>
                  <FiAlertCircle className={styles.errorIcon} />
                  {formErrors.barName}
                </p>
              )}
              {isBarNameAvailable && barName.length > 2 && !isCheckingBarName && !formErrors.barName && (
                <p className={styles.fieldSuccess}>
                  <FiCheckCircle className={styles.successIcon} />
                  Nombre disponible
                </p>
              )}
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
                className={`${styles.input} ${formErrors.email ? styles.inputError : ''}`}
                required
              />
              {formErrors.email && (
                <p className={styles.fieldError}>
                  <FiAlertCircle className={styles.errorIcon} />
                  {formErrors.email}
                </p>
              )}
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
                className={`${styles.input} ${formErrors.password ? styles.inputError : ''}`}
                required
                minLength={6}
              />
              {formErrors.password && (
                <p className={styles.fieldError}>
                  <FiAlertCircle className={styles.errorIcon} />
                  {formErrors.password}
                </p>
              )}
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => handleInputChange(e, setConfirmPassword)}
                className={`${styles.input} ${formErrors.confirmPassword ? styles.inputError : ''}`}
                required
              />
              {formErrors.confirmPassword && (
                <p className={styles.fieldError}>
                  <FiAlertCircle className={styles.errorIcon} />
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
            
            {errorMessage && (
              <div className={styles.errorMessage}>
                <FiAlertCircle className={styles.errorIcon} />
                {errorMessage}
              </div>
            )}
            
            {successMessage && (
              <div className={styles.successMessage}>
                <FiCheckCircle className={styles.successIcon} />
                {successMessage}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className={styles.submitButton}
            >
              {loading ? (
                <span className={styles.loadingSpinner}></span>
              ) : (
                "Crear cuenta"
              )}
            </button>
            
            <p className={styles.terms}>
              Al registrarte, aceptas nuestros <a href="/terminos" className={styles.link}>Términos de Servicio</a> y <a href="/privacidad" className={styles.link}>Política de Privacidad</a>
            </p>
          </form>
          
          <div className={styles.loginLink}>
            ¿Ya tienes una cuenta? <a href="/login" className={styles.link}>Iniciar sesión</a>
          </div>
        </div>
        
        <div className={styles.featuresCard}>
          <h3 className={styles.featuresTitle}>Con Wipe puedes:</h3>
          <ul className={styles.features}>
            <li className={styles.featureItem}>
              <div className={styles.featureIcon}>🔄</div>
              <div className={styles.featureText}>
                <h4>Cartas virtuales con QR</h4>
                <p>Crea menús digitales accesibles desde dispositivos móviles</p>
              </div>
            </li>
            <li className={styles.featureItem}>
              <div className={styles.featureIcon}>⚡</div>
              <div className={styles.featureText}>
                <h4>Gestión en tiempo real</h4>
                <p>Administra pedidos de forma eficiente y sin errores</p>
              </div>
            </li>
            <li className={styles.featureItem}>
              <div className={styles.featureIcon}>📊</div>
              <div className={styles.featureText}>
                <h4>Analítica de negocio</h4>
                <p>Visualiza métricas para tomar mejores decisiones</p>
              </div>
            </li>
            <li className={styles.featureItem}>
              <div className={styles.featureIcon}>🌟</div>
              <div className={styles.featureText}>
                <h4>Experiencia mejorada</h4>
                <p>Optimiza la atención y satisfacción de tus clientes</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}