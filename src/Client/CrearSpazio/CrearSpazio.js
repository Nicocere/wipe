"use client";
import Image from 'next/image';
import { useState } from 'react';
import styles from './creaMiSpazioPage.module.css';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { RingLoader } from 'react-spinners';
import { motion, AnimatePresence } from 'framer-motion';
import H1Text from '@/utils/H1Texts/H1Text';




export default function CreaMiSpacioComponent() {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useRouter();
    const [formData, setFormData] = useState({
        brandName: '',
        email: '',
        password: '',
        plan: 'gratis',
        tipoSpazio: ''
    });

    const isMobileScreen = useMediaQuery('(max-width: 768px)');
    const [step, setStep] = useState(1);
    const [selectedId, setSelectedId] = useState(null);

    const cleanInput = (input) => {
        return input
            .normalize('NFD') // Normaliza el texto
            .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
            .replace(/[^a-zA-Z0-9]/g, '') // Elimina caracteres especiales
            .toLowerCase(); // Convierte a minúsculas
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Limpiar el valor de brandName antes de enviarlo
        const cleanedFormData = {
            ...formData,
            brandName: cleanInput(formData.brandName),
            original_name: formData.brandName
        };

        fetch('/api/crear-spazio', {
            method: 'POST',
            body: JSON.stringify(cleanedFormData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la creación del Spazio');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setIsLoading(false);

                navigate.push('/bienvenidos');
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handleSelect = (tipoSpazio) => {
        setFormData({ ...formData, tipoSpazio });
        setSelectedId(null);
    };

    const step1Content = (
        <motion.div
            className={styles.stepContainer}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <H1Text className={styles.heading}>Selecciona el tipo de página para tu marca</H1Text>
            <p className={styles.paragraph}>Elige entre un "Spazio Ecommerce" o un "Spazio Personal".</p>
            <div className={styles.optionsContainer}>
                            <motion.div
                    className={`${styles.option} ${styles.comingSoon} ${formData.tipoSpazio === 'ecommerce' ? styles.selected : ''}`}
                    // onClick={() => setSelectedId('ecommerce')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className={styles.optionContent}>
                        <h2>Spazio Ecommerce</h2>
                        <p className={styles.explanation}>
                            Un Ecommerce te permite vender productos en línea, gestionar inventarios, y procesar pagos. 
                            Ideal para negocios que desean expandir sus ventas a través de internet.
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    className={`${styles.option} ${formData.tipoSpazio === 'personal' ? styles.selected : ''}`}
                    onClick={() => setSelectedId('personal')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <h2>Spazio Personal</h2>
                    <p className={styles.explanation}>Un Spazio Personal es perfecto para compartir contenido, noticias, y artículos. Ideal para marcas que desean establecer una presencia en línea y conectar con su audiencia.</p>
                </motion.div>
            </div>
            <button onClick={handleNextStep} className={styles.button} disabled={!formData.tipoSpazio}>Siguiente</button>
        </motion.div>
    );

    const formContent = (
        <motion.div
            className={styles.CrearMiSpazio_Container}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.h1
                className={styles.heading}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                ¡Crea tu <span> SPAZIO. !</span>
            </motion.h1>
            <motion.p
                className={styles.paragraph}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                Comenzá ahora a crear tu Wipe. Digital
            </motion.p>
            <motion.form
                onSubmit={handleSubmit}
                className={styles.form}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <div className={styles.formGroup}>
                    <label htmlFor="brandName" className={styles.label}>Nombre de tu marca (Lo podés modificar más tarde)</label>
                    <input
                        placeholder='Ejemplo: Marca SPAZIO.'
                        type="text"
                        id="brandName"
                        name="brandName"
                        value={formData.brandName}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>E-mail</label>
                    <input
                        placeholder='nombre@ejemplo.com'
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Contraseña</label>
                    <input
                        placeholder='Crea tu contraseña'
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                {isLoading ? (
                    <button type="submit" className={styles.button} disabled>
                        Creando mi Spazio... <RingLoader size={20} color='#c6bbb9' cssOverride={{ margin: '0 30px' }} />
                    </button>
                ) : (
                    <button type="submit" className={styles.button}>Crear mi Spazio</button>
                )}
            </motion.form>
        </motion.div>
    );

    return (
        <>
            {isMobileScreen ? (
                <div className={styles.container}>
                    <video src='/videos/earth.mp4' muted loop autoPlay
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100vh",
                            zIndex: -1,
                            objectFit: "cover",
                        }}
                    />
                    <Image src="/spazio-logo2.png" alt="Logo" width={180} height={30} style={{ objectFit: 'contain', flex: 1 }} />
                    {step === 1 ? step1Content : formContent}
                </div>
            ) : (
                <div className={styles.desktopContainer}>
                    <div className={styles.imageContainer}>
                        <video src='/videos/earth.mp4' muted loop autoPlay
                            style={{
                                width: "100%",
                                height: "100vh",
                                objectFit: "cover",
                            }}
                        />
                        {/* <Image src="/assets/generate-images/pareja_notebook2.jpg" alt="Imagen" width={500} height={500} /> */}
                    </div>
                    <div className={styles.formContainer}>
                        <Image src="/spazio-logo2.png" alt="Logo" width={180} height={30} style={{ objectFit: 'contain', flex: 1 }} />
                        {step === 1 ? step1Content : formContent}
                    </div>
                </div>
            )}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                    className={styles.modalOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      layoutId={selectedId}
                      className={styles.optionDetails}
                      initial={{ scale: 0.8, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.8, opacity: 0, y: 20 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 30 
                      }}
                    >
                        <motion.h2>{selectedId === 'ecommerce' ? 'Spazio Ecommerce' : 'Spazio Personal'}</motion.h2>
                        <motion.p>{selectedId === 'ecommerce' ? 'Un Ecommerce te permite vender productos en línea, gestionar inventarios, y procesar pagos. Ideal para negocios que desean expandir sus ventas a través de internet.' : 'Un Spazio Personal es perfecto para compartir contenido, noticias, y artículos. Ideal para marcas que desean establecer una presencia en línea y conectar con su audiencia.'}</motion.p>
                        <motion.ul className={styles.list}>
                            {selectedId === 'ecommerce' ? (
                                <>
                                    <li>Gestión de inventarios</li>
                                    <li>Procesamiento de pagos</li>
                                    <li>Integración con plataformas de envío</li>
                                    <li>Soporte para múltiples métodos de pago</li>
                                    <li>Seguimiento de pedidos en tiempo real</li>
                                    <li>Personalización de la tienda</li>
                                    <li>Informes y análisis de ventas</li>
                                </>
                            ) : (
                                <>
                                    <li>Publicación de artículos</li>
                                    <li>Gestión de contenido</li>
                                    <li>Integración con redes sociales</li>
                                    <li>Optimización SEO</li>
                                    <li>Diseño responsivo</li>
                                    <li>Soporte técnico</li>
                                    <li>Analíticas y reportes</li>
                                </>
                            )}
                        </motion.ul>
                        <motion.div className={styles.buttonContainer}>
                            <motion.button onClick={() => handleSelect(selectedId)} className={styles.button}>Seleccionar</motion.button>
                            <motion.button onClick={() => setSelectedId(null)} className={styles.button}>Cerrar</motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}