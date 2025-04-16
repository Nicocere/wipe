"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { useRouter } from 'next/navigation';
import styles from './Bienvenidos.module.css';
import { RingLoader } from 'react-spinners';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, baseDeDatos } from '../../config/FireBaseConfig'
import { doc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useAuth } from '@/context/AuthUserContext';


const Bienvenidos = () => {
    const { contenido } = useAuth()
    const [showForm, setShowForm] = useState(false);
    const [showTip, setShowTip] = useState(false); // Estado para mostrar el span
    const [showSocial, setShowSocial] = useState(false); // Estado para mostrar/ocultar redes sociales
    const [formData, setFormData] = useState({
        cuit: '',
        name: '',
        whatsapp: '',
        instagram: '',
        facebook: '',
        contenido: contenido
    });
    const [isLoading, setIsLoading] = useState(false);
    const isMobileScreen = useMediaQuery('(max-width: 768px)');
    const router = useRouter();

    const handleContinueClick = () => {
        setShowForm(true);
    };

    const handleCuitFocus = () => {
        setShowTip(true); // Mostrar el span cuando se selecciona el input de CUIT
    };

    const handleCuitBlur = () => {
        setShowTip(false); // Ocultar el span cuando se deja de seleccionar el input
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Obtener los datos anteriores
            const responseCrear = await fetch('/api/crear-spazio');
            if (!responseCrear.ok) {
                throw new Error('Error al obtener los datos anteriores');
            }
            const dataCrear = await responseCrear.json();

            // Combinar los datos anteriores con los datos del formulario
            const combinedData = {
                ...dataCrear.userData,
                ...formData
            };
            console.log('Datos combinados:', combinedData);
            setIsLoading(true);

            
            const dataUser = {
                ...combinedData,
                // AccessTokenFirebase: user.accessToken,
                // refreshTokenFirebase: user.refreshToken,
                // emailFirebase: user.email,
                // uidFirebase: user.uid
            };

            console.log('Data User:', dataUser);

            // Hacer el POST a /api/finalizar-spazio
            const responseFinalizar = await fetch('/api/finalizar-spazio', {
                method: 'POST',
                body: JSON.stringify(dataUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!responseFinalizar.ok) {
                throw new Error('Error al finalizar el Spazio');
            }

            if(responseFinalizar.ok) {

            const dataFinalizar = await responseFinalizar.json();
            console.log('Finalizado:', dataFinalizar.body);
            
            createUserWithEmailAndPassword(auth, combinedData.email, combinedData.password)

            .then( async(userCredential) => {
                const user = userCredential.user;
                Swal.fire({
                    icon: 'success',
                    title: 'Ya te registraste',
                    text: `Has sido registrado con éxito con el email: ${user.email}`,
                    customClass: {
                        popup: styles.swalPopup,
                        confirmButton: styles.swalConfirmButton,
                        htmlContainer: styles.swalHtmlContainer
                    },
                    iconColor: '#c6bbb9'
                });

                const userDocRef = doc(baseDeDatos, "users", user.uid);
                setDoc(userDocRef, {
                ...combinedData,
                });


            // Crear el archivo package.json
            

            // // Redirigir a la ruta basada en dataFinalizar.brandName
            router.push(`/${dataUser.tipoSpazio}/${dataUser.brandName}/src/app/`);
                
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            let textMessage = '';
            if(errorCode === 'auth/email-already-in-use') {
                textMessage = 'El email ya está en uso';
                router.push('/login/ingresar-al-spazio');

            } else if(errorCode === 'auth/invalid-email') {
                textMessage = 'El email no es válido';
            } else if(errorCode === 'auth/weak-password') {
                textMessage = 'La contraseña es muy débil';
            } else {
                textMessage = errorMessage;
            }
            
            Swal.fire({
                icon: 'error',
                title: 'Tuvimos un error al intentar registrarte, pero casi lo tienes!...',
                text: textMessage,
                customClass: {
                    popup: styles.swalPopup,
                    confirmButton: styles.swalConfirmButton,
                },
                iconColor: '#c6bbb9'
            });
        });

    }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Tuvimos un error al registrarte...',
                text: error.message,
                customClass: {
                    popup: styles.swalPopup,
                    confirmButton: styles.swalConfirmButton,
                },
                iconColor: '#c6bbb9'
            });
            console.error('Error:', error);
            setIsLoading(false);
        } 

    };

    const welcomeAnimation = useSpring({
        transform: showForm ? 'translateX(-100%)' : 'translateX(0%)',
        opacity: showForm ? 0 : 1,
    });

    const formAnimation = useSpring({
        transform: showForm ? 'translateX(0%)' : 'translateX(100%)',
        opacity: showForm ? 1 : 0,
    });

    const toggleSocial = () => {
        setShowSocial(!showSocial);
    };

    return (
        <div className={styles.container}>
            {!isMobileScreen && (
                <div className={styles.left}>
                                <video src='/videos/earth2.mp4' muted loop autoPlay
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",    
                            }}
                             />
            
                </div>
            )}
            <div className={styles.right}>
                <Image src="/spazio-logo2.png" alt="Logo" width={180} height={30} style={{ objectFit: 'contain', flex: 1 }} />

                {!showForm ? (
                    <animated.div style={welcomeAnimation} className={styles.welcome}>
                        <h1>Ya estamos creando tu Wipe.</h1>
                        <p>Mientras tanto, necesitamos unos datos de tu negocio para ayudarte de la mejor manera.</p>
                        <button onClick={handleContinueClick}>Continuar</button>
                    </animated.div>
                ) : (
                    <animated.form style={formAnimation} className={styles.form} onSubmit={handleSubmit}>
                        <h1>¡Ya casi terminas!</h1>
                        <label>
                            CUIT o CUIL
                            <input
                                type="text"
                                name="cuit"
                                required
                                onFocus={handleCuitFocus}
                                onBlur={handleCuitBlur}
                                onChange={handleChange}
                            />
                        </label>
                        {showTip && (
                            <span className={styles.tip}>
                                Asegúrate de ingresar un documento que esté relacionado con la cuenta bancaria de la tienda. Si corresponde, utiliza el documento de una persona adulta.
                            </span>
                        )}
                        <label>
                            Tu nombre
                            <input type="text" name="name" onChange={handleChange} />
                        </label>
                        <label>
                            Tu apellido
                            <input type="text" name="lastName" onChange={handleChange} />
                        </label>
                        <label>
                            N° de telefono (Opcional)
                            <input type="text" name="phone" onChange={handleChange} />
                        </label>
                        <button type="button" className={styles.toggleSocialButton} onClick={toggleSocial}>
                            {showSocial ? 'Ocultar Redes Sociales' : 'Añadir Redes Sociales'} {showSocial ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                        {showSocial && (
                            <div className={styles.socialSection}>
                                <label>
                                    WhatsApp (Opcional)
                                    <input type="text" name="whatsapp" onChange={handleChange} />
                                </label>
                                <label>
                                    Perfil de Instagram (Opcional)
                                    <input type="text" name="instagram" onChange={handleChange} />
                                </label>
                                <label>
                                    Página de Facebook (Opcional)
                                    <input type="text" name="facebook" onChange={handleChange} />
                                </label>
                            </div>
                        )}
                        {isLoading ? (
                    <button type="submit" className={styles.button} disabled>
                        Cargando mi Spazio... <RingLoader size={20} color='#c6bbb9' cssOverride={{ margin: '0 30px' }} />
                    </button>
                ) : (
                    <button type="submit" className={styles.button}>Finalizando mi Spazio</button>
                )}
                        {/* <button type="submit" disabled={isLoading} >
                            {isLoading ? (<p >Cargando... <RingLoader size={20} color='#c6bbb9' cssOverride={{ margin: '0 30px' }} /></p>) : 'Finalizar'} 
                        </button> */}
                    </animated.form>
                )}
            </div>
        </div>
    );
};

export default Bienvenidos;