// src/app/api/send-form-contacto/route.js
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, telefono, message } = data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Logo oscuro (usar ruta absoluta para evitar problemas de visualización)
    const logoUrl = 'https://quickmenudigital.com/quickmenulogo.png';

    // Navbar con gradiente suave, logo y texto verde oscuro (como la web)
    const navbar = `
      <div style="background:linear-gradient(90deg,#f6fffd 60%,#c6f7f4 100%);padding:1.5rem 2.2rem 1.5rem 2.2rem;border-radius:1.2rem 1.2rem 0 0;display:flex;align-items:center;gap:1rem;">
        <img src='${logoUrl}' alt='QuickMenú' style='width:180px;display:block;'>
        <span style="color:#003f3c;font-family:Inter,sans-serif;font-size:1.6rem;font-weight:700;letter-spacing:1px;"></span>
      </div>
    `;

    // Footer tipo web: logo blanco centrado y claim, optimizado para menos espacio y logo más grande
    const footer = `
      <div style="background:#00b7a2;padding:1.5rem 2rem 1.2rem 2rem;border-radius:0 0 1.2rem 1.2rem;text-align:center;">
        <img src='https://quickmenudigital.com/quickmenublanco.png' alt='QuickMenú' style='width:180px;display:block;margin:0 auto 0.7rem auto;'>
        <div style="color:#fff;font-family:Inter,sans-serif;font-size:1.08rem;font-weight:500;line-height:1.4;margin-bottom:0.5rem;">Transformando ideas en<br>experiencias digitales excepcionales</div>
        <span style="color:#fff;font-family:Inter,sans-serif;font-size:0.98rem;opacity:0.85;">&copy; ${new Date().getFullYear()} QuickMenú. Todos los derechos reservados.</span>
      </div>
    `;

    // Card central con gradiente y sombra, siguiendo la web
    const cardStart = `<div style="background:linear-gradient(135deg,#eafffa 60%,#f6fffd 100%);padding:0;border-radius:1.5rem;font-family:Inter,sans-serif;color:#003f3c;max-width:540px;margin:auto;box-shadow:0 4px 24px #003f3c22;">`;
    const cardEnd = `</div>`;

    // HTML para el admin (QuickMenú)
    const adminHtml = `
      ${cardStart}
        ${navbar}
        <div style="padding:2.2rem 2rem 1.5rem 2rem;">
          <h2 style="color:#00b7a2;font-size:1.6rem;margin-bottom:1.2rem;font-weight:700;">Nuevo mensaje de contacto</h2>
          <div style="font-size:1.13rem;line-height:1.7;">
            <p><b>Nombre:</b> ${name}</p>
            <p><b>Email:</b> <a href="mailto:${email}" style="color:#00b7a2;text-decoration:underline;">${email}</a></p>
            <p><b>WhatsApp:</b> ${telefono || '-'}</p>
            <p><b>Mensaje:</b><br><span style="white-space:pre-line;">${message}</span></p>
          </div>
        </div>
        ${footer}
      ${cardEnd}
    `;

    // HTML para el usuario
    const userHtml = `
      ${cardStart}
        ${navbar}
        <div style="padding:2.2rem 2rem 1.5rem 2rem;">
          <h2 style="color:#00b7a2;font-size:1.6rem;margin-bottom:1.2rem;font-weight:700;">¡Gracias por contactarte con QuickMenú!</h2>
          <p style="font-size:1.13rem;">Hola <b>${name}</b>,</p>
          <p style="font-size:1.13rem;">Recibimos tu consulta y te responderemos a la brevedad.</p>
          <div style="background:#fff;padding:1.2rem;border-radius:1rem;margin:1.5rem 0 0.5rem 0;box-shadow:0 2px 8px #003f3c11;">
            <p style="font-size:1.08rem;"><b>Email:</b> <a href="mailto:${email}" style="color:#00b7a2;text-decoration:underline;">${email}</a></p>
            <p style="font-size:1.08rem;"><b>WhatsApp:</b> ${telefono || '-'}</p>
            <p style="font-size:1.08rem;"><b>Mensaje:</b><br><span style="white-space:pre-line;">${message}</span></p>
          </div>
          <p style="color:#00b7a2;font-size:1.08rem;margin-top:1.5rem;">Equipo QuickMenú</p>
          <p style="font-size:0.98rem;color:#003f3c;margin-top:1.2rem;">¿Querés contactarnos directo? <a href='https://wa.me/+5491131408060' style='color:#00b7a2;text-decoration:underline;'>WhatsApp</a> | <a href='mailto:clientes@quickmenudigital.com' style='color:#00b7a2;text-decoration:underline;'>clientes@quickmenudigital.com</a></p>
        </div>
        ${footer}
      ${cardEnd}
    `;

    // Mail para admin
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'clientes@quickmenudigital.com',
      subject: `Nuevo contacto desde QuickMenú`,
      html: adminHtml,
    });

    // Mail para usuario
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: '¡Recibimos tu consulta en QuickMenú!',
      html: userHtml,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), { status: 500 });
  }
}
