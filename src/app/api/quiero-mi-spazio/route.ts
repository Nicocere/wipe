import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Template para el administrador
const adminTemplate = (data: any) => `
    <div style="background-color: #1a1a1a; color: #ffffff; padding: 20px; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px;">
            <img src="https://firebasestorage.googleapis.com/v0/b/envio-flores.appspot.com/o/spazio%2Fspazio-logo2.png?alt=media&token=44c430bd-4b98-4f40-a18f-fe0ddc6d6ff9" alt="Spazio Logo" style="width: 150px; height: auto;"/>
        </div>
        
        <div style="background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%); padding: 30px; border-radius: 10px; margin: 20px 0;">
            <h1 style="color: #4FD3FF; margin-bottom: 20px; font-size: 24px;">¡Nueva propuesta laboral de Spazio!</h1>
            <div style="background: rgba(79, 211, 255, 0.1); padding: 20px; border-left: 4px solid #4FD3FF; margin: 15px 0;">
                <h2 style="color: #4FD3FF; font-size: 18px;">Datos del Cliente:</h2>
                <p style="margin: 10px 0;"><strong style="color: #4FD3FF;">Nombre:</strong> ${data.nombre} ${data.apellido}</p>
                <p style="margin: 10px 0;"><strong style="color: #4FD3FF;">Email:</strong> ${data.email}</p>
                <p style="margin: 10px 0;"><strong style="color: #4FD3FF;">Teléfono:</strong> ${data.telefono}</p>
                <p style="margin: 10px 0;"><strong style="color: #4FD3FF;">Estilo preferido:</strong> ${data.estilo}</p>
                <p style="margin: 10px 0;"><strong style="color: #4FD3FF;">Notas adicionales:</strong> ${data.notas}</p>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
            <p style="color: #666; font-size: 12px;">© ${new Date().getFullYear()} Spazio. Todos los derechos reservados.</p>
        </div>
    </div>
`;

// Template para el usuario
const userTemplate = (data: any) => `
    <div style="background-color: #ffffff; color: #333333; padding: 20px; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px;">
            <img src="https://firebasestorage.googleapis.com/v0/b/envio-flores.appspot.com/o/spazio%2Fspazio-logo21.png?alt=media&token=3bb98c39-3a5a-4e18-b15a-8ea71a27a154" alt="Spazio Logo" style="width: 150px; height: auto;"/>
        </div>
        
        <div style="background: linear-gradient(145deg, #f5f5f5 0%, #ffffff 100%); padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 20px 0;">
            <h1 style="color: #1a1a1a; margin-bottom: 20px; font-size: 24px;">¡Gracias por confiar en Spazio!</h1>
            
            <p style="color: #444; line-height: 1.6; margin: 15px 0;">
                Hola ${data.nombre},
            </p>
            
            <p style="color: #444; line-height: 1.6; margin: 15px 0;">
                Nos complace confirmar que hemos recibido tu solicitud para crear tu espacio digital. Nuestro equipo está emocionado por comenzar a trabajar en tu proyecto y ayudarte a conquistar el universo digital.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #4FD3FF; font-size: 18px;">Próximos pasos:</h2>
                <ul style="color: #555; line-height: 1.6; margin: 10px 0; padding-left: 20px;">
                    <li>Revisaremos detalladamente tu solicitud</li>
                    <li>Te contactaremos en las próximas 24-48 horas</li>
                    <li>Programaremos una reunión para discutir tu proyecto en detalle</li>
                    <li>Comenzaremos a diseñar tu presencia digital única</li>
                </ul>
            </div>
            
            <p style="color: #444; line-height: 1.6; margin: 15px 0;">
                Si tienes alguna pregunta mientras tanto, no dudes en contactarnos.
            </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <div style="margin-bottom: 20px;">
                <a href="https://spazio-digital.vercel.app" style="color: #4FD3FF; text-decoration: none; margin: 0 10px;">Website</a>
                <a href="mailto:${process.env.GMAIL_USER}" style="color: #4FD3FF; text-decoration: none; margin: 0 10px;">Email</a>
            </div>
            <p style="color: #999; font-size: 12px;">© ${new Date().getFullYear()} Spazio. Todos los derechos reservados.</p>
        </div>
    </div>
`;

export async function POST(request: Request) {
    const body = await request.json();

    try {
        // Email para el administrador
        const adminMailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            subject: '¡Nueva Propuesta laboral de Spazio! 🚀',
            html: adminTemplate(body)
        };

        // Email para el usuario
        const userMailOptions = {
            from: process.env.GMAIL_USER,
            to: body.email,
            subject: '¡Bienvenido a Spazio! 👨‍🚀🌍',
            html: userTemplate(body)
        };

        // Enviar ambos emails
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions)
        ]);

        return NextResponse.json({ 
            message: "Mensajes enviados correctamente",
            success: true 
        });

    } catch (error) {
        console.log('Error al procesar la solicitud: ', error);
        return NextResponse.json({ 
            error: "Error al enviar los mensajes",
            success: false 
        }, { status: 500 });
    }
}